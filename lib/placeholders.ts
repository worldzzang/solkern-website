// 플레이스홀더 이미지 정의: id → 설명 + 그라데이션 무드
// 실제 이미지가 준비되면 public/images/custom/{id}.webp 로 저장하고 CUSTOM_READY 에 id를 추가하세요.
export const CUSTOM_READY: string[] = [];

export type PlaceholderSpec = { id: string; mood: string; label: string };

export const PLACEHOLDERS: Record<string, PlaceholderSpec> = {
  'HERO-ORCHARD': { id: 'HERO-ORCHARD', mood: 'linear-gradient(135deg,#2b1f16 0%,#5b4636 45%,#8c6f2c 100%)', label: '우즈베키스탄 과수원 · 역광' },
  'ORIGIN-SUN': { id: 'ORIGIN-SUN', mood: 'linear-gradient(160deg,#e58a3c 0%,#b49141 50%,#5b4636 100%)', label: '아침 햇살 · 석류나무' },
  'ORIGIN-SOIL': { id: 'ORIGIN-SOIL', mood: 'linear-gradient(160deg,#5b4636 0%,#8a6a4a 60%,#c9a86a 100%)', label: '토양 · 관개수로' },
  'ORIGIN-CULTURE': { id: 'ORIGIN-CULTURE', mood: 'linear-gradient(160deg,#e58a3c 0%,#c26b2b 50%,#7a1e2e 100%)', label: '살구 건조 · 바자르' },
  'ORIGIN-FACTORY': { id: 'ORIGIN-FACTORY', mood: 'linear-gradient(160deg,#222 0%,#3a3a3a 50%,#5e7a4a 100%)', label: '생산 라인' },
  'ORIGIN-TURKIYE': { id: 'ORIGIN-TURKIYE', mood: 'linear-gradient(160deg,#1f3b4d 0%,#5e7a4a 50%,#e58a3c 100%)', label: '튀르키예 과수원' },
  'FRUIT-APRICOT': { id: 'FRUIT-APRICOT', mood: 'radial-gradient(circle at 40% 40%,#f6b26b,#e58a3c 60%,#b45f1a)', label: '살구' },
  'FRUIT-NUTS': { id: 'FRUIT-NUTS', mood: 'radial-gradient(circle at 40% 40%,#d9b98a,#8c6f2c 60%,#5b4636)', label: '견과·씨앗' },
  'FRUIT-GRAPE': { id: 'FRUIT-GRAPE', mood: 'radial-gradient(circle at 40% 40%,#8a3a5a,#4e1220 60%,#2b0a12)', label: '포도·대추야자' },
  'MAT-FOOD': { id: 'MAT-FOOD', mood: 'linear-gradient(160deg,#f7f2e8 0%,#e9d9b8 50%,#e58a3c 100%)', label: '과육 분말 · 쉐이크' },
  'MAT-BEAUTY': { id: 'MAT-BEAUTY', mood: 'linear-gradient(160deg,#f7f2e8 0%,#e0c8c8 50%,#7a1e2e 100%)', label: '석류껍질 추출물 · 스크럽' },
  'MAT-INGREDIENT': { id: 'MAT-INGREDIENT', mood: 'linear-gradient(160deg,#f7f2e8 0%,#d9cdb8 50%,#5b4636 100%)', label: '파이버 · 산업 소재' },
  'LAB-BEAUTY': { id: 'LAB-BEAUTY', mood: 'linear-gradient(160deg,#4e1220 0%,#7a1e2e 50%,#b49141 100%)', label: '석류껍질 추출 · 랩' },
  'LAB-FOOD': { id: 'LAB-FOOD', mood: 'linear-gradient(160deg,#e58a3c 0%,#f3ead3 60%,#5e7a4a 100%)', label: '과일 분말 쉐이크' },
  'LAB-INDUSTRY': { id: 'LAB-INDUSTRY', mood: 'linear-gradient(160deg,#222 0%,#5b4636 60%,#b49141 100%)', label: '호두껍질 연마재' },
  'SECOND-BYPRODUCT': { id: 'SECOND-BYPRODUCT', mood: 'linear-gradient(160deg,#7a1e2e 0%,#5b4636 50%,#222 100%)', label: '부산물 · 껍질·씨앗·박' },
  'MARKET-MAP': { id: 'MARKET-MAP', mood: 'linear-gradient(160deg,#111 0%,#222 60%,#3a3a3a 100%)', label: '아시아 유통 네트워크' },
  'TRUST-LAB': { id: 'TRUST-LAB', mood: 'linear-gradient(160deg,#f7f2e8 0%,#efe7d8 60%,#d4b46a 100%)', label: '시험성적서 · 품질 서류' },
  'ABOUT-TEAM': { id: 'ABOUT-TEAM', mood: 'linear-gradient(160deg,#111 0%,#3a3a3a 60%,#b49141 100%)', label: '팀 · 오피스' },
  'ABOUT-OFFICE': { id: 'ABOUT-OFFICE', mood: 'linear-gradient(160deg,#efe7d8 0%,#d9cdb8 60%,#8c6f2c 100%)', label: '인천 청라 오피스' },
  'PROD-TAHINI': { id: 'PROD-TAHINI', mood: 'radial-gradient(circle at 50% 40%,#e9d9b8,#c9a86a 70%,#8c6f2c)', label: '참깨 페이스트' },
  'PROD-JAM-TRIO': { id: 'PROD-JAM-TRIO', mood: 'radial-gradient(circle at 50% 40%,#e58a3c,#7a1e2e 70%,#4e1220)', label: '체리·살구·모과 잼' },
  'PROD-FRUITSNACK': { id: 'PROD-FRUITSNACK', mood: 'radial-gradient(circle at 50% 40%,#f6b26b,#e58a3c 70%,#7a1e2e)', label: 'QOQI · Challpak' },
  'PROD-PUREE': { id: 'PROD-PUREE', mood: 'radial-gradient(circle at 50% 40%,#f3ead3,#e58a3c 70%,#b45f1a)', label: '과일 퓨레' },
  'NEWS-POMEGRANATE': { id: 'NEWS-POMEGRANATE', mood: 'linear-gradient(160deg,#7a1e2e,#4e1220)', label: '석류껍질 분말' },
  'NEWS-OFFICE': { id: 'NEWS-OFFICE', mood: 'linear-gradient(160deg,#b49141,#5b4636)', label: '법인 설립' },
  'NEWS-CATALOG': { id: 'NEWS-CATALOG', mood: 'linear-gradient(160deg,#222,#111)', label: '카탈로그' },
  'CONTACT-OFFICE': { id: 'CONTACT-OFFICE', mood: 'linear-gradient(160deg,#111 0%,#222 60%,#b49141 100%)', label: '오피스 · 미팅' },
};
