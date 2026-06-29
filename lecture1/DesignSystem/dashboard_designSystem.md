# 대시보드 디자인 시스템

## 프로젝트 정보

- **출처**: 피트니스/건강 관리 대시보드 UI 레퍼런스
- **분석 날짜**: 2026-06-29
- **분석 기준**: 레퍼런스 스크린샷 (`lecture reference/대시보드레퍼런스.jpg`)
- **적용 스택**: React + Vite + MUI

---

## 1. 타이포그래피 시스템

### 1.1 폰트 크기 계층 (Font Scale)

| 레벨 | 용도 | fontSize | fontWeight | lineHeight |
|------|------|----------|------------|------------|
| Display | 히어로 메인 제목 (예: "Your suggestions for today") | 32–36px | 800 | 1.2 |
| H1 | 페이지 제목 (예: "Dashboard") | 22–24px | 700 | 1.3 |
| H2 | 카드 제목 (예: "Morning routine") | 15–16px | 700 | 1.4 |
| H3 | 카드 서브 제목, 설명 레이블 | 13–14px | 600 | 1.5 |
| SectionLabel | 섹션 구분 레이블 (예: "QUICK ACTIONS") | 11–12px | 600 | 1.4 |
| Body1 | 본문, 설명 텍스트 | 14px | 400 | 1.6 |
| Body2 | 보조 설명 (나이, 위치 등) | 12–13px | 400 | 1.6 |
| Caption | 배지, 태그 텍스트 | 10–11px | 500 | 1.4 |
| Stat | 통계 수치 강조 (예: "84°", "85") | 28–32px | 700 | 1.0 |

### 1.2 CSS 변수 정의

```css
:root {
  /* Font Size */
  --font-size-display: 2.25rem;   /* 36px */
  --font-size-h1: 1.5rem;         /* 24px */
  --font-size-h2: 1rem;           /* 16px */
  --font-size-h3: 0.875rem;       /* 14px */
  --font-size-label: 0.75rem;     /* 12px */
  --font-size-body1: 0.875rem;    /* 14px */
  --font-size-body2: 0.8125rem;   /* 13px */
  --font-size-caption: 0.6875rem; /* 11px */
  --font-size-stat: 2rem;         /* 32px */

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

### 1.3 섹션 레이블 특징
- 대문자(uppercase) + 자간 넓음(letter-spacing: 0.08–0.1em)
- 용도: "QUICK ACTIONS", "CIRCLE ACTIVITY", "TODAY RESULTS"

```jsx
// 섹션 레이블 스타일
sx={{
  fontSize: '0.75rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  mb: 2,
}}
```

### 1.4 MUI Typography 설정

```js
typography: {
  fontFamily: '"Inter", "Noto Sans KR", sans-serif',
  h1: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
  h2: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 },
  h3: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
  body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
  body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.6 },
  caption: { fontSize: '0.6875rem', fontWeight: 500, lineHeight: 1.4 },
},
```

---

## 2. 여백 / 간격 시스템 (Spacing Scale)

### 2.1 기본 단위

MUI 기본 spacing 단위(`1 = 8px`)를 기준으로 정의합니다.

| 토큰 | 값 (px) | MUI spacing | 용도 |
|------|---------|-------------|------|
| space-1 | 4px | 0.5 | 배지 내부 패딩, 아이콘-텍스트 간격 |
| space-2 | 8px | 1 | 소형 컴포넌트 내부 간격 |
| space-3 | 12px | 1.5 | 리스트 아이템 간격, 퀵 액션 버튼 간격 |
| space-4 | 16px | 2 | 카드 내부 패딩(기본), 섹션 내 요소 간격 |
| space-5 | 20px | 2.5 | 카드 내부 패딩(여유) |
| space-6 | 24px | 3 | 카드 내부 패딩(넉넉), 섹션 레이블 하단 여백 |
| space-8 | 32px | 4 | 섹션 간 여백, 히어로 텍스트 하단 여백 |
| space-10 | 40px | 5 | 사이드바 메뉴 영역 상하 패딩 |
| space-12 | 48px | 6 | 전체 레이아웃 상하 패딩 |

### 2.2 레이아웃별 여백 기준

```
사이드바 너비:
  고정: 200–220px (flex-shrink: 0)

카드 내부 패딩 (p):
  Quick Action 버튼:  p: 1.5  (12px)
  운동/루틴 카드:     p: 2    (16px)
  통계/차트 영역:     p: 2.5  (20px)
  메인 콘텐츠 카드:   p: 3    (24px)

컴포넌트 간 gap:
  Quick Action 버튼 그리드:  gap: 1.5  (12px)
  운동 카드 목록:            gap: 2    (16px)
  리스트 아이템 간격:        mb: 2.5   (20px)

섹션 간 여백:
  메인 콘텐츠 섹션 간:  mb: 4  (32px)
  섹션 레이블 하단:     mb: 2  (16px)
```

### 2.3 반응형 여백 패턴

```jsx
// 전체 대시보드 래퍼
sx={{
  display: 'flex',
  minHeight: '100vh',
  p: { xs: 1, md: 2 },
  gap: { xs: 0, md: 2 },
}}

// 카드 공통 패딩
sx={{ p: { xs: 2, md: 2.5, lg: 3 } }}

// 섹션 간 여백
sx={{ mb: { xs: 3, md: 4 } }}
```

---

## 3. 컴포넌트 스타일 가이드

### 3.1 버튼 (Button)

#### Pill CTA 버튼 (주요 액션)
- 형태: 완전한 원형 모서리 (pill shape)
- `border-radius`: 24px
- 패딩: `py: 1.5, px: 3` (12px 24px)
- 아이콘 + 텍스트 조합

```jsx
<Button
  variant='contained'
  startIcon={<PlayCircleIcon />}
  sx={{
    borderRadius: '24px',
    py: 1.5,
    px: 3,
    fontSize: '0.9375rem',
    fontWeight: 700,
  }}
>
  Get started
</Button>
```

#### 더보기 버튼 (More)
- 형태: 소형 pill 버튼
- `border-radius`: 20px
- 패딩: `py: 0.75, px: 2`

---

### 3.2 카드 (Card)

#### 메인 콘텐츠 카드
- `border-radius`: 16–20px
- 내부 패딩: `p: 3` (24px)

```jsx
<Card
  sx={{
    borderRadius: '20px',
    p: 3,
  }}
/>
```

#### 운동/루틴 카드
- `border-radius`: 16px
- 이미지 영역 + 텍스트 영역 조합
- 시간 표시 (`21 m`, `15 m`) 하단 고정
- 최소 높이: `minHeight: '180px'`

```jsx
<Card
  sx={{
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    minHeight: '180px',
  }}
/>
```

#### 하이라이트 카드
- `border-radius`: 16px
- 이미지가 카드 밖으로 넘치는 스타일 (`overflow: visible`)

---

### 3.3 Quick Action 버튼 카드

- 형태: 정사각형에 가까운 카드
- `border-radius`: 12px
- 구성: 아이콘(36×36px) + 레이블 텍스트 하단

```jsx
<Paper
  sx={{
    borderRadius: '12px',
    p: 1.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1,
    cursor: 'pointer',
    transition: 'transform 0.15s',
    '&:hover': { transform: 'translateY(-2px)' },
  }}
>
  <Box sx={{ width: 36, height: 36 }}>{/* 아이콘 */}</Box>
  <Typography variant='caption'>Heart rate</Typography>
</Paper>
```

---

### 3.4 배지 / 태그 (Badge & Tag)

#### 관계 배지 (Friends, Family 등)
- 형태: pill shape (`border-radius`: 20px)
- 크기: `py: 0.25, px: 1` (2px 8px)
- 폰트: 10–11px, font-weight: 600
- 높이: 20px

```jsx
<Chip
  label='Friends'
  size='small'
  sx={{
    borderRadius: '20px',
    fontSize: '0.6875rem',
    fontWeight: 600,
    height: '20px',
  }}
/>
```

#### 유저 등급 배지 (Top user)
- 형태: pill shape
- 폰트: 11px, font-weight: 600

---

### 3.5 사이드바 네비게이션

#### 구조
- 고정 너비: 200–220px
- 상단: 로고 영역
- 중간: 사용자 프로필 (아바타 + 이름 + 등급 배지)
- 메인: 메뉴 리스트
- 하단: 부가 메뉴 (Additional, Settings)

#### 메뉴 아이템 스타일
- 기본: 14px, font-weight 500
- 활성: font-weight 700
- 호버: 텍스트 진해짐

```jsx
// 사이드바 래퍼
sx={{
  width: '210px',
  minHeight: '100vh',
  p: 3,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px 0 0 20px',
}}

// 메뉴 아이템
sx={{
  fontSize: '0.9375rem',
  fontWeight: isActive ? 700 : 500,
  py: 1.5,
  px: 1,
  borderRadius: '8px',
  cursor: 'pointer',
}}
```

---

### 3.6 통계 수치 표시 (Stat Display)

```jsx
<Box>
  <Typography sx={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>
    84°
  </Typography>
  <Typography variant='caption'>
    Your points
  </Typography>
</Box>
```

---

## 4. 레이아웃 시스템

### 4.1 전체 페이지 구조

```
[대시보드 래퍼]  display: flex, minHeight: 100vh
  ├── [사이드바]  width: 210px, flex-shrink: 0
  │     ├── 로고
  │     ├── 사용자 프로필
  │     ├── 메뉴 리스트 (Dashboard, Trainings, Health, Circles, Friends)
  │     └── 하단 메뉴 (Additional, Settings)
  │
  └── [메인 콘텐츠]  flex: 1, overflow: auto
        ├── [상단 헤더]  페이지 제목 + 알림 아이콘 + 사용자 아바타 그룹
        ├── [히어로 섹션]  제목 + 설명 + CTA 버튼
        ├── [Quick Actions]  4열 그리드
        ├── [주간 활동 차트]  바 차트 + 수치 요약
        ├── [운동 카드 목록]  수평 스크롤 또는 3열 그리드
        ├── [Circle Activity]  사용자 리스트 + 도넛 진행률
        └── [Today Results]  버블/도넛 차트 + 범례
```

### 4.2 그리드 시스템

#### Quick Actions 그리드 (4열 고정)
```jsx
<Grid container spacing={1.5}>
  {actions.map((action) => (
    <Grid size={{ xs: 6, sm: 3 }} key={action.id}>
      <QuickActionCard {...action} />
    </Grid>
  ))}
</Grid>
```

#### 운동 카드 그리드 (3열)
```jsx
<Grid container spacing={2}>
  <Grid size={{ xs: 12, sm: 6, md: 4 }}>
    <WorkoutCard />
  </Grid>
</Grid>
```

#### 메인 콘텐츠 2단 분할
```jsx
<Grid container spacing={3}>
  <Grid size={{ xs: 12, md: 7 }}>  {/* 좌측 메인 */}
    <HeroSection />
    <QuickActions />
    <CircleActivity />
  </Grid>
  <Grid size={{ xs: 12, md: 5 }}>  {/* 우측 사이드 */}
    <WeeklyChart />
    <WorkoutCards />
    <TodayResults />
  </Grid>
</Grid>
```

### 4.3 컨테이너 설정

| 영역 | 설정값 | 비고 |
|------|--------|------|
| 전체 대시보드 | `width: 100%, maxWidth: '1200px'` | 고정 너비 대시보드 |
| 사이드바 | `width: '210px'` | 고정, flex-shrink: 0 |
| 메인 콘텐츠 | `flex: 1, p: 3` | 유동 너비 |
| 카드 내부 패딩 | `p: 2.5–3` | 콘텐츠 종류별 차등 |

### 4.4 상단 헤더 패턴

```
[헤더]  display: flex, justifyContent: space-between, mb: 4
  ├── [좌측] 페이지 제목 (h1)
  └── [우측] 알림 아이콘 그룹 + 아바타 그룹 (+버튼)
```

```jsx
<AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
  <Avatar src='/user1.jpg' />
  <Avatar src='/user2.jpg' />
</AvatarGroup>
<Avatar sx={{ width: 32, height: 32, fontSize: '1rem' }}>+</Avatar>
```

---

## 5. MUI 테마 적용 예시

```js
import { createTheme } from '@mui/material/styles';

const dashboardTheme = createTheme({
  typography: {
    fontFamily: '"Inter", "Noto Sans KR", sans-serif',
    h1: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
    h2: { fontSize: '1rem', fontWeight: 700, lineHeight: 1.4 },
    h3: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
    body1: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.6 },
    body2: { fontSize: '0.8125rem', fontWeight: 400, lineHeight: 1.6 },
    caption: { fontSize: '0.6875rem', fontWeight: 500, lineHeight: 1.4 },
  },
  spacing: 8,
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 700,
          borderRadius: '24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          fontSize: '0.6875rem',
          fontWeight: 600,
          height: '20px',
        },
      },
    },
  },
});

export default dashboardTheme;
```

---

## 6. 디자인 특징 요약

**전체 분위기**: 밝고 모던한 **헬스케어 / 피트니스 대시보드** 스타일

| 특징 | 설명 |
|------|------|
| 레이아웃 | 좌측 사이드바(210px 고정) + 우측 메인 콘텐츠의 2단 분할 구조 |
| 카드 디자인 | 큰 border-radius(16–20px)로 부드럽고 현대적인 형태 |
| 버튼 스타일 | Pill 형태(border-radius: 24px)의 둥근 CTA 버튼 |
| 타이포그래피 | 섹션 레이블 uppercase + 넓은 자간(0.08em)으로 정보 계층 명확히 구분 |
| 여백 철학 | 카드 내 넉넉한 패딩(20–24px)으로 정보 밀집도 낮춰 가독성 확보 |
| 그리드 전략 | 섹션별 4열/3열/2단 그리드 전환으로 콘텐츠 성격에 맞는 밀도 조정 |
