from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import TypedDict, Annotated
from langgraph.graph import StateGraph, END
from langgraph.graph.message import add_messages

# FastAPI 앱 설정
app = FastAPI()

# CORS 설정 (React에서 접근 가능하도록)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 요청/응답 모델
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# LangGraph State 정의
class State(TypedDict):
    messages: Annotated[list, add_messages]

# 챗봇 로직 (간단한 응답 생성)
def chatbot_node(state: State):
    user_message = state["messages"][-1]
    
    # 여기에 실제 LLM 호출을 추가할 수 있습니다
    # 현재는 간단한 규칙 기반 응답
    user_text = user_message.lower()
    
    if "안녕" in user_text or "hello" in user_text:
        response = "안녕하세요! 무엇을 도와드릴까요?"
    elif "날씨" in user_text:
        response = "죄송하지만 실시간 날씨 정보는 제공할 수 없습니다."
    elif "이름" in user_text:
        response = "저는 간단한 챗봇입니다!"
    else:
        response = f"'{user_message}'에 대해 말씀하셨군요. 더 자세히 설명해 주시겠어요?"
    
    return {"messages": [response]}

# LangGraph 그래프 생성
workflow = StateGraph(State)
workflow.add_node("chatbot", chatbot_node)
workflow.set_entry_point("chatbot")
workflow.add_edge("chatbot", END)
graph = workflow.compile()

# 대화 기록 저장 (메모리)
conversation_history = []

@app.post("/chatbot", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """챗봇 엔드포인트"""
    global conversation_history
    
    # 사용자 메시지 추가
    conversation_history.append(request.message)
    
    # LangGraph 실행
    result = graph.invoke({
        "messages": [request.message]
    })
    
    # 응답 추출
    bot_response = result["messages"][-1]
    conversation_history.append(bot_response)
    
    return ChatResponse(response=bot_response)

@app.post("/reset")
async def reset():
    """대화 초기화 엔드포인트"""
    global conversation_history
    conversation_history = []
    return {"message": "대화가 초기화되었습니다."}

@app.get("/")
async def root():
    return {"message": "챗봇 API 서버가 실행 중입니다."}

# 실행 방법:
# pip install fastapi uvicorn langgraph
# uvicorn main:app --reload