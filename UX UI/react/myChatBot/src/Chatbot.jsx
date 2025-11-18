import React, { useState } from 'react';
import './Chatbot.css';

const API_BASE_URL = 'http://localhost:8000';

export default function Chatbot({ onBack }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const messageContent = input;
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageContent })
            });
            if (!response.ok) {
                throw new Error(`서버 오류: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = { role: 'assistant', content: data.response };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('전송 실패:', error);
            const errorMessage = { 
                role: 'assistant', 
                content: '오류가 발생했습니다. 서버를 확인해주세요.' 
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setMessages([]);
        try {
            const response = await fetch(`${API_BASE_URL}/reset`, { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            if (response.ok) {
                console.log('대화가 초기화되었습니다.');
            }
        } catch (error) {
            console.error('리셋 실패:', error);
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        }
    };

    return (
        <div className="chatbot-container">
            {/* 채팅 영역 */}
            <div className="chat-area">
                {messages.length === 0 && (
                <div className="empty-message">메시지를 입력해주세요</div>
                )}
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-wrapper ${msg.role}`}>
                        <div className={`message ${msg.role}`}>
                        {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message-wrapper assistant">
                        <div className="message loading">
                        <div className="loading-dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        </div>
                    </div>
                )}
            </div>

            {/* 입력 영역 */}
            <div className="input-area">
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="메시지를 입력하세요..."
                        className="message-input"
                        disabled={loading}
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleReset} className="btn btn-reset" disabled={loading}>
                        리셋
                    </button>
                    <button onClick={handleSend} className="btn btn-send" disabled={loading}>
                        전송
                    </button>
                    <button onClick={handleBack} className="btn btn-chart" disabled={loading}>
                        뒤로가기
                    </button>
                </div>
            </div>
        </div>
    );
}
