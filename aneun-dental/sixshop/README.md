# 식스샵 적용 (anundental 스토어)

`aneun-dental` 수정본을 식스샵 커스텀 블록 10개로 옮긴 소스입니다.

- **스토어:** `anundental` (`anundental.sixshop.site`)
- **테마:** Essential, **아직 게시 전**
- 블록 소스는 `blocks/*.block.html`, 블록 설정은 `blocks/*.settings.json`, 스토어에 등록된 블록 ID는 `block-ids.txt`에 있습니다.

## 스토어에 반영한 내용

| 위치 | 섹션 이름 | 블록 |
|---|---|---|
| 상단 (전체 페이지 공통) | 아는치과 헤더 | 아는치과 · 헤더 메뉴 |
| 홈 (페이지 이름: 새 페이지 1) | 메인 배너 / 진료 약속 / 원장소개 / 첫방문 / 통증케어 / 증상별 진료 / 임플란트 / 오시는 길 | 섹션마다 같은 이름의 블록 1개 |
| 하단 (전체 페이지 공통) | 아는치과 푸터 | 아는치과 · 푸터와 예약 안내 (모바일 하단 고정 예약 버튼, 예약·안내 팝업 포함) |

- 새로 만든 섹션은 모두 전체 폭이고 여백은 0입니다.
- 원래 있던 헤더 섹션(히어로 배너 포함)과 푸터 섹션은 **지우지 않고 숨김 처리**만 했습니다. 에디터에서 해당 섹션의 표시를 다시 켜면 그대로 돌아옵니다.
- 테마 맞춤 코드(head)에 Noto Serif KR과 Noto Sans KR의 400/500/600 굵기를 불러오는 링크를 넣었습니다.

## 에디터에서 해야 할 일

### 1. 이미지 올리기

블록을 선택하면 설정 패널의 "이미지" 항목이 보입니다. `aneun-dental/assets/` 폴더에서 같은 이름의 파일을 올려 주세요. 사진을 자르는 위치가 원본 이미지 크기 기준으로 맞춰져 있어서, **원본 파일 그대로** 올려야 합니다.

| 블록 | 이미지 파일 |
|---|---|
| 메인 배너 | hero.webp |
| 원장소개 | doctor.webp, doctor-reference.webp |
| 첫방문 안내 | first-visit-identity.webp, exam-panorama-v2.webp, exam-ct-v2.webp, exam-pa-v2.webp, exam-oral-v2.webp, exam-qray-v2.webp, first-visit.webp, scaling-insurance.webp |
| 통증케어 | comfort-greige-v2.webp |
| 증상별 진료 | symptom-gum / crown / resin / sensitivity / wisdom / jaw / implant .webp (7개) |
| 임플란트 | implant-identity-v3.webp, implant-reference.webp, implant-background-v2.webp |
| 오시는 길 | location-reference.webp |

모두 23개 파일입니다.

### 2. 미리보기에서 확인할 것

- **헤더 고정:** 스크롤해도 헤더가 위에 붙어 있는지 확인하세요. 안 붙으면 "아는치과 헤더" 섹션에서 "스크롤 시 섹션 고정"을 켜 주세요.
- **블록 너비:** 블록이 화면 폭 전체를 채우는지 확인하세요. 가운데로 좁아지면 섹션의 레이아웃 정렬을 "늘이기(꽉 채움)"로 바꿔 주세요.
- **페이지 이름:** 필요하면 "새 페이지 1"을 "홈" 등으로 바꿔 주세요.

## 다시 만들기

`tools/` 폴더 스크립트를 이 순서로 실행하면 같은 블록이 다시 만들어집니다: `extract-blocks.js` → `build-blocks.js` → `minify.js` → `preview.js`.

- `preview.js`는 식스샵의 CSS 범위 지정과 기본 스타일 초기화를 흉내 낸 미리보기를 만듭니다.
- 이 미리보기로 원본 사이트와 비교한 결과, 1440 / 1024 / 768 / 390 / 360px 모두 페이지 높이가 같고 다른 픽셀은 33개 이하였습니다.
