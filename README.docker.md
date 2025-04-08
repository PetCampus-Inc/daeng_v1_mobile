# 🐳 React Native 개발 환경 (Docker 기반)

## ✅ 시작 방법

```bash
git clone https://github.com/PetCampus-Inc/daeng_v1_mobile
cd daeng_v1_mobile

docker-compose up --build
```

# 앱 빌드는 로컬에서, Metro는 생략

```bash
npx react-native run-android --no-packager
```

# 유의사항

- docker에서 metro 서버가 실행된다 하더라도 로컬에서도 pnpm install을 필수적으로 해야함

# 기존 컨테이너 종료 및 삭제할 경우

```bash
docker-compose down
```

# 컨테이너 재사용 시 docker-compose 명령 다시 사용할 필요 X

- docker container로 재생/일시정지 버튼으로 간편하게 서버 켜고 끄기 가능
