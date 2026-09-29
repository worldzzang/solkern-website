'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import type { Territory } from '@/content/types';
import { BASE_PATHS, CENTRAL_ASIA_PATHS, MAP_H, MAP_W, ORIGIN_PATHS, POINTS, TERRITORY_PATHS } from '@/content/mapData';

/* 라벨 위치 (viewBox 단위 오프셋, 텍스트 정렬) — 동아시아 밀집 구간 겹침 방지용 */
const LABEL: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
  KR: { dx: 9, dy: -7, anchor: 'start' },
  JP: { dx: 9, dy: 4, anchor: 'start' },
  CN: { dx: -9, dy: -6, anchor: 'end' },
  MN: { dx: 0, dy: -11, anchor: 'middle' },
  TW: { dx: 9, dy: 4, anchor: 'start' },
  HK: { dx: -9, dy: -3, anchor: 'end' },
  VN: { dx: -9, dy: 6, anchor: 'end' },
  TH: { dx: -9, dy: 4, anchor: 'end' },
  MY: { dx: -9, dy: 4, anchor: 'end' },
  ID: { dx: 0, dy: 17, anchor: 'middle' },
  PH: { dx: 9, dy: 4, anchor: 'start' },
  AU: { dx: 0, dy: 20, anchor: 'middle' },
  UZ: { dx: 0, dy: -12, anchor: 'middle' },
  TR: { dx: 0, dy: -12, anchor: 'middle' },
};

// 두 점 사이 곡선(위로 볼록한 호)
function arc(a: [number, number], b: [number, number], bend = 0.22) {
  const [x1, y1] = a; const [x2, y2] = b;
  const mx = (x1 + x2) / 2; const my = (y1 + y2) / 2;
  const dx = x2 - x1; const dy = y2 - y1; const len = Math.hypot(dx, dy) || 1;
  let nx = -dy / len; let ny = dx / len;          // 법선 벡터
  if (ny > 0) { nx = -nx; ny = -ny; }              // 항상 위쪽으로 휘도록
  const cx = mx + nx * len * bend; const cy = my + ny * len * bend;
  return `M${x1} ${y1} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2} ${y2}`;
}

// 보이는 영역만 잘라서 표시 (튀르키예 ~ 호주)
const VB = { x: 138, y: 22, w: 702, h: 590 };

export default function TerritoryMap({ t, dark = false, compact = false, hideList = false }: { t: Territory; dark?: boolean; compact?: boolean; hideList?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const countries = t.regions.flatMap((r) => r.countries);
  const nameOf = (c: string) => countries.find((x) => x.code === c)?.name || t.origins.find((o) => o.code === c)?.name || c;
  const hub = POINTS.KR;
  const others = countries.filter((c) => c.code !== 'KR');

  const col = dark
    ? { land: '#2a2a2a', stroke: '#111', direct: '#3a3a3a', label: '#f3ead3', sub: 'rgba(255,255,255,.55)' }
    : { land: '#e4dccb', stroke: '#f7f2e8', direct: '#d6ccb8', label: '#111', sub: '#5b4636' };

  return (
    <div>
      <div className="relative">
        <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} className="h-auto w-full" role="img" aria-label={`${t.title}: ${countries.map((c) => c.name).join(', ')}`}>
          <defs>
            <pattern id={`hatch-${dark ? 'd' : 'l'}`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="5" height="5" fill={col.direct} />
              <line x1="0" y1="0" x2="0" y2="5" stroke={dark ? '#4a4a4a' : '#c4b89f'} strokeWidth="1.6" />
            </pattern>
            <radialGradient id="glow"><stop offset="0" stopColor="#D4B46A" stopOpacity=".55" /><stop offset="1" stopColor="#D4B46A" stopOpacity="0" /></radialGradient>
          </defs>

          {/* 배경 국가 */}
          <g fill={col.land} stroke={col.stroke} strokeWidth="0.6">{BASE_PATHS.map((d, i) => <path key={i} d={d} />)}</g>
          {/* 중앙아시아 — 본사 직접 관리 */}
          <g fill={`url(#hatch-${dark ? 'd' : 'l'})`} stroke={col.stroke} strokeWidth="0.6">{Object.values(CENTRAL_ASIA_PATHS).map((d, i) => <path key={i} d={d} />)}</g>
          {/* 원산지 */}
          <g stroke={col.stroke} strokeWidth="0.6">
            {Object.entries(ORIGIN_PATHS).map(([k, d]) => (
              <motion.path key={k} d={d} fill={k === 'UZ' ? '#7A1E2E' : '#9b3a48'} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
            ))}
          </g>
          {/* 판권 12개국 */}
          <g stroke={col.stroke} strokeWidth="0.6">
            {Object.entries(TERRITORY_PATHS).map(([k, d], i) => (
              <motion.path key={k} d={d}
                fill={active && active !== k ? (dark ? '#8C6F2C' : '#d4b46a') : active === k ? '#E5B84F' : '#B49141'}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                onMouseEnter={() => setActive(k)} onMouseLeave={() => setActive(null)} className="cursor-pointer transition-[fill] duration-300" />
            ))}
          </g>

          {/* 흐름선: 원산지 → 한국 거점 → 11개국 */}
          <g fill="none" strokeLinecap="round">
            <motion.path d={arc(POINTS.UZ, hub, 0.18)} stroke="#E58A3C" strokeWidth="2.2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 1.4, ease: 'easeInOut' }} />
            <motion.path d={arc(POINTS.TR, hub, 0.2)} stroke="#E58A3C" strokeWidth="1.4" strokeDasharray="5 5" initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 0.8 }} viewport={{ once: true }} transition={{ delay: 0.9, duration: 1.6, ease: 'easeInOut' }} />
            {others.map((c, i) => (
              <motion.path key={c.code} d={arc(hub, POINTS[c.code], 0.25)} stroke={dark ? '#D4B46A' : '#8C6F2C'}
                strokeWidth={active === c.code ? 2.2 : 1.1} strokeOpacity={active && active !== c.code ? 0.25 : 0.85}
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ delay: 1.8 + i * 0.08, duration: 0.9, ease: 'easeOut' }} />
            ))}
          </g>

          {/* 거점 · 도시 마커 */}
          {[...countries.map((c) => c.code), 'UZ', 'TR'].map((code, i) => {
            const [x, y] = POINTS[code]; const isHub = code === 'KR'; const isOrigin = code === 'UZ' || code === 'TR';
            const L = LABEL[code];
            return (
              <g key={code} onMouseEnter={() => setActive(code)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
                {isHub && <circle cx={x} cy={y} r="22" fill="url(#glow)" />}
                <motion.circle cx={x} cy={y} r={isHub ? 7 : 4.5} fill={isOrigin ? '#E58A3C' : '#D4B46A'} opacity="0.35"
                  animate={{ r: isHub ? [7, 16, 7] : [4.5, 10, 4.5], opacity: [0.45, 0, 0.45] }} transition={{ repeat: Infinity, duration: 2.8, delay: (i % 6) * 0.35 }} />
                <circle cx={x} cy={y} r={isHub ? 4.6 : 3} fill={isOrigin ? '#E58A3C' : isHub ? '#fff' : dark ? '#F3EAD3' : '#111'} stroke={isHub ? '#B49141' : 'none'} strokeWidth="2" />
                {!compact && (
                  <text x={x + L.dx} y={y + L.dy} textAnchor={L.anchor} className="hidden select-none sm:block" fontSize={isHub ? 13 : 11} fontWeight={isHub || active === code ? 800 : 600} fill={active === code ? '#E5B84F' : col.label} style={{ paintOrder: 'stroke', stroke: dark ? '#111' : '#f7f2e8', strokeWidth: 3 }}>
                    {nameOf(code)}{isHub ? ` · ${t.hub}` : ''}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 범례 */}
        <div className={`mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[11px] ${dark ? 'text-white/70' : 'text-ink-3'}`}>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm bg-gold" />{t.legendTerritory}</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm bg-pome" />{t.legendOrigin}</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-4 rounded-sm" style={{ background: `repeating-linear-gradient(45deg, ${col.direct} 0 3px, ${dark ? '#4a4a4a' : '#c4b89f'} 3px 5px)` }} />{t.legendDirect}</span>
        </div>
      </div>

      {/* 텍스트 목록 (모바일에서는 지도 라벨 대신 이 목록이 기준) — B2B처럼 별도 표가 있으면 PC에서는 숨김 */}
      <div className={`mt-8 grid gap-5 sm:grid-cols-3 ${hideList ? 'hidden' : ''}`}>
        {t.regions.map((r) => (
          <div key={r.name}>
            <p className={`text-[11px] font-bold tracking-[0.18em] ${dark ? 'text-gold-light' : 'text-gold-dark'}`}>{r.name.toUpperCase()} · {r.countries.length}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {r.countries.map((c) => (
                <button key={c.code} type="button" onMouseEnter={() => setActive(c.code)} onMouseLeave={() => setActive(null)} onClick={() => setActive(active === c.code ? null : c.code)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${active === c.code ? 'border-gold bg-gold text-white' : dark ? 'border-white/15 text-white/85 hover:border-gold' : 'border-black/10 bg-white/70 text-ink hover:border-gold'}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className={`mt-3 text-[11px] sm:hidden ${hideList ? '!hidden' : ''} ${dark ? 'text-white/45' : 'text-ink-3/70'}`}>{t.tapHint}</p>
    </div>
  );
}
