# CLAUDE.md — Premium Site Project

> Drop this file into the root of any Claude Code project. It tells Claude how to build websites that feel premium instead of generic.
>
> No setup needed. Claude reads it automatically every time you open the project.

---

## What this project builds

Modern, motion-driven websites with a premium agency feel. Think editorial typography, scroll-triggered animations, video-first heroes, restraint over decoration.

The output should look like a $2k+ client site, not a template.

## Default stack

- **Next.js (App Router)** for new projects, plain HTML+CSS+JS for one-pagers
- **Tailwind CSS** for styling
- **Motion** library for all animations (`npm install motion`)
- **TypeScript** when the project has more than 3 files
- **Vercel** for deployment

If the user explicitly asks for a different stack, follow them. Otherwise default to the above.

## Skills to use proactively

When relevant, use these skills (already documented in the public Claude marketplace):

- `frontend-design` for production-grade UI components
- `ui-ux-pro-max` for visual style decisions, palette generation, and product-type-specific patterns
- `theme-factory` when the user wants a quick-start theme
- `webapp-testing` to verify the site works in a real browser before declaring it done

If a skill isn't installed, suggest the user install it. Don't refuse to do the task without it.

## Hero section guidelines

The hero is the first 100% of the viewport. It carries the entire feel of the site. Treat it accordingly.

**Default approach for hero:**

1. Use a video background (looped, muted, autoplay) when one is provided
2. If no video, use an animated gradient or a single high-quality image with subtle motion
3. Always add a 25-35% dark overlay between the background and the foreground text for readability
4. Headline should be 5 to 9 words max, large display font, tight letter spacing
5. One CTA button only, never two competing ones

**Video hero pattern (preferred):**

```jsx
<section className="relative h-screen overflow-hidden">
  <video
    autoPlay loop muted playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/hero.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 flex h-full items-center justify-center">
    {/* headline + CTA */}
  </div>
</section>
```

If the user supplies a `.gif` instead of `.mp4`, use a `<picture>` or `<img>` tag and apply the same overlay.

## Motion guidelines

Use the **Motion** library (modern successor to Framer Motion). Import as `import { motion } from "motion/react"`.

**Default scroll-triggered fade-in for sections:**

```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.7, ease: "easeOut" }}
>
  {/* section content */}
</motion.div>
```

**Rules for motion:**

- Subtle over loud. 24px translation max, 0.6-0.8s duration
- Always `viewport={{ once: true }}` so animations don't replay on scroll-back
- Add `prefers-reduced-motion` fallback (motion library handles this if you set the global option)
- Never animate layout properties on hover (use `transform` and `opacity` only, for performance)

**Patterns to reach for:**

- Slow camera push-in on hero video (handled in the video file itself, not in CSS)
- Letter-by-letter or word-by-word headline reveal on first paint (use the `motion` `whileInView` with `staggerChildren`)
- Parallax on hero background image (use `useScroll` + `useTransform`)
- Cursor follower for premium feel (small accent dot or blur, not loud)

## Typography

Default to one of these pairings (choose based on brand vibe, ask the user if unsure):

| Vibe | Heading font | Body font |
|---|---|---|
| Modern tech | Geist | Inter |
| Editorial | GT Sectra / Tiempos | Söhne |
| Vintage / heritage | GT America Extended | Söhne |
| Minimalist Swiss | Helvetica Now | Inter |
| Playful brand | Migra / Migra Italic | Inter |

Always load fonts via `next/font` if Next.js, or via the official font CDN if vanilla. Never load 6 weights when 2 will do (it slows the page).

**Default sizes:**

- Display headline: 72-96px on desktop, 40-48px mobile
- Section heading: 40-56px desktop, 28-32px mobile
- Body: 16-18px desktop, 16px mobile, line-height 1.55-1.65

## Color palette

If the user doesn't specify, default to a **dark mode premium palette**:

- Background: `#0A0A0F` (near-black, never pure black)
- Surface: `#13131A`
- Text primary: `#F5F5F0` (warm white)
- Text muted: `#9C9CA8`
- Accent: pick ONE saturated accent based on brand (cyan, magenta, lime, amber). Never two competing accents.

For light mode premium:

- Background: `#F8F7F4` (warm off-white, never pure white)
- Surface: `#FFFFFF`
- Text primary: `#0A0A0F`
- Text muted: `#5A5A66`

## Components

Prefer importing components over building from scratch. Default registries:

- **21st.dev** ([21st.dev](https://21st.dev)) for premium React/Tailwind components
- **Magic UI** ([magicui.design](https://magicui.design)) for free motion-first accents (animated counters, marquees, aurora backgrounds)

Workflow when the user asks for a form, a marquee, a footer, a pricing table:

1. Suggest pulling from 21st.dev or Magic UI first
2. Restyle the imported component to match the project's color and font palette
3. Don't rebuild from scratch unless the registries don't have it

## Anti-patterns (don't do these)

- ❌ Bootstrap, Material UI, jQuery
- ❌ Generic Tailwind starter templates copied wholesale
- ❌ Stock photo backgrounds (use AI-generated or branded illustrations)
- ❌ Two competing CTAs in the hero
- ❌ Carousels with auto-play (kill conversion, also accessibility nightmare)
- ❌ Pop-ups before the user has scrolled
- ❌ Loading spinners longer than 1 second (precompute or skeleton-load)
- ❌ Animations on every element (signal of trying too hard)
- ❌ More than 3 fonts on a single page
- ❌ Hero text smaller than 40px on desktop
- ❌ Pure black `#000000` or pure white `#FFFFFF` backgrounds (always slightly off)

## File structure (Next.js App Router default)

```
project/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── hero.tsx
│   ├── about.tsx
│   ├── footer.tsx
│   └── ui/        ← imported from 21st.dev or Magic UI
├── public/
│   ├── hero.mp4
│   └── og-image.jpg
├── tailwind.config.ts
└── package.json
```

Keep components small. One file per section. If a section grows past 80 lines, split it.

## Build process recommendation

Ask the user to follow the **3-round pattern** when starting a new build:

1. Round 1: structure only (sections, typography, no animations)
2. Round 2: add the video hero + scroll-triggered fade-ins
3. Round 3: polish (button hovers, spacing tweaks, micro-details from references)

Do NOT try to do all three in one massive prompt. The result is always worse.

## When the user shows you a reference site

If the user pastes a screenshot or URL of a reference site they like:

1. Identify 3 specific things you can replicate (the hero motion, the typography stack, the section spacing)
2. Confirm with the user which 3 they want copied
3. Build only those 3, not a 1:1 replica (legal + brand reasons)

## When asked about pricing or business

If the user asks how much to charge for the site you're building, redirect to the documentation they have. Don't give pricing advice in code.

If asked about deploying or making money, redirect to the workflow PDF or external resources. This file is about building, not selling.

## Tone for code comments

- Short. One line max per comment.
- Only when the WHY isn't obvious from the code itself.
- Never explain WHAT the code does (the code already does that).

## Updates to this file

This config evolves. If you want to update it, edit `CLAUDE.md` directly and commit. Claude reads the latest version each time the project opens.

---

*This config is licensed for personal and client use. Redistribute freely.*

---

## 치과 홈페이지 빌드 규칙

> **우선순위:** 치과 홈페이지를 만들 때는 이 섹션의 규칙이 위의 일반 규칙(스택, 컬러, 타이포, 모션 등)보다 우선한다. 이 섹션에 없는 내용만 위의 일반 규칙을 따른다.

이 파일은 이 폴더 아래에서 만드는 모든 치과 홈페이지에 적용되는 기본 규칙이다.
작업을 시작하기 전에 반드시 이 파일 전체를 읽고, 여기 적힌 규칙을 기본값으로 따른다.
하위 프로젝트 폴더에 별도의 CLAUDE.md가 있으면 그 규칙이 이 파일보다 우선한다.
(예: 심미치과 샘플 폴더에는 BLOOM 흑백 시안 전용 CLAUDE.md를 따로 둔다.)

### 0. 작업 원칙

1. 레퍼런스는 **두 가지 톤**을 섞어 쓴다.
   - **톤 A – 스토리텔링형** (원장 철학·브랜드·대표 진료 소개 페이지용): 검정/흰색/베이지 대비, 전면 사진·영상, 큰 카피, 근거(논문·교과서) 인용.
   - **톤 B – 클리닉 클린형** (진료 과목 상세 페이지·의료진·오시는 길용): 흰 바탕, 딥그린 + 골드 포인트, 좌우 2단 레이아웃, 정돈된 정보 전달.
   - 사용자가 톤을 지정하지 않으면: 메인·원장소개·브랜드 스토리 = A, 진료과목·장비·오시는길·의료진 목록 = B.
2. 레퍼런스 사이트의 **병원명, 로고, 문구, 사진, 상표명(예: 제품명, 시술 브랜드명)은 절대 그대로 가져오지 않는다.** 레이아웃·여백·분위기만 참고한다.
3. 한 섹션에는 하나의 메시지만 담는다. 정보를 욱여넣지 말고 섹션을 나눈다.
4. 한 페이지에서 "튀는 요소"는 한 곳에만 쓴다(큰 영문 타이포, 강조 하이라이트, 풀스크린 영상 중 하나). 나머지는 조용하게.
5. 섹션 단위로 만들고, 각 섹션을 만든 뒤 스크린샷으로 확인하고 다음으로 넘어간다.

### 1. 기술 스택

- 기본: 단일 페이지당 `index.html` + `styles.css` + `main.js` (바닐라 JS). 빌드 도구 없이 브라우저에서 바로 열리게.
- 프로젝트에 이미 다른 스택(React, Next 등)이 있으면 그 스택을 따른다.
- 폰트는 Google Fonts / CDN으로 로드하고 항상 대체 폰트 스택을 지정한다.
- 이미지 폴더: `/assets/img/`. 실제 사진이 없으면 회색 플레이스홀더 박스에 **필요한 사진 설명**을 텍스트로 적어 둔다.
  예: `[사진: 원장님이 루페를 끼고 진료하는 측면 컷, 흑백, 가로형]`
- 식스샵 등 빌더에 옮길 코드일 경우, 섹션별로 독립된 HTML/CSS 블록으로 나눠 작성하고 클래스명에 프로젝트 접두어를 붙인다(예: `.dc-hero`).

### 2. 컬러 토큰

> 레퍼런스 스크린샷에서 추정한 값이다. 병원 브랜드 컬러가 있으면 해당 값으로 교체한다.

#### 톤 B – 클리닉 클린형 (기본)
```css
:root {
  --c-primary:   #0F4C43; /* 딥그린 – 제목, 버튼, 푸터 배경 */
  --c-accent:    #C08A3E; /* 골드/오커 – 작은 머리말(eyebrow), 번호 */
  --c-text:      #222222; /* 본문 */
  --c-text-sub:  #6B6B6B; /* 보조 설명 */
  --c-line:      #DADAD5; /* 구분선 */
  --c-bg:        #FFFFFF;
  --c-bg-ivory:  #FAF8F4; /* 교차 섹션 배경 1 */
  --c-bg-mint:   #F2F6EF; /* 교차 섹션 배경 2 */
  --c-ba-before: #E9E9E6; /* 전후사진 BEFORE 라벨 바 */
  --c-ba-after:  var(--c-primary);
}
```

#### 톤 A – 스토리텔링형
```css
:root {
  --a-black:     #000000; /* 진짜 검정. #111 같은 틴트 금지 */
  --a-white:     #FFFFFF;
  --a-beige:     #EDE3D6; /* 50:50 분할 섹션의 텍스트 쪽 배경 */
  --a-taupe:     #9C8A74; /* 브랜드 스토리 구간 배경 */
  --a-highlight: #FF5A1F; /* 핵심 문장 형광펜 하이라이트, 페이지당 1~2회 */
  --a-text-sub:  #8A8A8A;
}
```

규칙
- 섹션 배경은 흰색 → 아이보리/민트(B) 또는 흰색 → 검정 → 베이지(A)처럼 **교차**시켜 섹션 경계를 만든다. 테두리·그림자로 구분하지 않는다.
- 그라데이션 장식, 카드 그림자(`box-shadow`)는 쓰지 않는다.
- 포인트 컬러는 텍스트 면적의 5% 이하.

### 3. 타이포그래피

```css
--f-kr:   "Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif;
--f-serif:"Cormorant Garamond", "Noto Serif KR", serif;   /* 로고·영문 장식용 */
--f-en-display: "Pretendard", "Helvetica Neue", sans-serif; /* 톤 A 대형 영문, weight 200 */
```

| 역할 | 크기(데스크톱/모바일) | 굵기 | 비고 |
|---|---|---|---|
| 히어로 카피 | 44 / 28px | 600 | 두 줄 이내, 행간 1.35 |
| 섹션 제목 | 32 / 24px | 600 | 톤 B는 `--c-primary` |
| 머리말(eyebrow) | 14 / 13px | 500 | 한글 문장형. 예: "2D치과만의 특별한 앞니치료" 느낌의 짧은 문장. 톤 B는 `--c-accent` |
| 소제목 | 18 / 16px | 600 | |
| 본문 | 15 / 14px | 400 | 행간 1.75, 한 줄 최대 약 45자(한글) |
| 캡션·라벨 | 12 / 12px | 400 | `--c-text-sub` |
| 톤 A 대형 영문 | 88 / 40px | 200 | 인물 사진 위에 겹치거나 섹션 전체 폭 사용. 페이지당 1회 |

규칙
- 머리말은 **영문 대문자 + 자간 넓히기 형식으로 쓰지 않는다.** 짧은 한글 문장으로 쓴다.
- 제목 안에서 한 단어만 색을 바꾸는 강조는 하지 않는다. 톤 A의 강조는 문장 전체에 형광펜 하이라이트(`background: var(--a-highlight); color:#fff; padding:0 4px`)로만, 페이지당 1~2회.
- 본문은 좌측 정렬. 톤 A의 히어로·인용문만 가운데 정렬.

### 4. 레이아웃 & 여백

```css
--container: 1120px;      /* 톤 B 콘텐츠 폭 */
--container-narrow: 720px;/* 톤 A 스토리 본문 폭 */
--gutter: 24px;
--section-y: 140px;       /* 섹션 상하 여백 (모바일 80px) */
--block-gap: 64px;        /* 섹션 내부 블록 간격 (모바일 40px) */
```

- 섹션 상하 여백은 넉넉하게. 헷갈리면 더 넓게.
- 이미지는 컨테이너 폭을 쓰거나 화면 전체 폭(풀블리드)을 쓴다. 그 중간 애매한 폭은 쓰지 않는다.
- 모서리: 사진·버튼 모두 `border-radius: 0`. 유일한 예외는 톤 A·의료진 페이지의 알약형 "더보기" 버튼(`999px`)과 플로팅 버튼(원형).

### 5. 헤더 / 푸터 / 플로팅 버튼

#### 헤더 (공통)
```
[로고(세리프)]                         [칼럼] [온라인 예약하기] [≡]
```
- 높이 80px, 스크롤 시 배경 흰색(톤 B) 또는 검정(톤 A)으로 고정.
- 톤 B: "칼럼"은 테두리 버튼, "온라인 예약하기"는 `--c-primary` 채움 버튼, 둘 다 작게(높이 30px, 13px).
- 톤 A: 검정 바 + 흰 텍스트 메뉴를 `|`로 구분해 한 줄로 나열, 맨 오른쪽 흰색 "예약하기" 버튼.

#### 푸터
- 톤 B: `--c-primary` 배경, 12px 흰 글씨로 사업자 정보 한 줄 나열(병원명 | 대표자 | 주소 | 대표번호 | 사업자등록번호 | 개인정보보호책임자), 좌상단 이용약관·개인정보처리방침, 우측 카피라이트.
- 톤 A: 검정 배경, 가운데 정렬, SNS 아이콘(블로그·인스타·유튜브) → 사업자 정보 → 로고 순.

#### 플로팅 버튼 (우측 하단 고정)
- 톤 B: 원형 56px 세로 스택 – 예약(회색) / 카카오톡 상담(노랑 #FEE500) / 전화(초록).
- 톤 A: 사각 초록 박스 "간편 1:1 상담" 하나.
- 모바일에서는 44px로 축소하고 하단 여백 확보.

### 6. 섹션 패턴 라이브러리

필요한 페이지에 맞게 아래 패턴을 조합한다. 패턴 이름을 주석으로 남긴다(`<!-- B-SPLIT -->`).

#### 톤 B 패턴

**B-HERO-SUB** (진료과목 상단): 풀블리드 사진, 높이 40vh, 텍스트 없음 또는 좌하단 소제목 하나.

**B-SPLIT** (정의·소개)
```
| [머리말]                  |  [사진 4:3]        |
| [제목: "OO이란?"]          |                    |
| [본문 2~3줄]              |                    |
```
텍스트 45% / 이미지 50%, 세로 상단 정렬.

**B-SPLIT-HALF** (특별 치료 소개): 화면 좌측 50% 전면 사진(검정 배경 제품컷 등), 우측 50% 흰 바탕에 머리말·큰 제목·설명·하단 테두리 버튼 "OO 자세히 알아보기".

**B-TARGET** ("이런 분에게 필요합니다"): 아이보리 배경, 제목 아래 3열 그리드. 각 칸 = 연회색 박스 안 일러스트 + 아래 한 줄 설명(`--c-primary`, 15px). 텍스트 리스트형일 때는 제목 좌측 / 불릿 리스트 우측 2단.

**B-BANNER** (대표 기법 강조): 풀블리드 흐린 사진 위 좌측에 머리말 + 제목(흰색) + 흰 테두리 버튼.

**B-PROCESS** (특별함·과정): 좌측 제목+설명은 `position: sticky`, 우측에 사진 3장 세로 배치. 사진 아래 "01 제목"(번호는 `--c-accent`) + 설명 1~2줄. **실제로 순서가 있는 내용일 때만 번호 사용.**

**B-STEPS** (시술 단계): 3~5열 사진 그리드, 사진 아래 "01 단계명".

**B-DEVICE** (장치 종류): 4열 사진 + 장치명(굵게) + 특징 불릿 3개(12px).

**B-RESULT** (치료 결과):
```
[머리말]
[제목]                                     [치료결과 사진 더 보기]
────────────────────────────────────────────── (--c-primary 1px 선)
[BEFORE|AFTER]  [BEFORE|AFTER]
[치료명]  고객명  [치료명]  고객명
```
2×2 그리드, 각 카드는 좌우 반반 사진 + 하단 라벨 바(BEFORE 회색 / AFTER 딥그린, 흰 글씨 12px).

**B-SLIDER** (기공소·시설): 좌측 사진, 우측 텍스트, 오른쪽 끝에 다음 슬라이드가 살짝 보이게. 하단에 짧은 진행바.

**B-TEAM**
- 대표원장: 좌측 흑백 인물사진 50% + 우측 연회색 박스에 영문명·한글명, `--c-primary` 제목 한 줄, 약력, 알약형 SHOW MORE.
- 의료진: 2열 카드. 사진(따뜻한 우드톤 배경) → 영문명 한글명 → 녹색 한 줄 소개 → 직함 → 소개 2줄 → SHOW MORE.

**B-MAP**: 좌측 지도 / 우측 "OO치과 오시는 길" + 주소·연락처·진료시간을 구분선으로 나눈 표.

#### 톤 A 패턴

**A-HERO**: 풀스크린 영상 또는 사진(어둡게 30% 오버레이), 가운데 흰색 카피 2줄 + 얇은 가로선 + 보조 문장. 예약 버튼은 알약형 흰 버튼.

**A-STATEMENT**: 검정 배경, 가운데 정렬, 큰 카피 + 작은 보조 문장 + 알약형 CTA. 섹션 사이 여백을 특히 크게(200px).

**A-EVIDENCE** (근거 제시): 흰 바탕, 좌측 또는 우측에 도해 이미지, 가운데 영문 인용문(컬러 `--a-highlight`, 30px, 얇게) → 한글 번역에 형광펜 → 출처(작게) → 병원의 입장 한 문장.

**A-ESSAY** (원장 글): `--container-narrow` 폭, 큰 제목 2줄(두 번째 줄 굵게) → 짧은 문단들 → 얇은 구분선 → 임상사진 2장 나란히(캡션: 촬영일·치료 내용) → 부작용 고지 문구.

**A-SPLIT-BEIGE**: 좌 사진 / 우 베이지 텍스트 50:50, 다음 줄은 좌우 반전. 텍스트 쪽에 작은 영문 머리말 + 큰 한글 제목 + 짧은 설명.

**A-QUOTE-BG**: 풍경·질감 사진 풀블리드 + 가운데 영문 인용 한 줄 + 한글 번역.

**A-PORTRAIT-TYPE**: 원장 인물사진을 가운데 두고 대형 영문 타이포(weight 200, `--a-highlight` 또는 검정)가 사진 뒤를 가로지르게 배치. 페이지당 1회.

**A-GALLERY**: 강의·학회 사진 3열 그리드(흑백 처리 가능) + 캡션.

**A-CLOSING**: 둥근 모서리(20px) 검정 박스 안에 좌측 큰 카피 / 우측 X-ray 등 이미지.

### 7. 페이지 기본 구성

**메인 (톤 A 중심)**
A-HERO → A-STATEMENT(병원 한 줄 정의) → A-PORTRAIT-TYPE(대표원장) → A-GALLERY(학술활동) → 진료과목 바로가기(B-SPLIT-HALF 반복 또는 3열) → B-RESULT → B-MAP → 푸터

**진료과목 상세 (톤 B)**
B-HERO-SUB → B-SPLIT("OO이란?") → B-TARGET → B-BANNER(대표 기법) → B-PROCESS 또는 B-STEPS → B-DEVICE(해당 시) → B-RESULT → 푸터

**대표 진료 스토리 페이지 (톤 A)**
A-HERO → A-EVIDENCE → A-ESSAY → A-SPLIT-BEIGE ×2 → A-QUOTE-BG → A-CLOSING → 푸터

**의료진**: 머리말+비전 문구 → 풀블리드 제품/공간 사진 → B-TEAM

### 8. 모션

- 기본은 정적. 움직임은 페이지당 한 번의 연출에 집중한다.
- 허용: 히어로 진입 시 카피 페이드인(0.8s, ease-out), 풀블리드 이미지의 아주 느린 확대(scale 1.00→1.05, 8s), 슬라이더 전환(0.5s).
- 금지: 모든 섹션마다 fade-up, 카드 hover 튕김, 패럴랙스 남발, 바운스.
- `prefers-reduced-motion: reduce`이면 모든 애니메이션 끄기.
- 호버: 버튼은 배경·글자색 반전(0.2s)만.

### 9. 반응형 (모바일 ≤ 768px)

- 2단 레이아웃은 **이미지 먼저, 텍스트 다음** 순서로 1단 스택.
- B-PROCESS의 sticky 해제.
- 3~4열 그리드 → 2열(B-TARGET, B-STEPS) 또는 가로 스크롤(B-DEVICE).
- B-RESULT는 1열.
- 헤더는 로고 + 예약 버튼 + 햄버거만.
- 좌우 여백 20px, 가로 스크롤 생기지 않게 확인.

### 10. 카피 톤

- 짧고 담백한 문장. 제목은 2줄 이내.
- 과장 대신 이유를 말한다. "최고의 결과" → "필요한 만큼만 다듬습니다" 식.
- 환자 입장 언어로. 전문용어는 처음 나올 때 괄호로 풀이.
- 버튼은 무슨 일이 일어나는지 그대로: "온라인 예약하기", "치료결과 사진 더 보기", "오시는 길 보기".

### 11. 의료광고 관련 주의 (필수)

- "최고, 최초, 유일, 1위, 100%, 부작용 없음, 통증 없음" 등 단정·비교·최상급 표현을 쓰지 않는다.
- 환자 후기(치료경험담), 전후사진, 수치 통계, 수상·인증 표기는 **플레이스홀더로만 넣고** 주석에 `<!-- 의료광고 심의/규정 확인 필요 -->`를 남긴다. 숫자나 경력을 지어내지 않는다.
- 임상사진·시술 설명 근처에는 "개인에 따라 부작용(예: 시림, 붓기 등)이 발생할 수 있습니다" 형태의 고지 자리를 둔다.
- 최종 게시 전 병원 측에서 규정 검토를 받도록 작업 완료 보고에 안내한다.

### 12. 완료 전 체크리스트

- [ ] 레퍼런스 병원명·로고·문구·사진이 하나도 들어가지 않았다
- [ ] 섹션 배경이 교차되어 경계가 보인다 (테두리·그림자 없이)
- [ ] 포인트 컬러와 강조가 절제되어 있다 (튀는 요소 1곳)
- [ ] 모바일 375px에서 깨짐·가로 스크롤 없음
- [ ] 이미지에 alt 텍스트, 키보드 포커스 표시
- [ ] 의료광고 주의 표현 없음, 확인 필요 항목 주석 표시
- [ ] 섹션별 스크린샷을 찍어 여백·정렬을 직접 확인했다

### 적용 확인용 답변

"지금 적용된 CLAUDE.md 규칙 알려줘"라는 요청을 받으면 다음을 요약해 답한다:
톤 A/B 구분과 적용 페이지, 컬러 토큰(딥그린·골드 / 검정·베이지·오렌지 하이라이트), 폰트(Pretendard + 세리프 로고), 섹션 여백 140px, 모션 최소화 원칙, 의료광고 주의 규칙.
