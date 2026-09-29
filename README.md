# SOLKERN 공식 홈페이지 (www.solkern.kr)

Next.js 14 · Tailwind · framer-motion · Vercel Blob. 한국어/영어 토글, 반응형(모바일·PC), 스토리텔링 애니메이션, 문의 폼 + 관리자 모드.

## 구조
- `app/[locale]/…` 공개 페이지 (ko / en) — `/`, `/solkern`, `/origin`, `/ermak`, `/material-lab`, `/b2b`, `/news`, `/contact`, `/privacy`
- `app/admin` 관리자 (비밀번호 로그인) — 문의 목록·상태·메모·CSV, 소식(NEWS) 작성
- `app/api/*` 문의 접수 / 관리자 API
- `content/ko.ts`, `content/en.ts` **모든 문구·제품 데이터** (수정 후 git push → 자동 재배포)
- `lib/placeholders.ts` 플레이스홀더 이미지 정의 (`IMG · ID` 태그가 붙은 영역)
- `public/images/` 카탈로그에서 추출한 제품·배경 이미지

## 환경변수 (Vercel > Settings > Environment Variables)
| 키 | 설명 |
|---|---|
| `ADMIN_PASSWORD` | 관리자 로그인 비밀번호 |
| `ADMIN_SECRET` | 세션 서명용 임의 문자열 |
| `BLOB_STORE_ID` (또는 `BLOB_READ_WRITE_TOKEN`) | Vercel Blob 연결 시 자동 주입 (문의·소식 저장) |
| `RESEND_API_KEY` / `NOTIFY_EMAIL` | (선택) 문의 접수 이메일 알림 — resend.com 무료 계정 |

## 플레이스홀더 이미지 교체
1. 생성한 이미지를 `public/images/custom/{ID}.webp` 로 저장 (예: `ORIGIN-SUN.webp`)
2. `lib/placeholders.ts` 의 `CUSTOM_READY` 배열에 `'ORIGIN-SUN'` 추가
3. git push → 자동 배포. 이미지 프롬프트는 `SOLKERN_이미지_생성_프롬프트.docx` 참고

## 로컬 실행
```bash
npm install
cp .env.example .env.local   # ADMIN_PASSWORD 등 입력
npm run dev                  # http://localhost:3000
```
로컬에서는 Blob 대신 `.data/` 폴더에 파일로 저장됩니다.

## 표현 가이드
검증 전 표현(무설탕·무첨가·100%·타국 대비 우수·기능성 암시)은 사용하지 않습니다. 시험성적서·라벨 확인 후 `content/*.ts` 에서 추가하세요.
