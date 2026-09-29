# SOLKERN 홈페이지(www.solkern.kr) 구축 결과 및 운영 가이드

작성: 2026-09-29 · 대상: 솔컨 팀

## 1. 구축 결과 요약
| 항목 | 내용 |
|---|---|
| 소스코드 | GitHub `worldzzang/solkern-website` (main 브랜치 push → Vercel 자동 재배포) |
| 호스팅 | Vercel 프로젝트 `project-c2m6o` (이름 변경 권장 → `solkern-website`), 무료 Hobby 플랜 |
| 현재 URL | https://project-c2m6o.vercel.app (Vercel 로그인 상태에서만 열림 — 도메인 연결 후 공개) |
| 스택 | Next.js 14 · Tailwind · framer-motion · Vercel Blob(문의 저장) |
| 언어 | 한국어(기본) / 영어 토글 (`/ko`, `/en`) — 영문은 자동 번역본, 네이티브 검수 권장 |
| 메뉴 | SOLKERN · ORIGIN · ERMÁK · MATERIAL LAB · B2B · NEWS · CONTACT |
| 관리자 | `/admin` — 문의 목록·상태(신규/진행/완료)·내부 메모·CSV 다운로드, 소식(NEWS) 작성 |

## 2. Vercel 대시보드에서 직접 해야 할 4가지 (약 10분)
Vercel 연동 토큰이 "배포 전용"이라 아래 설정은 대시보드에서 직접 진행해야 합니다. https://vercel.com → 프로젝트 `project-c2m6o`

### ① 환경변수 등록 — Settings → Environment Variables
| Key | Value | 비고 |
|---|---|---|
| `ADMIN_PASSWORD` | (채팅으로 전달한 값) | 관리자 로그인 비밀번호. **원하는 값으로 변경 권장** |
| `ADMIN_SECRET` | (채팅으로 전달한 값) | 세션 서명키(임의 문자열) |
| `NOTIFY_EMAIL` | `solkern@solkern.kr` | (선택) 문의 알림 수신 주소 |
| `RESEND_API_KEY` | resend.com 발급 키 | (선택) 문의 접수 시 이메일 알림. 미설정 시 관리자 페이지에서만 확인 |
Environment는 Production + Preview 체크.

### ② 문의 저장소 연결 — Storage → Create Database → **Blob**
- 이름: `solkern-inquiries`, Access: **Private**, 프로젝트 `project-c2m6o`에 Connect
- 연결하면 `BLOB_READ_WRITE_TOKEN` 환경변수가 자동 등록됩니다.

### ③ 재배포 — Deployments → 최신 배포 ⋯ → **Redeploy**
환경변수는 재배포 후 적용됩니다.

### ④ 도메인 추가 — Settings → Domains → Add
- `www.solkern.kr` 추가 → 이어서 `solkern.kr` 추가(www로 리다이렉트 선택)
- 추가하면 아래와 같은 DNS 값이 표시됩니다(기본값이며 화면 표시값을 우선).

## 3. 가비아 DNS 설정
가비아 → My가비아 → 도메인 관리 → `solkern.kr` → **DNS 정보 → DNS 설정** → 레코드 수정
| 타입 | 호스트 | 값/위치 | TTL |
|---|---|---|---|
| CNAME | `www` | `cname.vercel-dns.com.` | 3600 |
| A | `@` | `76.76.21.21` | 3600 |
- 기존에 `www` 또는 `@`에 잡혀 있는 A/CNAME 레코드(가비아 파킹 페이지 등)는 삭제 후 등록합니다.
- 저장 후 10분~최대 48시간 내 반영. Vercel Domains 화면에서 "Valid Configuration" 표시되면 완료, SSL 인증서는 자동 발급됩니다.
- 이메일(`solkern@solkern.kr`)을 가비아/다른 메일서비스로 쓰고 있다면 **MX 레코드는 건드리지 않습니다.**

## 4. 운영 방법
### 문의 관리
1. `https://www.solkern.kr/admin` → 비밀번호 로그인(12시간 유지)
2. 목록에서 **상세** → 상태 변경(신규/진행 중/완료), 내부 메모, 이메일 회신 버튼, CSV 다운로드
3. 문의 폼은 스팸 방지(허니팟·IP당 분당 5회 제한) 적용

### 소식(NEWS) 등록
- 관리자 → "소식(NEWS) 관리" 탭에서 작성 → 즉시 사이트 NEWS 페이지 반영(재배포 불필요)
- 코드에 내장된 기본 3건은 `content/ko.ts`, `content/en.ts`에서 수정

### 문구·제품 수정
- 모든 문구·제품 데이터: `content/ko.ts`(국문), `content/en.ts`(영문) → GitHub에서 직접 편집·커밋하면 1~2분 후 자동 반영
- 금지 표현 정책: 무설탕·무첨가·100%·타국 대비 우수·기능성 암시 → 시험성적서/라벨 확인 후에만 추가

### 플레이스홀더 이미지 교체 (25곳)
1. 사이트에서 `IMG · ID` 태그가 붙은 영역이 대상 — 프롬프트북(`SOLKERN_Image_Prompt_Book.docx`) 참고해 생성
2. `public/images/custom/{ID}.webp`로 저장(가로 1600~2000px)
3. `lib/placeholders.ts`의 `CUSTOM_READY` 배열에 `'ID'` 추가 → 커밋 → 자동 반영
4. 실제 사진(팀·오피스·공장·산지)이 확보되면 AI 이미지보다 우선 교체 권장

## 5. 남은 권장 작업
- [ ] Vercel 프로젝트 이름 변경(`solkern-website`), 함수 리전 `icn1`(서울)로 변경 — Settings → Functions
- [ ] 영문 카피 네이티브 검수
- [ ] QOQI·Challpak(과일 스낵), 참깨 페이스트, 잼 3종, 퓨레 실제 제품 컷 확보
- [ ] 우즈베키스탄 산지·공장 실사진 수급(제안서 체크리스트)
- [ ] 개인정보처리방침 법무 검토, 통신판매업 신고번호 표기(온라인 판매 시)

## 용어집
| 약어·용어 | 풀네임 | 설명 |
|---|---|---|
| DNS | Domain Name System | 도메인 이름을 서버 주소로 연결하는 체계 |
| CNAME | Canonical Name record | 도메인을 다른 도메인 이름으로 연결하는 DNS 레코드 |
| A 레코드 | Address record | 도메인을 IP 주소에 연결하는 DNS 레코드 |
| MX | Mail Exchange record | 이메일 수신 서버를 지정하는 레코드 |
| SSL | Secure Sockets Layer | https 암호화 인증서(Vercel 자동 발급) |
| Blob | Vercel Blob Storage | 파일 단위 저장소. 문의·소식을 JSON으로 저장 |
| SSG/SSR | Static Site Generation / Server-Side Rendering | 정적 생성 / 서버 렌더링. 공개 페이지는 정적, 관리자·NEWS는 서버 렌더링 |
| OEM/ODM | Original Equipment / Design Manufacturing | 주문자 상표 부착 / 제조자 개발 생산 |
| COA | Certificate of Analysis | 시험성적서 |
| MOQ | Minimum Order Quantity | 최소 주문 수량 |
