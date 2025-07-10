import React, { useState, useEffect, useRef } from 'react';
import './GeminiChat.css';

function GeminiChat() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('user1234'); // Hardcoded user ID
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null); // Add ref for textarea

    // Fetch chat history on component mount
    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8081/api/chat/history/${currentUserId}`);
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const history = await res.json();
                const formattedHistory = history.map(item => ({
                    id: item.id,
                    type: item.messageType === 'USER' ? 'user' : 'ai',
                    content: item.content,
                    timestamp: new Date(item.createdAt)
                }));
                setMessages(formattedHistory);
            } catch (err) {
                const errorMessage = {
                    id: Date.now(),
                    type: 'error',
                    content: `Failed to load chat history: ${err.message}`,
                    timestamp: new Date()
                };
                setMessages([errorMessage]);
            } finally {
                setLoading(false);
            }
        };

        if (currentUserId) {
            fetchHistory();
        }
    }, [currentUserId]);

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Auto-resize textarea based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height to recalculate
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [prompt]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: prompt,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setLoading(true);

        try {
            const res = await fetch('http://localhost:8081/test/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: prompt }), // No need to send userId here
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            
            const aiMessage = {
                id: Date.now() + 1,
                type: 'ai',
                content: data.content || 'No response received.',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'error',
                content: `An error occurred: ${err.message}`,
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

    const handleDeleteHistory = async () => {
        if (!confirm('정말로 모든 대화 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8081/api/chat/history/${currentUserId}/delete`);

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            setMessages([]);
            
            const successMessage = {
                id: Date.now(),
                type: 'ai',
                content: '대화 기록이 성공적으로 삭제되었습니다.',
                timestamp: new Date()
            };
            setMessages([successMessage]);

        } catch (err) {
             const errorMessage = {
                id: Date.now(),
                type: 'error',
                content: `기록 삭제 중 오류가 발생했습니다: ${err.message}`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <div>
                    💬 Gemini AI Chat
                </div>
                <button onClick={handleDeleteHistory} className="delete-history-button" title="Delete chat history">
                    🗑️
                </button>
            </div>
            
            <div className="chat-messages">
                {messages.length === 0 && !loading && (
                    <div className="message ai">
                        안녕하세요! 무엇을 도와드릴까요? 😊
                        <div className="message-meta">AI • {formatTime(new Date())}</div>
                    </div>
                )}
                
                {messages.map((message) => (
                    <div key={message.id} className={`message ${message.type}`}>
                        {message.content}
                        <div className="message-meta">
                            {message.type === 'user' ? 'You' : 'AI'} • {formatTime(message.timestamp)}
                        </div>
                    </div>
                ))}
                
                {loading && (
                    <div className="message loading">
                        <div className="loading-spinner"></div>
                        AI is generating a response...
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <form onSubmit={handleSubmit} className="input-form">
                    <textarea
                        ref={textareaRef}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="메시지를 입력하세요..."
                        className="input-textarea"
                        disabled={loading}
                        rows={1}
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