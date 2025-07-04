# AI Chat Application

Spring Boot 기반의 AI 채팅 애플리케이션입니다. Google Gemini AI 모델과 OpenAI 호환 API를 사용하여 지능형 대화 서비스를 제공합니다.

## 🚀 주요 기능

- **Gemini AI 채팅**: Google의 Gemini 2.5 Flash 모델을 활용한 AI 대화
- **대화 메모리**: JDBC 기반 대화 히스토리 저장 및 관리
- **RESTful API**: 프론트엔드와의 원활한 통신을 위한 REST API 제공
- **CORS 지원**: React/Vue.js 등 프론트엔드 프레임워크와의 연동 지원
- **PostgreSQL 연동**: Supabase PostgreSQL 데이터베이스 사용

## 🛠 기술 스택

- **Backend**: Spring Boot 3.4.7, Java 17
- **AI Framework**: Spring AI 1.0.0
- **Database**: PostgreSQL (Supabase)
- **Build Tool**: Gradle
- **Libraries**: 
  - Lombok
  - Spring Web
  - Spring AI OpenAI Starter
  - Spring AI Chat Memory Repository JDBC

## 📋 사전 요구사항

- Java 17 이상
- Gradle 7.x 이상
- PostgreSQL 데이터베이스 (Supabase 권장)
- Gemini API 키

## 🔧 설치 및 실행

### 1. 프로젝트 클론
```bash
git clone https://github.com/YeongBee/chat-app/tree/main/ai-prj
cd ai-prj
```

### 2. 환경 변수 설정
환경 변수 또는 IDE 실행 설정에서 다음을 설정하세요:
```bash
export GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. 데이터베이스 설정
`src/main/resources/db.yaml` 파일에서 데이터베이스 연결 정보를 확인하고 필요시 수정하세요.

### 4. 애플리케이션 실행
```bash
# Gradle을 사용한 실행
./gradlew bootRun

# 또는 JAR 파일 빌드 후 실행
./gradlew build
java -jar build/libs/ai-prj-0.0.1-SNAPSHOT.jar
```

애플리케이션은 기본적으로 `http://localhost:8081`에서 실행됩니다.

## 📡 API 엔드포인트

### POST /test/gemini
Gemini AI와 대화하기 위한 엔드포인트입니다.

**요청 예시:**
```json
{
  "message": "안녕하세요! 오늘 날씨는 어때요?"
}
```

**응답 예시:**
```json
{
  "message": "안녕하세요! 저는 AI 어시스턴트로서 실시간 날씨 정보에 접근할 수 없습니다. 정확한 날씨 정보를 원하시면 기상청이나 날씨 앱을 확인해 보시기 바랍니다."
}
```

## 🏗 프로젝트 구조

```
src/
├── main/
│   ├── java/com/ai/aiprj/
│   │   ├── AiPrjApplication.java          # 메인 애플리케이션 클래스
│   │   └── domain/
│   │       ├── gemini/                    # Gemini AI 관련 코드
│   │       │   ├── config/AIConfig.java   # AI 설정
│   │       │   ├── controller/AIController.java # REST 컨트롤러
│   │       │   └── service/GeminiService.java   # 비즈니스 로직
│   │       └── openai/                    # OpenAI 관련 DTO
│   │           ├── dto/RequestDTO.java    # 요청/응답 DTO
│   │           └── service/OpenAIService.java
│   └── resources/
│       ├── application.yaml               # 메인 설정 파일
│       └── db.yaml                       # 데이터베이스 설정
└── test/
    └── java/com/ai/aiprj/
        └── AiPrjApplicationTests.java     # 테스트 클래스
```

## ⚙️ 설정

### application.yaml 주요 설정
- **Server Port**: 8081
- **AI Model**: Gemini 2.5 Flash
- **Temperature**: 0.7 (창의성 수준)
- **CORS**: `http://localhost:5173` (프론트엔드 개발 서버)

### 대화 메모리
- JDBC 기반 대화 히스토리 저장
- PostgreSQL 데이터베이스 사용
- 스키마 자동 초기화 비활성화

## 🔐 보안 고려사항

- API 키는 환경 변수로 관리
- 데이터베이스 연결 정보 보안 (실제 운영 시 환경 변수 사용 권장)
- CORS 설정으로 허용된 도메인에서만 API 접근 가능

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. Pull Request 생성

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.
