// 지도 데이터 재생성: cd scripts && npm i d3-geo@3 topojson-client@3 world-atlas@2 && node gen-map.mjs (출력 경로는 아래 writeFileSync 참고)
import { geoNaturalEarth1, geoPath, geoBounds } from 'd3-geo';
import { feature } from 'topojson-client';
import fs from 'fs';
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json'));
const fc = feature(topo, topo.objects.countries);
const topoLo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-110m.json'));
const fcLo = feature(topoLo, topoLo.objects.countries);
const W = 1000, H = 620;
// 관심 영역: 튀르키예(서) ~ 일본(동), 몽골(북) ~ 호주 남단(남)
const grid = []; for (let lon = 22; lon <= 158; lon += 4) for (let lat = -44; lat <= 56; lat += 4) grid.push([lon, lat]);
const ext = { type: 'MultiPoint', coordinates: grid };
const proj = geoNaturalEarth1().fitExtent([[0, 0], [W, H]], ext);
proj.clipExtent([[-20, -20], [W + 20, H + 20]]);
const path = geoPath(proj).digits(0);
const pathLo = geoPath(proj).digits(0);
const TERR = { '410': 'KR', '156': 'CN', '392': 'JP', '158': 'TW', '344': 'HK', '496': 'MN', '704': 'VN', '764': 'TH', '458': 'MY', '360': 'ID', '608': 'PH', '036': 'AU' };
const ORIGIN = { '860': 'UZ', '792': 'TR' };
const CA = { '398': 'KZ', '417': 'KG', '762': 'TJ', '795': 'TM' };
const base = [], terr = {}, origin = {}, ca = {};
for (const f of fc.features) {
  const d = path(f); if (!d) continue;
  const [[x0, y0], [x1, y1]] = geoPath(proj).bounds(f);
  if (!isFinite(x0) || x1 < -20 || x0 > W + 20 || y1 < -20 || y0 > H + 20) continue;
  // 같은 국가코드(본토+부속도서)는 합침
  const add = (o, k) => { o[k] = (o[k] || '') + d; };
  if (TERR[f.id]) add(terr, TERR[f.id]); else if (ORIGIN[f.id]) add(origin, ORIGIN[f.id]); else if (CA[f.id]) add(ca, CA[f.id]);
}
for (const f of fcLo.features) {
  if (TERR[f.id] || ORIGIN[f.id] || CA[f.id]) continue;
  const d = pathLo(f); if (!d) continue;
  const [[x0, y0], [x1, y1]] = geoPath(proj).bounds(f);
  if (!isFinite(x0) || x1 < -20 || x0 > W + 20 || y1 < -20 || y0 > H + 20) continue;
  base.push(d);
}
// 연속 중복 좌표 제거 (반올림 후 생기는 L x,y 반복)
const dedupe = (d) => d.replace(/(L-?\d+,-?\d+)(\1)+/g, '$1');
for (const o of [terr, origin, ca]) for (const k in o) o[k] = dedupe(o[k]);
for (let i = 0; i < base.length; i++) base[i] = dedupe(base[i]);
const pt = (lon, lat) => proj([lon, lat]).map((v) => Math.round(v * 10) / 10);
const CITY = {
  KR: [126.98, 37.57], CN: [116.4, 39.9], JP: [139.69, 35.69], TW: [121.56, 25.03], HK: [114.17, 22.32], MN: [106.92, 47.92],
  VN: [105.85, 21.03], TH: [100.5, 13.75], MY: [101.69, 3.14], ID: [106.85, -6.21], PH: [120.98, 14.6], AU: [151.21, -33.87],
  UZ: [69.24, 41.3], TR: [32.85, 39.93],
};
const points = Object.fromEntries(Object.entries(CITY).map(([k, v]) => [k, pt(...v)]));
const out = `// 자동 생성 파일 — Natural Earth 1:50m (world-atlas), Natural Earth 투영. 수정하지 마세요 (scripts/gen-map.mjs)
export const MAP_W = ${W};
export const MAP_H = ${H};
export const BASE_PATHS: string[] = ${JSON.stringify(base)};
export const TERRITORY_PATHS: Record<string, string> = ${JSON.stringify(terr)};
export const ORIGIN_PATHS: Record<string, string> = ${JSON.stringify(origin)};
export const CENTRAL_ASIA_PATHS: Record<string, string> = ${JSON.stringify(ca)};
export const POINTS: Record<string, [number, number]> = ${JSON.stringify(points)};
`;
fs.writeFileSync(new URL('../content/mapData.ts', import.meta.url), out);
console.log('bytes', out.length, 'base', base.length, Object.keys(terr), Object.keys(origin), Object.keys(ca), points);
