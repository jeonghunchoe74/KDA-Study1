import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(override=True)
api_key = os.getenv("OPENAI_API_KEY")
default_model = os.getenv("OPENAI_DEFAULT_MODEL")
camping_key = os.getenv("GO_CAMPING_API_KEY")

client = OpenAI(api_key=api_key)

def get_keyword(question):
    response = client.chat.completions.create(
        model=default_model,
        messages=[
        {"role": "system",  "content": "다음 질문에서 가장 중요한 키워드 단어 하나만 뽑아줘."},
        {"role": "user", "content": question}
        ],
        temperature=0,
        max_tokens=1024,
        top_p=0.8,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response.choices[0].message.content

def recommand(question, content):
    response = client.chat.completions.create(
        model=default_model,
        messages=[
        {"role": "system",  "content": f"주어진 문단을 보고 다음 질문에 답해줘: {question}"},
        {"role": "user", "content": content}
        ],
        temperature=0,
        max_tokens=1024,
        top_p=0.8,
        stream=True
    )
    return response

def get_url(keyword):
    url= f'http://apis.data.go.kr/B551011/GoCamping/searchList?serviceKey={camping_key}&MobileOS=ETC&MobileApp=AppTest&keyword={keyword}&_type=json'
    return url

def get_camping_data(url):
    import requests
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
    else:
        print(f"Error: {response.status_code}")

    sites = data['response']['body']['items']['item']

    context = ''
    for site in sites:
        context += site['facltNm'] + ":" + site["induty"] + ":"+ site['doNm'] + ":" + site['intro'] + "\n"
    return context   

import random
import time
import gradio as gr

def chat_response(msg, chat_history):
    messages_history=[]
    for user_msg, assistant_msg in chat_history:
        messages_history.append({"role": "user", "content": user_msg})
        if assistant_msg:
            messages_history.append({"role": "assistant", "content": assistant_msg})

    messages_history.append({"role":"user", "content":msg}) 
    if '캠핑' in msg:
        keyword = get_keyword(msg) 
        url = get_url(keyword)
        data = get_camping_data(url)
        
        ret = recommand(msg, data)
    else:    
        ret = recommand('너는 친절한 AI 어시스턴트야', msg)

    total_stream = ""
    for char in ret:
        ret_stream = getattr(char.choices[0].delta, "content", None)   
        if ret_stream: 
            total_stream += ret_stream
            yield chat_history + [(msg, total_stream)], ""

with gr.Blocks() as demo:
    chatbot = gr.Chatbot()
    msg = gr.Textbox(placeholder="질문을 입력하세요", label="질문")
    btn = gr.Button("초기화")

    msg.submit(fn=chat_response, 
            inputs=[msg, chatbot],
            outputs=[chatbot, msg])
    btn.click(lambda:[], inputs=None, outputs=chatbot)

demo.launch()      