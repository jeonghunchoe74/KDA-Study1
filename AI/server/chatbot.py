# 실행 방법:
# 1. 환경변수 설정: export OPENAI_API_KEY="your-api-key-here"
# 2. 패키지 설치: pip install fastapi uvicorn langgraph langchain-openai python-dotenv
# 3. 서버 실행: uvicorn main:app --reload


from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import TypedDict, Annotated, List, Dict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage, AIMessage
import os
from dotenv import load_dotenv
import uuid


load_dotenv(override=True)
api_key = os.getenv("OPENAI_API_KEY")
default_model = os.getenv("OPENAI_DEFAULT_MODEL", "gpt-3.5-turbo")

# 환경 변수 검증
if not api_key:
    raise ValueError("OPENAI_API_KEY가 설정되지 않았습니다.")

# FastAPI 앱 설정
app = FastAPI(
    title="Chatbot & Map API Server",
    description="LangGraph를 이용한 챗봇 및 네이버 지도 연동을 위한 백엔드 API",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # 실제 운영 환경에서는 특정 도메인으로 제한하는 것이 안전합니다.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청/응답 모델
class ChatRequest(BaseModel):
    message: str
    session_id: str = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

class ResetRequest(BaseModel):
    session_id: str

# LangGraph State 정의
class State(TypedDict):
    messages: Annotated[List, add_messages]

llm = ChatOpenAI(api_key=api_key, model_name=default_model, temperature=0.7)

# 챗봇 노드
def chatbot(state: State):
    response = llm.invoke(state['messages'])
    return {"messages": [response]}

# LangGraph 그래프 생성
workflow = StateGraph(State)
workflow.add_node("chatbot", chatbot)
workflow.add_edge(START, "chatbot")
workflow.add_edge("chatbot", END)
graph = workflow.compile()

# 세션별 대화 상태 저장 (메모리)
sessions: Dict[str, State] = {}

def get_or_create_session(session_id: str = None) -> tuple[str, State]:
    """세션 가져오기 또는 생성"""
    if session_id is None or session_id not in sessions:
        session_id = str(uuid.uuid4())
        sessions[session_id] = {
            "messages": [SystemMessage(content="""
당신은 특별한 지시를 받은 유용한 AI 어시스턴트입니다.
만약 사용자가 특정 장소의 위치, 지도, 또는 길찾기를 물어보면, 당신은 반드시 그 장소의 이름'만'으로 대답해야 합니다.
예시:
- 사용자: '경복궁 어디야?' -> 당신의 답변: '경복궁'
- 사용자: '서울 시청 지도 보여줘' -> 당신의 답변: '서울시청'
- 사용자: 'N서울타워 가는 길 알려줘' -> 당신의 답변: 'N서울타워'

그 외 모든 일반적인 대화에서는 친절한 AI 어시스턴트처럼 대답해주세요.
""")]
        }
    return session_id, sessions[session_id]

# 챗봇 엔드포인트
@app.post("/chatbot", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        session_id, state = get_or_create_session(request.session_id)
        state['messages'].append(HumanMessage(content=request.message))
        
        response_graph = graph.invoke({"messages": state['messages']})
        
        ai_response_content = response_graph["messages"][-1].content
        state['messages'].append(AIMessage(content=ai_response_content))
        
        sessions[session_id] = state
        
        return ChatResponse(response=ai_response_content, session_id=session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"챗봇 처리 중 오류 발생: {str(e)}")


# 대화 초기화 엔드포인트
@app.post("/reset")
async def reset(request: ResetRequest):
    session_id = request.session_id
    if session_id and session_id in sessions:
        del sessions[session_id]
        return {"message": f"세션 {session_id}이(가) 초기화되었습니다."}
    raise HTTPException(status_code=404, detail="초기화할 세션을 찾을 수 없습니다.")


# 차트 데이터 반환 엔드포인트
@app.get("/chart")
async def get_chart_data():
    chart_data = [
        {"name": "Python", "value": 40},
        {"name": "JavaScript", "value": 35},
        {"name": "Java", "value": 15},
        {"name": "기타", "value": 10}
    ]
    return {"data": chart_data}


# 루트 엔드포인트
@app.get("/")
async def root():
    return {
        "message": "챗봇 API 서버가 실행 중입니다.",
        "active_sessions": len(sessions)
    }


# 헬스 체크 엔드포인트
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model": default_model,
        "active_sessions": len(sessions)
    }
