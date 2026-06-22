# 컬러 팔레트 디자인 시스템

## 프로젝트 정보
- **출처 웹사이트**: PiCKCARE (반려동물 AI 기반 반려생활 플랫폼)
- **분석 날짜**: 2026-06-22
- **적용 프로젝트**: 포트폴리오 웹사이트

---

## 메인 컬러 분석

| 역할 | 색상명 | Hex | 사용처 |
|------|--------|-----|--------|
| Primary | Vivid Blue | `#2563EB` | 브랜드 로고, 주요 버튼, 카드 배경 |
| Secondary | Light Sky Blue | `#DBEAFE` | 히어로 섹션 그라데이션 배경 |
| Accent | Deep Blue | `#1D4ED8` | CTA 버튼, 하이라이트 텍스트, 하단 섹션 배경 |

---

## CSS 변수 정의

```css
:root {
  /* Primary Colors */
  --color-primary: #2563EB;
  --color-primary-light: #BFDBFE;
  --color-primary-dark: #1D4ED8;

  /* Secondary Colors */
  --color-secondary: #EFF6FF;
  --color-accent: #1E90FF;

  /* Background Colors */
  --color-bg-primary: #FFFFFF;
  --color-bg-secondary: #EFF6FF;
  --color-bg-hero: #DBEAFE;

  /* Text Colors */
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;
  --color-text-muted: #94A3B8;

  /* Interactive Colors */
  --color-button-primary: #2563EB;
  --color-button-hover: #1D4ED8;
  --color-link: #3B82F6;
  --color-link-hover: #2563EB;

  /* Border Colors */
  --color-border-default: #E2E8F0;
  --color-border-active: #93C5FD;
}
```

---

## 전체 컬러 팔레트

### Background Colors
| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--color-bg-primary` | `#FFFFFF` | 페이지 기본 배경 |
| `--color-bg-secondary` | `#EFF6FF` | 히어로 및 섹션 배경 |
| `--color-bg-hero` | `#DBEAFE` | 상단 히어로 그라데이션 |

### Text Colors
| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--color-text-primary` | `#1E293B` | 메인 제목, 본문 |
| `--color-text-secondary` | `#64748B` | 서브 텍스트, 설명글 |
| `--color-text-muted` | `#94A3B8` | 비활성 텍스트, 플레이스홀더 |

### Border / Outline Colors
| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--color-border-default` | `#E2E8F0` | 카드 테두리, 구분선 |
| `--color-border-active` | `#93C5FD` | 활성 요소 테두리 |

### Interactive Colors
| 변수명 | Hex | 용도 |
|--------|-----|------|
| `--color-button-primary` | `#2563EB` | 주요 CTA 버튼 |
| `--color-button-hover` | `#1D4ED8` | 버튼 호버 상태 |
| `--color-link` | `#3B82F6` | 인라인 링크 |
| `--color-link-hover` | `#2563EB` | 링크 호버 상태 |
| `--color-accent` | `#1E90FF` | 하단 바로가기 버튼 등 강조 CTA |

---

## 컬러 사용 가이드

### Primary (`#2563EB`)
- 브랜드 아이덴티티의 핵심 색상
- 주요 버튼(CTA), 네비게이션 활성 상태, 아이콘 포인트에 사용
- 흰 배경 위에서만 단독 사용, 다크 배경에서는 `light` 계열과 조합

### Secondary / Background (`#EFF6FF`, `#DBEAFE`)
- 섹션 간 구분과 깊이감 연출에 사용
- 카드 내부 배경, 히어로 그라데이션의 시작점으로 활용
- 텍스트와 함께 사용 시 `--color-text-primary`와 조합

### Text Colors
- **제목**: `--color-text-primary` (`#1E293B`) — 높은 대비로 가독성 확보
- **본문/설명**: `--color-text-secondary` (`#64748B`) — 시각적 위계 구분
- **플레이스홀더/비활성**: `--color-text-muted` (`#94A3B8`) — 보조 정보

### Interactive Elements
- 버튼은 `--color-button-primary`를 기본으로, 호버 시 `--color-button-hover`로 전환
- 링크는 밑줄 없이 `--color-link` 색상만으로 구분하되, 호버 시 진한 색으로 피드백
- 포커스 상태에는 `--color-border-active`를 outline으로 사용 (접근성 확보)

### 컬러 사용 비율
| 색상 계열 | 비율 | 역할 |
|-----------|------|------|
| 화이트/라이트 블루 (`#FFFFFF`, `#EFF6FF`) | ~55% | 배경, 카드 내부 |
| 블루 계열 (`#2563EB`, `#1D4ED8`) | ~30% | 브랜드, 버튼, 섹션 배경 |
| 다크/그레이 (`#1E293B`, `#64748B`) | ~10% | 텍스트 |
| 연한 블루 (`#BFDBFE`, `#DBEAFE`) | ~5% | 그라데이션, 포인트 배경 |

---

## MUI 테마 적용 예시

```js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563EB',
      dark: '#1D4ED8',
      light: '#BFDBFE',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#EFF6FF',
      contrastText: '#1E293B',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#94A3B8',
    },
    background: {
      default: '#FFFFFF',
      paper: '#EFF6FF',
    },
    divider: '#E2E8F0',
  },
});

export default theme;
```

---

## 반응형 고려사항

### 다크모드 대응

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg-primary: #0F172A;
    --color-bg-secondary: #1E293B;
    --color-bg-hero: #1E3A8A;

    --color-text-primary: #F1F5F9;
    --color-text-secondary: #CBD5E1;
    --color-text-muted: #64748B;

    --color-border-default: #334155;
    --color-border-active: #3B82F6;

    /* 인터랙티브 요소는 명도를 높여 대비 확보 */
    --color-primary: #3B82F6;
    --color-primary-dark: #2563EB;
    --color-link: #60A5FA;
    --color-link-hover: #93C5FD;
  }
}
```

### 화면 크기별 고려사항

- **모바일 (xs ~ sm)**: 버튼과 인터랙티브 요소의 터치 영역 확보를 위해 배경 대비를 높임. `--color-bg-secondary`를 섹션 구분에 적극 활용.
- **태블릿 (md)**: 카드 레이아웃에서 `--color-border-default` 테두리를 사용해 콘텐츠 영역 구분.
- **데스크톱 (lg ~ xl)**: 히어로 섹션 그라데이션(`#DBEAFE → #EFF6FF → #FFFFFF`)을 넓은 화면에 적용해 깊이감 연출.

### 접근성 (WCAG AA 기준)

| 조합 | 대비율 | 기준 충족 |
|------|--------|-----------|
| `#2563EB` (버튼) + `#FFFFFF` (텍스트) | 4.6:1 | AA 충족 |
| `#1E293B` (본문) + `#FFFFFF` (배경) | 15.3:1 | AAA 충족 |
| `#64748B` (서브텍스트) + `#FFFFFF` (배경) | 4.5:1 | AA 충족 |
| `#FFFFFF` (텍스트) + `#1D4ED8` (다크버튼) | 7.2:1 | AAA 충족 |

---

## 디자인 특징 요약

**전체 분위기**: 클린하고 신뢰감 있는 **모노크로매틱 블루 테마**

- **신뢰 & 전문성**: 블루 중심 팔레트는 의료·헬스케어 계열 서비스의 신뢰감 연출
- **밝고 친근한 느낌**: 진한 블루와 화이트의 높은 대비로 가독성 확보, 3D 캐릭터와 어우러져 친근함 강조
- **미니멀 그라데이션**: `#BFDBFE → #EFF6FF → #FFFFFF` 부드러운 전환으로 깊이감 연출
- **CTA 집중화**: 버튼과 강조 요소에만 진한 블루(`#1D4ED8`)를 사용해 시선 유도 명확
