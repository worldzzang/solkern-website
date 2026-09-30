/* 제품 카드 공통 무대 — v2: 오설록식 담백한 화이트/크림 타일 + 은은한 바닥 그림자 (모든 제품에 동일 적용) */
export default function ProductStage({ src, alt, dark = false, className = '' }: { src: string; alt: string; dark?: boolean; className?: string }) {
  return (
    <div className={`relative flex items-end justify-center overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[48%] aspect-square w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-700 group-hover:scale-105"
        style={{ background: dark
          ? 'radial-gradient(circle, rgba(255,247,226,.55) 0%, rgba(212,180,106,.22) 45%, transparent 70%)'
          : 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,.7) 40%, transparent 72%)' }} />
      <div aria-hidden className="pointer-events-none absolute bottom-[7%] left-1/2 h-[7%] w-[62%] -translate-x-1/2 rounded-[50%] blur-md"
        style={{ background: dark ? 'radial-gradient(ellipse, rgba(255,236,190,.4), transparent 70%)' : 'radial-gradient(ellipse, rgba(60,50,30,.22), transparent 70%)' }} />
      <img src={src} alt={alt} loading="lazy" draggable={false}
        className="relative z-10 mb-[8%] max-h-[80%] w-auto max-w-[76%] select-none object-contain drop-shadow-[0_16px_20px_rgba(0,0,0,0.18)] transition duration-700 group-hover:-translate-y-1.5 group-hover:scale-[1.04]" />
    </div>
  );
}
