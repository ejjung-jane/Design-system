# Design System

React + Storybook 기반 UI 디자인 시스템입니다.  
Design Tokens를 중심으로 일관된 UI 컴포넌트와 명확한 사용 규칙을 제공합니다.

---

## ✨ Features

- Design Tokens 기반 스타일 관리 (CSS Variables)
- Light / Dark Theme 지원
- Storybook 기반 컴포넌트 문서화
- FormField 패턴으로 폼 UX 일관성 유지
- 접근성(a11y)을 고려한 기본 구조
- 재사용 가능한 Pattern 컴포넌트 제공

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

- 모든 디자인 토큰은 CSS Variables로 관리
- 컴포넌트 스타일에서 하드코딩 금지
- UI 상태(hover / active / focus / error)는 토큰으로만 제어
- 테마 변경은 컴포넌트 수정 없이 토큰만으로 처리

### 토큰 구조

    src/styles/
      global.css
      tokens.css
      tokens/
        color.css
        typography.css
        spacing.css
        focus.css
        themes.css

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

- 기본 / hover / focus / active / disabled 상태
- error / validation 상태
- 다크모드 전환 시 UI 변화

Storybook은 단순 미리보기가 아닌 공식 사용 가이드입니다.

---

## 🧩 Components

### Button

- variant / size / disabled
- 토큰 기반 hover / active 상태
- Primary / Secondary / Ghost 패턴

---

### Input

- size (sm / md / lg)
- disabled / invalid
- prefix / suffix
- clearable (옵션)

---

### Select

- 커스텀 드롭다운 UI
- 키보드 접근성 지원
- disabled / invalid / size
- searchable Select 지원
- controlled / uncontrolled 사용 가능

---

### Modal

- 기본 Modal 레이아웃 제공
- overlay 클릭 / ESC 닫기
- footer 확장 가능
- 공통 Dialog 패턴 제공

---

## 🧩 Form Pattern Components

### FormField (공통 래퍼)

모든 Form 요소의 레이블 / 에러 / 헬퍼 / 레이아웃을 관리하는 핵심 컴포넌트입니다.

- label / requiredMark
- helperText / errorText
- vertical / horizontal layout
- a11y(id, aria-describedby) 처리

---

### TextField (권장)

FormField + Input 조합

    <TextField
      label="Email"
      placeholder="you@example.com"
      helperText="회사 이메일을 입력하세요."
    />

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

- Input / Select 단독 사용 지양
- TextField / SelectField 사용 권장
- 라벨 / 에러 / 헬퍼는 FormField 레벨에서만 관리
- 상태 표현은 토큰 기반으로 통일

### 이유

- UX 일관성 유지
- 접근성(a11y) 확보
- 유지보수 및 확장성 향상

---

## 👥 For Contributors

### 새 컴포넌트 추가 시

- Storybook 스토리 필수
- 디자인 토큰 사용
- 하드코딩 스타일 금지
- Basic 컴포넌트 vs Pattern 컴포넌트 구분

### 수정 흐름

1. 토큰 변경
2. Storybook에서 상태 확인
3. 컴포넌트 적용

---

## 📈 Status

### Completed

- Design Tokens + Dark mode
- Button / Input
- Select / SelectField
- FormField / TextField 패턴
- Modal 컴포넌트
- Storybook 문서화

### Next

- Select 검색 UX 고도화
- Form 예제 스토리 (Login / Filter Form)
- Button / Modal 상태 확장
- Design Token 정리 및 Figma 연계

---

## 📄 License

Internal / Personal Use

---

### Summary

This design system provides a single source of truth for  
UI standards, reusable components, and documented usage patterns.
