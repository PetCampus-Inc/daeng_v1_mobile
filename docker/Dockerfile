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

# Node.js 18.x 설치
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs

# pnpm 설치
RUN npm install -g pnpm

# Android SDK 설치
ENV ANDROID_SDK_ROOT=/opt/android-sdk
RUN mkdir -p $ANDROID_SDK_ROOT/cmdline-tools

# 명령어 도구 설치 후 디렉토리 정리
RUN wget https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O sdk.zip && \
    unzip sdk.zip -d $ANDROID_SDK_ROOT/cmdline-tools/tmp && \
    mv $ANDROID_SDK_ROOT/cmdline-tools/tmp/cmdline-tools $ANDROID_SDK_ROOT/cmdline-tools/latest && \
    rm -rf sdk.zip

ENV PATH=$PATH:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools

# SDK 구성
RUN yes | sdkmanager --licenses && \
    sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"

WORKDIR /app
