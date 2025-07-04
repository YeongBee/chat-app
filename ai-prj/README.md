# AI Chat Application

Gemini AI와 연동된 React 기반 채팅 애플리케이션입니다. 일반 채팅과 실시간 스트리밍 채팅 두 가지 모드를 지원합니다.

## 🌟 주요 기능

- **💬 일반 채팅**: 기본적인 AI 채팅 기능
- **🌊 스트림 채팅**: 실시간 타이핑 효과가 있는 스트리밍 응답
- **📱 반응형 디자인**: 모바일과 데스크톱 모두 지원
- **🎨 현대적인 UI**: 그라데이션과 애니메이션 효과
- **⚡ 빠른 개발환경**: Vite 기반 HMR 지원

## 🚀 시작하기

### 필수 요구사항

- Node.js 16.x 이상
- npm 또는 yarn
- Gemini AI API 서버 (localhost:8081)

### 설치 및 실행

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **브라우저에서 접속**
   ```
   http://localhost:5173
   ```

## 📁 프로젝트 구조

```
src/
├── App.jsx                  # 메인 앱 컴포넌트 (라우팅)
├── App.css                  # 앱 전역 스타일
├── GeminiChat.jsx           # 일반 채팅 컴포넌트
├── GeminiChat.css          # 채팅 공통 스타일
├── GeminiChatStream.jsx    # 스트리밍 채팅 컴포넌트
├── GeminiChatStream.css    # 스트리밍 전용 스타일
├── index.css               # 전역 CSS 스타일
├── main.jsx                # React 앱 진입점
└── assets/
    └── react.svg           # React 로고
```

## 🛠️ 사용된 기술

### Frontend
- **React 19.1.0** - UI 라이브러리
- **React Router DOM 7.6.3** - 클라이언트 사이드 라우팅
- **Vite 7.0.0** - 빌드 도구 및 개발 서버
- **CSS3** - 스타일링 (그라데이션, 애니메이션)

### 개발 도구
- **ESLint** - 코드 품질 관리
- **@vitejs/plugin-react** - React 지원
- **eslint-plugin-react-hooks** - React Hooks 린팅

## 🎯 주요 컴포넌트

### [`GeminiChat`](src/GeminiChat.jsx)
- 기본적인 질문-응답 채팅 인터페이스
- 로딩 스피너와 에러 처리
- 자동 스크롤 기능

### [`GeminiChatStream`](src/GeminiChatStream.jsx)
- 실시간 스트리밍 응답
- 타이핑 효과 구현
- 스트림 중단 기능
- 한글/영문 타이핑 속도 최적화

## 🔗 API 연동

### 일반 채팅 API
```javascript
POST http://localhost:8081/test/gemini
Content-Type: application/json

{
  "content": "사용자 메시지"
}
```

### 스트리밍 채팅 API
```javascript
POST http://localhost:8081/test/gemini/stream
Content-Type: application/json

{
  "content": "사용자 메시지"
}
```

## 📱 화면 구성

1. **네비게이션 바**: 일반 채팅 ↔ 스트림 채팅 전환
2. **채팅 영역**: 메시지 표시 및 스크롤
3. **입력 영역**: 메시지 입력 및 전송

## 🎨 UI/UX 특징

- **그라데이션 디자인**: 보라색-파란색 계열
- **메시지 버블**: 사용자(오른쪽) vs AI(왼쪽)
- **실시간 피드백**: 로딩 상태, 타이핑 표시
- **반응형 레이아웃**: 모든 디바이스 대응

## 🔧 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 코드 린팅
npm run lint

# 빌드 결과 미리보기
npm run preview
```

## 🌐 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/AmazingFeature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/AmazingFeature`)
5. Pull Request를 생성합니다

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 이슈를 생성해주세요.
