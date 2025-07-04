import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import GeminiChat from './GeminiChat'
import GeminiChatStream from './GeminiChatStream'

function App() {
  return (
    <Router>
      <div>
        {/* 네비게이션 메뉴 */}
        <nav style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '10px 20px',
          display: 'flex',
          gap: '20px',
          alignItems: 'center'
        }}>
          <h3 style={{ color: 'white', margin: 0 }}>AI Chat</h3>
          <Link 
            to="/chat" 
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            💬 일반 채팅
          </Link>
          <Link 
            to="/stream" 
            style={{
              color: 'white',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }}
          >
            🌊 스트림 채팅
          </Link>
        </nav>

        {/* 라우트 */}
        <Routes>
          <Route path="/chat" element={<GeminiChat />} />
          <Route path="/stream" element={<GeminiChatStream />} />
          <Route path="/" element={<GeminiChat />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
