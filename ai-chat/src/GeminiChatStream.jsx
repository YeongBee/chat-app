import React, { useState, useEffect, useRef } from 'react';
import './GeminiChat.css';
import './GeminiChatStream.css';

function GeminiChatStream() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const messagesEndRef = useRef(null);
    const abortControllerRef = useRef(null);

    // 메시지가 추가될 때마다 스크롤을 맨 아래로
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim() || loading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: prompt,
            timestamp: new Date()
        };

        // 사용자 메시지 추가
        setMessages(prev => [...prev, userMessage]);
        const currentPrompt = prompt;
        setPrompt('');
        setLoading(true);
        setStreaming(true);

        // AI 스트림 메시지를 위한 초기 메시지 생성
        const aiMessageId = Date.now() + 1;
        const initialAiMessage = {
            id: aiMessageId,
            type: 'ai',
            content: '',
            timestamp: new Date(),
            isStreaming: true
        };

        setMessages(prev => [...prev, initialAiMessage]);

        try {
            // AbortController 생성
            abortControllerRef.current = new AbortController();

            const response = await fetch('http://localhost:8081/test/gemini/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: currentPrompt }),
                signal: abortControllerRef.current.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                
                // 청크를 문자 단위로 나누어서 타이핑 효과 구현
                for (let i = 0; i < chunk.length; i++) {
                    accumulatedContent += chunk[i];
                    
                    setMessages(prev => 
                        prev.map(msg => 
                            msg.id === aiMessageId 
                                ? { ...msg, content: accumulatedContent }
                                : msg
                        )
                    );
                    
                    // 타이핑 속도 조절
                    const char = chunk[i];
                    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char);
                    const isSpace = /\s/.test(char);
                    
                    let delay = 30; // 기본 지연시간
                    if (isSpace) delay = 10; // 공백은 빠르게
                    else if (isKorean) delay = 40; // 한글은 조금 더 천천히
                    
                    await new Promise(resolve => setTimeout(resolve, delay));
                    
                    // 중단 요청이 있으면 멈춤
                    if (abortControllerRef.current?.signal.aborted) {
                        break;
                    }
                }
                
                // 청크 처리 후 추가 지연
                await new Promise(resolve => setTimeout(resolve, 50));
            }

            // 스트리밍 완료 후 최종 상태 업데이트
            setMessages(prev => 
                prev.map(msg => 
                    msg.id === aiMessageId 
                        ? { ...msg, isStreaming: false }
                        : msg
                )
            );

        } catch (err) {
            if (err.name === 'AbortError') {
                // 스트림이 중단된 경우
                setMessages(prev => 
                    prev.map(msg => 
                        msg.id === aiMessageId 
                            ? { ...msg, content: msg.content + '\n\n[스트림이 중단되었습니다]', isStreaming: false }
                            : msg
                    )
                );
            } else {
                // 에러 메시지로 교체
                setMessages(prev => 
                    prev.map(msg => 
                        msg.id === aiMessageId 
                            ? { 
                                ...msg, 
                                type: 'error',
                                content: `오류가 발생했습니다: ${err.message}`,
                                isStreaming: false
                            }
                            : msg
                    )
                );
            }
        } finally {
            setLoading(false);
            setStreaming(false);
            abortControllerRef.current = null;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const stopStreaming = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
    };

    const formatTime = (timestamp) => {
        return timestamp.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                🌊 Gemini AI Stream Chat
                <div style={{ fontSize: '12px', opacity: 0.8, marginTop: '5px' }}>
                    실시간 스트리밍 응답
                </div>
            </div>
            
            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="message ai">
                        안녕하세요! 스트리밍 채팅에 오신 것을 환영합니다! 🌊
                        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '5px' }}>
                            AI의 응답이 실시간으로 스트리밍됩니다.
                        </div>
                        <div className="message-meta">AI • {formatTime(new Date())}</div>
                    </div>
                )}
                
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}>
                        {message.content}
                        {message.isStreaming && (
                            <span className="streaming-cursor">▊</span>
                        )}
                        <div className="message-meta">
                            {message.type === 'user' ? '나' : message.type === 'ai' ? 'AI' : '오류'} • 
                            {formatTime(message.timestamp)}
                            {message.isStreaming && ' • 입력 중...'}
                        </div>
                    </div>
                ))}
                
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <form onSubmit={handleSubmit} className="input-form">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
                        className="input-textarea"
                        disabled={loading}
                    />
                    {streaming ? (
                        <button 
                            type="button" 
                            onClick={stopStreaming}
                            className="send-button stop-button"
                        >
                            ⏹
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            disabled={loading || !prompt.trim()} 
                            className="send-button"
                        >
                            ➤
                        </button>
                    )}
                </form>
                {streaming && (
                    <div style={{ 
                        fontSize: '12px', 
                        color: '#666', 
                        textAlign: 'center', 
                        marginTop: '8px' 
                    }}>
                        AI가 실시간으로 응답을 생성하고 있습니다... ⏹ 버튼으로 중단할 수 있습니다.
                    </div>
                )}
            </div>
        </div>
    );
}

export default GeminiChatStream;
