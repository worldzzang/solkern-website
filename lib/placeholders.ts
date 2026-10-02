// 이미지 슬롯 정의 (v3 · 오설록 브랜드스토리 벤치마크 디자인)
// ------------------------------------------------------------------
// 1) REAL        : 카탈로그(ERMÁK·ASIL)에서 추출한 실사진이 이미 연결된 슬롯
// 2) CUSTOM_READY: AI 생성/실촬영 이미지를 public/images/custom/{ID}.webp 로 넣은 뒤 여기에 ID를 추가하면 교체됨
// 3) 그 외       : 사이트에 "IMAGE · ID" 플레이스홀더(주석 포함)로 표시 — 프롬프트는 docs/SOLKERN_Image_Prompt_Book_v4.docx
// ------------------------------------------------------------------
export const CUSTOM_READY: string[] = [
  'WHY-SECONDLIFE', 'WAY-MARKET', 'ORIGIN-SOIL', 'REGION-FERGANA', 'REGION-TASHKENT', 'REGION-SAMARKAND', 'REGION-TURKIYE', 'ORIGIN-TURKIYE', 'FRUIT-GRAPE', 'MAT-FOOD', 'MAT-INGREDIENT', 'LAB-INDUSTRY', 'DAILY-4', 'DAILY-5', 'DAILY-6', 'CONTACT-OFFICE',
  'MAT-BEAUTY', 'LAB-BEAUTY', 'DAILY-1', 'DAILY-2',
];

export const REAL: Record<string, string> = {
  'HERO-VALLEY': '/images/photo/apricot-orchard.webp',
  'HERO-ORCHARD': '/images/photo/apricot-orchard.webp',
  'ORIGIN-SUN': '/images/photo/apricot-dew.webp',
  'ORIGIN-CULTURE': '/images/photo/pomegranates.webp',
  'ORIGIN-FACTORY': '/images/bg/press-olma.webp',
  'FRUIT-APRICOT': '/images/photo/daily-apricot.webp',
  'FRUIT-NUTS': '/images/bg/seeds-bowl.webp',
  'WAY-ORIGIN': '/images/photo/origin-flatlay.webp',
  'WAY-PRODUCT': '/images/bg/new-products.webp',
  'MAT-BEAUTY': '/images/bg/pom-dark.webp',
  'LAB-BEAUTY': '/images/bg/pom-dark.webp',
  'LAB-FOOD': '/images/photo/daily-apricot.webp',
  'DAILY-1': '/images/bg/pb-toast.webp',
  'DAILY-2': '/images/bg/splash-pom.webp',
  'DAILY-3': '/images/bg/snack-lineup.webp',
  'ABOUT-TEAM': '/images/photo/ermak-team.webp',
  'NEWS-POMEGRANATE': '/images/custom/LAB-BEAUTY.webp',
  'NEWS-CATALOG': '/images/bg/cover.webp',
  'NEWS-OFFICE': '/images/photo/notice-default.webp', // 공지·소식 기본 썸네일(브랜드 그래픽)
};

// 실사진 크롭 기준점(object-position)
export const REAL_POS: Record<string, string> = { 'WAY-PRODUCT': 'center 70%', 'ABOUT-TEAM': 'center 80%' };

export type PlaceholderSpec = { id: string; mood: string; label: string; ratio?: string };

// 플레이스홀더 배경: 실제 들어갈 사진의 색감을 미리 보여 주는 저채도 톤(사이트 팔레트와 충돌하지 않게)
const g = (a: string, b: string, c?: string) => `linear-gradient(155deg, ${a} 0%, ${b} ${c ? '55%' : '100%'}${c ? `, ${c} 100%` : ''})`;

export const PLACEHOLDERS: Record<string, PlaceholderSpec> = {
  /* ---------- HOME ---------- */
  'HERO-VALLEY': { id: 'HERO-VALLEY', mood: g('#c9c39a', '#7d8a5c', '#32453a'), label: '페르가나 분지 살구 과수원 · 아침 햇살', ratio: '21:9' },
  'WAY-ORIGIN': { id: 'WAY-ORIGIN', mood: g('#7a3a3a', '#4e2a2a', '#1e2f26'), label: '원물 플랫레이', ratio: '3:4' },
  'WAY-PRODUCT': { id: 'WAY-PRODUCT', mood: g('#c98a4a', '#8a5a2a', '#1e2f26'), label: 'ERMÁK 제품 라인업', ratio: '3:4' },
  'WHY-SECONDLIFE': { id: 'WHY-SECONDLIFE', mood: g('#b9a08a', '#7d5d52', '#2b2a26'), label: '리넨 위 도자기 볼에 담긴 말린 석류 껍질·과일 씨앗 (Second Life 원료)', ratio: '3:4' },
  'WAY-MARKET': { id: 'WAY-MARKET', mood: g('#9fb0ad', '#5d7470', '#1e2f26'), label: '새벽 인천항 컨테이너 터미널 · 아시아로 떠나는 물류', ratio: '3:4' },
  'ORIGIN-SOIL': { id: 'ORIGIN-SOIL', mood: g('#c9b28e', '#8f7556', '#3d3a2e'), label: '톈산 산맥 설산과 과수원 사이를 흐르는 관개수로 · 붉은 흙', ratio: '1:1' },
  'REGION-FERGANA': { id: 'REGION-FERGANA', mood: g('#d8cfa8', '#8e9a6a', '#33473a'), label: '페르가나 분지 · 설산을 배경으로 한 살구·석류 과수원 전경', ratio: '16:10' },
  'REGION-TASHKENT': { id: 'REGION-TASHKENT', mood: g('#e2d6a6', '#b49a4e', '#3f4a36'), label: '타슈켄트·지자흐 · 끝없이 펼쳐진 해바라기 밭, 늦은 오후', ratio: '16:10' },
  'REGION-SAMARKAND': { id: 'REGION-SAMARKAND', mood: g('#e3d2b6', '#b08a62', '#4a3a30'), label: '사마르칸트·부하라 · 바자르의 건살구·건포도·아몬드 더미', ratio: '16:10' },
  'REGION-TURKIYE': { id: 'REGION-TURKIYE', mood: g('#d7dcc8', '#8d9c78', '#36503f'), label: '튀르키예 아나톨리아 · 헤이즐넛·무화과 과수원 구릉', ratio: '16:10' },
  'FRUIT-GRAPE': { id: 'FRUIT-GRAPE', mood: g('#d9cfe0', '#8a6a8a', '#3a2a3a'), label: '화이트 배경 위 포도 한 송이와 대추야자 (누끼 톤)', ratio: '1:1' },
  'MAT-FOOD': { id: 'MAT-FOOD', mood: g('#efe6d3', '#d8b98a', '#8a6a44'), label: '과육 분말 3색(석류·살구·사과)과 쉐이크 한 잔 · 밝은 석재 상판', ratio: '4:5' },
  'MAT-BEAUTY': { id: 'MAT-BEAUTY', mood: g('#e9d6d2', '#a05a5a', '#3a1e22'), label: '석류껍질 추출물 · 스크럽 파우더', ratio: '4:5' },
  'MAT-INGREDIENT': { id: 'MAT-INGREDIENT', mood: g('#e6e0d2', '#a8977a', '#4a4236'), label: '호두껍질 분쇄물·착즙박 파이버 시료가 담긴 유리 샬레 3개', ratio: '4:5' },
  'DAILY-1': { id: 'DAILY-1', mood: g('#f1e4cf', '#d8b07a', '#9a6a3a'), label: '아침 식탁 · 땅콩버터 토스트', ratio: '4:5' },
  'DAILY-2': { id: 'DAILY-2', mood: g('#ead6d6', '#a04a58', '#4e1c2a'), label: '오후 · 주스 한 잔', ratio: '4:5' },
  'DAILY-3': { id: 'DAILY-3', mood: g('#f0e2cc', '#d09a62', '#6e5238'), label: '티타임 · 코키 과일 스낵', ratio: '4:5' },
  'DAILY-4': { id: 'DAILY-4', mood: g('#f3efe6', '#dcc6bc', '#94586a'), label: '브런치 · 그릭 요거트 볼 위 체리 잼, 자연광 창가 테이블', ratio: '4:5' },
  'DAILY-5': { id: 'DAILY-5', mood: g('#dfe5d6', '#93a57c', '#44543a'), label: '주말 트레킹 · 배낭 옆 바위 위에 놓인 넛바와 견과', ratio: '4:5' },
  'DAILY-6': { id: 'DAILY-6', mood: g('#ece8de', '#c3b59a', '#5e5244'), label: '카페 테이블 · 아이란 한 잔과 쿠르트 플레이팅 (실제 제품 촬영 권장)', ratio: '4:5' },

  /* ---------- ORIGIN ---------- */
  'HERO-ORCHARD': { id: 'HERO-ORCHARD', mood: g('#c9c39a', '#7d8a5c', '#32453a'), label: '우즈베키스탄 과수원', ratio: '16:9' },
  'ORIGIN-SUN': { id: 'ORIGIN-SUN', mood: g('#e6c58a', '#b49141', '#4a4a30'), label: '아침 햇살 · 살구나무', ratio: '4:3' },
  'ORIGIN-CULTURE': { id: 'ORIGIN-CULTURE', mood: g('#e0b07a', '#a8683a', '#4e2a22'), label: '석류', ratio: '4:3' },
  'ORIGIN-FACTORY': { id: 'ORIGIN-FACTORY', mood: g('#d8d8d0', '#8a9088', '#3a4a40'), label: '착즙·제조', ratio: '4:3' },
  'ORIGIN-TURKIYE': { id: 'ORIGIN-TURKIYE', mood: g('#cfd8d2', '#7f9a86', '#2f4a44'), label: '튀르키예 에게해 연안 무화과·석류 과수원과 멀리 보이는 바다', ratio: '16:10' },
  'FRUIT-APRICOT': { id: 'FRUIT-APRICOT', mood: g('#f6d2a0', '#e59a4c', '#a45f1a'), label: '살구', ratio: '1:1' },
  'FRUIT-NUTS': { id: 'FRUIT-NUTS', mood: g('#e0c9a0', '#9c7f3c', '#5b4636'), label: '견과·씨앗', ratio: '1:1' },

  /* ---------- MATERIAL LAB ---------- */
  'LAB-BEAUTY': { id: 'LAB-BEAUTY', mood: g('#5e2230', '#7a2e3e', '#2a1a1e'), label: '석류껍질 추출', ratio: '4:3' },
  'LAB-FOOD': { id: 'LAB-FOOD', mood: g('#f0dcc0', '#e0a868', '#6e7a4a'), label: '과일 분말 쉐이크', ratio: '4:3' },
  'LAB-INDUSTRY': { id: 'LAB-INDUSTRY', mood: g('#d8cfc0', '#8a7a62', '#3a342c'), label: '메쉬 등급별 호두껍질 연마재 분말 · 스테인리스 체와 시료 트레이', ratio: '4:3' },

  /* ---------- 공통 ---------- */
  'ABOUT-TEAM': { id: 'ABOUT-TEAM', mood: g('#e2e0d8', '#9a988e', '#3a3e3a'), label: 'ERMÁK 팀', ratio: '4:3' },
  'ABOUT-OFFICE': { id: 'ABOUT-OFFICE', mood: g('#e8e6dc', '#c4c0b0', '#6a6e62'), label: '인천 청라 오피스 외관 또는 회의실 (실사진 권장)', ratio: '16:9' },
  'PEOPLE-CEO': { id: 'PEOPLE-CEO', mood: g('#e6e4dc', '#b4b2a6', '#5a5c54'), label: '㈜솔컨 CEO 박진태 프로필 (실사진 필수 · AI 생성 금지)', ratio: '4:5' },
  'PROD-JAM-TRIO': { id: 'PROD-JAM-TRIO', mood: g('#f0dcc8', '#c8785a', '#6a2a2a'), label: 'ERMÁK 체리·살구·모과 잼 3종 제품 컷 (실제 제품 촬영 필요)', ratio: '4:5' },
  'PROD-PUREE': { id: 'PROD-PUREE', mood: g('#f3ead3', '#e5a45c', '#a4642a'), label: 'ERMÁK 사과·살구·모과 퓨레 제품 컷 (실제 제품 촬영 필요)', ratio: '4:5' },
  'NEWS-POMEGRANATE': { id: 'NEWS-POMEGRANATE', mood: g('#7a2e3e', '#4e1220'), label: '석류껍질 분말', ratio: '16:10' },
  'NEWS-OFFICE': { id: 'NEWS-OFFICE', mood: g('#dcdad0', '#a8a494', '#4a5048'), label: '공지·소식 기본 썸네일 — SOLKERN 로고가 놓인 미니멀 데스크', ratio: '16:10' },
  'NEWS-CATALOG': { id: 'NEWS-CATALOG', mood: g('#3a3a3a', '#1a1c1a'), label: '카탈로그', ratio: '16:10' },
  'CONTACT-OFFICE': { id: 'CONTACT-OFFICE', mood: g('#e8e6de', '#c6c2b4', '#6e7068'), label: '미팅 테이블 위 ERMÁK 샘플과 카탈로그, 노트북 (상담 장면)', ratio: '4:3' },
};

/** 아직 이미지가 없는 슬롯(= 프롬프트북 대상) */
export const PENDING_IDS = Object.keys(PLACEHOLDERS).filter((id) => !REAL[id] && !CUSTOM_READY.includes(id));
