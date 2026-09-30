// 플레이스홀더 이미지 정의 (v2 · 오설록 벤치마크 디자인)
// id → 무드 그라데이션 + 설명. 실제 이미지가 준비되면 public/images/custom/{id}.webp 로 저장하고 CUSTOM_READY 에 id를 추가하세요.
// 프롬프트·권장 비율은 docs/SOLKERN_Image_Prompt_Book_v3.docx 참고.
export const CUSTOM_READY: string[] = [];

export type PlaceholderSpec = { id: string; mood: string; label: string; ratio?: string };

const g = (a: string, b: string, c?: string) => `linear-gradient(160deg, ${a} 0%, ${b} ${c ? '55%' : '100%'}${c ? `, ${c} 100%` : ''})`;
const r = (a: string, b: string, c: string) => `radial-gradient(circle at 40% 38%, ${a}, ${b} 55%, ${c})`;

export const PLACEHOLDERS: Record<string, PlaceholderSpec> = {
  /* ---------- HOME (v2) ---------- */
  'HERO-VALLEY': { id: 'HERO-VALLEY', mood: g('#c9b58a', '#7d8a5c', '#3b4a3a'), label: '페르가나 분지 과수원 · 황금빛 아침 · 설산 배경', ratio: '21:9' },
  'HOME-INTRO': { id: 'HOME-INTRO', mood: g('#efe7d8', '#d9c9a4', '#b49141'), label: '살구나무 가지 사이 햇살 · 클로즈업', ratio: '4:5' },
  'REGION-FERGANA': { id: 'REGION-FERGANA', mood: g('#e9d6a8', '#c98a4a', '#7a4a2b'), label: '페르가나 분지 · 살구·석류 과수원', ratio: '4:5' },
  'REGION-TASHKENT': { id: 'REGION-TASHKENT', mood: g('#e6d9bf', '#a89a7a', '#4a4a44'), label: '타슈켄트·지자흐 · 해바라기 밭과 생산 거점', ratio: '4:5' },
  'REGION-SAMARKAND': { id: 'REGION-SAMARKAND', mood: g('#f0dcc0', '#c48c5a', '#6b3f2a'), label: '사마르칸트·부하라 · 건과·견과 시장', ratio: '4:5' },
  'REGION-TURKIYE': { id: 'REGION-TURKIYE', mood: g('#dfe6d8', '#8fa07a', '#3f5a4a'), label: '튀르키예 · 아나톨리아 헤이즐넛·무화과 과수원', ratio: '4:5' },
  'WHY-SECONDLIFE': { id: 'WHY-SECONDLIFE', mood: g('#f1e4d6', '#b96d5a', '#5b2a2a'), label: '말린 석류 껍질·씨앗이 담긴 리넨 위 볼', ratio: '4:3' },
  'WHY-LAB': { id: 'WHY-LAB', mood: g('#f4f2ec', '#cfd6cf', '#7d8f88'), label: '한국 식품 R&D 랩 · 분말 시료와 비커', ratio: '4:3' },
  'WHY-DATA': { id: 'WHY-DATA', mood: g('#f7f2e8', '#e4dcc8', '#c9b27c'), label: '시험성적서·규격서와 원료 분말 플랫레이', ratio: '4:3' },
  'TL-1992': { id: 'TL-1992', mood: g('#d9cdb8', '#8c7a5c', '#4a3d2e'), label: '1992 · 타슈켄트 초기 작업장 (필름 톤)', ratio: '4:3' },
  'TL-2008': { id: 'TL-2008', mood: g('#e8dcc3', '#a08a5a', '#3a3a3a'), label: '2008 · 해바라기씨 최초 공장 포장 라인', ratio: '4:3' },
  'TL-2026': { id: 'TL-2026', mood: g('#f2eee6', '#cfc4aa', '#b49141'), label: '2026 · 인천 청라 ㈜솔컨 설립 · 파트너십', ratio: '4:3' },
  'PEOPLE-CEO': { id: 'PEOPLE-CEO', mood: g('#ece7dc', '#b7b0a2', '#5a564e'), label: '㈜솔컨 CEO 박진태 (실사진 필요 · AI 생성 금지)', ratio: '4:5' },
  'DAILY-1': { id: 'DAILY-1', mood: g('#f6e9d6', '#e0b47c', '#b8743a'), label: '아침 식탁 · 땅콩버터 토스트', ratio: '1:1' },
  'DAILY-2': { id: 'DAILY-2', mood: g('#f2d9d9', '#b04a58', '#5e1c2a'), label: '오후 · 석류 주스 한 잔', ratio: '1:1' },
  'DAILY-3': { id: 'DAILY-3', mood: g('#f4e6d2', '#d9a267', '#7a5a3a'), label: '차와 함께 · 코키 과일 스낵', ratio: '1:1' },
  'DAILY-4': { id: 'DAILY-4', mood: g('#f8f3ea', '#e9d3c8', '#a05a6a'), label: '요거트 볼 · 체리 잼', ratio: '1:1' },
  'DAILY-5': { id: 'DAILY-5', mood: g('#e6eadb', '#9aa87a', '#4e5a3a'), label: '트레킹 · 넛바와 견과', ratio: '1:1' },
  'DAILY-6': { id: 'DAILY-6', mood: g('#f0ebe2', '#c8b79a', '#6b5a44'), label: '카페 · 아이란·쿠르트 플레이팅', ratio: '1:1' },
  'CTA-TABLE': { id: 'CTA-TABLE', mood: g('#3a3a3a', '#5b4636', '#b49141'), label: '리넨 테이블 위 ERMÁK 제품과 원물 · 톱뷰', ratio: '21:9' },

  /* ---------- ORIGIN ---------- */
  'HERO-ORCHARD': { id: 'HERO-ORCHARD', mood: g('#2b1f16', '#5b4636', '#8c6f2c'), label: '우즈베키스탄 과수원 · 역광', ratio: '16:9' },
  'ORIGIN-SUN': { id: 'ORIGIN-SUN', mood: g('#e58a3c', '#b49141', '#5b4636'), label: '아침 햇살 · 석류나무', ratio: '4:3' },
  'ORIGIN-SOIL': { id: 'ORIGIN-SOIL', mood: g('#5b4636', '#8a6a4a', '#c9a86a'), label: '토양 · 관개수로', ratio: '4:3' },
  'ORIGIN-CULTURE': { id: 'ORIGIN-CULTURE', mood: g('#e58a3c', '#c26b2b', '#7a1e2e'), label: '살구 건조 · 바자르', ratio: '4:3' },
  'ORIGIN-FACTORY': { id: 'ORIGIN-FACTORY', mood: g('#222', '#3a3a3a', '#5e7a4a'), label: '생산 라인', ratio: '4:3' },
  'ORIGIN-TURKIYE': { id: 'ORIGIN-TURKIYE', mood: g('#1f3b4d', '#5e7a4a', '#e58a3c'), label: '튀르키예 과수원', ratio: '16:10' },
  'FRUIT-APRICOT': { id: 'FRUIT-APRICOT', mood: r('#f6b26b', '#e58a3c', '#b45f1a'), label: '살구', ratio: '1:1' },
  'FRUIT-NUTS': { id: 'FRUIT-NUTS', mood: r('#d9b98a', '#8c6f2c', '#5b4636'), label: '견과·씨앗', ratio: '1:1' },
  'FRUIT-GRAPE': { id: 'FRUIT-GRAPE', mood: r('#8a3a5a', '#4e1220', '#2b0a12'), label: '포도·대추야자', ratio: '1:1' },

  /* ---------- MATERIAL LAB ---------- */
  'MAT-FOOD': { id: 'MAT-FOOD', mood: g('#f7f2e8', '#e9d9b8', '#e58a3c'), label: '과육 분말 · 쉐이크', ratio: '4:5' },
  'MAT-BEAUTY': { id: 'MAT-BEAUTY', mood: g('#f7f2e8', '#e0c8c8', '#7a1e2e'), label: '석류껍질 추출물 · 스크럽', ratio: '4:5' },
  'MAT-INGREDIENT': { id: 'MAT-INGREDIENT', mood: g('#f7f2e8', '#d9cdb8', '#5b4636'), label: '파이버 · 산업 소재', ratio: '4:5' },
  'LAB-BEAUTY': { id: 'LAB-BEAUTY', mood: g('#4e1220', '#7a1e2e', '#b49141'), label: '석류껍질 추출 · 랩', ratio: '4:3' },
  'LAB-FOOD': { id: 'LAB-FOOD', mood: g('#e58a3c', '#f3ead3', '#5e7a4a'), label: '과일 분말 쉐이크', ratio: '4:3' },
  'LAB-INDUSTRY': { id: 'LAB-INDUSTRY', mood: g('#222', '#5b4636', '#b49141'), label: '호두껍질 연마재', ratio: '4:3' },
  'SECOND-BYPRODUCT': { id: 'SECOND-BYPRODUCT', mood: g('#7a1e2e', '#5b4636', '#222'), label: '부산물 · 껍질·씨앗·박', ratio: '4:3' },

  /* ---------- 공통 ---------- */
  'MARKET-MAP': { id: 'MARKET-MAP', mood: g('#111', '#222', '#3a3a3a'), label: '아시아 유통 네트워크', ratio: '4:3' },
  'TRUST-LAB': { id: 'TRUST-LAB', mood: g('#f7f2e8', '#efe7d8', '#d4b46a'), label: '시험성적서 · 품질 서류', ratio: '4:3' },
  'ABOUT-TEAM': { id: 'ABOUT-TEAM', mood: g('#e8e3da', '#9b948a', '#3a3a3a'), label: '3사 파트너십 · 미팅 테이블', ratio: '4:3' },
  'ABOUT-OFFICE': { id: 'ABOUT-OFFICE', mood: g('#efe7d8', '#d9cdb8', '#8c6f2c'), label: '인천 청라 오피스', ratio: '4:3' },
  'PROD-JAM-TRIO': { id: 'PROD-JAM-TRIO', mood: r('#e58a3c', '#7a1e2e', '#4e1220'), label: '체리·살구·모과 잼', ratio: '1:1' },
  'PROD-PUREE': { id: 'PROD-PUREE', mood: r('#f3ead3', '#e58a3c', '#b45f1a'), label: '과일 퓨레', ratio: '1:1' },
  'NEWS-POMEGRANATE': { id: 'NEWS-POMEGRANATE', mood: g('#7a1e2e', '#4e1220'), label: '석류껍질 분말', ratio: '16:10' },
  'NEWS-OFFICE': { id: 'NEWS-OFFICE', mood: g('#b49141', '#5b4636'), label: '법인 설립', ratio: '16:10' },
  'NEWS-CATALOG': { id: 'NEWS-CATALOG', mood: g('#3a3a3a', '#111'), label: '카탈로그', ratio: '16:10' },
  'CONTACT-OFFICE': { id: 'CONTACT-OFFICE', mood: g('#ece7dc', '#c9c1b2', '#6b6864'), label: '오피스 · 미팅', ratio: '4:3' },
};
