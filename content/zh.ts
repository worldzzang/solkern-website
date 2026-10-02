import type { Dict } from './types';
import { ko } from './ko';
import { en } from './en';

// 中文（简体）文案为机器翻译草稿 — 上线前建议母语审校。
const catName: Record<string, string> = {
  juice: '果汁 · 果肉饮料', paste: '坚果酱 · 芝麻酱', jam: '果酱 · 果酱糖渍 · 酱汁', seeds: '葵花籽 · 籽类',
  nuts: '坚果', qurt: '库尔特 · 发酵乳零食', bar: '天然坚果棒', snack: '水果零食 QOQI · Challpak', other: '环形脆饼 · 果泥',
};
const catDesc: Record<string, string> = {
  juice: '苹果、榅桲、石榴、苹果甜菜、樱桃、杏。直榨果汁与果肉饮料。',
  paste: '花生、腰果、芝麻（塔希尼）酱以及椰枣果酱。',
  jam: '石榴、葡萄、樱桃、杏、椰枣、榅桲果酱，以及石榴酱、樱桃酱。',
  seeds: '黑、白葵花籽（咸味／原味／烘烤），从小包装到2公斤大包装。',
  nuts: '杏仁、腰果、开心果、花生、葵花籽仁、南瓜籽、混合坚果以及坚果果干混合。',
  qurt: '中亚传统干制发酵乳零食：库尔特、益生菌库尔特，以及库尔托巴、艾兰饮品。',
  bar: '南瓜籽、杏仁、芝麻、混合坚果、花生、葵花籽坚果棒。',
  snack: '2026/27新品：将成熟杏、柿子、阿杰瓦椰枣果泥低温干燥而成的QOQI，以及杏、樱桃果丹皮Challpak。“水果的第三种形态”。',
  other: '干面包圈（Teshik kulcha／Sushki，3款）以及苹果、杏、榅桲果泥。',
};
const catPoint: Record<string, string> = {
  juice: '与产地故事最直接相连的核心品类',
  paste: '天然涂抹酱定位 · 早午餐／烘焙B2B',
  jam: '酸奶、早午餐、烘焙、餐饮B2B',
  seeds: '小包装与大包装并行 · 仓储会员店候选',
  nuts: '便捷健康零食 · 线上测试SKU候选',
  qurt: '中亚特色鲜明 · 消费者教育型上市',
  bar: '便捷健康零食 · 线上测试SKU候选',
  snack: '对韩国消费者最新颖的形态 · 线上测试SKU首选',
  other: '地方特色产品线 · 次要或测试产品线',
};
const prodName: Record<string, string> = {
  j1: '石榴汁', j2: '苹果汁', j3: '榅桲汁', j4: '樱桃汁', j5: '杏果肉饮料', j6: '苹果甜菜汁',
  p1: '花生酱', p2: '腰果酱', p3: '芝麻酱（塔希尼）', p4: '椰枣果酱',
  m1: '石榴果酱', m2: '葡萄果酱', m3: '樱桃 · 杏 · 榅桲果酱', m4: '樱桃酱 · 石榴酱',
  s1: '黑葵花籽', s2: '白葵花籽', s3: '烘烤葵花籽 大包装',
  n1: '杏仁', n2: '腰果', n3: '葵花籽仁', n4: '混合坚果', n5: '咸味混合坚果', n6: '坚果果干混合', n7: '咸味南瓜籽（带壳）',
  q1: '益生菌库尔特', q2: '库尔特（球）', q3: '辣椒库尔特', q4: '库尔托巴', q5: '罗勒艾兰', q6: '罗勒库尔特', q7: '方形罗勒库尔特', q8: '硬质库尔特（Toshqurt）',
  b1: '南瓜籽棒', b2: '杏仁棒', b3: '芝麻 · 葵花籽棒',
  o1: '咸味环形脆饼', o2: '甜菊 · 白芝麻环形脆饼', o3: '白芝麻 · 黑孜然环形脆饼', o12: '果泥',
  o4: '杏 QOQI', o5: '柿子 QOQI', o6: '阿杰瓦椰枣 QOQI', o7: '杏 Challpak（Bargak）', o8: '杏 Challpak（Kantek）', o9: '樱桃 Challpak', o10: 'QOQI 大包装（杏）', o11: 'Challpak 大包装（樱桃）',
};

const ADDRESS = '韩国仁川广域市西区中峰大路612番街10-20，5层505-J341号（青罗广场）';

export const zh: Dict = {
  meta: {
    title: 'SOLKERN | 从产地到新价值 — 乌兹别克斯坦 · 土耳其天然食品与原料研发',
    description:
      'SOLKERN将乌兹别克斯坦与土耳其的天然食品品牌ERMÁK、ASIL引入亚洲市场，并以韩国加工技术将水果原料及副产物转化为新原料。',
  },
  nav: ko.nav,
  common: {
    more: '了解更多', contact: '联系我们', catalog: '索取目录', b2b: 'B2B咨询',
    viewProducts: '浏览ERMÁK产品', viewMaterial: '原料 · B2B', scroll: 'SCROLL', langLabel: '语言',
    readMore: '阅读全文', back: '返回列表', send: '发送', sending: '发送中…', sent: '已发送',
    error: '发送失败，请稍后再试。', required: '必填', officialDistributor: 'ERMÁK亚洲共同拓展官方合作伙伴',
  },
  home: {
    hero: {
      eyebrow: 'Quality Without Borders · ERMÁK亚洲共同拓展官方合作伙伴 · 原料研发',
      title: '从产地', titleAccent: '到新价值',
      body: '乌兹别克斯坦阳光孕育的果实走上亚洲餐桌，并借助韩国技术再次成为价值。',
      cta1: '浏览ERMÁK产品', cta2: '原料 · B2B',
    },
    journey: {
      eyebrow: 'THE SOLKERN WAY',
      title: '发现好原料，开拓市场，让剩余之物重获新生。',
      steps: [
        { key: 'origin', label: '01 ORIGIN', title: '孕育的土地', body: '强烈的日照、大陆性气候与悠久的果园文化。乌兹别克斯坦与土耳其的水果和坚果，从故事开始。' },
        { key: 'product', label: '02 PRODUCT', title: 'ERMÁK成品', body: '自1992年起生产的ERMÁK果汁、果酱、坚果酱、籽类、库尔特与坚果棒，由SOLKERN引入亚洲。' },
        { key: 'second', label: '03 SECOND LIFE', title: '工厂之外的价值', body: '生产后剩余的果皮、种子与果渣，经韩国加工技术成为食品、美容及工业原料。' },
        { key: 'market', label: '04 MARKET', title: '亚洲流通 · B2B', body: '成品流通、原料供应、OEM/ODM。以韩国为据点，与亚洲各国伙伴共同开拓市场。' },
      ],
    },
    land: {
      eyebrow: '02 · THE LAND', title: 'Why Central Asia, Why Uzbekistan',
      body: '强烈的日照、大陆性气候与数百年的果园文化，孕育了丰富多样的水果与坚果。好产品始于好原料。',
      facts: [
        { value: '300+', label: '年日照天数（地区估计）' },
        { value: '1992', label: 'ERMÁK创立' },
        { value: '2', label: '核心产地 — 乌兹别克斯坦 · 土耳其' },
        { value: '9', label: 'ERMÁK产品品类' },
      ],
      cta: '阅读产地故事',
    },
    fruit: {
      eyebrow: '03 · THE FRUIT', title: 'One Origin, Many Possibilities',
      body: '石榴、杏、樱桃、苹果、葡萄、坚果。一种原料，可延伸为产品，也可成为原料。',
      items: [
        { name: '石榴', product: '果汁 · 果酱 · 酱汁', material: '果皮提取物 · 籽粉', image: '/images/custom/FRUIT-POMEGRANATE.webp' },
        { name: '苹果', product: '果汁 · 果泥', material: '果渣膳食纤维', image: '/images/fruits/apple.webp' },
        { name: '樱桃', product: '果汁 · 果酱 · 酱汁', material: '果核磨砂粉', image: '/images/fruits/cherry.webp' },
        { name: '杏', product: 'QOQI · Challpak · 果肉饮料 · 果酱', material: '果核 · 果皮原料', placeholder: 'FRUIT-APRICOT' },
        { name: '坚果 · 籽类', product: '坚果酱 · 坚果棒 · 烘烤', material: '坚果副产物食品原料', placeholder: 'FRUIT-NUTS' },
        { name: '葡萄 · 椰枣', product: '果酱 · 糖渍果酱', material: '葡萄籽 · 果皮原料', placeholder: 'FRUIT-GRAPE' },
      ],
      cta: '查看各水果的可能性',
    },
    collection: { eyebrow: '04 · ERMÁK COLLECTION', title: 'The Taste You Trust', body: '果汁、坚果酱、果酱与酱汁、籽类与坚果、库尔特、坚果棒 — ERMÁK代表产品系列。', cta: '索取产品目录' },
    featured: { eyebrow: '05 · FEATURED PRODUCTS', title: '韩国上市优先产品', body: '韩国上市将从籽类坚果、果酱与坚果酱、果汁、库尔特等适合渠道的品项开始，分阶段推进。', cta: 'B2B咨询', tags: ['线上测试SKU', '仓储会员店大包装', '餐饮 · 烘焙B2B', '小包装便利装'] },
    secondLife: {
      eyebrow: '06 · SECOND LIFE', title: 'Nothing Ends at the Factory',
      body: '原料的价值不会随着生产结束而终结。果皮、种子与果渣经由韩国加工技术成为新原料。',
      flow: [
        { label: '工厂副产物', desc: '石榴皮 · 果核 · 果渣 · 坚果副产物' },
        { label: '初级加工', desc: '清洗 · （冻）干 · 粉碎 · 粒度设计' },
        { label: '韩国研发', desc: '分析 · 提取 · 标准化 · 检测报告' },
        { label: '新原料', desc: '食品 · 美容 · 工业B2B供应' },
      ],
      cta: '前往MATERIAL LAB',
    },
    material: {
      eyebrow: '07 · MATERIAL VALUE', title: 'Food · Beauty · Ingredient',
      body: '苹果果渣可成为膳食纤维，石榴皮可成为化妆品提取物，坚果副产物可成为食品原料。',
      cards: [
        { title: 'FOOD', from: '水果 · 谷物粉', to: 'RTE/RTD奶昔 · 膳食纤维', desc: '以韩国配方将乌兹别克斯坦果肉粉商品化', placeholder: 'MAT-FOOD' },
        { title: 'BEAUTY', from: '石榴皮 · 果核', to: '提取物 · 天然磨砂粉', desc: '多酚标准化提取物与按粒度分级的磨砂原料', placeholder: 'MAT-BEAUTY' },
        { title: 'INGREDIENT', from: '果渣 · 坚果壳', to: '纤维 · 工业原料', desc: '文件齐全的标准化粉末，面向B2B供应', placeholder: 'MAT-INGREDIENT' },
      ],
      cta: '原料合作咨询',
    },
    market: {
      eyebrow: '08 · MARKET', title: '亚洲流通 · B2B网络',
      body: 'SOLKERN以韩国为据点，向亚太12个市场供应ERMÁK成品，同时构建韩国二次加工原料业务。',
      nodes: [
        { name: 'UZBEKISTAN', role: '原料 · ERMÁK生产' },
        { name: 'TÜRKİYE', role: '水果原料 · 副产物' },
        { name: 'KOREA', role: 'SOLKERN研发 · 加工 · 流通' },
        { name: 'ASIA-PACIFIC 12', role: '12个区域市场 · 成品／原料B2B' },
      ],
      cta: '合作咨询',
    },
    trust: {
      eyebrow: '09 · TRUST', title: '以数据支撑的产地故事',
      body: '我们只推荐有分析数据、认证、进口标准与质量文件支撑的原料和产品。',
      items: [
        { title: '检测报告', desc: '基于农残、重金属、微生物等安全检测的提案' },
        { title: '进口标准预审', desc: '对照韩国食品法典与进口食品安全标准逐项预审' },
        { title: '标签核验', desc: '仅使用经核实的表述，绝不展示未经验证的内容' },
        { title: '认证工厂', desc: 'ISO 9001 · ISO 14001 · ISO 22000（HACCP）· HALAL认证生产商' },
      ],
      certs: ['ISO 9001:2015', 'ISO 14001:2015', 'ISO 22000:2018 (HACCP)', 'HALAL UAE.S GSO 2055-1'],
      cta: '索取质量文件',
      note: '※ 认证由ERMÁK生产法人（ERMAKPLUS LLC · ZAFARHON LLC）持有，各品项的适用范围可应要求确认。',
    },
    contact: { eyebrow: '10 · CONTACT', title: '与SOLKERN携手', body: '欢迎就韩国与亚洲的成品流通、原料供应、OEM/ODM及合作提出建议。', cta1: '联系我们', cta2: '索取目录' },
    daily: {
      eyebrow: 'SOLKERN DAILY',
      title: '日常中的ERMÁK',
      body: '从早餐桌到午后的一杯。乌兹别克斯坦的果实融入韩国一天的场景。',
      captions: ['早晨 · 花生酱吐司', '午后 · 一杯石榴汁', '茶点 · QOQI水果零食', '早午餐 · 酸奶配樱桃果酱', '周末 · 徒步与坚果棒', '咖啡馆 · 艾兰与库尔特'],
    },
    timeline: {
      eyebrow: 'SINCE 1992',
      title: '从原产地的土地到韩国的技术，延续的时间',
      items: [
        { year: '1992', title: 'ERMÁK创立', desc: '天然食品品牌ERMÁK在乌兹别克斯坦塔什干起步。' },
        { year: '2008', title: '葵花籽工厂加工 · 库尔特工厂生产', desc: '乌兹别克斯坦首家在工厂加工、包装葵花籽并规模化生产传统发酵乳库尔特。' },
        { year: '2025', title: 'ERMÁK亚太12国经销权签约', desc: 'CATKIN公司获得ERMÁK成品在亚太12个市场的经销权。' },
        { year: '2026.06', title: 'ERMÁK · ASIL韩文目录发行', desc: '发行涵盖ERMÁK 8大品类与ASIL果汁、酱料的韩文目录。' },
        { year: '2026.08', title: 'SOLKERN成立', desc: '在仁川青罗成立SOLKERN，作为ERMÁK亚洲共同进军官方合作伙伴启动流通与原料研发。' },
        { year: '2026.09', title: '石榴皮粉首批原料下单', desc: '订购100kg冻干石榴皮粉，MATERIAL LAB首个项目启动。' },
      ],
    },
  },
  solkern: {
    hero: { eyebrow: 'ABOUT SOLKERN', title: '发现好原料，开拓市场，让剩余之物重获新生。', body: 'SOLKERN株式会社是一家原料、流通与研发公司，将乌兹别克斯坦与土耳其的天然食品和水果原料连接至韩国与亚洲。' },
    statement: 'Origin → Product → Second Life → Market。从中亚原料到ERMÁK成品，再到韩国二次加工原料，一条完整的价值链。',
    identity: [
      { title: 'ERMÁK亚洲共同拓展官方合作伙伴', body: '将1992年创立的乌兹别克斯坦代表性天然食品品牌ERMÁK及其果汁品牌ASIL的成品，引入韩国及亚太12个市场。' },
      { title: '原料研发 · 韩国加工', body: '对水果原料与生产副产物（果皮、种子、果渣）进行分析、加工与标准化，制成食品、美容与工业原料。' },
      { title: '以数据成就信任', body: '感动始于自然；B2B信任则由检测报告、认证与进口标准审查来完成。' },
    ],
    business: [
      { title: '成品流通', desc: 'ERMÁK · ASIL产品在韩国与亚洲的销售', items: ['官方线上品牌店', '仓储会员店 · 大型零售', '餐饮 · 烘焙 · 咖啡B2B', '亚洲合作伙伴流通'] },
      { title: '原料供应', desc: '乌兹别克斯坦 · 土耳其的水果原料、粉末与副产物', items: ['果肉 · 果皮 · 籽粉', '冻干原料', '附规格书与COA供应', 'MOQ与样品可协商'] },
      { title: '研发 · OEM/ODM', desc: '经韩国二次加工的原料与产品', items: ['分析 · 提取 · 标准化', '新食品原料认定路径', '化妆品原料 · 磨砂粉', 'OEM/ODM产品开发'] },
    ],
    partners: [
      { name: 'ZAFARXON · ERMÁK', role: '乌兹别克斯坦生产', desc: 'ERMAKPLUS LLC · ZAFARHON LLC。塔什干、吉扎克生产基地，ISO · HACCP · HALAL认证产线。' },
      { name: 'CATKIN株式会社', role: '进口 · 通关伙伴', desc: '持有亚太12个市场（韩国、中国、日本、台湾、香港、蒙古、越南、泰国、马来西亚、印度尼西亚、菲律宾、澳大利亚）的ERMÁK经销权，负责进口、通关、检疫与国内仓储。' },
      { name: 'SOLKERN株式会社', role: '销售 · 研发 · OEM/ODM', desc: '商品企划、营销、渠道运营、原料研发，以及CATKIN开发产品的OEM/ODM生产。' },
    ],
    info: [
      { label: '公司名称', value: 'SOLKERN株式会社（SOLKERN Co., Ltd.）' },
      { label: 'CEO', value: 'Park Jin-tae' },
      { label: '成立', value: '2026年8月' },
      { label: '业务范围', value: '食品批发零售 · 原料研发 · 信息通信（应用开发）' },
      { label: '地址', value: ADDRESS },
      { label: '邮箱', value: 'solkern@solkern.kr' },
    ],
    founderQuote: { quote: '今天我们生产、包装的产品，明天就会被孩子吃下。也许是我的儿子或孙子。所以我们每个人在制作产品时，都会想到自己和孩子。', who: 'Valijon Salixov · ERMÁK创始人' },
  },
  origin: {
    hero: { eyebrow: 'ORIGIN', title: '土地造就原料', body: '阳光、土壤、气候与悠久的果园文化。好产品始于好原料。' },
    chapters: [
      { num: '01', title: '阳光', body: '乌兹别克斯坦属大陆性气候，全年晴天众多。漫长而强烈的日照，是决定水果色泽与香气的最重要条件。', placeholder: 'ORIGIN-SUN', note: '费尔干纳盆地果园的晨光，逆光中的石榴树' },
      { num: '02', title: '土壤与水', body: '天山融雪与绿洲农业传统 — 这正是水果能在干旱大陆腹地生长的原因。', placeholder: 'ORIGIN-SOIL', note: '灌溉水渠与红土，手中的泥土与杏' },
      { num: '03', title: '果园文化', body: '自丝绸之路时代传承下来的果树栽培与晾晒技艺。杏、石榴、葡萄与甜瓜，是这里的生活与文化。', placeholder: 'ORIGIN-CULTURE', note: '屋顶上晾晒的杏，巴扎上堆积的坚果' },
      { num: '04', title: '制造', body: 'ERMÁK自1992年起在乌兹别克斯坦生产天然食品，依照原料时令进行压榨、干燥与烘烤。', placeholder: 'ORIGIN-FACTORY', note: '洁净的生产线，不锈钢压榨机与玻璃瓶灌装' },
    ],
    regions: [
      { name: '费尔干纳盆地', desc: '乌兹别克斯坦最大的果园区。杏、樱桃、石榴、葡萄。', crops: ['杏', '樱桃', '石榴', '葡萄'] },
      { name: '塔什干 · 吉扎克', desc: 'ERMÁK生产基地。葵花籽与坚果加工、发酵乳零食。', crops: ['葵花籽', '坚果', '库尔特'] },
      { name: '撒马尔罕 · 布哈拉', desc: '果干与坚果贸易的历史中心。', crops: ['杏干', '葡萄干', '杏仁'] },
      { name: '土耳其', desc: '水果原料与副产物的第二产地 — 榛子、无花果、杏、石榴。', crops: ['榛子', '无花果', '石榴', '杏'] },
    ],
    turkiye: { title: '第二产地，土耳其', body: '地中海与安纳托利亚高原的水果原料，是SOLKERN原料业务的第二支柱。同时评估乌兹别克斯坦与土耳其的原料，可确保季节、品种与数量的稳定。', placeholder: 'ORIGIN-TURKIYE' },
    disclaimer: '※ 产地描述基于一般地区信息。涉及优越性或成分比较等需检测支持的表述，将在取得分析数据后，仅以数据为依据的故事形式加入。',
  },
  ermak: {
    hero: { eyebrow: 'ERMÁK · SINCE 1992', title: 'ERMÁK, The Taste You Trust', body: 'SOLKERN将自1992年起生产的ERMÁK产品引入亚洲市场。“Ermák”在乌兹别克语中意为喜悦与悠闲时光。' },
    brandStory: {
      title: '乌兹别克斯坦健康零食的先驱',
      body: '2008年，成为乌兹别克斯坦首个工业化加工、包装葵花籽，并规模化生产传统发酵乳零食库尔特的品牌。在塔什干与吉扎克生产8大品类产品，并拥有果汁品牌ASIL。',
      facts: [
        { value: '1992', label: '创立' },
        { value: '850+', label: '员工' },
        { value: '8', label: '产品品类' },
        { value: '4', label: '国际认证（ISO 9001·14001·22000·HALAL）' },
      ],
    },
    newProducts: { badge: 'NEW 2026/27', title: 'QOQI · Challpak — 水果的第三种形态', body: '既非新鲜（第一），也非传统晒干（第二），而是第三种形态。QOQI将成熟的杏、柿子与阿杰瓦椰枣果泥低温干燥而成；Challpak是杏与樱桃果丹皮。两者均为2026/27目录新品。', cta: '查看水果零食' },
    categoriesTitle: 'ERMÁK · ASIL 产品品类',
    categories: en.ermak.categories.map((c) => ({
      ...c,
      name: catName[c.id] || c.name,
      desc: catDesc[c.id] || c.desc,
      point: catPoint[c.id] || c.point,
      products: c.products.map((p) => ({
        ...p,
        name: prodName[p.id] || p.name,
        sub: p.sub?.replace('cold-pressed', '冷榨'),
        sizes: p.sizes?.replace(/large/g, '大包装'),
      })),
    })),
    korea: {
      title: '韩国上市路线图', body: '韩国上市将从适合渠道的品项开始，分阶段推进。',
      phases: [
        { phase: 'PHASE 1', items: '籽类坚果 · 果酱与坚果酱 · 果干', channel: '官方线上商店 · 小包装渠道' },
        { phase: 'PHASE 2', items: 'ASIL果汁（6款）· 酱汁', channel: '仓储会员店 · 餐饮／咖啡B2B' },
        { phase: 'PHASE 3', items: '库尔特 · 发酵乳饮品', channel: '确认畜产品进口要求后' },
      ],
    },
    cta: { title: '需要完整的产品目录吗？', body: '我们将寄送ERMÁK 2026/27与ASIL目录及各品项规格书。', button: '索取目录' },
  },
  materialLab: {
    hero: { eyebrow: 'MATERIAL LAB · PROJECT 2', title: 'Nothing Ends at the Factory', body: '将加工后剩余的果皮、种子与果渣，转化为新的食品与原料价值。' },
    thesis: { title: '最大的价值不在粉末，而在“标准化原料”', body: '把过去被丢弃的东西，洁净、均一、文件齐全地供应出去。SOLKERN MATERIAL LAB以质量保证与一致性，而非新奇性，创造价值。' },
    tracks: [
      { id: 'beauty', title: '美容原料', en: 'BEAUTY', body: '多酚标准化石榴皮复合提取物，以及源自果核与果皮的天然磨砂粉。按粒度设计，针对不同肤质推荐合适强度。', materials: ['石榴皮提取物', '石榴籽 · 樱桃核 · 杏核粉', '核桃壳 · 葡萄籽粉'], stage: '原料确保 · 首批订单进行中', placeholder: 'LAB-BEAUTY' },
      { id: 'food', title: '食品原料', en: 'FOOD', body: '以果肉与谷物粉为基础的RTE/RTD奶昔，以及苹果果渣纤维。同步推进新食品原料认定路径，从可用原料开始商品化。', materials: ['果肉粉（石榴、樱桃、杏、苹果等）', '谷物粉', '果渣膳食纤维'], stage: '配方开发 · 可行性评估', placeholder: 'LAB-FOOD' },
      { id: 'ingredient', title: '工业原料', en: 'INGREDIENT', body: '核桃壳等坚果副产物，按目数分级用作研磨材料与填充剂，作为附规格书与检测报告的B2B原料供应。', materials: ['核桃壳研磨料', '坚果副产物填充剂', '标准化粉末'], stage: '原料采购评估', placeholder: 'LAB-INDUSTRY' },
    ],
    process: [
      { step: '01', title: '原料确保', desc: '乌兹别克斯坦 · 土耳其副产物，冻干与粉碎' },
      { step: '02', title: '分析', desc: '成分、农残、重金属，检测报告' },
      { step: '03', title: '法规审查', desc: '依据食品法典与化妆品原料标准确认可用范围' },
      { step: '04', title: '二次加工', desc: '在韩国进行提取、分级、粒度设计与标准化' },
      { step: '05', title: '商业化 · B2B', desc: '原料供应、OEM/ODM开发、伙伴合作' },
    ],
    principles: [
      { title: '法规优先', desc: '投资前先确认可用性与认定路径。' },
      { title: '用数据说话', desc: '不使用未经验证的功效或比较表述，以COA与规格书提案。' },
      { title: '残渣亦是资源', desc: '提取后剩余的果胶与纤维，也设计为二次收益。' },
    ],
    cta: { title: '提出原料合作', body: '副产物供应、联合研发、原料采购、OEM/ODM — 欢迎一切形式的合作。', button: '原料咨询' },
  },
  b2b: {
    hero: { eyebrow: 'B2B', title: '与SOLKERN携手', body: '成品流通、原料供应、OEM/ODM、韩国二次加工与亚洲市场合作。' },
    services: [
      { id: 'dist', title: '成品流通', desc: 'ERMÁK · ASIL产品在韩国与亚洲的合作', bullets: ['仓储会员店 · 大型零售', '线上渠道供货', '餐饮 · 咖啡 · 烘焙B2B', '亚洲各国合作伙伴'] },
      { id: 'raw', title: '原料供应', desc: '标准化的水果原料、粉末与副产物', bullets: ['果肉 · 果皮 · 籽粉', '冻干原料', '附COA与规格书', 'MOQ与交期可协商'] },
      { id: 'oem', title: 'OEM / ODM', desc: '通过韩国二次加工进行产品开发', bullets: ['奶昔、涂抹酱等食品', '磨砂、提取物等美容原料', '包装与标签审查支持', '小批量试产可协商'] },
      { id: 'sample', title: '样品 · 文件', desc: '产品样品与质量文件', bullets: ['产品目录（ERMÁK · ASIL）', '各品项规格书', '检测报告与认证证书', '样品寄送安排'] },
    ],
    steps: [
      { step: '01', title: '咨询', desc: '通过表单或邮件告知感兴趣的品项、用途与数量。' },
      { step: '02', title: '文件 · 样品', desc: '提供目录、规格书、COA与样品。' },
      { step: '03', title: '条件协商', desc: '价格、MOQ、交期、贸易术语与付款条件。' },
      { step: '04', title: '签约 · 供货', desc: '签约后经进口、通关，在当地交付。' },
    ],
    docs: ['产品目录', '各品项规格书', '检测报告（COA）', 'ISO · HALAL证书', '原产地证明', '标签信息'],
    faq: [
      { q: '最小起订量（MOQ）是多少？', a: '因品项与包装规格而异。请告知目标数量，我们将说明各品项的MOQ与交期。' },
      { q: '可以索取样品吗？', a: '可以。B2B咨询后协商样品品项与数量，运费事先约定。' },
      { q: '可以少量采购原料（副产物）吗？', a: '支持研发用少量样品采购，并附规格书与检测报告供应。' },
      { q: '是否向韩国以外供货？', a: '是的。我们与ERMÁK经销协议所定亚太12个市场（韩国、中国、日本、台湾、香港、蒙古、越南、泰国、马来西亚、印度尼西亚、菲律宾、澳大利亚）的伙伴合作。中亚五国由ERMÁK总部直接管理。' },
    ],
    cta: { title: '开启B2B对话', button: 'B2B咨询' },
  },
  news: {
    hero: { eyebrow: 'NEWS', title: 'SOLKERN Journal', body: '出差、签约、上市、展会与研发进展。' },
    empty: '暂无文章。',
    items: [
      { id: 'n-2026-09-01', date: '2026.09', category: 'R&D', title: '首批100公斤冻干石榴皮粉下单', summary: '作为石榴皮提取物业务的第一步，我们订购了100公斤冻干粉，分析与标准化工作随即展开。', placeholder: 'NEWS-POMEGRANATE' },
      { id: 'n-2026-08-01', date: '2026.08', category: 'COMPANY', title: 'SOLKERN株式会社成立', summary: 'SOLKERN在仁川青罗成立，正式启动ERMÁK流通与原料研发业务。', placeholder: 'NEWS-OFFICE' },
      { id: 'n-2026-06-01', date: '2026.06', category: 'PRODUCT', title: 'ERMÁK · ASIL韩文目录发布', summary: '收录ERMÁK 8大品类及ASIL果汁6款、酱汁2款的韩文目录正式发布。', placeholder: 'NEWS-CATALOG' },
    ],
  },
  contact: {
    hero: { eyebrow: 'CONTACT', title: '与SOLKERN携手', body: '欢迎就韩国与亚洲的成品流通、原料供应、OEM/ODM及合作提出建议。我们将在2个工作日内回复。' },
    form: {
      name: '姓名', company: '公司名称', email: '电子邮箱', phone: '电话', country: '国家／地区',
      type: '咨询类型', typeOptions: ['成品流通', '原料供应', 'OEM / ODM', '样品 · 目录索取', '原料合作 · 研发', '其他'],
      product: '感兴趣的品项／原料', quantity: '预计数量 · MOQ', message: '咨询内容',
      agree: '同意收集和使用个人信息（用于回复咨询，保存1年）', submit: '提交咨询',
      success: '您的咨询已收到', successBody: '负责人确认后将通过邮件或电话与您联系。',
      privacy: '收集项目：姓名、公司、邮箱、电话、内容 · 目的：回复咨询 · 保存期限：1年',
    },
    info: ko.contact.info,
    officeTitle: 'OFFICE',
    address: ADDRESS,
  },
  territory: {
    eyebrow: 'DISTRIBUTION TERRITORY',
    title: '亚太 12个市场',
    body: '依据ERMÁK经销协议，以韩国为据点，向东北亚、东南亚与大洋洲的12个市场供应ERMÁK成品。',
    countLabel: '区域市场',
    regions: [
      { name: '东北亚', countries: [
        { code: 'KR', name: '韩国', city: '仁川 · 据点' },
        { code: 'CN', name: '中国', city: '北京' },
        { code: 'JP', name: '日本', city: '东京' },
        { code: 'TW', name: '台湾', city: '台北' },
        { code: 'HK', name: '香港', city: '香港' },
        { code: 'MN', name: '蒙古', city: '乌兰巴托' },
      ] },
      { name: '东南亚', countries: [
        { code: 'VN', name: '越南', city: '河内' },
        { code: 'TH', name: '泰国', city: '曼谷' },
        { code: 'MY', name: '马来西亚', city: '吉隆坡' },
        { code: 'ID', name: '印度尼西亚', city: '雅加达' },
        { code: 'PH', name: '菲律宾', city: '马尼拉' },
      ] },
      { name: '大洋洲', countries: [{ code: 'AU', name: '澳大利亚', city: '悉尼' }] },
    ],
    origins: [
      { code: 'UZ', name: '乌兹别克斯坦', role: 'ERMÁK生产 · 原产地' },
      { code: 'TR', name: '土耳其', role: '水果原料 · 副产物' },
    ],
    hub: '运营据点',
    legendTerritory: '12个区域市场',
    legendOrigin: '原产地',
    legendDirect: '中亚（ERMÁK总部直营）',
    note: '※ 区域范围依ERMÁK经销协议确定。中亚五国（哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、土库曼斯坦、乌兹别克斯坦）由ERMÁK总部直接管理。各国供货条件请通过B2B咨询了解。',
    tapHint: '点击国家名称可在地图上高亮显示',
  },
  ui: {
    langName: '中文',
    sections: { solkernBusiness: '三项业务，一条价值链', solkernPartners: '从生产到销售的三方协作体系', companyInfo: '公司信息', originRegions: '原料生长之地', labTracks: '三大原料方向', labProcess: '从副产物到标准化原料', b2bServices: '合作方式', b2bProcess: '从咨询到供货', b2bFaq: '常见问题' },
    originMarquee: ['阳光', '土壤', '气候', '果园文化', '乌兹别克斯坦', '土耳其', '石榴', '杏', '樱桃', '坚果'],
    table: { region: '区域', country: '国家', city: '主要城市' },
    regionsLabel: '区域', originsLabel: '原产地',
    prev: '上一个', next: '下一个',
    productNote: '※ 产品规格与标签事项以进口标签为准，索取目录时可提供各品项规格书。',
    countryPlaceholder: '中国',
    privacy: {
      title: '隐私政策',
      intro: 'SOLKERN株式会社（以下简称“公司”）为处理网站咨询，按以下方式收集和使用个人信息。',
      items: ['收集项目：姓名、公司名称、电子邮箱、电话、国家、咨询内容', '使用目的：回复咨询，提供报价、样品与文件', '保存期限：自受理之日起1年，或相关法律规定的期限', '向第三方提供：除法律规定外，不向第三方提供'],
      officer: '个人信息保护负责人：Park Jin-tae',
    },
  },
  footer: {
    tagline: 'From Origin to New Value',
    company: 'SOLKERN株式会社（SOLKERN Co., Ltd.）',
    ceo: '信息管理负责人：Park Jin-tae',
    regNo: '营业执照号 443-86-03703',
    address: ADDRESS,
    email: 'solkern@solkern.kr',
    tel: '+82-10-4589-1030',
    copyright: '© 2026 SOLKERN Co., Ltd. All rights reserved.',
    links: [
      { label: '隐私政策', href: '/privacy' },
      { label: '管理员', href: '/admin' },
    ],
  },
};
