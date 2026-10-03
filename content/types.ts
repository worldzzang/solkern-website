export type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'uz' | 'tr';

export type Product = {
  id: string;
  name: string;
  sub?: string;
  image?: string; // /images/products/xxx.webp
  placeholder?: string; // placeholder id when no image
  sizes?: string;
  tags?: string[];
};

export type Category = {
  id: string;
  name: string;
  en: string;
  brand: 'ERMÁK' | 'ASIL';
  desc: string;
  point: string;
  cover?: string;
  placeholder?: string;
  products: Product[];
};

export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  summary: string;
  body?: string;
  placeholder?: string;
  image?: string;
};

export type Territory = {
  eyebrow: string; title: string; body: string; countLabel: string;
  regions: { name: string; countries: { code: string; name: string; city: string }[] }[];
  origins: { code: string; name: string; role: string }[];
  hub: string; legendTerritory: string; legendOrigin: string; legendDirect: string; note: string; tapHint: string;
};

export type Dict = {
  meta: { title: string; description: string };
  nav: { label: string; href: string }[];
  common: {
    more: string; contact: string; catalog: string; b2b: string; viewProducts: string; viewMaterial: string;
    scroll: string; langLabel: string; readMore: string; back: string; send: string; sending: string;
    sent: string; error: string; required: string; officialDistributor: string;
  };
  home: {
    hero: { eyebrow: string; title: string; titleAccent: string; body: string; cta1: string; cta2: string };
    journey: { eyebrow: string; title: string; steps: { key: string; label: string; title: string; body: string }[] };
    land: { eyebrow: string; title: string; body: string; facts: { value: string; label: string }[]; cta: string };
    fruit: { eyebrow: string; title: string; body: string; items: { name: string; product: string; material: string; image?: string; placeholder?: string }[]; cta: string };
    collection: { eyebrow: string; title: string; body: string; cta: string };
    featured: { eyebrow: string; title: string; body: string; cta: string; tags: string[] };
    secondLife: { eyebrow: string; title: string; body: string; flow: { label: string; desc: string }[]; cta: string };
    material: { eyebrow: string; title: string; body: string; cards: { title: string; from: string; to: string; desc: string; placeholder: string }[]; cta: string };
    market: { eyebrow: string; title: string; body: string; nodes: { name: string; role: string }[]; cta: string };
    trust: { eyebrow: string; title: string; body: string; items: { title: string; desc: string }[]; certs: string[]; cta: string; note: string };
    contact: { eyebrow: string; title: string; body: string; cta1: string; cta2: string };
    daily: { eyebrow: string; title: string; body: string; captions: string[] };
    timeline: { eyebrow: string; title: string; items: { year: string; title: string; desc: string }[] };
  };
  solkern: {
    hero: { eyebrow: string; title: string; body: string };
    statement: string;
    identity: { title: string; body: string }[];
    business: { title: string; desc: string; items: string[] }[];
    partners: { name: string; role: string; desc: string }[];
    info: { label: string; value: string }[];
    founderQuote: { quote: string; who: string };
  };
  origin: {
    hero: { eyebrow: string; title: string; body: string };
    chapters: { num: string; title: string; body: string; placeholder: string; note: string }[];
    regions: { name: string; desc: string; crops: string[] }[];
    turkiye: { title: string; body: string; placeholder: string };
    disclaimer: string;
  };
  ermak: {
    hero: { eyebrow: string; title: string; body: string };
    brandStory: { title: string; body: string; facts: { value: string; label: string }[] };
    newProducts: { badge: string; title: string; body: string; cta: string };
    categoriesTitle: string;
    categories: Category[];
    korea: { title: string; body: string; phases: { phase: string; items: string; channel: string }[] };
    cta: { title: string; body: string; button: string };
  };
  materialLab: {
    hero: { eyebrow: string; title: string; body: string };
    thesis: { title: string; body: string };
    tracks: { id: string; title: string; en: string; body: string; materials: string[]; stage: string; placeholder: string }[];
    process: { step: string; title: string; desc: string }[];
    principles: { title: string; desc: string }[];
    cta: { title: string; body: string; button: string };
  };
  b2b: {
    hero: { eyebrow: string; title: string; body: string };
    services: { id: string; title: string; desc: string; bullets: string[] }[];
    steps: { step: string; title: string; desc: string }[];
    docs: string[];
    faq: { q: string; a: string }[];
    cta: { title: string; button: string };
  };
  news: { hero: { eyebrow: string; title: string; body: string }; empty: string; items: NewsItem[] };
  contact: {
    hero: { eyebrow: string; title: string; body: string };
    form: {
      name: string; company: string; email: string; phone: string; country: string; type: string; typeOptions: string[];
      product: string; quantity: string; message: string; agree: string; submit: string; success: string; successBody: string;
      privacy: string;
    };
    info: { label: string; value: string; href?: string }[];
    officeTitle: string;
    address: string;
  };
  territory: Territory;
  ui: {
    langName: string;
    sections: { solkernBusiness: string; solkernPartners: string; companyInfo: string; originRegions: string; labTracks: string; labProcess: string; b2bServices: string; b2bProcess: string; b2bFaq: string };
    originMarquee: string[];
    table: { region: string; country: string; city: string };
    regionsLabel: string; originsLabel: string;
    prev: string; next: string;
    productNote: string;
    countryPlaceholder: string;
    privacy: { title: string; intro: string; items: string[]; officer: string };
  };
  footer: { tagline: string; company: string; ceo: string; regNo: string; address: string; email: string; tel: string; copyright: string; links: { label: string; href: string }[] };
};
