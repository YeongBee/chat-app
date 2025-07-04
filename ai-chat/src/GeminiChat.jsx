import React, { useState, useEffect, useRef } from 'react';
import './GeminiChat.css';

function GeminiChat() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // 메시지가 추가될 때마다 스크롤을 맨 아래로
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: prompt,
            timestamp: new Date()
        };

        // 사용자 메시지 추가
        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8081/test/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: prompt }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            
            // AI 응답 메시지 추가
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: data.content || '응답을 받지 못했습니다.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            // 에러 메시지 추가
            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                content: `오류가 발생했습니다: ${err.message}`,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
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
                💬 Gemini AI Chat
            </div>
            
            <div className="chat-messages">
                {messages.length === 0 && (
                    <div className="message ai">
                        안녕하세요! 무엇을 도와드릴까요? 😊
                        <div className="message-meta">AI • {formatTime(new Date())}</div>
                    </div>
                )}
                
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}>
                        {message.content}
                        <div className="message-meta">
                            {message.type === 'user' ? '나' : message.type === 'ai' ? 'AI' : '오류'} • {formatTime(message.timestamp)}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="message loading">
                        <div className="loading-spinner"></div>
                        AI가 답변을 생성하고 있습니다...
                    </div>
                )}
                
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
                    <button 
                        type="submit" 
                        disabled={loading || !prompt.trim()} 
                        className="send-button"
                    >
                        ➤
                    </button>
                </form>
            </div>
        </div>
    );
}

export default GeminiChat;