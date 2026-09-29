/* 제품 카드 공통 무대 조명 — 모든 제품에 동일하게 적용 (위에서 떨어지는 스포트라이트 + 후광 + 바닥 반사) */
export default function ProductStage({ src, alt, dark = true, className = '' }: { src: string; alt: string; dark?: boolean; className?: string }) {
  return (
    <div className={`relative flex items-end justify-center overflow-hidden ${className}`}>
      {/* 스포트라이트 빔 */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[92%] w-[120%] -translate-x-1/2 opacity-80 transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: dark
          ? 'conic-gradient(from 180deg at 50% -8%, transparent 158deg, rgba(255,240,205,.16) 172deg, rgba(255,246,222,.30) 180deg, rgba(255,240,205,.16) 188deg, transparent 202deg)'
          : 'conic-gradient(from 180deg at 50% -8%, transparent 158deg, rgba(255,255,255,.55) 172deg, rgba(255,255,255,.85) 180deg, rgba(255,255,255,.55) 188deg, transparent 202deg)' }} />
      {/* 제품 뒤 후광 — 원형, 중앙 정렬 */}
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full transition duration-700 group-hover:scale-110"
        style={{ background: dark
          ? 'radial-gradient(circle, rgba(255,247,226,.95) 0%, rgba(245,215,150,.70) 18%, rgba(212,180,106,.38) 40%, rgba(180,145,65,.12) 62%, transparent 72%)'
          : 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,250,236,.95) 25%, rgba(243,234,211,.75) 48%, rgba(212,180,106,.22) 66%, transparent 74%)' }} />
      {/* 바닥 반사 */}
      <div aria-hidden className="pointer-events-none absolute bottom-[5%] left-1/2 h-[9%] w-[70%] -translate-x-1/2 rounded-[50%] blur-md"
        style={{ background: dark ? 'radial-gradient(ellipse, rgba(255,236,190,.55), transparent 70%)' : 'radial-gradient(ellipse, rgba(140,111,44,.35), transparent 70%)' }} />
      <img src={src} alt={alt} loading="lazy" draggable={false}
        className="relative z-10 mb-[6%] max-h-[82%] w-auto max-w-[80%] select-none object-contain drop-shadow-[0_24px_28px_rgba(0,0,0,0.55)] transition duration-700 group-hover:-translate-y-2 group-hover:scale-105" />
    </div>
  );
}
