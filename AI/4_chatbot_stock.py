
from pykrx import stock
from openai import OpenAI
import pandas as pd
import os
import re
from datetime import datetime, timedelta
from dotenv import load_dotenv
import gradio as gr

# 환경변수 로드
load_dotenv(override=True)

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
default_model = os.getenv("OPENAI_DEFAULT_MODEL")


COMPANY_TICKERS = {
    "삼성전자": "005930",
    "SK하이닉스": "000660", 
    "NAVER": "035420",
    "네이버": "035420",
    "카카오": "035720",
    "LG화학": "051910",
    "삼성SDI": "006400",
    "현대차": "005380",
    "기아": "000270",
    "POSCO홀딩스": "005490",
    "포스코홀딩스": "005490",
    "LG전자": "066570",
    "한국전력": "015760",
    "신한지주": "055550",
    "KB금융": "105560",
    "셀트리온": "068270",
    "삼성바이오로직스": "207940",
    "LG에너지솔루션": "373220",
    "SK텔레콤": "017670",
    "KT&G": "033780",
    "한화에어로스페이스": "012450",
    "두산에너빌리티": "034020",
    "HD현대중공업": "329180",
    "삼성물산": "028260",
    "CJ제일제당": "097950",
    "아모레퍼시픽": "090430",
    "LG생활건강": "051900",
    "현대건설": "000720",
    "GS": "078930",
    "롯데케미칼": "011170",
    "현대모비스": "012330"
}

def find_ticker(company_name):
    """회사명으로 티커 찾기"""
    company_name = company_name.strip()
    
    # 직접 매칭
    if company_name in COMPANY_TICKERS:
        return COMPANY_TICKERS[company_name]
    
    # 부분 매칭
    for name, ticker in COMPANY_TICKERS.items():
        if company_name in name or name in company_name:
            return ticker
    
    # 6자리 숫자면 티커로 간주
    if re.match(r'^\d{6}$', company_name):
        return company_name
    
    return None


def parse_date(date_str):
    """날짜 문자열을 파싱"""
    try:
        # YYYY-MM-DD 형식
        if re.match(r'\d{4}-\d{2}-\d{2}', date_str):
            return datetime.strptime(date_str, '%Y-%m-%d')
        # YYYYMMDD 형식
        elif re.match(r'\d{8}', date_str):
            return datetime.strptime(date_str, '%Y%m%d')
        # YYYY.MM.DD 형식
        elif re.match(r'\d{4}\.\d{2}\.\d{2}', date_str):
            return datetime.strptime(date_str, '%Y.%m.%d')
        # YYYY/MM/DD 형식
        elif re.match(r'\d{4}/\d{2}/\d{2}', date_str):
            return datetime.strptime(date_str, '%Y/%m/%d')
    except:
        pass
    return None


def extract_analysis_params(message):    
    params = {}
    
    # 회사명 추출 (첫 번째 단어나 따옴표로 감싸진 부분)
    company_match = re.search(r'["\']([^"\']+)["\']', message)
    if company_match:
        params['company'] = company_match.group(1)
    else:
        # 첫 번째 단어를 회사명으로 간주
        words = message.split()
        if words:
            params['company'] = words[0]
    
    # 날짜 추출
    date_patterns = [
        r'\d{4}-\d{2}-\d{2}',
        r'\d{8}',
        r'\d{4}\.\d{2}\.\d{2}',
        r'\d{4}/\d{2}/\d{2}'
    ]
    
    dates = []
    for pattern in date_patterns:
        dates.extend(re.findall(pattern, message))
    
    if len(dates) >= 2:
        params['start_date'] = parse_date(dates[0])
        params['end_date'] = parse_date(dates[1])
    elif len(dates) == 1:
        params['end_date'] = parse_date(dates[0])
        params['start_date'] = params['end_date'] - timedelta(days=30)
    
    # 기간 추출 (30일, 3개월 등)
    period_match = re.search(r'(\d+)(일|개월|달|년)', message)
    if period_match and 'start_date' not in params:
        num = int(period_match.group(1))
        unit = period_match.group(2)
        
        end_date = datetime.now()
        if unit == '일':
            start_date = end_date - timedelta(days=num)
        elif unit in ['개월', '달']:
            start_date = end_date - timedelta(days=num*30)
        elif unit == '년':
            start_date = end_date - timedelta(days=num*365)
        
        params['start_date'] = start_date
        params['end_date'] = end_date
    
    return params


def get_stock_price(ticker, start_date, end_date):
    """주식 데이터 가져오기"""
    try:
        df = stock.get_market_ohlcv_by_date(
            start_date.strftime('%Y%m%d'), 
            end_date.strftime('%Y%m%d'), 
            ticker
        )
        return df
    except Exception as e:
        print(f"Error fetching stock data: {e}")
        return pd.DataFrame()

def analyze_stock_data(df, company_name, start_date, end_date):
    """주식 데이터 분석"""
    if df.empty:
        return f"{company_name}의 주식 데이터를 찾을 수 없습니다."
    
    latest_price = df['종가'].iloc[-1]
    highest_price = df['고가'].max()
    lowest_price = df['저가'].min()
    average_price = df['종가'].mean()
    
    # 가격 변동률 계산
    first_price = df['종가'].iloc[0]
    price_change = latest_price - first_price
    price_change_pct = (price_change / first_price) * 100
    
    # 거래량 분석
    avg_volume = df['거래량'].mean()
    latest_volume = df['거래량'].iloc[-1]
    
    period_str = f"{start_date.strftime('%Y-%m-%d')}부터 {end_date.strftime('%Y-%m-%d')}까지"
    
    analysis = f"""
{company_name}의 {period_str} 주식 분석 데이터:

가격 정보:
- 최신 종가: {latest_price:,}원
- 기간 내 최고가: {highest_price:,}원
- 기간 내 최저가: {lowest_price:,}원
- 평균 가격: {average_price:,.0f}원

수익률 분석:
- 기간 수익률: {price_change:+,.0f}원 ({price_change_pct:+.2f}%)

거래량 정보:
- 평균 거래량: {avg_volume:,.0f}주
- 최근 거래량: {latest_volume:,.0f}주

위 데이터를 바탕으로 {company_name}의 주식에 대한 전문적인 분석과 투자 관점에서의 의견을 제공해주세요. 
기술적 분석, 리스크 요인, 향후 전망 등을 포함해서 설명해주세요.
"""
    
    return analysis


def respond(message, history):
    try:
        # 1. 주식 분석 요청인지 확인
        stock_keywords = ['주식', '분석', '종목', '투자', '차트', '가격', '주가']
        is_stock_query = any(keyword in message.lower() for keyword in stock_keywords)
        
        if is_stock_query:
            # 2. 분석 파라미터 추출
            params = extract_analysis_params(message)
            
            if 'company' in params:
                company_name = params['company']
                ticker = find_ticker(company_name)
                
                if ticker:
                    # 기본 날짜 설정
                    end_date = params.get('end_date', datetime.now())
                    start_date = params.get('start_date', end_date - timedelta(days=30))
                    
                    # 주식 데이터 가져오기
                    df = get_stock_price(ticker, start_date, end_date)
                    
                    if not df.empty:
                        # 분석 요청 생성
                        analysis_prompt = analyze_stock_data(df, company_name, start_date, end_date)
                        
                        # 메시지 히스토리에 분석 데이터 추가
                        messages = [{"role": "system", "content": "당신은 주식 분석 전문가입니다. 제공된 데이터를 바탕으로 전문적이고 객관적인 분석을 제공하세요."}]
                        
                        for user, bot in history:
                            messages.append({"role": "user", "content": user})
                            messages.append({"role": "assistant", "content": bot})
                        
                        messages.append({"role": "user", "content": analysis_prompt})
                    else:
                        messages = [{"role": "system", "content": "당신은 친절한 AI 챗봇입니다."}]
                        for user, bot in history:
                            messages.append({"role": "user", "content": user})
                            messages.append({"role": "assistant", "content": bot})
                        messages.append({"role": "user", 
                                        "content": f"{company_name}(티커: {ticker})의 주식 데이터를 찾을 수 없습니다. 다른 기업을 시도해보세요."})
                else:
                    messages = [{"role": "system", "content": "당신은 친절한 AI 챗봇입니다."}]
                    for user, bot in history:
                        messages.append({"role": "user", "content": user})
                        messages.append({"role": "assistant", "content": bot})
                    messages.append({"role": "user", 
                                    "content": f"'{company_name}'의 티커를 찾을 수 없습니다. 다음 형식으로 요청해주세요:\n예: '삼성전자 30일 분석' 또는 '네이버 2024-01-01 2024-01-31 분석'"})
            else:
                # 일반 주식 관련 질문
                messages = [{"role": "system", "content": "당신은 주식 투자 전문가입니다."}]
                for user, bot in history:
                    messages.append({"role": "user", "content": user})
                    messages.append({"role": "assistant", "content": bot})
                messages.append({"role": "user", "content": message})
        else:
            # 일반 채팅
            messages = [{"role": "system", "content": "당신은 친절한 AI 챗봇입니다."}]
            for user, bot in history:
                messages.append({"role": "user", "content": user})
                messages.append({"role": "assistant", "content": bot})
            messages.append({"role": "user", "content": message})
        
        # OpenAI API 호출 (스트리밍)
        response = client.chat.completions.create(
            model=default_model,
            messages=messages,
            temperature=0.7,
            stream=True,
        )
        
        response_stream = ""
        for chunk in response:
            if hasattr(chunk, 'choices') and len(chunk.choices) > 0:
                delta = chunk.choices[0].delta
                if hasattr(delta, 'content') and delta.content:
                    content = delta.content
                    response_stream += content
                    yield history + [(message, response_stream)], ""
    
    except Exception as e:
        error_msg = f"오류가 발생했습니다: {str(e)}"
        yield history + [(message, error_msg)], ""


# Gradio 인터페이스
with gr.Blocks(title="주식 분석 챗봇") as demo:
    gr.Markdown("""
    # 주식 분석 챗봇
    
    ## 사용 방법:
    - **기본 분석**: "삼성전자 분석" 또는 "네이버 30일 분석"
    - **기간 지정**: "카카오 2024-01-01 2024-01-31 분석"
    - **일반 대화**: 주식 관련 질문이나 일반 대화도 가능합니다
    
    ## 지원 기업:
    삼성전자, SK하이닉스, 네이버, 카카오, LG화학, 현대차, 기아, POSCO홀딩스 등
    """)
    
    chatbot = gr.Chatbot(height=500)
    
    msg = gr.Textbox(
        placeholder="예: '삼성전자 30일 분석' 또는 '네이버 2024-01-01 2024-01-31 분석'", 
        label="메시지 입력"
    )
    clear_btn = gr.Button("대화 초기화")
    
    msg.submit(respond, inputs=[msg, chatbot], outputs=[chatbot, msg])
    clear_btn.click(fn=lambda: [], inputs=None, outputs=chatbot)

if __name__ == "__main__":
    demo.queue()
    demo.launch(share=True)