import type { Dict } from './types';
import { ko } from './ko';
import { en } from './en';

// 日本語コピーは機械翻訳ドラフトです — 公開前にネイティブレビューを推奨します。
const catName: Record<string, string> = {
  juice: 'ジュース・ネクター', paste: 'ナッツバター・ペースト', jam: 'ジャム・コンフィチュール・ソース', seeds: 'ひまわりの種・シード類',
  nuts: 'ナッツ類', qurt: 'クルト・発酵乳スナック', bar: 'ナチュラルナッツバー', snack: 'フルーツスナック QOQI・Challpak', other: 'リングクラッカー・ピューレ',
};
const catDesc: Record<string, string> = {
  juice: 'りんご・マルメロ・ざくろ・りんごビーツ・チェリー・アプリコット。ストレート果汁とフルーツネクター。',
  paste: 'ピーナッツ・カシュー・ごま（タヒニ）ペーストとデーツのコンフィチュール。',
  jam: 'ざくろ・ぶどう・チェリー・アプリコット・デーツ・マルメロのジャム、ざくろ・チェリーソース。',
  seeds: '黒・白ひまわりの種（有塩／無塩／ロースト）。小袋から2kgの大容量まで。',
  nuts: 'アーモンド・カシュー・ピスタチオ・ピーナッツ・ひまわりの種の実・かぼちゃの種、ナッツミックス、ナッツ＆ドライフルーツミックス。',
  qurt: '中央アジア伝統の乾燥発酵乳スナック：クルト、ビオクルト、クルトバ・アイラン飲料。',
  bar: 'かぼちゃの種・アーモンド・ごま・ミックスナッツ・ピーナッツ・ひまわりの種のバー。',
  snack: '2026/27新製品：完熟アプリコット・柿・アジュワデーツのピューレをやさしく乾燥させたQOQIと、アプリコット・チェリーのフルーツレザーChallpak。「果物の第三の状態」。',
  other: '乾燥リングパン（テシククルチャ／スシュキ3種）と、りんご・アプリコット・マルメロのピューレ。',
};
const catPoint: Record<string, string> = {
  juice: '産地ストーリーに最も直結するヒーローカテゴリー',
  paste: 'ナチュラルスプレッドとしてのポジショニング・ブランチ／ベーカリーB2B',
  jam: 'ヨーグルト・ブランチ・ベーカリー・外食B2B',
  seeds: '小袋と大容量を並行展開・会員制倉庫店候補',
  nuts: '手軽なヘルシースナック・オンラインテストSKU候補',
  qurt: '中央アジアらしさが際立つ・消費者教育型ローンチ',
  bar: '手軽なヘルシースナック・オンラインテストSKU候補',
  snack: '韓国の消費者にとって最も新しいフォーマット・オンラインテストSKU第1候補',
  other: '現地色の強いライン・二次またはテストライン',
};
const prodName: Record<string, string> = {
  j1: 'ざくろジュース', j2: 'りんごジュース', j3: 'マルメロジュース', j4: 'チェリージュース', j5: 'アプリコットネクター', j6: 'りんご・ビーツジュース',
  p1: 'ピーナッツバター', p2: 'カシューバター', p3: 'ごまペースト（タヒニ）', p4: 'デーツコンフィチュール',
  m1: 'ざくろジャム', m2: 'ぶどうジャム', m3: 'チェリー・アプリコット・マルメロジャム', m4: 'チェリーソース・ざくろソース',
  s1: '黒ひまわりの種', s2: '白ひまわりの種', s3: 'ローストひまわりの種 大容量',
  n1: 'アーモンド', n2: 'カシューナッツ', n3: 'ひまわりの種（むき実）', n4: 'ナッツミックス', n5: '塩味ナッツミックス', n6: 'ナッツ＆ドライフルーツミックス', n7: '塩味かぼちゃの種（殻付き）',
  q1: 'ビオクルト', q2: 'クルト（ボール）', q3: '唐辛子クルト', q4: 'クルトバ', q5: 'バジルアイラン', q6: 'バジルクルト', q7: '角型バジルクルト', q8: 'ハードクルト（トシュクルト）',
  b1: 'かぼちゃの種バー', b2: 'アーモンドバー', b3: 'ごま・ひまわりの種バー',
  o1: '塩味リングクラッカー', o2: 'ステビア・白ごまリングクラッカー', o3: '白ごま・ブラッククミンリングクラッカー', o12: 'フルーツピューレ',
  o4: 'アプリコット QOQI', o5: '柿 QOQI', o6: 'アジュワデーツ QOQI', o7: 'アプリコット Challpak（バルガク）', o8: 'アプリコット Challpak（カンテク）', o9: 'チェリー Challpak', o10: 'QOQI 大容量（アプリコット）', o11: 'Challpak 大容量（チェリー）',
};

const ADDRESS = '韓国 仁川広域市 西区 中峰大路612番ギル10-20 5階 505-J341号（青羅プラザ）';

export const ja: Dict = {
  meta: {
    title: 'SOLKERN | 産地から新たな価値へ — ウズベキスタン・トルコの自然食品と素材R&D',
    description:
      'SOLKERNは、ウズベキスタンとトルコの自然食品ブランドERMÁK・ASILをアジア市場に紹介し、韓国の加工技術で果実原料と副産物を新たな素材へと生まれ変わらせます。',
  },
  nav: ko.nav,
  common: {
    more: 'もっと見る', contact: 'お問い合わせ', catalog: 'カタログ請求', b2b: 'B2Bお問い合わせ',
    viewProducts: 'ERMÁK製品を見る', viewMaterial: '素材・B2B', scroll: 'SCROLL', langLabel: '言語',
    readMore: '続きを読む', back: '一覧へ戻る', send: '送信', sending: '送信中…', sent: '送信完了',
    error: '送信に失敗しました。しばらくしてから再度お試しください。', required: '必須', officialDistributor: 'ERMÁK アジア共同進出 公式パートナー',
  },
  home: {
    hero: {
      eyebrow: 'Quality Without Borders · ERMÁK アジア共同進出 公式パートナー · 素材R&D',
      title: '産地から', titleAccent: '新たな価値へ',
      body: 'ウズベキスタンの太陽が育てた果実がアジアの食卓へ。そして韓国の技術で、もう一度価値になります。',
      cta1: 'ERMÁK製品を見る', cta2: '素材・B2B',
    },
    journey: {
      eyebrow: 'THE SOLKERN WAY',
      title: '良い原料を見つけ、市場をつくり、残ったものに新たな命を吹き込みます。',
      steps: [
        { key: 'origin', label: '01 ORIGIN', title: '育む大地', body: '強い日差し、大陸性気候、長い果樹園文化。ウズベキスタンとトルコの果実とナッツは、物語から始まります。' },
        { key: 'product', label: '02 PRODUCT', title: 'ERMÁK完成品', body: '1992年から続くERMÁKのジュース・ジャム・ナッツバター・シード・クルト・ナッツバー。SOLKERNがアジアに紹介します。' },
        { key: 'second', label: '03 SECOND LIFE', title: '工場の先にある価値', body: '生産後に残る果皮・種・搾りかすを、韓国の加工技術で食品・ビューティー・産業素材へ。' },
        { key: 'market', label: '04 MARKET', title: 'アジア流通・B2B', body: '完成品流通、原料供給、OEM/ODM。韓国を拠点に、アジア各国のパートナーと市場を築きます。' },
      ],
    },
    land: {
      eyebrow: '02 · THE LAND', title: 'Why Central Asia, Why Uzbekistan',
      body: '強い日照、大陸性気候、何世紀にもわたる果樹園文化が、多彩な果実とナッツを育てます。良い製品は良い原料から始まります。',
      facts: [
        { value: '300+', label: '年間晴天日数（地域推計）' },
        { value: '1992', label: 'ERMÁK創業' },
        { value: '2', label: '主要産地 — ウズベキスタン・トルコ' },
        { value: '9', label: 'ERMÁK製品カテゴリー' },
      ],
      cta: '産地ストーリーを読む',
    },
    fruit: {
      eyebrow: '03 · THE FRUIT', title: 'One Origin, Many Possibilities',
      body: 'ざくろ、アプリコット、チェリー、りんご、ぶどう、ナッツ。ひとつの原料が製品にも素材にも広がります。',
      items: [
        { name: 'ざくろ', product: 'ジュース・ジャム・ソース', material: '果皮エキス・種子パウダー', image: '/images/fruits/pomegranate.webp' },
        { name: 'りんご', product: 'ジュース・ピューレ', material: '搾りかすファイバー', image: '/images/fruits/apple.webp' },
        { name: 'チェリー', product: 'ジュース・ジャム・ソース', material: '種子スクラブパウダー', image: '/images/fruits/cherry.webp' },
        { name: 'アプリコット', product: 'QOQI・Challpak・ネクター・ジャム', material: '種子・果皮素材', placeholder: 'FRUIT-APRICOT' },
        { name: 'ナッツ・シード', product: 'ナッツバター・バー・ロースト', material: 'ナッツ副産物の食品素材', placeholder: 'FRUIT-NUTS' },
        { name: 'ぶどう・デーツ', product: 'ジャム・コンフィチュール', material: 'ぶどう種子・果皮素材', placeholder: 'FRUIT-GRAPE' },
      ],
      cta: '果実ごとの可能性を見る',
    },
    collection: { eyebrow: '04 · ERMÁK COLLECTION', title: 'The Taste You Trust', body: 'ジュース・ネクター、ナッツバター、ジャム・ソース、シード・ナッツ、クルト、ナッツバー — ERMÁKの代表ラインナップ。', cta: '製品カタログを請求' },
    featured: { eyebrow: '05 · FEATURED PRODUCTS', title: '韓国ローンチ優先製品', body: '韓国ローンチはシード・ナッツ、ジャム・ペースト、ジュース、クルトなど、チャネルに合う品目から段階的に進めます。', cta: 'B2Bお問い合わせ', tags: ['オンラインテストSKU', '会員制倉庫店向け大容量', '外食・ベーカリーB2B', '小袋コンビニエンス'] },
    secondLife: {
      eyebrow: '06 · SECOND LIFE', title: 'Nothing Ends at the Factory',
      body: '原料の価値は生産が終わっても終わりません。果皮・種・搾りかすは、韓国の加工技術で新たな素材になります。',
      flow: [
        { label: '工場副産物', desc: 'ざくろ果皮・果実の種・搾りかす・ナッツ副産物' },
        { label: '一次加工', desc: '洗浄・（凍結）乾燥・粉砕・粒度設計' },
        { label: '韓国R&D', desc: '分析・抽出・規格化・試験成績書' },
        { label: '新素材', desc: '食品・ビューティー・産業B2B供給' },
      ],
      cta: 'MATERIAL LABへ',
    },
    material: {
      eyebrow: '07 · MATERIAL VALUE', title: 'Food · Beauty · Ingredient',
      body: 'りんごの搾りかすは食物繊維に、ざくろの果皮は化粧品エキスに、ナッツ副産物は食品素材になり得ます。',
      cards: [
        { title: 'FOOD', from: '果実・穀物パウダー', to: 'RTE/RTDシェイク・食物繊維', desc: 'ウズベキスタン産果肉パウダーを韓国のレシピで商品化', placeholder: 'MAT-FOOD' },
        { title: 'BEAUTY', from: 'ざくろ果皮・果実の種', to: 'エキス・天然スクラブパウダー', desc: 'ポリフェノール規格化エキスと粒度別スクラブ素材', placeholder: 'MAT-BEAUTY' },
        { title: 'INGREDIENT', from: '搾りかす・ナッツの殻', to: 'ファイバー・産業素材', desc: '書類を完備した規格化パウダーをB2Bで供給', placeholder: 'MAT-INGREDIENT' },
      ],
      cta: '素材協業のご相談',
    },
    market: {
      eyebrow: '08 · MARKET', title: 'アジア流通・B2Bネットワーク',
      body: 'SOLKERNは韓国を拠点に、アジア太平洋12か国へERMÁK完成品を供給し、韓国での二次加工素材事業を構築しています。',
      nodes: [
        { name: 'UZBEKISTAN', role: '原料・ERMÁK生産' },
        { name: 'TÜRKİYE', role: '果実原料・副産物' },
        { name: 'KOREA', role: 'SOLKERN R&D・加工・流通' },
        { name: 'ASIA-PACIFIC 12', role: 'テリトリー12か国・完成品／原料B2B' },
      ],
      cta: 'パートナーシップのお問い合わせ',
    },
    trust: {
      eyebrow: '09 · TRUST', title: 'データで裏付ける産地ストーリー',
      body: '分析データ、認証、輸入基準、品質書類に裏付けられた原料と製品のみをご提案します。',
      items: [
        { title: '試験成績書', desc: '残留農薬・重金属・微生物など安全性試験に基づく提案' },
        { title: '輸入基準の事前検討', desc: '韓国食品公典・輸入食品安全基準に照らした品目別事前確認' },
        { title: '表示の検証', desc: '確認済みの表現のみを使用し、未検証の表現は表示しません' },
        { title: '認証取得工場', desc: 'ISO 9001・ISO 14001・ISO 22000（HACCP）・HALAL認証の生産者' },
      ],
      certs: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 22000:2018 (HACCP)', 'HALAL UAE.S GSO 2055-1'],
      cta: '品質書類を請求',
      note: '※ 認証はERMÁK生産法人（ERMAKPLUS LLC・ZAFARHON LLC）が保有するもので、品目ごとの適用範囲はご請求時に確認します。',
    },
    contact: { eyebrow: '10 · CONTACT', title: 'SOLKERNとパートナーに', body: '韓国・アジアでの完成品流通、原料供給、OEM/ODM、協業をご提案ください。', cta1: 'お問い合わせ', cta2: 'カタログ請求' },
    daily: {
      eyebrow: 'SOLKERN DAILY',
      title: '日常のなかのERMÁK',
      body: '朝の食卓から午後の一杯まで。ウズベキスタンの果実が韓国の一日に溶け込む場面です。',
      captions: ['朝 · ピーナッツバタートースト', '午後 · ザクロジュースを一杯', 'ティータイム · QOQIフルーツスナック', 'ブランチ · ヨーグルトとチェリージャム', '週末 · トレッキングとナッツバー', 'カフェ · アイランとクルト'],
    },
    timeline: {
      eyebrow: 'SINCE 1992',
      title: '原産地の大地から韓国の技術へ、つながる時間',
      items: [
        { year: '1992', title: 'ERMÁK創業', desc: 'ウズベキスタン・タシケントで自然食品ブランドERMÁKが始まります。' },
        { year: '2008', title: 'ヒマワリの種の工場加工 · クルトの工場生産', desc: 'ウズベキスタンで初めてヒマワリの種を工場で加工・包装し、伝統発酵乳クルトを工場生産します。' },
        { year: '2025', title: 'ERMÁK アジア太平洋12カ国の販売権契約', desc: 'CATKIN社がERMÁK完成品のアジア太平洋12カ国の販売権を確保します。' },
        { year: '2026.06', title: 'ERMÁK · ASIL 韓国語カタログ発行', desc: 'ERMÁK 8カテゴリーとASILジュース・ソースの韓国語カタログを発行します。' },
        { year: '2026.08', title: 'SOLKERN設立', desc: '仁川・青羅にSOLKERNを設立し、ERMÁKアジア共同進出公式パートナーとして流通・原料R&Dを開始します。' },
        { year: '2026.09', title: 'ザクロ果皮パウダー第1次発注', desc: '凍結乾燥ザクロ果皮パウダー100kgを発注し、MATERIAL LAB最初のプロジェクトが始まります。' },
      ],
    },
  },
  solkern: {
    hero: { eyebrow: 'ABOUT SOLKERN', title: '良い原料を見つけ、市場をつくり、残ったものに新たな命を吹き込みます。', body: '株式会社SOLKERNは、ウズベキスタンとトルコの自然食品と果実原料を韓国・アジアへつなぐ、原料・流通・R&Dカンパニーです。' },
    statement: 'Origin → Product → Second Life → Market。中央アジアの原料からERMÁK完成品、そして韓国の二次加工素材まで、ひとつの流れでつなぎます。',
    identity: [
      { title: 'ERMÁK アジア共同進出 公式パートナー', body: '1992年創業のウズベキスタンを代表する自然食品ブランドERMÁKと、ジュースブランドASILの完成品を、韓国およびアジア太平洋12か国に紹介します。' },
      { title: '素材R&D・韓国での加工', body: '果実原料と生産副産物（果皮・種・搾りかす）を分析・加工・規格化し、食品・ビューティー・産業素材にします。' },
      { title: 'データで完成する信頼', body: '感動は自然から始まり、B2Bの信頼は試験成績書・認証・輸入基準の検討で完成します。' },
    ],
    business: [
      { title: '完成品流通', desc: '韓国・アジアでのERMÁK・ASIL製品', items: ['公式オンラインブランドストア', '会員制倉庫店・大手小売', '外食・ベーカリー・カフェB2B', 'アジアのパートナー流通'] },
      { title: '原料供給', desc: 'ウズベキスタン・トルコの果実原料・パウダー・副産物', items: ['果肉・果皮・種子パウダー', 'フリーズドライ原料', '規格書・COA付きで供給', 'MOQ・サンプル応相談'] },
      { title: 'R&D・OEM/ODM', desc: '韓国での二次加工による素材・製品', items: ['分析・抽出・規格化', '新規食品原料の認定トラック', '化粧品原料・スクラブパウダー', 'OEM/ODM製品開発'] },
    ],
    partners: [
      { name: 'ZAFARXON · ERMÁK', role: 'ウズベキスタン生産', desc: 'ERMAKPLUS LLC・ZAFARHON LLC。タシケント・ジザフに生産拠点、ISO・HACCP・HALAL認証ライン。' },
      { name: '株式会社CATKIN', role: '輸入・通関パートナー', desc: 'アジア太平洋12か国（韓国・中国・日本・台湾・香港・モンゴル・ベトナム・タイ・マレーシア・インドネシア・フィリピン・オーストラリア）のERMÁK流通権を保有。輸入・通関・検疫・国内保管を担当。' },
      { name: '株式会社SOLKERN', role: '販売・R&D・OEM/ODM', desc: '商品企画、マーケティング、チャネル運営、素材R&D、CATKIN開発製品のOEM/ODM生産。' },
    ],
    info: [
      { label: '会社名', value: '株式会社SOLKERN（SOLKERN Co., Ltd.）' },
      { label: 'CEO', value: 'パク・ジンテ' },
      { label: '設立', value: '2026年8月' },
      { label: '事業内容', value: '食品卸・小売・原料R&D・情報通信（アプリ開発）' },
      { label: '所在地', value: ADDRESS },
      { label: 'メール', value: 'solkern@solkern.kr' },
    ],
    founderQuote: { quote: '今日私たちが作り、包装した製品を、明日子どもが食べます。もしかしたら自分の息子や孫かもしれません。だから私たちは皆、製品をつくるとき自分と子どもたちのことを考えます。', who: 'Valijon Salixov · ERMÁK創業者' },
  },
  origin: {
    hero: { eyebrow: 'ORIGIN', title: '大地が原料をつくる', body: '日差し、土壌、気候、そして長い果樹園文化。良い製品は良い原料から始まります。' },
    chapters: [
      { num: '01', title: '太陽', body: 'ウズベキスタンは晴天の多い大陸性気候に位置します。長く強い日差しは、果実の色と香りを決める最も重要な条件です。', placeholder: 'ORIGIN-SUN', note: 'フェルガナ盆地の果樹園の朝の光、逆光のざくろの木' },
      { num: '02', title: '土と水', body: '天山山脈の雪解け水とオアシス農業の伝統 — 乾いた大陸の中心で果実が育つ理由です。', placeholder: 'ORIGIN-SOIL', note: '灌漑水路と赤土、手のひらの土とアプリコット' },
      { num: '03', title: '果樹園の文化', body: 'シルクロードの時代から受け継がれる果実栽培と乾燥の技。アプリコット、ざくろ、ぶどう、メロンは暮らしであり文化です。', placeholder: 'ORIGIN-CULTURE', note: '屋根の上で乾燥するアプリコット、バザールに積まれたナッツ' },
      { num: '04', title: 'ものづくり', body: 'ERMÁKは1992年からウズベキスタンで自然食品をつくってきました。原料の旬に合わせて搾り、乾燥し、焙煎します。', placeholder: 'ORIGIN-FACTORY', note: '清潔な生産ライン、ステンレスの搾汁機とガラス瓶の充填' },
    ],
    regions: [
      { name: 'フェルガナ盆地', desc: 'ウズベキスタン最大の果樹園地帯。アプリコット・チェリー・ざくろ・ぶどう。', crops: ['アプリコット', 'チェリー', 'ざくろ', 'ぶどう'] },
      { name: 'タシケント・ジザフ', desc: 'ERMÁKの生産拠点。ひまわりの種・ナッツ加工と発酵乳スナック。', crops: ['ひまわりの種', 'ナッツ', 'クルト'] },
      { name: 'サマルカンド・ブハラ', desc: 'ドライフルーツとナッツ交易の歴史的中心地。', crops: ['干しアプリコット', 'レーズン', 'アーモンド'] },
      { name: 'トルコ', desc: '果実原料と副産物の第二の産地 — ヘーゼルナッツ・いちじく・アプリコット・ざくろ。', crops: ['ヘーゼルナッツ', 'いちじく', 'ざくろ', 'アプリコット'] },
    ],
    turkiye: { title: '第二の産地、トルコ', body: '地中海とアナトリア高原の果実原料は、SOLKERN原料事業の第二の柱です。ウズベキスタンとトルコの原料を併せて検討することで、季節・品種・数量の安定性を確保します。', placeholder: 'ORIGIN-TURKIYE' },
    disclaimer: '※ 産地に関する記述は一般的な地域情報に基づいています。優位性や成分比較など試験を要する表現は、分析データを確保した後にデータに基づくストーリーとしてのみ追加します。',
  },
  ermak: {
    hero: { eyebrow: 'ERMÁK · SINCE 1992', title: 'ERMÁK, The Taste You Trust', body: 'SOLKERNは1992年から続くERMÁKの製品をアジア市場に紹介します。「Ermák」はウズベク語で喜びとゆとりのひとときを意味します。' },
    brandStory: {
      title: 'ウズベキスタンのヘルシースナックのパイオニア',
      body: '2008年、ウズベキスタンで初めてひまわりの種を工業的に加工・包装し、伝統的な発酵乳スナック「クルト」を量産したブランド。タシケントとジザフで8つの製品カテゴリーを生産し、ジュースブランドASILも展開しています。',
      facts: [
        { value: '1992', label: '創業' },
        { value: '850+', label: '従業員' },
        { value: '8', label: '製品カテゴリー' },
        { value: '4', label: '国際認証（ISO 9001·14001·22000·HALAL）' },
      ],
    },
    newProducts: { badge: 'NEW 2026/27', title: 'QOQI・Challpak — 果物の第三の状態', body: '生（第一）でも伝統的な乾燥（第二）でもない、第三の状態。QOQIは完熟したアプリコット・柿・アジュワデーツのピューレをやさしく乾燥させ、Challpakはアプリコットとチェリーのフルーツレザーです。いずれも2026/27カタログの新製品です。', cta: 'フルーツスナックを見る' },
    categoriesTitle: 'ERMÁK・ASIL 製品カテゴリー',
    categories: en.ermak.categories.map((c) => ({
      ...c,
      name: catName[c.id] || c.name,
      desc: catDesc[c.id] || c.desc,
      point: catPoint[c.id] || c.point,
      products: c.products.map((p) => ({
        ...p,
        name: prodName[p.id] || p.name,
        sub: p.sub?.replace('cold-pressed', 'コールドプレス'),
        sizes: p.sizes?.replace(/large/g, '大容量'),
      })),
    })),
    korea: {
      title: '韓国ローンチロードマップ', body: '韓国ローンチはチャネルに合う品目から段階的に進めます。',
      phases: [
        { phase: 'PHASE 1', items: 'シード・ナッツ・ジャム・ペースト・ドライフルーツ', channel: '公式オンラインストア・小袋チャネル' },
        { phase: 'PHASE 2', items: 'ASILジュース（6種）・ソース', channel: '会員制倉庫店・外食／カフェB2B' },
        { phase: 'PHASE 3', items: 'クルト・発酵乳飲料', channel: '畜産物の輸入要件確認後' },
      ],
    },
    cta: { title: '製品カタログをご希望ですか？', body: 'ERMÁK 2026/27・ASILカタログと品目別規格書をお送りします。', button: 'カタログ請求' },
  },
  materialLab: {
    hero: { eyebrow: 'MATERIAL LAB · PROJECT 2', title: 'Nothing Ends at the Factory', body: '加工後に残る果皮・種・搾りかすを、新たな食品と素材の価値に変えます。' },
    thesis: { title: '最大の価値はパウダーではなく「規格化された原料」にある', body: 'かつて捨てられていたものを、清潔で均一に、書類を完備して供給すること。SOLKERN MATERIAL LABは新奇性ではなく、品質保証と一貫性で価値を生み出します。' },
    tracks: [
      { id: 'beauty', title: 'ビューティー素材', en: 'BEAUTY', body: 'ポリフェノール規格化ざくろ果皮エキスと、果実の種・果皮由来の天然スクラブパウダー。粒度別設計で肌タイプに合う強さをご提案します。', materials: ['ざくろ果皮エキス', 'ざくろ・チェリー・アプリコット種子パウダー', 'くるみ殻・ぶどう種子パウダー'], stage: '原料確保・初回発注進行中', placeholder: 'LAB-BEAUTY' },
      { id: 'food', title: '食品素材', en: 'FOOD', body: '果肉・穀物パウダーベースのRTE/RTDシェイクと、りんご搾りかすファイバー。新規食品原料の認定トラックを並行し、使用可能な原料から商品化します。', materials: ['果肉パウダー（ざくろ・チェリー・アプリコット・りんご等）', '穀物パウダー', '搾りかす食物繊維'], stage: 'レシピ開発・事業性検討', placeholder: 'LAB-FOOD' },
      { id: 'ingredient', title: '産業素材', en: 'INGREDIENT', body: 'くるみ殻などナッツ副産物のメッシュ等級別研磨材・フィラー。規格書と成績書を備えたB2B原料として供給します。', materials: ['くるみ殻研磨材', 'ナッツ副産物フィラー', '規格化パウダー'], stage: '原料ソーシング検討', placeholder: 'LAB-INDUSTRY' },
    ],
    process: [
      { step: '01', title: '原料確保', desc: 'ウズベキスタン・トルコの副産物、凍結乾燥・粉砕' },
      { step: '02', title: '分析', desc: '成分・残留農薬・重金属、試験成績書' },
      { step: '03', title: '規制検討', desc: '食品公典・化粧品原料基準上の使用可能範囲' },
      { step: '04', title: '二次加工', desc: '韓国での抽出・分画・粒度設計・規格化' },
      { step: '05', title: '事業化・B2B', desc: '原料供給、OEM/ODM開発、パートナー協業' },
    ],
    principles: [
      { title: '規制ファースト', desc: '投資の前に使用可否と認定トラックを確認します。' },
      { title: 'データで語る', desc: '未検証の効能・比較表現は使わず、COAと規格書でご提案します。' },
      { title: '残渣も資源', desc: '抽出後に残るペクチンや食物繊維も、二次収益として設計します。' },
    ],
    cta: { title: '素材協業をご提案ください', body: '副産物の供給、共同R&D、原料購入、OEM/ODMなど、あらゆる形の協業を歓迎します。', button: '素材のお問い合わせ' },
  },
  b2b: {
    hero: { eyebrow: 'B2B', title: 'SOLKERNとパートナーに', body: '完成品流通、原料供給、OEM/ODM、韓国での二次加工、アジア市場での協業。' },
    services: [
      { id: 'dist', title: '完成品流通', desc: '韓国・アジアでのERMÁK・ASIL製品パートナーシップ', bullets: ['会員制倉庫店・大手小売', 'オンラインチャネル供給', '外食・カフェ・ベーカリーB2B', 'アジア各国のパートナー'] },
      { id: 'raw', title: '原料供給', desc: '規格化された果実原料・パウダー・副産物', bullets: ['果肉・果皮・種子パウダー', 'フリーズドライ原料', 'COA・規格書付き', 'MOQ・リードタイム応相談'] },
      { id: 'oem', title: 'OEM / ODM', desc: '韓国での二次加工による製品開発', bullets: ['シェイク・スプレッドなどの食品', 'スクラブ・エキスなどのビューティー素材', '包装・表示の検討サポート', '小ロットのパイロット生産応相談'] },
      { id: 'sample', title: 'サンプル・書類', desc: '製品サンプルと品質書類', bullets: ['製品カタログ（ERMÁK・ASIL）', '品目別規格書', '試験成績書・認証書', 'サンプル発送の手配'] },
    ],
    steps: [
      { step: '01', title: 'お問い合わせ', desc: 'フォームまたはメールで、ご関心の品目・用途・数量をお知らせください。' },
      { step: '02', title: '書類・サンプル', desc: 'カタログ・規格書・COA・サンプルをご提供します。' },
      { step: '03', title: '条件協議', desc: '価格・MOQ・リードタイム・インコタームズ・支払条件。' },
      { step: '04', title: '契約・供給', desc: '契約後、輸入・通関を経て国内でお届けします。' },
    ],
    docs: ['製品カタログ', '品目別規格書', '試験成績書（COA）', 'ISO・HALAL認証書', '原産地証明書', '表示情報'],
    faq: [
      { q: '最小発注数量（MOQ）は？', a: '品目と包装単位により異なります。目標数量をお知らせいただければ、品目別のMOQとリードタイムをご案内します。' },
      { q: 'サンプルは受け取れますか？', a: 'はい。B2Bのお問い合わせ後、サンプル品目と数量を協議します。送料は事前に取り決めます。' },
      { q: '原料（副産物）を少量で購入できますか？', a: 'R&D用の少量サンプル購入に対応し、規格書と試験成績書を添えて供給します。' },
      { q: '韓国以外にも供給していますか？', a: 'はい。ERMÁK流通契約に基づくアジア太平洋12か国（韓国・中国・日本・台湾・香港・モンゴル・ベトナム・タイ・マレーシア・インドネシア・フィリピン・オーストラリア）のパートナーと協業します。中央アジア5か国はERMÁK本社が直接管理します。' },
    ],
    cta: { title: 'B2Bの対話を始めましょう', button: 'B2Bお問い合わせ' },
  },
  news: {
    hero: { eyebrow: 'NEWS', title: 'SOLKERN Journal', body: '出張、契約、ローンチ、展示会、R&Dの進捗をお届けします。' },
    empty: 'まだ投稿はありません。',
    items: [
      { id: 'n-2026-09-01', date: '2026.09', category: 'R&D', title: 'フリーズドライざくろ果皮パウダー 初回100kgを発注', summary: 'ざくろ果皮エキス事業の第一歩として、フリーズドライパウダー100kgを発注しました。分析と規格化を開始します。', placeholder: 'NEWS-POMEGRANATE' },
      { id: 'n-2026-08-01', date: '2026.08', category: 'COMPANY', title: '株式会社SOLKERN 設立', summary: '仁川・青羅に株式会社SOLKERNを設立し、ERMÁK流通と素材R&Dを本格的にスタートしました。', placeholder: 'NEWS-OFFICE' },
      { id: 'n-2026-06-01', date: '2026.06', category: 'PRODUCT', title: 'ERMÁK・ASIL 韓国語カタログ発行', summary: 'ERMÁK 8カテゴリーとASILジュース6種・ソース2種を収録した韓国語カタログを発行しました。', placeholder: 'NEWS-CATALOG' },
    ],
  },
  contact: {
    hero: { eyebrow: 'CONTACT', title: 'SOLKERNとパートナーに', body: '韓国・アジアでの完成品流通、原料供給、OEM/ODM、協業をご提案ください。2営業日以内にご返信します。' },
    form: {
      name: 'お名前', company: '会社名', email: 'メールアドレス', phone: '電話番号', country: '国・地域',
      type: 'お問い合わせ種別', typeOptions: ['完成品流通', '原料供給', 'OEM / ODM', 'サンプル・カタログ請求', '素材協業・R&D', 'その他'],
      product: 'ご関心の品目・原料', quantity: '想定数量・MOQ', message: 'お問い合わせ内容',
      agree: '個人情報の収集・利用に同意します（お問い合わせへの回答目的、1年間保管）', submit: 'お問い合わせを送信',
      success: 'お問い合わせを受け付けました', successBody: '担当者が確認のうえ、メールまたはお電話でご連絡します。',
      privacy: '収集項目：氏名・会社名・メール・電話・内容 · 目的：お問い合わせへの回答 · 保管期間：1年',
    },
    info: ko.contact.info,
    officeTitle: 'OFFICE',
    address: ADDRESS,
  },
  territory: {
    eyebrow: 'DISTRIBUTION TERRITORY',
    title: 'アジア太平洋 12か国',
    body: 'ERMÁK流通契約に基づき、韓国を拠点に北東アジア・東南アジア・オセアニアの12か国へERMÁK完成品を供給します。',
    countLabel: 'テリトリー',
    regions: [
      { name: '北東アジア', countries: [
        { code: 'KR', name: '韓国', city: '仁川・拠点' },
        { code: 'CN', name: '中国', city: '北京' },
        { code: 'JP', name: '日本', city: '東京' },
        { code: 'TW', name: '台湾', city: '台北' },
        { code: 'HK', name: '香港', city: '香港' },
        { code: 'MN', name: 'モンゴル', city: 'ウランバートル' },
      ] },
      { name: '東南アジア', countries: [
        { code: 'VN', name: 'ベトナム', city: 'ハノイ' },
        { code: 'TH', name: 'タイ', city: 'バンコク' },
        { code: 'MY', name: 'マレーシア', city: 'クアラルンプール' },
        { code: 'ID', name: 'インドネシア', city: 'ジャカルタ' },
        { code: 'PH', name: 'フィリピン', city: 'マニラ' },
      ] },
      { name: 'オセアニア', countries: [{ code: 'AU', name: 'オーストラリア', city: 'シドニー' }] },
    ],
    origins: [
      { code: 'UZ', name: 'ウズベキスタン', role: 'ERMÁK生産・原産地' },
      { code: 'TR', name: 'トルコ', role: '果実原料・副産物' },
    ],
    hub: '運営拠点',
    legendTerritory: 'テリトリー12か国',
    legendOrigin: '原産地',
    legendDirect: '中央アジア（ERMÁK本社直轄）',
    note: '※ ERMÁK流通契約で定めるテリトリーです。中央アジア5か国（カザフスタン・キルギス・タジキスタン・トルクメニスタン・ウズベキスタン）はERMÁK本社が直接管理します。国別の供給条件はB2Bお問い合わせ時にご案内します。',
    tapHint: '国名をタップすると地図上でハイライトされます',
  },
  ui: {
    langName: '日本語',
    sections: { solkernBusiness: '3つの事業、ひとつの流れ', solkernPartners: '生産から販売まで、3社協業体制', companyInfo: '会社情報', originRegions: '原料が育つ場所', labTracks: '3つの素材トラック', labProcess: '副産物から規格化原料へ', b2bServices: '協業の形', b2bProcess: 'お問い合わせから供給まで', b2bFaq: 'よくあるご質問' },
    originMarquee: ['太陽', '土壌', '気候', '果樹園文化', 'ウズベキスタン', 'トルコ', 'ざくろ', 'アプリコット', 'チェリー', 'ナッツ'],
    table: { region: '地域', country: '国', city: '主要都市' },
    regionsLabel: '地域', originsLabel: '原産地',
    prev: '前へ', next: '次へ',
    productNote: '※ 製品規格・表示事項は輸入ラベルに基づき確定します。カタログご請求時に品目別規格書をご提供します。',
    countryPlaceholder: '日本',
    privacy: {
      title: 'プライバシーポリシー',
      intro: '株式会社SOLKERN（以下「当社」）は、ウェブサイトのお問い合わせ対応のため、以下のとおり個人情報を収集・利用します。',
      items: ['収集項目：氏名、会社名、メールアドレス、電話番号、国、お問い合わせ内容', '利用目的：お問い合わせへの回答、見積・サンプル・書類のご提供', '保管期間：受付日から1年、または関係法令が定める期間', '第三者提供：法令に基づく場合を除き、行いません'],
      officer: '個人情報保護責任者：パク・ジンテ',
    },
  },
  footer: {
    tagline: 'From Origin to New Value',
    company: '株式会社SOLKERN（SOLKERN Co., Ltd.）',
    ceo: '情報管理責任者：パク・ジンテ',
    regNo: '事業者登録番号 443-86-03703',
    address: ADDRESS,
    email: 'solkern@solkern.kr',
    tel: '+82-10-4589-1030',
    copyright: '© 2026 SOLKERN Co., Ltd. All rights reserved.',
    links: [
      { label: 'プライバシーポリシー', href: '/privacy' },
      { label: '管理者', href: '/admin' },
    ],
  },
};
