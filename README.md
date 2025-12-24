# Design System

React + Storybook 기반 UI 디자인 시스템  
디자인 토큰을 중심으로 일관된 UI 컴포넌트와 문서화된 사용 가이드를 제공

---

## ✨ Features

- Design Tokens 기반 스타일 관리 (CSS Variables)
- Light / Dark Theme 지원
- Storybook 문서화 및 테스트 환경
- FormField 패턴으로 폼 UX 일관성 유지
- 접근성(a11y)을 고려한 기본 구조

---

## 🛠 Tech Stack

- React + Vite + TypeScript
- CSS Modules
- Storybook
- Git / GitHub

---

## 🚀 Getting Started

### Install

    npm install

### Run Dev Server

    npm run dev

- http://localhost:5173

### Run Storybook

    npm run storybook

- http://localhost:6006  
- 컴포넌트 문서 / 상태 테스트 / 테마 전환 가능

---

## 🎨 Design Tokens

### 관리 원칙

- 모든 디자인 토큰은 `src/styles/global.css`에서 관리
- 컴포넌트 스타일에서 하드코딩 금지
- 테마 변경은 토큰으로만 처리

### Theme 구조

    :root {
      /* Light theme tokens */
    }

    :root[data-theme="dark"],
    [data-theme="dark"] {
      /* Dark theme overrides */
    }

---

## 📘 Storybook Usage

### Toolbar

- Theme: Light / Dark 전환
- Controls: props 실시간 변경
- Docs: 컴포넌트 API 및 설명

### 확인 포인트

- 기본 / hover / focus / disabled 상태
- error / validation 상태
- 다크모드 전환 시 UI 변화

---

## 🧩 Components

### Button

- variant / size / disabled
- 토큰 기반 스타일

---

### Input

- size (sm / md / lg)
- disabled / invalid
- prefix / suffix
- clearable (X 버튼)

---

### FormField (공통 래퍼)

- label / helper / error 처리
- vertical / horizontal layout
- 모든 폼 컴포넌트의 공통 규칙 담당

---

### TextField (권장)

FormField + Input 조합

    <TextField
      label="Email"
      placeholder="you@example.com"
      helperText="회사 이메일을 입력하세요."
    />

---

### Select

- 커스텀 드롭다운 UI
- 키보드 접근성 지원
- disabled / invalid / size
- prefix / suffix 지원

---

### SelectField (권장)

FormField + Select 조합

    <SelectField
      label="Fruit"
      options={options}
      placeholder="Select one"
      helperText="하나를 선택하세요."
    />

---

## ✅ Usage Rules (Important)

### 기본 규칙

- Input, Select 단독 사용 지양
- TextField, SelectField 사용 권장
- 라벨 / 에러 / 헬퍼는 Field 레벨에서만 관리

### 이유

- UX 일관성
- 접근성(a11y) 확보
- 유지보수 단순화

---

## 👥 For Contributors

### 새 컴포넌트 추가 시

- Storybook 스토리 필수
- 디자인 토큰 사용
- 하드코딩 스타일 금지

### 수정 흐름

1. 토큰 변경
2. Storybook에서 상태 확인
3. 컴포넌트 적용

---

## 📈 Status

### Completed

- Design Tokens + Dark mode
- Button / Input / TextField
- Select / SelectField
- FormField 패턴
- Storybook 문서화

### Next

- Searchable Select
- Select 옵션 필터 UX
- Form 패턴 문서 고도화

---

## 📄 License

Internal / Personal Use

---

### Summary

This design system provides a single source of truth for  
UI standards, components, and documentation.
