# docker/Dockerfile
FROM ubuntu:20.04

ENV DEBIAN_FRONTEND=noninteractive

# 기본 패키지 설치
RUN apt-get update && apt-get install -y \
    curl git unzip zip wget openjdk-17-jdk \
    python3 python3-pip build-essential \
    libgl1-mesa-dev libglu1-mesa \
    watchman xz-utils \
    && apt-get clean

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g n && \
    n 20.12.1 && \
    npm uninstall -g n

RUN npm install -g pnpm

WORKDIR /app
