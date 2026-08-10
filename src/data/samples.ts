import { SampleData } from '../types';

export const SAMPLE_JOBS: SampleData[] = [
  {
    id: 'backend-engineer',
    title: '시니어 백엔드 엔지니어',
    company: '테크코어 레볼루션',
    category: '백엔드/서버',
    jdText: `[주요 업무]
- Spring Boot 및 Node.js 기반 대규모 트래픽 마이크로서비스(MSA) 설계 및 구현
- RESTful API 및 gRPC 기반 내부 서비스 인터페이스 구축
- MySQL, PostgreSQL 인덱싱 최적화 및 Redis 캐싱 레이어 구축
- AWS (EC2, S3, RDS, Lambda) 및 Docker, Kubernetes 기반 CI/CD 자동화 구축
- 대용량 데이터베이스 쿼리 성능 개선 및 시스템 장애 분석(Troubleshooting)

[자격 요건]
- 백엔드 개발 경력 3년 이상 (또는 그에 준하는 역량)
- Java / Spring Boot 또는 TypeScript / Node.js 실무 경험
- RDBMS(MySQL, PostgreSQL)에 대한 깊은 이해 및 SQL 최적화 능력
- RESTful API 설계 및 개발 경험
- Git / GitHub 기반 팀 협업 및 코드 리뷰 문화에 익숙하신 분
- 클라우드 환경(AWS/GCP) 및 Docker 기반 컨테이너 배포 경험

[우대 사항]
- Kafka, RabbitMQ 등 메시지 큐 활용 대용량 분산 처리 시스템 경험
- Redis, ElasticSearch 도입을 통한 조회 성능 개선 경험
- 테스트 자동화(JUnit, Jest) 및 CI/CD 파이프라인(GitHub Actions) 구축 경험
- 장애 대응 및 모니터링 시스템(Prometheus, Grafana) 구축 주도 경험`,
    matchingResume: `홍길동 | 소프트웨어 백엔드 엔지니어 (3.5년 경력)
이메일: dev.hong@example.com | GitHub: github.com/hong-dev

[보유 기술]
- 언어 & 프레임워크: Java, Spring Boot, JPA, TypeScript, Node.js, Express
- 데이터베이스: MySQL, PostgreSQL, Redis
- 인프라 & DevOps: AWS (EC2, RDS, S3), Docker, CI/CD (GitHub Actions)
- 도구: Git, JIRA, Postman, Swagger

[경력 사항]
Tech Corp - 백엔드 개발자 (2022.03 ~ 현재)
- 대규모 커머스 서비스의 백엔드 API 설계 및 개발 (Spring Boot, JPA)
- 슬로우 쿼리 리팩토링 및 MySQL 인덱스 재설계로 조회 속도 45% 개선
- Redis 캐시 층 적용으로 DB 부하 60% 감소 및 서버 응답 시간 200ms -> 35ms 단축
- Docker 및 GitHub Actions 기반 CI/CD 파이프라인 구축으로 배포 자동화
- 대용량 결제 데이터 트랜잭션 분리 및 트러블슈팅 주도

Startup Inc - 웹 백엔드 개발자 (2021.01 ~ 2022.02)
- Node.js / Express 기반 RESTful API 서버 개발
- AWS S3 / CloudFront 기반 파일 업로드 및 이미지 최적화`,
    weakResume: `김철수 | 백엔드 개발자 지원자
이메일: chulsoo@example.com

[소개]
웹 개발을 사랑하고 열심히 배우는 백엔드 개발자입니다.

[경력]
소규모 외주 프로젝트 (6개월)
- Python / Django를 사용해 간단한 게시판 및 쇼핑몰 웹사이트 제작
- HTML, CSS, JavaScript로 프론트엔드 UI 구성
- SQLite DB에 데이터 저장 및 조회

[학력 & 교육]
- 컴퓨터공학 학사 졸업 (2022)
- 웹개발 부트캠프 수료 (6개월)`
  },
  {
    id: 'frontend-engineer',
    title: '시니어 프론트엔드 엔지니어',
    company: '클라우드인사이트',
    category: '프론트엔드',
    jdText: `[주요 업무]
- React 및 TypeScript를 사용하여 복잡한 B2B SaaS 웹 애플리케이션 설계 및 개발
- 디자인 시스템(Tailwind CSS, Storybook) 구축 및 UI/UX 팀과 협력
- 상태 관리(Zustand, React Query) 최적화 및 클라이언트 성능 향상 (Lighthouse Score 90+)
- RESTful API 및 WebSocket 기반 실시간 인터랙션 구현
- 자동화된 테스트 구현 (Jest, Cypress, Playwright)

[자격 요건]
- 프론트엔드 개발 경력 3년 이상
- JavaScript, HTML5, CSS3 및 최신 프레임워크(React, Next.js)에 대한 깊은 지식
- TypeScript 기반의 엄격한 타입 세이프 코딩 경험
- RESTful API 및 GraphQL에 대한 이해
- CI/CD 파이프라인 및 클라우드 서비스(AWS S3/CloudFront, Vercel) 사용 경험
- 뛰어난 문제 해결 능력과 세심한 주의력

[우대 사항]
- B2B SaaS 또는 데이터 시각화 라이브러리(Recharts, D3.js) 활용 경험
- Web Vitals 성능 최적화 및 렌더링 병목 현상 개선 경험
- 글로벌 서비스 다국어 지원(i18n) 경험`,
    matchingResume: `이영희 | 프론트엔드 엔지니어 (4년 경력)
이메일: younghee@example.com

[기술 스택]
- React, Next.js, TypeScript, Tailwind CSS, Redux Toolkit, Zustand, React Query
- Jest, React Testing Library, Webpack, Vite, CI/CD (Vercel, AWS S3)

[주요 프로젝트 및 경력]
NextCloud Inc. - 프론트엔드 엔지니어 (2022.05 ~ 현재)
- React 및 TypeScript 기반 B2B SaaS 대시보드 메인 프론트엔드 개발
- Zustand & React Query 도입으로 서버 상태 관리 캐싱 및 API 중복 요청 70% 감소
- Tailwind CSS 기반 공통 디자인 시스템 컴포넌트 30여 개 구축 및 재사용성 확보
- Web Vitals 최적화(코드 스플리팅, 이미지 최적화)로 Lighthouse 성능 점수 62점 -> 94점 향상
- Cypress 및 Jest를 도입하여 주요 사용자 시나리오 E2E 및 단위 테스트 구축`,
    weakResume: `이영희 | 프론트엔드 지원자
- Vue.js 기반 기초 쇼핑몰 구현 경험
- HTML/CSS로 기본 레이아웃 제작 가능
- jQuery 사용 경험 있음`
  },
  {
    id: 'product-manager',
    title: 'Product Manager (서비스 기획)',
    company: '넥스트파이낸스',
    category: '기획/PM',
    jdText: `[주요 업무]
- 금융 AI 데이터 플랫폼 서비스 전반의 로드맵 수립 및 지표 관리
- 고객 문제 정의, 요구사항 정의서(PRD) 및 와이어프레임 작성
- 개발자, 디자이너, 마케터와의 딜리버리 일정 관리 및 스크럼 주도
- A/B 테스트 및 데이터 분석(GA4, Amplitude)을 통한 전환율(CVR) 및 retention 개선

[자격 요건]
- IT 서비스 PM/PO 경력 3년 이상
- 데이터 기반 문제 정의 및 Hypothesis-driven 문제 해결 능력
- SQL 쿼리 작성 및 데이터 분석 도구(GA4, Amplitude, Mixpanel) 활용 능력
- Figma, Miro, JIRA, Confluence 등 협업 툴 숙련자

[우대 사항]
- 핀테크 또는 B2C 앱 서비스 기획 경험
- AI/LLM 기반 서비스 상용화 기획 경험`,
    matchingResume: `박지훈 | Product Manager (4년 경력)
- B2C 금융 앱 유저 리텐션 35% 향상 주도
- GA4 및 Mixpanel 기반 유저 행동 데이터 분석 및 SQL 직접 추출
- Figma로 와이어프레임 설계, PRD 작성 및 JIRA Agile 스크럼 리드`,
    weakResume: `박지훈 | 신입 기획자
- 대학 동아리 웹사이트 기획 경험
- 문서 작성 및 아이디어 구상 가능`
  }
];
