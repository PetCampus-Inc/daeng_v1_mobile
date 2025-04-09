# 똑독
서비스의 모든 스크린을 웹 뷰로 보여주는 **하이브리드 앱**입니다.

프로젝트 메인 기능은 웹뷰와의 `Request-Response` 통신을 통한 네이티브 기능 실행, 푸시 알림, 소셜 로그인 인증 처리입니다.

**스토어 링크**
[App Store](https://apps.apple.com/kr/app/똑독-강아지-유치원-알림장-사진앨범/id6720726330)
|
[Google PlayStore](https://play.google.com/store/apps/details?id=net.knockdog.petcampus&pcampaignid=web_share)

<br>

## 📚 사용 기술 및 환경

### 사용 기술
<div>
  <img src="https://img.shields.io/badge/ReactNative_CLI_V0.76-FFFFFF?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/React_v18-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript_v5-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/NativeWind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/ESLint_v9-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/Prettier_v3-F7B93E?style=for-the-badge&logo=prettier&logoColor=black">
  <br>
</div>

<br>

### 개발 환경
| 개발 환경 | 버전 | 개발 환경 | 버전
|----------|------|------|------
| Node.js | >=18 | Kotlin | 1.9.x
| Pnpm | >=9 | JDK | 17
| React Native | 0.76.1 | Gradle | 8.10.x
| Xcode | 16.x | Android SDK | API 34
| CocoaPods | 1.13.x

<br>

## 📁 프로젝트 구조
```
📦 src
├── 📂 app
│   ├── 📜 App.tsx
│   ├── 📂 layout
│   ├── 📂 navigation        # 네비게이션
│   └── 📂 styles            # 전역 스타일
├── 📂 screens
│   ├── 📜 MainScreen.tsx    # 메인 스크린
│   └── 📜 StackScreen.tsx   # 웹뷰 스택 전용 스크린
├── 📂 shared
│   ├── 📂 assets            # 정적 리소스 (font, lottie, svg)
│   ├── 📂 config            # 환경 구성 파일
│   ├── 📂 constants         # 상수 정의 (storage key)
│   ├── 📂 hooks
│   │   ├── 📂 use-overlay                   # 오버레이를 선언적으로 다루는 유틸리티 훅 (toss slash lib)
│   │   ├── 📂 use-push-notification         # 푸시 알림 처리 훅 (푸시 알림 처리, 스크린 이동 처리)
│   │   ├── 📂 use-qr-scanner                # QR 코드 스캐너 UI 및 기능 훅
│   │   ├── 📂 use-stack-navigation          # 웹뷰 스택 스크린 관리 훅 (push, webview, replace, back, pop)
│   │   ├── 📜 useBackHandler.ts             # AOS 뒤로가기 물리 버튼 처리 훅
│   │   ├── 📜 useTokenCookieManager.ts      # 리프레시 토큰 관리 훅
│   │   └── 📜 useWebViewState.ts            # 웹뷰에서 전달한 State 값을 처리하는 훅
│   ├── 📂 lib
│   │   ├── 📂 aws                           # S3 이미지 업로드 모듈 (사용되지 않음)
│   │   ├── 📂 bridge                        # 웹뷰와 네이티브 간 통신 브릿지 모듈
│   │   │   ├── 📂 hook
│   │   │   │   └── 📜 useBridge.ts          # 웹뷰 <-> 네이티브 통신 브릿지 훅
│   │   │   ├── 📜 index.ts
│   │   │   ├── 📂 lib
│   │   │   │   ├── 📜 handleBridge.ts       # 브릿지 메서드 호출 및 응답 처리 모듈
│   │   │   │   ├── 📜 handleWebViewLog.ts   # 웹뷰 로그 인터셉터 모듈
│   │   │   │   └── 📜 postMessage.ts        # 웹뷰 메세지 전송 모듈
│   │   │   ├── 📂 types
│   │   │   │   └── 📜 index.ts              # 브릿지 관련 타입 정의
│   │   │   └── 📂 utils
│   │   │       └── 📜 is.ts                 # 브릿지 메시지 타입 가드 유틸리티 함수
│   │   ├── firebase                      # 파이어베이스 연동 모듈 (Firebase Auth, FCM)
│   │   ├── native                        # 네이티브 기능 접근 모듈 (전화, 카메라 실행, 이미지 저장 등)
│   │   └── refresh-token-storage         # 리프레시 토큰 EncryptedStorage 관리 모듈
│   ├── 📂 ui
│   │   ├── toast            # Toast 컴포넌트
│   │   ├── webview          # 웹뷰 컴포넌트 
│   └── 📂 utils             # 유틸리티 함수
└── 📂 widgets
    ├── 📂 bridge-webview    # 브릿지 웹뷰 컴포넌트
    └── 📂 loading-view      # 로딩 뷰 컴포넌트
```
