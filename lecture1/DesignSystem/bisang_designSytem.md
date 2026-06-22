# 비상교재 디자인 시스템

## 프로젝트 정보

- **출처 웹사이트**: 비상교재 (visang.com)
- **분석 날짜**: 2026-06-22
- **분석 기준**: 레퍼런스 스크린샷 (`lecture reference/비상교재.jpg`)
- **적용 스택**: React + Vite + MUI

---

## 1. 타이포그래피 시스템

### 1.1 폰트 크기 계층 (Font Scale)

| 레벨 | 용도 | fontSize | fontWeight | lineHeight |
|------|------|----------|------------|------------|
| Display | 히어로 메인 제목 (예: "공부의 힘! 완자 공부력") | 36–40px | 800 | 1.2 |
| H1 | 섹션 대제목 (예: "비상이 추천하는 초등 교재") | 26–28px | 700 | 1.3 |
| H2 | 카드 제목, 중간 헤딩 | 18–20px | 700 | 1.4 |
| H3 | 카드 서브 제목, 소제목 | 15–16px | 600 | 1.5 |
| Body1 | 본문, 설명 텍스트 | 14px | 400 | 1.6 |
| Body2 | 보조 설명, 날짜, 출판사 | 13px | 400 | 1.6 |
| Caption | 배지 레이블, 학년 태그 | 11–12px | 500 | 1.4 |

### 1.2 CSS 변수 정의

```css
:root {
  /* Font Size */
  --font-size-display: 2.5rem;    /* 40px */
  --font-size-h1: 1.75rem;        /* 28px */
  --font-size-h2: 1.25rem;        /* 20px */
  --font-size-h3: 1rem;           /* 16px */
  --font-size-body1: 0.875rem;    /* 14px */
  --font-size-body2: 0.8125rem;   /* 13px */
  --font-size-caption: 0.75rem;   /* 12px */

  /* Font Weight */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Height */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.6;
}
```

### 1.3 MUI Typography 설정

```js
typography: {
  fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
  h1: { fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 },
  h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4 },
  h4: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
  body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.6 },
  caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 },
},
```

---

## 2. 여백 / 간격 시스템 (Spacing Scale)

### 2.1 기본 단위

MUI 기본 spacing 단위(`1 = 8px`)를 기준으로 정의합니다.

| 토큰 | 값 (px) | MUI spacing | 용도 |
|------|---------|-------------|------|
| space-1 | 4px | 0.5 | 아이콘-텍스트 간격 |
| space-2 | 8px | 1 | 배지 내부 패딩, 인라인 요소 간격 |
| space-3 | 12px | 1.5 | 소형 버튼 패딩 |
| space-4 | 16px | 2 | 카드 내부 패딩(기본), 아이템 간격 |
| space-5 | 20px | 2.5 | 카드 간 gap |
| space-6 | 24px | 3 | 카드 내부 패딩(여유), 섹션 내 요소 간격 |
| space-8 | 32px | 4 | 섹션 제목과 콘텐츠 간격 |
| space-10 | 40px | 5 | 중간 섹션 여백 |
| space-12 | 48px | 6 | 섹션 상하 패딩(모바일) |
| space-16 | 64px | 8 | 섹션 상하 패딩(태블릿) |
| space-20 | 80px | 10 | 섹션 상하 패딩(데스크톱) |

### 2.2 섹션별 여백 기준

```
섹션 상하 패딩 (py):
  xs(모바일):   48px  → py: 6
  md(태블릿):   64px  → py: 8
  lg(데스크톱): 80px  → py: 10

섹션 제목 하단 마진 (mb):
  xs: 24px → mb: 3
  md: 40px → mb: 5

카드 내부 패딩 (p):
  기본 카드:   p: 2   (16px)
  교재 카드:   p: 2.5 (20px)
  뉴스 카드:   p: 3   (24px)

카드 그리드 gap:
  xs: 16px → gap: 2
  md: 20px → gap: 2.5
```

### 2.3 반응형 여백 패턴

```jsx
// 섹션 공통 래퍼 패턴
sx={{
  py: { xs: 6, md: 8, lg: 10 },
  px: { xs: 2, md: 3 },
}}

// 섹션 제목 하단 여백
sx={{ mb: { xs: 3, md: 5 } }}

// 카드 그리드 gap
sx={{ gap: { xs: 2, md: 2.5 } }}
```

---

## 3. 컴포넌트 스타일 가이드

### 3.1 버튼 (Button)

#### Pill 버튼 (주요 CTA)
- 형태: 완전한 원형 모서리 (pill shape)
- `border-radius`: 24px
- 패딩: `py: 1, px: 3` (8px 24px)
- 텍스트: 14px, font-weight: 700

```jsx
// Primary Pill Button
<Button
  variant='contained'
  sx={{
    borderRadius: '24px',
    py: 1,
    px: 3,
    fontSize: '0.875rem',
    fontWeight: 700,
    boxShadow: 'none',
    '&:hover': { boxShadow: 'none' },
  }}
>
  교재 보러가기
</Button>
```

#### 텍스트 링크 버튼 (더보기)
- 형태: 텍스트 + 화살표 아이콘
- 크기: 13–14px, font-weight: 500
- 색상: 브랜드 컬러 또는 텍스트 컬러

```jsx
<Button
  variant='text'
  endIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.7rem' }} />}
  sx={{ fontSize: '0.8125rem', fontWeight: 500, p: 0 }}
>
  더보기
</Button>
```

#### 아웃라인 버튼 (보조 액션)
- `border-radius`: 20px
- `border`: 1.5px solid
- 패딩: `py: 0.75, px: 2.5`

---

### 3.2 카드 (Card)

#### 교재 카드 (세로형)
- `border-radius`: 12px
- `box-shadow`: `0 2px 8px rgba(0,0,0,0.08)`
- 이미지 영역 상단, 텍스트 영역 하단 구조
- 이미지 `border-radius`: 8px (카드 상단)

```jsx
<Card
  sx={{
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.2s',
    '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.14)' },
    overflow: 'hidden',
  }}
>
```

#### 후기/리뷰 카드 (수평형)
- `border-radius`: 12px
- 배경: 파스텔 계열 (섹션마다 다양)
- 내부 패딩: `p: 2.5`

#### 뉴스/소식 카드
- 이미지 좌측, 텍스트 우측 배치
- `border-radius`: 10px
- `border`: `1px solid` 구분선

---

### 3.3 배지 / 태그 (Badge & Tag)

#### 과목/학년 배지
- 형태: pill shape (`border-radius`: 20px)
- 크기: `py: 0.25, px: 1` (2px 8px)
- 폰트: 11–12px, font-weight: 600

| 카테고리 | 스타일 예시 |
|----------|-------------|
| 초등 | 파스텔 계열 배경 |
| 중등 | 다른 색상 계열 배경 |
| 고등 | 진한 계열 배경 |
| 신간 | 강조색 배경 |

```jsx
<Chip
  label='초등'
  size='small'
  sx={{
    borderRadius: '20px',
    fontSize: '0.6875rem',
    fontWeight: 600,
    height: '22px',
  }}
/>
```

#### 섹션 제목 내 강조 드롭다운 태그
- 형태: 텍스트 + 언더라인 or 박스 형태
- 색상: 브랜드 강조색
- 용도: "비상이 추천하는 **초등 ∨** 교재" 처럼 선택 가능한 변수 표시

---

### 3.4 네비게이션 (Navigation)

#### 구조
- 상단 유틸리티 바 (로그인, 회원가입, 고객센터) — 높이: 약 36px
- 메인 네비게이션 바 (로고 + 메뉴 + 검색 + 아이콘) — 높이: 약 64px
- 총 헤더 높이: 약 100px

#### 스타일
```jsx
// AppBar
sx={{
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  height: { xs: '60px', md: '64px' },
}}

// 메뉴 아이템 (NavLink)
sx={{
  fontSize: '0.9375rem',
  fontWeight: 600,
  px: 1.5,
  py: 0.5,
  '&:hover': { color: 'primary.main' },
}}
```

---

## 4. 레이아웃 시스템

### 4.1 컨테이너 설정

| 화면 크기 | Container maxWidth | 좌우 패딩 |
|-----------|-------------------|-----------|
| xs (< 600px) | 100% | 16px (px: 2) |
| sm (600px~) | 100% | 24px (px: 3) |
| md (900px~) | 900px | 24px (px: 3) |
| lg (1200px~) | 1200px | 32px (px: 4) |
| xl (1536px~) | 1200px (고정) | 자동 |

```jsx
<Container maxWidth='lg' sx={{ px: { xs: 2, md: 3, lg: 4 } }}>
```

### 4.2 그리드 시스템

#### 교재 카드 그리드 (4열)
```jsx
<Grid container spacing={{ xs: 2, md: 2.5 }}>
  <Grid size={{ xs: 6, sm: 4, md: 3 }}>  {/* 4열 */}
    <BookCard />
  </Grid>
</Grid>
```

#### 뉴스/소식 그리드 (3열)
```jsx
<Grid container spacing={{ xs: 2, md: 3 }}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>  {/* 3열 */}
    <NewsCard />
  </Grid>
</Grid>
```

#### 후기 그리드 (2열)
```jsx
<Grid container spacing={{ xs: 2, md: 2.5 }}>
  <Grid size={{ xs: 12, md: 6 }}>  {/* 2열 */}
    <ReviewCard />
  </Grid>
</Grid>
```

### 4.3 섹션 패턴

#### 표준 섹션 구조
```
[섹션 래퍼]  py: { xs: 6, md: 8, lg: 10 }
  └── [컨테이너]  maxWidth: 'lg'
        ├── [섹션 헤더]  mb: { xs: 3, md: 5 }
        │     ├── 제목 (H1/H2)
        │     └── 더보기 버튼
        └── [콘텐츠 그리드]
              └── 카드 목록
```

#### 히어로 배너 섹션
```
[히어로]  width: 100%, height: { xs: '240px', md: '360px', lg: '480px' }
  ├── 좌측: 텍스트 영역 (제목, 설명, CTA 버튼)
  └── 우측: 이미지/일러스트 영역
```

#### 섹션 배경 패턴
- 흰 배경 섹션과 연한 배경 섹션이 교차 배치
- 배경 색상으로 시각적 구역 구분 (흰색 ↔ 연한 색상)

---

## 5. MUI 테마 적용 예시

```js
import { createTheme } from '@mui/material/styles';

const bisangTheme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 },
    h2: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 },
    h3: { fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.4 },
    h4: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.4 },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '24px',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.14)' },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontSize: '0.6875rem',
          fontWeight: 600,
          height: '22px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

export default bisangTheme;
```

---

## 6. 디자인 특징 요약

**전체 분위기**: 밝고 친근한 **교육 플랫폼** 스타일

| 특징 | 설명 |
|------|------|
| 레이아웃 | 카드 중심의 그리드 레이아웃, 섹션 간 배경 교차로 구역 구분 |
| 타이포그래피 | 굵은 섹션 제목 + 가벼운 본문으로 명확한 시각 계층 |
| 버튼 스타일 | Pill 형태(border-radius: 24px)의 둥근 버튼이 주를 이룸 |
| 카드 디자인 | 부드러운 모서리(12px) + 가벼운 그림자로 입체감 표현 |
| 여백 철학 | 섹션 간 넉넉한 여백(80px)으로 숨쉬는 레이아웃 구현 |
| 반응형 전략 | 4열(데스크톱) → 2열(모바일) 그리드 적응형 변환 |
| UX 패턴 | 슬라이더/캐러셀로 많은 콘텐츠를 공간 효율적으로 노출 |
