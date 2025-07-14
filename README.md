# 🤖 AI 채팅 애플리케이션

이 프로젝트는 React 기반의 프론트엔드와 Spring Boot 기반의 백엔드로 구성된 웹 기반 AI 채팅 애플리케이션입니다.

## 📜 프로젝트 개요

사용자가 AI 챗봇과 상호작용할 수 있는 UI를 제공합니다. 일반적인 요청-응답 방식의 채팅과 실시간 스트리밍 채팅을 모두 지원합니다.

## 기간 : 2025.07.05 ~ 2025.07.09

## ✨ 주요 기능

- **✌️ 듀얼 채팅 모드:** 일반 채팅과 실시간 스트리밍 채팅 중 선택하여 이용할 수 있습니다.
- **🧠 AI 연동:** 백엔드는 Gemini와 같은 거대 언어 모델(LLM)과 연동됩니다.
- **💻 최신 기술 스택:** 프론트엔드는 React, 백엔드는 Spring Boot를 사용하여 최신 개발 방식으로 구현되었습니다.

## 🎥 영상
![Image](https://github.com/user-attachments/assets/993f95c4-2416-4898-ab45-e0c271861bfc)


## 📂 프로젝트 구조

- `ai-chat/`: React로 구현된 프론트엔드 애플리케이션
- `ai-prj/`: Spring Boot로 구현된 백엔드 애플리케이션

---

### 🎨 프론트엔드 (`ai-chat`)

- **프레임워크:** React (Vite 사용)
- **라우팅:** React Router DOM
- **주요 컴포넌트:**
    - `GeminiChat.jsx`: 일반 채팅 UI 컴포넌트
    - `GeminiChatStream.jsx`: 스트리밍 채팅 UI 컴포넌트
- **실행 방법:**
  ```bash
  cd ai-chat
  npm install
  npm run dev
  ```

### ⚙️ 백엔드 (`ai-prj`)

- **프레임워크:** Spring Boot
- **언어:** Java 17
- **주요 의존성:**
    - Spring Web
    - Spring AI (Gemini 및 OpenAI 연동)
    - PostgreSQL
- **API 엔드포인트:**
    - `POST /test/gemini`: 일반 채팅 요청 처리
    - `POST /test/gemini/stream`: 스트리밍 채팅 요청 처리
- **실행 방법:**
  ```bash
  ./gradlew bootRun
  ```

---

## 🚀 동작 방식

1.  `localhost:5173`에서 실행되는 React 프론트엔드가 Spring Boot 백엔드로 API를 호출합니다.
2.  `localhost:8080`에서 실행되는 Spring Boot 백엔드가 요청을 수신합니다.
3.  `AIController`가 요청을 `GeminiService`로 라우팅합니다.
4.  `GeminiService`가 설정된 AI 모델(Gemini)과 상호작용하여 응답을 생성합니다.
5.  응답은 완전한 JSON 객체 또는 텍스트 스트림 형태로 프론트엔드에 다시 전송됩니다.
