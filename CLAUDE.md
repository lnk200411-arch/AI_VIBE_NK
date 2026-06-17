# AI_VIBE_NK 프로젝트 가이드

## 이름 설정

이 Claude 인스턴스의 이름은 **춘식이**입니다.
한국어로 대답합니다.

## 프로젝트 구조

```
AI_VIBE_NK/
├── gh-cli/           # gh CLI 스킬 정의
├── lecture1/         # 강의 1 프로젝트 (React + Vite + MUI)
└── CLAUDE.md         # 이 파일
```

## GitHub 리포지터리

- **원격 저장소**: https://github.com/lnk200411-arch/AI_VIBE_NK
- **기본 브랜치**: main
- **모든 GitHub 작업은 gh CLI 스킬로 수행** (`gh-cli/SKILL.md` 참조)

## 작업 완료 후 GitHub 업로드 규칙 [필수]

**모든 작업이 끝난 후 반드시 아래 순서대로 변경사항을 GitHub에 업로드해야 합니다.**

### 사전 조건 확인

```bash
# 1. git 초기화 여부 확인 (최초 1회)
git status

# 2. 원격 저장소 연결 확인
git remote -v
```

### 최초 설정 (git init이 안 되어 있을 경우)

```bash
git init
git branch -M main
git remote add origin https://github.com/lnk200411-arch/AI_VIBE_NK.git
```

### 작업 완료 후 표준 업로드 절차

```bash
# 1. 변경된 파일 확인
git status

# 2. 변경사항 스테이징 (민감 파일 제외)
git add .

# 3. 커밋 메시지 작성 (작업 내용 간결하게)
git commit -m "{작업 내용 요약}"

# 4. GitHub에 푸시
git push -u origin main
# 이후부터는: git push
```

### 업로드 시 주의사항

- `.env` 파일은 절대 업로드 금지 (`.gitignore`에 포함 필수)
- `node_modules/` 폴더는 업로드 금지 (`.gitignore`에 포함 필수)
- 커밋 메시지는 **한국어**로 작성
- 인증 문제 발생 시: `gh auth status` → `gh auth login` (OAuth 방식만)

### 커밋 메시지 예시

```
lecture1: MUI 버튼 컴포넌트 추가
gh-cli: 스킬 레퍼런스 문서 업데이트
CLAUDE.md: 루트 가이드 파일 생성
```

### .gitignore 필수 항목

루트에 `.gitignore`가 없다면 생성합니다:

```gitignore
node_modules/
.env
.env.local
.env.*.local
dist/
build/
*.log
.DS_Store
Thumbs.db
```

## 하위 프로젝트 가이드

- **lecture1**: `lecture1/CLAUDE.md` 참조 (React 개발, 담당 AI: 로키)

## 금지 사항

- Personal Access Token 직접 발급 금지 (`gh auth login` OAuth 방식만)
- 작업 완료 후 GitHub 업로드 누락 금지
- 민감 정보(API 키, 토큰, 비밀번호) GitHub 업로드 금지
