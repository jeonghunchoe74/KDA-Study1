import React, { useState, useEffect, useRef, StrictMode } from 'react';
// createRoot는 실제 index.jsx 또는 main.jsx에서 사용되므로 여기서는 주석 처리합니다.
// import { createRoot } from 'react-dom/client';

// ------------------------------------------------------------------
// 중요! 네이버 클라우드 플랫폼에서 발급받은 클라이언트 ID를 입력하세요.
// https://www.ncloud.com/product/applicationService/maps
const NAVER_MAP_CLIENT_ID = 'YOUR_NAVER_CLIENT_ID'; 
// ------------------------------------------------------------------

// 백엔드 서버 주소
const API_BASE_URL = 'http://localhost:8000';

// Recharts 라이브러리는 window 객체를 통해 접근합니다.
// 이 라인은 Chart 컴포넌트 내부로 이동하여 라이브러리 로드 후 사용되도록 수정합니다.

// 모든 CSS를 하나의 컴포넌트로 통합
const GlobalStyles = () => (
  <style>{`
    /* App.css */
    #root {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
      font-family: 'Pretendard', sans-serif;
    }
    .main-selector button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 8px;
      transition: background-color 0.3s;
    }
    .main-selector button:hover {
      background-color: #45a049;
    }

    /* Chatbot.css */
    .chatbot-container {
      width: 100%;
      max-width: 600px;
      margin: 2rem auto;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      height: 70vh;
      background: #f9f9f9;
    }
    .chat-area {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .empty-message {
      text-align: center;
      color: #aaa;
      margin: auto;
    }
    .message-wrapper {
      display: flex;
      max-width: 80%;
    }
    .message-wrapper.user {
      align-self: flex-end;
    }
    .message-wrapper.assistant {
      align-self: flex-start;
    }
    .message {
      padding: 10px 15px;
      border-radius: 18px;
      word-wrap: break-word;
    }
    .message.user {
      background-color: #0084ff;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .message.assistant {
      background-color: #e5e5ea;
      color: black;
      border-bottom-left-radius: 4px;
    }
    .input-area {
      padding: 15px;
      border-top: 1px solid #e0e0e0;
      background-color: #fff;
    }
    .input-wrapper {
      display: flex;
    }
    .message-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 20px;
      margin-right: 10px;
    }
    .button-group {
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    .btn {
      padding: 8px 15px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: bold;
      margin-left: 5px;
    }
    .btn-send { background-color: #007bff; color: white; }
    .btn-reset { background-color: #f44336; color: white; }
    .btn-back { background-color: #6c757d; color: white; }
    .loading-dots { display: flex; align-items: center; gap: 5px; }
    .loading-dots .dot {
        width: 8px; height: 8px; background-color: #aaa;
        border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both;
    }
    .loading-dots .dot:nth-child(1) { animation-delay: -0.32s; }
    .loading-dots .dot:nth-child(2) { animation-delay: -0.16s; }
    @keyframes bounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
    }

    /* Chart.css */
    .chart-container {
      width: 100%;
      max-width: 800px;
      margin: 2rem auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .back-button, .retry-button {
      background-color: #6c757d; color: white; border: none;
      padding: 10px 15px; border-radius: 5px; cursor: pointer;
    }
    .chart-content {
      height: 400px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .chart-loading, .chart-error, .chart-empty {
      text-align: center; color: #888;
    }

    /* Map.css */
    .map-container {
      width: 100%;
      height: 300px;
      border-radius: 12px;
      margin-top: 5px;
      border: 1px solid #e0e0e0;
    }
    .map-error {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #d9534f;
      font-size: 14px;
      text-align: center;
      padding: 10px;
    }
  `}</style>
);

// ==================================================================
// 1. 네이버 지도 컴포넌트
// ==================================================================
function NaverMap({ location }) {
  const mapElement = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Naver Maps API가 로드되었는지 확인
    if (!window.naver || !window.naver.maps) {
      setError("네이버 지도 API를 불러오지 못했습니다. Client ID를 확인해주세요.");
      return;
    }

    if (!mapElement.current) return;

    // 지오코딩(장소이름 -> 좌표)
    window.naver.maps.Service.geocode({ query: location }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK || response.v2.addresses.length === 0) {
        setError(`'${location}'에 대한 위치를 찾을 수 없습니다.`);
        return;
      }

      const foundLocation = response.v2.addresses[0];
      const point = new window.naver.maps.Point(foundLocation.x, foundLocation.y);
      
      const mapOptions = {
        center: point,
        zoom: 16,
      };

      // 지도 생성 및 마커 표시
      const map = new window.naver.maps.Map(mapElement.current, mapOptions);
      new window.naver.maps.Marker({
        position: point,
        map: map,
      });
      setError(null); // 성공 시 에러 메시지 초기화
    });

  }, [location]);

  if (error) {
    return <div className="map-container map-error">{error}</div>;
  }

  return <div ref={mapElement} className="map-container" />;
}

// ==================================================================
// 2. 챗봇 컴포넌트
// ==================================================================
function Chatbot({ onBack }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const chatAreaRef = useRef(null);

    // 새 메시지가 추가될 때마다 스크롤을 맨 아래로 이동
    useEffect(() => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }, [messages]);

    // 사용자의 메시지에 위치 관련 키워드가 있는지 확인하는 함수
    const isLocationQuery = (message) => {
        const keywords = ['어디', '위치', '지도', '가는 길'];
        return keywords.some(keyword => message.includes(keyword));
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessageContent = input;
        const userMessage = { role: 'user', content: userMessageContent };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/chatbot`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessageContent })
            });
            if (!response.ok) throw new Error(`서버 오류: ${response.status}`);

            const data = await response.json();
            
            let botMessage;
            // 사용자가 위치를 물어봤다고 판단되면, 응답을 지도 컴포넌트로 처리
            if (isLocationQuery(userMessageContent)) {
                 botMessage = { 
                    role: 'assistant',
                    type: 'map', // 메시지 타입을 'map'으로 지정
                    location: data.response // 백엔드가 장소 이름을 반환한다고 가정
                 };
            } else {
                 botMessage = { 
                    role: 'assistant', 
                    content: data.response 
                };
            }
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
            await fetch(`${API_BASE_URL}/reset`, { method: 'POST' });
            console.log('대화가 초기화되었습니다.');
        } catch (error) {
            console.error('리셋 실패:', error);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chat-area" ref={chatAreaRef}>
                {messages.length === 0 && <div className="empty-message">무엇이든 물어보세요!</div>}
                
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message-wrapper ${msg.role}`}>
                        {msg.type === 'map' ? (
                            <NaverMap location={msg.location} />
                        ) : (
                            <div className={`message ${msg.role}`}>{msg.content}</div>
                        )}
                    </div>
                ))}
                
                {loading && (
                    <div className="message-wrapper assistant">
                        <div className="message assistant loading">
                            <div className="loading-dots">
                                <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

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
                    <button onClick={handleReset} className="btn btn-reset" disabled={loading}>리셋</button>
                    <button onClick={handleSend} className="btn btn-send" disabled={loading}>전송</button>
                    <button onClick={onBack} className="btn btn-back" disabled={loading}>뒤로가기</button>
                </div>
            </div>
        </div>
    );
}

// ==================================================================
// 3. 차트 컴포넌트
// ==================================================================
function Chart({ onBack }) {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // [FIX] Recharts 라이브러리가 로드되지 않았을 경우를 대비한 방어 코드 추가
    if (!window.Recharts) {
        return (
            <div className="chart-container">
                <div className="chart-header">
                    <h2>데이터 차트</h2>
                    <button onClick={onBack} className="back-button">뒤로가기</button>
                </div>
                <div className="chart-content">
                    <div className="chart-error">
                        <p>차트 라이브러리를 불러오는 데 실패했습니다. 페이지를 새로고침하거나 인터넷 연결을 확인해주세요.</p>
                    </div>
                </div>
            </div>
        );
    }
    // [FIX] window.Recharts가 로드된 후, 여기서 구조 분해 할당을 실행합니다.
    const { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } = window.Recharts;

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

    const fetchChartData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/chart`);
            if (!response.ok) throw new Error(`서버 오류: ${response.status}`);
            const data = await response.json();
            setChartData(data.data);
        } catch (error) {
            console.error('차트 데이터 로드 실패:', error);
            setError('차트 데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchChartData();
    }, []);

    return (
        <div className="chart-container">
            <div className="chart-header">
                <h2>데이터 차트</h2>
                <button onClick={onBack} className="back-button">뒤로가기</button>
            </div>
            <div className="chart-content">
                {loading && <div className="chart-loading"><p>데이터를 불러오는 중...</p></div>}
                {error && <div className="chart-error"><p>{error}</p><button onClick={fetchChartData} className="retry-button">다시 시도</button></div>}
                {!loading && !error && chartData.length > 0 && (
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                )}
                {!loading && !error && chartData.length === 0 && <div className="chart-empty"><p>표시할 데이터가 없습니다.</p></div>}
            </div>
        </div>
    );
}

// ==================================================================
// 4. 메인 앱 컴포넌트
// ==================================================================
function App() {
  const [activeComponent, setActiveComponent] = useState(null);

  // 네이버 지도 API 스크립트가 로드되지 않았을 경우 경고 메시지 표시
  useEffect(() => {
    if (NAVER_MAP_CLIENT_ID === 'YOUR_NAVER_CLIENT_ID') {
        console.warn("네이버 지도 Client ID가 설정되지 않았습니다. Map 기능이 동작하지 않을 수 있습니다.");
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <h1>챗봇 & 차트 애플리케이션</h1>
      
      {activeComponent === null ? (
        <div className="main-selector">
          <button onClick={() => setActiveComponent('Chatbot')}>챗봇 시작하기</button>
          <button onClick={() => setActiveComponent('Chart')}>차트 보러가기</button>
        </div>
      ) : (
        <div>
          {activeComponent === 'Chatbot' && <Chatbot onBack={() => setActiveComponent(null)} />}
          {activeComponent === 'Chart' && <Chart onBack={() => setActiveComponent(null)} />}
        </div>
      )}
    </>
  );
}

export default App;

// 아래 코드는 create-react-app이나 Vite 프로젝트의 index.jsx/main.jsx 파일에 해당합니다.
// const rootElement = document.getElementById('root');
// if (rootElement) {
//   const root = createRoot(rootElement);
//   root.render(
//     <StrictMode>
//       <App />
//     </StrictMode>
//   );
// }

