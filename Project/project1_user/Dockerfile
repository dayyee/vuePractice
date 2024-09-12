# 1. Node.js v20.16.0을 베이스 이미지로 사용
FROM node:20.16.0 AS build-stage

# 2. 컨테이너 내 작업 디렉토리 생성 및 설정
WORKDIR /app

# 3. package.json과 package-lock.json을 컨테이너에 복사
COPY package*.json ./

# 4. npm을 사용해 의존성 설치
RUN npm install

# 5. 애플리케이션 소스 코드를 컨테이너에 복사
COPY . .

# 6. vue.config.js 설정을 기반으로 Vue.js 애플리케이션을 빌드
RUN npm run build

# 7. Nginx를 사용하여 빌드된 정적 파일을 서빙 (프로덕션 환경)
FROM nginx:alpine AS production-stage

# 8. Nginx 기본 설정 덮어쓰기 (필요시 커스텀 Nginx 설정 가능)
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 9. Nginx에서 포트 80을 열어 외부 트래픽을 허용
EXPOSE 80

# 10. Nginx를 실행하여 정적 파일을 서빙
CMD ["nginx", "-g", "daemon off;"]
