# Premium Site Starter

Claude Code로 프리미엄 웹사이트를 만들기 위한 스타터 저장소입니다.
**CLAUDE.md(빌드 규칙) + 디자인 스킬 6종**이 이미 들어있어서, 이 저장소로 세션을 열면 별도 설치 없이 바로 작업할 수 있습니다.

## 사용법

### 웹 (claude.ai/code) — 설치 필요 없음
1. 이 저장소를 본인 계정으로 복사 (GitHub에서 `Use this template` 또는 Fork)
2. claude.ai/code 에서 이 저장소를 선택해 새 세션 시작
3. 바로 요청: "포트폴리오 사이트 만들어줘"

### 로컬 (Claude Code 앱/CLI)
1. `git clone` 또는 ZIP 다운로드
2. 폴더에서 Claude Code 실행 — 끝

## 들어있는 것

```
├── CLAUDE.md              ← 프리미엄 사이트 빌드 규칙 (스택/히어로/모션/타이포/컬러)
└── .claude/skills/        ← 프로젝트 스킬 (자동 인식)
    ├── 3d-scroll-website      3D 스크롤 사이트 전체 파이프라인
    ├── find-skills            스킬 검색 도우미
    ├── frontend-design        의도적인 비주얼 디자인 가이드
    ├── remotion-best-practices  React 영상 제작
    ├── theme-factory          프리셋 테마 10종
    └── webapp-testing         Playwright 브라우저 테스트
```

## 포트폴리오 사이트 실행하기

이 저장소에는 `CLAUDE.md` 규칙에 따라 생성된 Next.js 포트폴리오 사이트(`app/`, `components/`)가 포함되어 있습니다.

```bash
npm install
npm run dev      # http://localhost:3000
```

배포는 `npm run build` 후 Vercel에 연결하면 됩니다. 이름, 문구, 프로젝트 목록(`components/work.tsx`)은 실제 내용으로 교체해서 사용하세요.

## 추가 설치 (선택)

- **ui-ux-pro-max 플러그인** (팔레트 161종, 폰트 페어링 57종):
  Claude Code 대화창에 `/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill` 입력 후 `/plugin` 메뉴에서 설치
- **커넥터**: claude.ai 설정 → 커넥터에서 Figma, Adobe Express, lazyweb 연결

---
`.claude/skills/frontend-design`, `theme-factory`, `webapp-testing` 출처: https://github.com/anthropics/skills (각 폴더 LICENSE.txt 참조)
