import './styles3.css';
import {
  ArrowLeft,
  BatteryFull,
  Bell,
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Clock3,
  Compass,
  Droplets,
  FileText,
  Heart,
  Image,
  Leaf,
  ListFilter,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Mic2,
  MoreHorizontal,
  Navigation,
  Play,
  Radio,
  Route,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Signal,
  Sparkles,
  Sprout,
  Sun,
  ThumbsUp,
  UserRound,
  Users,
  Video,
  Volume2,
  Wifi,
  X,
  createIcons
} from 'lucide';

const icons = {
  ArrowLeft,
  BatteryFull,
  Bell,
  Bookmark,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Clock3,
  Compass,
  Droplets,
  FileText,
  Heart,
  Image,
  Leaf,
  ListFilter,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Mic2,
  MoreHorizontal,
  Navigation,
  Play,
  Radio,
  Route,
  Search,
  Send,
  Share2,
  ShieldCheck,
  Signal,
  Sparkles,
  Sprout,
  Sun,
  ThumbsUp,
  UserRound,
  Users,
  Video,
  Volume2,
  Wifi,
  X
};

const embeddedAssets = globalThis.__URBAN_GARDEN_ASSETS__;
const asset = (name) => embeddedAssets?.[name] ?? `${import.meta.env.BASE_URL}assets/${name}`;
const assets = {
  plot: asset('real-adopted-plot.png'),
  farmer: asset('real-rooftop-farmer.png'),
  seeds: asset('real-seed-selection.png'),
  outcome: asset('real-harvest-outcome.png')
};

const plots = [
  {
    id: 'tomato',
    city: '上海',
    district: '长宁区',
    title: '屋顶番茄地块',
    crop: '樱桃番茄',
    cropType: '果蔬',
    landscape: '屋顶农场',
    farmerTraits: ['记录细致', '乐于接待'],
    farmer: '农夫阿青',
    stage: '现蕾期 · 第 4 周',
    note: '从花蕾到第一颗成熟果实',
    updated: '今天 08:36',
    subscribers: 1284,
    likes: 3860,
    image: assets.plot,
    farmerImage: assets.farmer
  },
  {
    id: 'herbs',
    city: '杭州',
    district: '拱墅区',
    title: '运河香草花园',
    crop: '罗勒 · 薄荷',
    cropType: '香草',
    landscape: '滨水花园',
    farmerTraits: ['生态实践', '声音记录'],
    farmer: '农夫雨川',
    stage: '旺长期 · 第 7 周',
    note: '跟着香气记录每一次修剪',
    updated: '今天 07:50',
    subscribers: 807,
    likes: 2120,
    image: assets.seeds,
    farmerImage: assets.seeds
  },
  {
    id: 'greens',
    city: '苏州',
    district: '姑苏区',
    title: '平江社区叶菜园',
    crop: '生菜 · 羽衣甘蓝',
    cropType: '叶菜',
    landscape: '社区共建',
    farmerTraits: ['社区协作', '乐于接待'],
    farmer: '农夫林一',
    stage: '采收期 · 第 9 周',
    note: '每周一次社区采收与分享',
    updated: '昨天 17:20',
    subscribers: 663,
    likes: 1780,
    image: assets.farmer,
    farmerImage: assets.farmer
  }
];

const query = new URLSearchParams(location.search);
const initialSubscribedPlots = new Set(query.get('subscribed') === '1' ? ['tomato'] : []);
const state = {
  role: query.get('role') || '',
  route: query.get('screen') || 'role',
  selectedPlot: 'tomato',
  subscribed: query.get('subscribed') === '1',
  subscribedPlots: initialSubscribedPlots,
  adopted: false,
  spaceTab: query.get('tab') || 'overview',
  visitStage: query.get('visit') || 'booking',
  farmerVisitApproved: false,
  recordPublished: false,
  outcomeChoice: '',
  liked: false,
  likedPlots: new Set(),
  commentsOpen: false,
  subscriptionInfoOpen: false,
  filterOpen: false,
  filters: { region: '', crop: '', landscape: '', farmer: '' },
  searchQuery: '',
  soundPlaying: false,
  growthStage: 'bud',
  visitDate: '29',
  visitMode: 'self',
  visitTime: '16:00',
  irrigationOn: false,
  nutrientOn: false,
  coolingOn: false,
  channelSwipeDirection: '',
  lastChannelSwipe: 0,
  notice: '',
  zoom: Number(localStorage.getItem('urbanGardenIndex3Zoom')) || 1
};

const seekerNav = {
  discover: ['发现', 'compass'],
  subscriptions: ['订阅', 'bookmark'],
  updates: ['动态', 'radio'],
  visits: ['探访', 'map-pin'],
  seekerMe: ['我的', 'user-round']
};

const farmerNav = {
  farmerHome: ['工作台', 'sun'],
  farmerRecords: ['记录', 'image'],
  farmerVisits: ['预约', 'calendar-days'],
  farmerHarvest: ['成果', 'sprout'],
  farmerMe: ['农场', 'user-round']
};

const titles = {
  discover: '发现田地',
  subscriptions: '我的订阅',
  updates: '订阅动态',
  visits: '现场探访',
  seekerMe: '我的',
  space: 'Farmer Space',
  subscriptionSuccess: '订阅成功',
  farmerHome: '今日工作台',
  farmerRecords: '内容记录',
  farmerVisits: '预约管理',
  farmerHarvest: '季末成果',
  farmerMe: '农场账户',
  recordEditor: '编辑田间记录',
  farmerVisitDetail: '预约详情',
  farmerOutcomeDetail: '成果包详情'
};

function icon(name, text = '') {
  return `<i data-lucide="${name}" aria-hidden="true"></i>${text ? `<span>${text}</span>` : ''}`;
}

function plotOf(model = state) {
  return plots.find((plot) => plot.id === model.selectedPlot) ?? plots[0];
}

function isPlotSubscribed(model, plotId = model.selectedPlot) {
  if (model === state) return model.subscribedPlots.has(plotId);
  return Boolean(model.subscribedPlots?.has?.(plotId) || (model.subscribed && model.selectedPlot === plotId));
}

function subscribedPlotsFor(model) {
  if (model === state) return plots.filter((plot) => model.subscribedPlots.has(plot.id));
  return plots.filter((plot) => isPlotSubscribed(model, plot.id));
}

function hasSubscriptions(model) {
  return subscribedPlotsFor(model).length > 0;
}

function isPlotLiked(model, plotId = model.selectedPlot) {
  if (model === state) return model.likedPlots.has(plotId);
  return Boolean(model.liked && model.selectedPlot === plotId);
}

function filteredPlots(model) {
  const filters = model.filters ?? state.filters;
  const term = (model.searchQuery ?? '').trim().toLowerCase();
  return plots.filter((plot) => {
    const searchable = [plot.city, plot.district, plot.title, plot.crop, plot.farmer].join(' ').toLowerCase();
    return (!term || searchable.includes(term))
      && (!filters.region || plot.city === filters.region)
      && (!filters.crop || plot.cropType === filters.crop)
      && (!filters.landscape || plot.landscape === filters.landscape)
      && (!filters.farmer || plot.farmerTraits.includes(filters.farmer));
  });
}

const growthStages = [
  { id: 'seed', label: '播种', week: 'WEEK 01', title: '种子进入培养床', time: '6 月 5 日 · 09:20', record: '完成播种与首轮浇水', copy: '选定种子已经进入培养土，首轮湿度保持在 68%。', image: assets.seeds },
  { id: 'sprout', label: '发芽', week: 'WEEK 02', title: '第一批幼芽出现', time: '6 月 12 日 · 07:45', record: '发芽率达到 91%', copy: '幼芽朝向均匀，开始增加早晨日照时长。', image: assets.plot },
  { id: 'leaves', label: '长叶', week: 'WEEK 03', title: '真叶展开并调整支架', time: '6 月 19 日 · 16:10', record: '完成第一次支架调整', copy: '主茎生长稳定，平均高度达到 28 cm。', image: assets.farmer },
  { id: 'bud', label: '现蕾', week: 'WEEK 04', title: '从长叶进入现蕾期', time: '今天 08:36', record: '第一簇花蕾已经出现', copy: '植株状态稳定，土壤湿度 62%。', image: assets.plot },
  { id: 'fruit', label: '结果', week: 'NEXT', title: '等待第一颗果实', time: '预计 7 月上旬', record: '下一阶段尚未开始', copy: '农夫会在坐果后发布新的影像与养护记录。', image: assets.plot }
];

function growthStageOf(model) {
  return growthStages.find((stage) => stage.id === model.growthStage) ?? growthStages[3];
}

const filterGroups = [
  ['region', '地区', ['上海', '杭州', '苏州']],
  ['crop', '作物种类', ['果蔬', '香草', '叶菜']],
  ['landscape', '田地造景', ['屋顶农场', '滨水花园', '社区共建']],
  ['farmer', '农夫特点', ['记录细致', '乐于接待', '生态实践', '社区协作']]
];

function statusBar(dark = false) {
  return `<div class="v3-status ${dark ? 'dark' : ''}"><strong>9:41</strong><span class="v3-island"></span><span>${icon('signal')}${icon('wifi')}${icon('battery-full')}</span></div>`;
}

function roleScreen() {
  return `
    <main class="role-screen">
      <div class="role-brand">${icon('sprout')}<span>URBAN GARDEN SERVICE</span></div>
      <header><span>选择使用身份</span><h1>同一块田地，<br>两种清晰的工作方式</h1><p>身份只决定你看到的工具，不改变田地本身。</p></header>
      <div class="role-options">
        <button class="role-option seeker" data-select-role="seeker" type="button">
          <span class="role-icon">${icon('compass')}</span>
          <span class="role-copy"><small>VIBE SEEKER</small><strong>我是线上用户</strong><em>发现、订阅、探访并接收田地成果</em></span>
          ${icon('chevron-right')}
        </button>
        <button class="role-option farmer" data-select-role="farmer" type="button">
          <span class="role-icon">${icon('leaf')}</span>
          <span class="role-copy"><small>CITY FARMER</small><strong>我是城市农夫</strong><em>记录田间、处理预约并整理季末成果</em></span>
          ${icon('chevron-right')}
        </button>
      </div>
      <footer>${icon('shield-check')}<span>两套导航完全分开，可在账户页退出后重新选择。</span></footer>
    </main>
  `;
}

function appHeader(model) {
  const isFarmer = model.role === 'farmer';
  const auxiliary = ['space', 'recordEditor', 'farmerVisitDetail', 'farmerOutcomeDetail'].includes(model.route);
  const back = model.route === 'space' ? 'subscriptions' : model.route === 'recordEditor' ? 'farmerRecords' : model.route === 'farmerVisitDetail' ? 'farmerVisits' : 'farmerHarvest';
  return `
    <header class="v3-header ${isFarmer ? 'farmer-header' : ''}">
      <button class="v3-header-icon ${auxiliary ? '' : 'brand'}" ${auxiliary ? `data-route="${back}"` : ''} type="button" aria-label="${auxiliary ? '返回' : '品牌'}">${icon(auxiliary ? 'arrow-left' : isFarmer ? 'leaf' : 'sprout')}</button>
      <div><span>${isFarmer ? 'CITY FARMER' : 'VIBE SEEKER'}</span><h1>${titles[model.route] || 'Urban Garden'}</h1></div>
      <button class="v3-header-icon" type="button" aria-label="通知">${icon('bell')}<b></b></button>
    </header>
  `;
}

function bottomNav(model) {
  const nav = model.role === 'farmer' ? farmerNav : seekerNav;
  return `<nav class="v3-bottom-nav ${model.role === 'farmer' ? 'farmer-bottom-nav' : ''}">${Object.entries(nav).map(([route, [label, iconName]]) => `<button class="${model.route === route ? 'active' : ''}" data-route="${route}" type="button"><span>${icon(iconName)}</span><small>${label}</small></button>`).join('')}</nav>`;
}

function sectionHead(kicker, title, action = '') {
  return `<div class="v3-section-head"><div><span>${kicker}</span><h2>${title}</h2></div>${action}</div>`;
}

function discoverScreen(model) {
  const matches = filteredPlots(model);
  const featured = matches[0];
  const activeFilters = Object.values(model.filters ?? {}).filter(Boolean).length;
  return `
    <section class="seeker-intro"><button type="button">${icon('map-pin')}城市田地网络${icon('chevron-down')}</button><h2>从一段真实记录，<br>认识一块城市田地</h2><p>浏览农夫公开的田间影像，确认感兴趣后再建立长期订阅。</p></section>
    <div class="v3-search">${icon('search')}<input data-search-plots aria-label="搜索田地" placeholder="搜索城市、作物或农夫" value="${model.searchQuery ?? ''}" /><button data-open-filter type="button" aria-label="筛选田地">${icon('list-filter')}${activeFilters ? `<b>${activeFilters}</b>` : ''}</button></div>
    <section class="discover-content">
      ${featured ? `${sectionHead('RECOMMENDED TODAY', activeFilters ? '筛选结果' : '今日推荐', '<button class="text-link">查看地图</button>')}
        <button class="featured-plot" data-open-channel="${featured.id}" type="button">
          <img src="${featured.image}" alt="${featured.title}" />
          <span class="media-tag">${icon('video')}最新田间记录</span>
          <div><span>${featured.city} · ${featured.district}</span><h3>${featured.title}</h3><p>${featured.note}</p><small>${featured.stage} · ${featured.subscribers.toLocaleString()} 人订阅</small></div>
        </button>
        ${sectionHead('MORE PLOTS', matches.length > 1 ? `另有 ${matches.length - 1} 块匹配田地` : '继续探索')}
        <div class="plot-list">${matches.slice(1).map((plot) => `<button data-open-channel="${plot.id}" type="button"><img src="${plot.image}" alt="${plot.title}" /><span><small>${plot.city} · ${plot.updated}</small><strong>${plot.title}</strong><em>${plot.crop} · ${plot.landscape}</em></span>${icon('chevron-right')}</button>`).join('')}</div>` : `<div class="discover-empty">${icon('search')}<strong>没有找到匹配田地</strong><p>尝试清空关键词或调整筛选条件。</p><button data-reset-filters>清空筛选</button></div>`}
    </section>
  `;
}

function channelScreen(model) {
  const plot = plotOf(model);
  const subscribed = isPlotSubscribed(model, plot.id);
  const liked = isPlotLiked(model, plot.id);
  const plotIndex = plots.findIndex((item) => item.id === plot.id);
  return `
    <main class="channel-screen ${model.channelSwipeDirection ? `swipe-${model.channelSwipeDirection}` : ''}" data-channel-feed>
      <img class="channel-media" src="${plot.image}" alt="${plot.title}田间影像" />
      <div class="channel-shade"></div>
      <header class="channel-header"><button data-route="discover" type="button">${icon('arrow-left')}</button><img src="${plot.farmerImage}" alt="${plot.farmer}" /><div><strong>${plot.farmer}</strong><span>${plot.city} · ${plot.district}</span></div><button type="button">${icon('more-horizontal')}</button></header>
      <div class="channel-context"><span>${icon('video')}田间影像 · 01:24</span><strong>${plot.stage}</strong></div>
      <aside class="channel-actions"><button class="${liked ? 'active' : ''}" data-like type="button">${icon('heart')}<span>${plot.likes + (liked ? 1 : 0)}</span></button><button data-comments type="button">${icon('message-circle')}<span>128</span></button><button data-share type="button">${icon('share-2')}<span>分享</span></button></aside>
      <div class="channel-pager" aria-label="田地浏览进度">${plots.map((item, index) => `<i class="${item.id === plot.id ? 'active' : ''}"></i>`).join('')}<span>${plotIndex + 1}/${plots.length}</span></div>
      <section class="channel-info">
        <span>${plot.city} · ${plot.district}</span><h2>${plot.title}</h2><p>${plot.note}</p>
        <div><small>${icon('users')}${plot.subscribers.toLocaleString()} 人正在长期关注</small><button data-subscription-info type="button">订阅包含什么？</button></div>
      </section>
      <div class="channel-swipe-hint">${icon('chevron-down')}<span>上下滑动浏览其他田地</span></div>
      <section class="channel-cta">
        ${subscribed ? `<button class="channel-primary subscribed" data-enter-space type="button">${icon('check-circle-2')}已订阅 · 进入 Farmer Space</button>` : `<button class="channel-primary" data-subscribe-primary type="button">${icon('bookmark')}订阅这块田地</button>`}
        <small>${subscribed ? '成长记录、探访与季末成果均已解锁' : '免费订阅 · 同一块田地可由多人共同关注'}</small>
      </section>
    </main>
  `;
}

function subscriptionSuccess(model) {
  const plot = plotOf(model);
  return `<section class="success-page"><span class="success-mark">${icon('check')}</span><small>SUBSCRIPTION CONFIRMED</small><h2>现在开始长期关注</h2><p>你已订阅「${plot.title}」。Farmer Space、成长动态、现场探访和季末成果均已解锁。</p><article><img src="${plot.image}" alt="${plot.title}" /><div><span>${plot.stage}</span><strong>${plot.title}</strong><small>${plot.farmer} · ${plot.city}${plot.district}</small></div></article><button class="v3-primary" data-enter-space type="button">进入 Farmer Space</button><button class="v3-secondary" data-route="discover" type="button">继续发现其他田地</button></section>`;
}

function subscriptionsScreen(model) {
  const subscribed = subscribedPlotsFor(model);
  if (!subscribed.length) return emptyState('bookmark', '还没有订阅田地', '先在发现页查看田间影像，再选择值得长期关注的田地。', '去发现田地', 'discover');
  return `<section class="page-lead"><span>MY SUBSCRIPTIONS</span><h2>持续关注的 ${subscribed.length} 块田地</h2><p>订阅关系不独占，同一块田地由多个用户共同关注。</p></section><section class="subscription-content">${subscribed.map((plot) => `<article class="subscription-card-v3"><button data-open-channel="${plot.id}" type="button"><img src="${plot.image}" alt="${plot.title}" /><span>${plot.updated}更新</span></button><div><small>${plot.city} · ${plot.district}</small><h3>${plot.title}</h3><p>${plot.stage} · ${plot.farmer}</p><aside><span>${icon('bookmark')}已订阅</span><em>${plot.subscribers + 1} 位订阅者</em></aside><button data-enter-space="${plot.id}" type="button">进入 Farmer Space ${icon('chevron-right')}</button></div></article>`).join('')}</section>`;
}

function updatesScreen(model) {
  if (!hasSubscriptions(model)) return emptyState('radio', '订阅后才有专属动态', '农夫记录、阶段变化、探访进度与成果通知会集中出现在这里。', '去发现田地', 'discover');
  const plot = plotOf(model);
  return `<section class="page-lead"><span>SUBSCRIBED FEED</span><h2>只看与你有关的更新</h2><p>这里不混入城市推荐，只保留已订阅田地的服务信息。</p></section><section class="feed-v3"><article class="priority-update">${icon('sprout')}<div><span>${plot.title}</span><strong>成长阶段进入现蕾期</strong><small>今天 08:36 · 农夫阿青</small></div><button data-enter-space>查看</button></article><article class="media-update"><img src="${plot.image}" alt="成长动态" /><div><span>田间记录 · 2 小时前</span><strong>发现第一簇花蕾，叶片状态稳定。</strong><p>土壤湿度正常，今天无需额外浇水。</p><button data-enter-space>查看完整记录 ${icon('chevron-right')}</button></div></article><article class="service-update">${icon('calendar-days')}<div><span>现场探访</span><strong>${model.visitStage === 'booking' ? '本周有 3 个可预约时段' : '你的探访申请状态已更新'}</strong><small>进入探访页查看</small></div><button data-route="visits">查看</button></article><article class="service-update outcome">${icon('sparkles')}<div><span>季末成果</span><strong>订阅者成果包已开放选择</strong><small>新鲜番茄 · 香草副产物 · 记录卡</small></div><button data-space-tab="outcome">查看</button></article></section>`;
}

function spaceScreen(model) {
  const plot = plotOf(model);
  const tabs = [['overview', '空间'], ['growth', '成长'], ['community', '提案'], ['outcome', '成果']];
  return `<section class="space-cover"><img src="${plot.image}" alt="${plot.title}" /><span>${icon('bookmark')}订阅者空间</span><div><small>FARMER SPACE</small><h2>${plot.title}</h2><p>${plot.farmer} · ${plot.stage}</p></div></section><nav class="space-tabs-v3">${tabs.map(([id, label]) => `<button class="${model.spaceTab === id ? 'active' : ''}" data-space-tab="${id}">${label}</button>`).join('')}</nav>${spaceContent(model, plot)}`;
}

function spaceContent(model, plot) {
  if (model.spaceTab === 'growth') {
    const stage = growthStageOf(model);
    const currentIndex = growthStages.findIndex((item) => item.id === 'bud');
    return `<section class="space-pane">${sectionHead(stage.week, stage.title)}<nav class="growth-timeline" aria-label="成长阶段">${growthStages.map((item, index) => `<button class="${item.id === stage.id ? 'active' : ''} ${index <= currentIndex ? 'complete' : ''}" data-growth-stage="${item.id}" type="button"><i>${index < currentIndex ? icon('check') : index + 1}</i><span>${item.label}</span></button>`).join('')}</nav><article class="growth-entry ${stage.id === 'fruit' ? 'future' : ''}"><img src="${stage.image}" alt="${stage.label}阶段记录" /><div><span>${stage.time}</span><strong>${stage.record}</strong><p>${stage.copy}</p></div></article><div class="growth-switch-note">${icon('clock-3')}点击上方阶段，可查看这一阶段的田间记录</div></section>`;
  }
  if (model.spaceTab === 'community') return `<section class="space-pane"><div class="proposal-lead">${icon('thumbs-up')}<div><span>COMMUNITY PROPOSALS</span><h3>提出建议，但不替农夫做决定</h3><p>投票代表社区兴趣，农夫会结合天气、作物和排期独立评估。</p></div></div><button class="proposal-new">${icon('circle-plus')}提出新建议</button><article class="proposal-row"><div><span>小禾提议</span><strong>下次多拍一些花蕾近景</strong><small>农夫评估中</small></div><button>${icon('thumbs-up')}46</button></article><article class="proposal-row"><div><span>Lynn 提议</span><strong>想听一次清晨浇水的环境声</strong><small>已加入记录计划</small></div><button>${icon('thumbs-up')}31</button></article><div class="decision-note">${icon('shield-check')}最终田间操作由农夫决定</div></section>`;
  if (model.spaceTab === 'outcome') return `<section class="space-pane"><div class="outcome-visual"><img src="${assets.outcome}" alt="本季成果包" /><span>${icon('sparkles')}本季成果已整理</span></div>${sectionHead('SEASONAL OUTCOME', '把共同成长带回家')}<p class="pane-copy">成果包会根据真实收成整理，不承诺固定数量。</p><div class="outcome-list"><article>${icon('sprout')}<div><strong>新鲜番茄</strong><span>本季采收 · 约 500g</span></div></article><article>${icon('leaf')}<div><strong>干罗勒</strong><span>修剪副产物再利用</span></div></article><article>${icon('file-text')}<div><strong>个人种植记录卡</strong><span>订阅与探访片段</span></div></article></div><div class="outcome-choice">${model.outcomeChoice ? `<div>${icon('check-circle-2')}<span><strong>${model.outcomeChoice === 'pickup' ? '到场领取' : '同城配送'}</strong><small>选择已保存</small></span></div>` : `<button data-outcome="pickup">${icon('map-pin')}到场领取</button><button data-outcome="delivery">${icon('navigation')}同城配送</button>`}</div></section>`;
  return `<section class="space-pane"><article class="farmer-message"><img src="${plot.farmerImage}" alt="${plot.farmer}" /><div><span>来自${plot.farmer}</span><strong>欢迎进入这块田地的长期记录</strong><p>日常巡园中值得分享的画面、声音和变化都会更新在这里。</p></div></article>${sectionHead('FIELD MEDIA', '本周田间记录')}<div class="media-grid-v3"><button><img src="${assets.farmer}" alt="晨间巡园" /><span>${icon('play')}</span><strong>晨间巡园</strong><small>01:24</small></button><button><img src="${assets.plot}" alt="花蕾近景" /><span>${icon('play')}</span><strong>花蕾近景</strong><small>00:48</small></button></div><article class="sound-row ${model.soundPlaying ? 'playing' : ''}">${icon('volume-2')}<div><span>FIELD SOUND · 00:38</span><strong>清晨的风与浇水声</strong><div class="sound-wave" aria-hidden="true">${Array.from({ length: 18 }, (_, index) => `<i style="--wave:${index}"></i>`).join('')}</div></div><button data-toggle-sound type="button" aria-label="${model.soundPlaying ? '暂停田间声音' : '播放田间声音'}">${icon(model.soundPlaying ? 'volume-2' : 'play')}</button></article>${sectionHead('PHOTO FEED', '本周影像')}<div class="photo-row"><img src="${assets.plot}" alt="番茄地块" /><img src="${assets.seeds}" alt="本周种植准备" /><img src="${assets.farmer}" alt="农夫田间记录" /></div></section>`;
}

function visitsScreen(model) {
  if (!hasSubscriptions(model)) return emptyState('lock-keyhole', '订阅田地后开放探访', '探访属于订阅后的持续服务，不在公开发现流程中出现。', '查看我的订阅', 'subscriptions');
  if (model.visitStage === 'pending') return visitPending(model);
  if (model.visitStage === 'approved') return visitPass(model);
  if (model.visitStage === 'onsite') return visitOnsite(model);
  if (model.visitStage === 'review') return visitReview(model);
  return visitBooking(model);
}

function visitBooking(model) {
  const plot = plotOf(model);
  const dates = [['周日', '28'], ['周一', '29'], ['周二', '30'], ['周三', '01']];
  const modeLabel = model.visitMode === 'farmer' ? '农夫陪同' : '自助导览';
  return `<section class="visit-hero-v3"><img src="${plot.farmerImage}" alt="${plot.title}现场探访" /><div><span>SUBSCRIBER VISIT</span><h2>预约去现场见见<br>你关注的田地</h2><p>${plot.title}本周开放预约。</p></div></section><section class="visit-pane">${sectionHead('选择日期', '可预约时段')}<div class="date-row">${dates.map(([day, date]) => `<button class="${model.visitDate === date ? 'active' : ''}" data-visit-date="${date}" type="button"><span>${day}</span><strong>${date}</strong></button>`).join('')}</div><div class="visit-mode"><button class="${model.visitMode === 'self' ? 'active' : ''}" data-visit-mode="self" type="button">${icon('route')}<span><strong>自助导览</strong><small>扫码入场，按路线自由参观</small></span><i></i></button><button class="${model.visitMode === 'farmer' ? 'active' : ''}" data-visit-mode="farmer" type="button">${icon('message-circle')}<span><strong>农夫陪同</strong><small>提交后由农夫确认接待时间</small></span><i></i></button></div><div class="visit-time"><span>到场时间</span><div>${['15:00', '16:00', '17:00'].map((time) => `<button class="${model.visitTime === time ? 'active' : ''}" data-visit-time="${time}" type="button">${time}</button>`).join('')}</div></div><article class="booking-summary">${icon('calendar-days')}<div><span>6 月 ${model.visitDate} 日 · ${model.visitTime}</span><strong>${plot.title}</strong><small>${modeLabel} · ${model.visitMode === 'farmer' ? '等待农夫确认' : '约 50 分钟'}</small></div></article><button class="v3-primary" data-book-visit>提交${modeLabel}申请</button></section>`;
}

function visitPending(model) {
  const plot = plotOf(model);
  const modeLabel = model.visitMode === 'farmer' ? '农夫陪同' : '自助导览';
  return `<section class="status-hero pending">${icon('clock-3')}<span>REQUEST SENT</span><h2>等待农夫确认</h2><p>申请已发送。确认后会生成独立入场凭证。</p></section><section class="status-pane">${sectionHead('申请详情', `6 月 ${model.visitDate} 日 · ${model.visitTime}`)}<article class="status-plot"><img src="${plot.image}" alt="${plot.title}" /><div><span>${plot.city} · ${plot.district}</span><strong>${plot.title}</strong><small>${modeLabel} · ${model.visitMode === 'farmer' ? '等待接待确认' : '约 50 分钟'}</small></div></article><div class="status-steps"><article class="done">${icon('check')}<div><strong>申请已提交</strong><span>今天 09:18</span></div></article><article class="current">${icon('clock-3')}<div><strong>农夫确认中</strong><span>通常在 24 小时内回复</span></div></article><article>${icon('map-pin')}<div><strong>生成入场凭证</strong><span>确认后自动开放</span></div></article></div></section>`;
}

function visitPass() {
  return `<section class="status-hero approved">${icon('check-circle-2')}<span>REQUEST APPROVED</span><h2>探访已确认</h2><p>农夫阿青已为你保留本次参观时段。</p></section><section class="status-pane"><article class="entry-pass-v3"><header><div><span>URBAN GARDEN PASS</span><strong>屋顶番茄地块</strong></div>${icon('sprout')}</header><div class="qr-code">${Array.from({length:81},(_,i)=>`<i class="${((i*7+i%9*3)%11)<5?'on':''}"></i>`).join('')}</div><p>到达后扫描园区二维码，或向农夫出示此凭证。</p><footer><span>6 月 29 日</span><strong>16:00</strong><span>自助导览</span></footer></article><div class="pass-benefits"><article>${icon('route')}<div><strong>3 个参观点</strong><span>路线已经准备</span></div></article><article>${icon('camera')}<div><strong>体验自动记录</strong><span>到场后自动开启</span></div></article></div><button class="v3-primary" data-start-visit>${icon('map-pin')}模拟到场并开始</button></section>`;
}

function visitOnsite() {
  return `<section class="onsite-hero-v3"><img src="${assets.plot}" /><span class="capture-state">${icon('camera')}自动记录中 · 4 个片段</span><div><span>ON-SITE JOURNEY</span><h2>沿着作物的成长路线走走</h2><p>当前：番茄支架与花蕾观察区</p></div></section><section class="onsite-pane"><div class="route-progress"><i></i></div><article class="route-stop done">${icon('check')}<div><span>01</span><strong>扫码进入屋顶农场</strong><small>16:02 · 已自动记录</small></div></article><article class="route-stop active">${icon('sprout')}<div><span>02</span><strong>观察花蕾与支架</strong><small>停留 12 分钟</small></div></article><article class="route-stop">${icon('users')}<div><span>03</span><strong>和农夫聊聊本周养护</strong><small>下一站</small></div></article><div class="capture-preview"><img src="${assets.plot}" /><img src="${assets.farmer}" /><button>${icon('camera')}记录</button></div><button class="v3-primary" data-finish-visit>完成路线并留下反馈</button></section>`;
}

function visitReview() {
  return `<section class="review-hero"><img src="${assets.farmer}" /><div>${icon('check')}<span>VISIT COMPLETE</span><h2>今天的探访感觉如何？</h2><p>简短反馈会帮助农夫改进下一次接待。</p></div></section><section class="review-pane">${sectionHead('SHORT FEEDBACK', '为本次体验评分')}<div class="stars">${[1,2,3,4,5].map(()=>`<button>${icon('sparkles')}</button>`).join('')}</div><textarea placeholder="写下一句印象，例如：第一次看见番茄花蕾……"></textarea><article>${icon('image')}<div><strong>体验片段已自动整理</strong><span>4 张照片 · 1 段短视频 · 3 个参观点</span></div></article><button class="v3-primary" data-route="subscriptions">提交反馈并生成回顾</button></section>`;
}

function seekerMeScreen(model) {
  return `<section class="identity-head seeker-profile"><span>${icon('user-round')}</span><div><small>VIBE SEEKER ACCOUNT</small><h2>城市观察者</h2><p>线上用户专属账户</p></div></section><section class="identity-stats"><div><strong>${subscribedPlotsFor(model).length}</strong><span>订阅田地</span></div><div><strong>${model.visitStage === 'booking' ? 0 : 1}</strong><span>探访记录</span></div><div><strong>120</strong><span>体验积分</span></div></section><section class="account-list">${sectionHead('ACCOUNT', '线上用户设置')}<button data-route="subscriptions">${icon('bookmark')}<span><strong>订阅管理</strong><small>查看 Farmer Space 与成果</small></span>${icon('chevron-right')}</button><button data-route="visits">${icon('map-pin')}<span><strong>探访记录</strong><small>预约、入场凭证与体验回顾</small></span>${icon('chevron-right')}</button><button>${icon('bell')}<span><strong>通知设置</strong><small>成长阶段与服务进度</small></span>${icon('chevron-right')}</button></section><button class="logout-button" data-logout>${icon('arrow-left')}退出线上用户身份</button>`;
}

function farmerHomeScreen(model) {
  const remoteControls = [
    ['irrigationOn', 'droplets', '自动浇水', 'A 区滴灌 · 8 分钟'],
    ['nutrientOn', 'leaf', '营养投放', '番茄 A 区 · 标准配比'],
    ['coolingOn', 'sun', '喷雾降温', '棚顶喷雾 · 5 分钟']
  ];
  return `<section class="farmer-welcome"><span>WEEK 04 · SATURDAY</span><h2>早上好，阿青</h2><p>先处理需要判断的预警，再执行远程田间操作。</p><div><article><strong>31°C</strong><span>${icon('sun')}棚顶偏热</span></article><article><strong>38%</strong><span>${icon('droplets')}A 区偏干</span></article><article><strong>3</strong><span>${icon('bell')}待处理</span></article></div></section><section class="farmer-main">${sectionHead('REMOTE ALERTS', '自动化操作提醒')}<div class="remote-alerts"><article class="critical"><span>红</span><div><strong>A 区灌溉压力异常</strong><small>需先检查阀门，再启动自动浇水</small></div></article><article class="warning"><span>橙</span><div><strong>营养液低于计划值</strong><small>建议今日 14:00 前补充养料</small></div></article><article class="info"><span>蓝</span><div><strong>棚顶温度预计继续升高</strong><small>可提前开启 5 分钟喷雾降温</small></div></article></div>${sectionHead('REMOTE CONTROL', '远程控制台')}<div class="remote-console">${remoteControls.map(([key, iconName, title, detail]) => `<button class="remote-control ${model[key] ? 'active' : ''}" data-remote="${key}" type="button" aria-pressed="${Boolean(model[key])}"><span>${icon(iconName)}</span><div><strong>${title}</strong><small>${detail}</small></div><em>${model[key] ? '运行中' : '启动'}</em></button>`).join('')}</div>${sectionHead('TODAY FIRST', '今日优先任务')}<button class="task-card urgent" data-route="farmerVisits"><span>${icon('calendar-days')}</span><div><small>预约请求 · 待确认</small><strong>线上用户申请 6 月 29 日到访</strong><p>请确认自助导览时段与入场范围</p></div>${icon('chevron-right')}</button><button class="task-card" data-route="farmerRecords"><span>${icon('camera')}</span><div><small>田间记录 · 草稿</small><strong>第一簇花蕾与晨间土壤状态</strong><p>6 个素材已自动整理，等待发布</p></div>${icon('chevron-right')}</button>${sectionHead('FIELD SNAPSHOT', '屋顶番茄地块')}<article class="field-snapshot"><img src="${assets.plot}" alt="屋顶番茄地块" /><div><span>现蕾期 · 第 4 周</span><strong>A 区等待远程灌溉确认</strong><p>传感器更新：08:42</p></div></article></section>`;
}

function farmerRecordsScreen(model) {
  return `<section class="farmer-page-lead"><span>CONTENT WORKSPACE</span><h2>把日常工作整理成清晰记录</h2><p>素材先进入草稿箱，由农夫编辑后决定是否发布。</p></section><section class="farmer-main"><button class="record-create" data-route="recordEditor">${icon('circle-plus')}新建田间记录</button><article class="record-card-v3"><div class="record-images"><img src="${assets.plot}" /><img src="${assets.seeds}" /><span>${icon('mic-2')}00:38</span></div><div><span>${model.recordPublished ? '已发布 · 订阅者可见' : '草稿箱 · 自动保存'}</span><strong>第一簇花蕾与晨间土壤状态</strong><p>3 张照片 · 2 段影像 · 1 条语音</p><button data-route="recordEditor">${model.recordPublished ? '查看记录' : '继续编辑'} ${icon('chevron-right')}</button></div></article>${sectionHead('PUBLISHED', '最近发布')}<article class="published-row"><img src="${assets.farmer}" /><div><span>昨天 17:20</span><strong>完成第一次支架调整</strong><small>86 个喜欢 · 12 条评论</small></div></article><article class="published-row"><img src="${assets.seeds}" /><div><span>6 月 25 日</span><strong>本周养护准备</strong><small>54 个喜欢 · 8 条评论</small></div></article></section>`;
}

function recordEditorScreen(model) {
  return `<section class="editor-body"><div class="editor-media"><img src="${assets.plot}" /><span>${icon('play')}</span><small>主影像 · 01:24</small></div><label><span>记录标题</span><input value="第一簇花蕾与晨间土壤状态" /></label><label><span>田间说明</span><textarea>今天发现了第一簇花蕾，叶片状态稳定。土壤湿度为 62%，无需额外浇水。</textarea></label><div class="editor-assets"><button>${icon('image')}3 张照片</button><button>${icon('video')}2 段影像</button><button>${icon('mic-2')}1 条语音</button></div><div class="publish-scope">${icon('users')}<div><strong>发布范围：订阅者空间</strong><span>公开发现页只显示精选片段</span></div></div><button class="v3-primary" data-publish-record>${model.recordPublished ? icon('check-circle-2') + '已发布' : icon('send') + '确认发布'}</button></section>`;
}

function farmerVisitsScreen(model) {
  return `<section class="farmer-page-lead"><span>VISIT MANAGEMENT</span><h2>只处理到访请求与接待安排</h2><p>内容发布和成果整理不会混入这个工作区。</p></section><section class="farmer-main"><div class="request-filters"><button class="active">待处理 2</button><button>已确认 4</button><button>本周日历</button></div><button class="request-card-v3 featured" data-route="farmerVisitDetail"><span class="request-avatar">城</span><div><small>订阅者 · 城市观察者</small><strong>6 月 29 日 · 16:00</strong><p>自助导览 · 约 50 分钟</p></div><em>${model.farmerVisitApproved ? '已确认' : '待处理'}</em>${icon('chevron-right')}</button><button class="request-card-v3"><span class="request-avatar muted">禾</span><div><small>订阅者 · 小禾</small><strong>6 月 30 日 · 10:30</strong><p>希望农夫陪同 · 香草修剪</p></div><em>待处理</em>${icon('chevron-right')}</button><article class="availability-card">${icon('clock-3')}<div><strong>本周可接待时间</strong><span>周一、周三 16:00 · 周日 10:30</span></div><button>编辑</button></article></section>`;
}

function farmerVisitDetailScreen(model) {
  return `<section class="request-detail"><header><span class="request-avatar large">城</span><div><small>VIBE SEEKER</small><h2>城市观察者</h2><p>已订阅屋顶番茄地块 · 4 周</p></div></header><div class="detail-grid"><article><span>日期</span><strong>6 月 29 日</strong></article><article><span>时间</span><strong>16:00</strong></article><article><span>方式</span><strong>自助导览</strong></article><article><span>人数</span><strong>1 人</strong></article></div><article class="visitor-note">${icon('message-circle')}<div><strong>用户备注</strong><p>第一次到屋顶农场，希望重点看看番茄花蕾和支架。</p></div></article><article class="farmer-check">${icon('route')}<div><strong>系统建议路线</strong><span>入口扫码 → 花蕾观察区 → 支架区 → 交流点</span></div></article>${model.farmerVisitApproved ? `<div class="approved-banner">${icon('check-circle-2')}预约已确认，入场凭证已发送</div>` : `<div class="detail-actions"><button>建议改期</button><button data-approve-visit>${icon('check')}确认预约</button></div>`}</section>`;
}

function farmerHarvestScreen() {
  return `<section class="farmer-page-lead"><span>SEASON CLOSING</span><h2>把真实收成整理给订阅者</h2><p>成果内容随季节与收成变化，不承诺固定产量。</p></section><section class="farmer-main"><article class="harvest-progress"><div><span>成果包准备进度</span><strong>28 / 36</strong></div><i><b></b></i><small>预计 6 月 30 日开放领取</small></article><button class="harvest-visual" data-route="farmerOutcomeDetail"><img src="${assets.outcome}" /><div><span>屋顶番茄 · 本季</span><strong>订阅者成果包</strong><small>新鲜作物 · 副产物 · 个人记录卡</small></div>${icon('chevron-right')}</button><div class="harvest-checklist"><article>${icon('sprout')}<div><strong>新鲜番茄</strong><span>18 kg · 已称重</span></div><em>完成</em></article><article>${icon('leaf')}<div><strong>干罗勒副产物</strong><span>36 袋 · 已分装</span></div><em>完成</em></article><article>${icon('file-text')}<div><strong>个人种植记录卡</strong><span>28 份 · 自动生成中</span></div><em>进行中</em></article></div></section>`;
}

function farmerOutcomeDetailScreen() {
  return `<section class="outcome-detail"><div class="outcome-detail-hero"><img src="${assets.outcome}" /><div><span>SEASONAL PACKAGE</span><h2>屋顶番茄 · 本季成果包</h2></div></div><div class="package-metrics"><article><strong>36</strong><span>订阅用户</span></article><article><strong>28</strong><span>已完成</span></article><article><strong>8</strong><span>待生成</span></article></div><div class="package-settings">${sectionHead('PACKAGE CONTENT', '成果内容')}<article>${icon('sprout')}<div><strong>新鲜番茄 · 约 500g</strong><span>按实际收成浮动</span></div><button>编辑</button></article><article>${icon('leaf')}<div><strong>干罗勒 · 1 袋</strong><span>修剪副产物再利用</span></div><button>编辑</button></article><article>${icon('file-text')}<div><strong>个人记录卡 · 1 张</strong><span>自动关联订阅与探访</span></div><button>编辑</button></article></div><button class="v3-primary">${icon('send')}发布领取通知</button></section>`;
}

function farmerMeScreen() {
  return `<section class="identity-head farmer-profile"><img src="${assets.farmer}" /><div><small>CITY FARMER ACCOUNT</small><h2>农夫阿青</h2><p>Urban Garden 屋顶农场</p></div></section><section class="identity-stats farmer-stats"><div><strong>1,284</strong><span>订阅者</span></div><div><strong>4</strong><span>本周预约</span></div><div><strong>36</strong><span>成果包</span></div></section><section class="account-list">${sectionHead('FARM SETTINGS', '农场管理设置')}<button>${icon('sprout')}<span><strong>田地信息</strong><small>作物、阶段与开放状态</small></span>${icon('chevron-right')}</button><button>${icon('clock-3')}<span><strong>接待时间</strong><small>探访时段与陪同规则</small></span>${icon('chevron-right')}</button><button>${icon('shield-check')}<span><strong>内容与权限</strong><small>公开片段与订阅者内容</small></span>${icon('chevron-right')}</button></section><button class="logout-button farmer-logout" data-logout>${icon('arrow-left')}退出城市农夫身份</button>`;
}

function emptyState(iconName, title, copy, action, route) {
  return `<section class="empty-v3"><span>${icon(iconName)}</span><small>SUBSCRIBER SERVICE</small><h2>${title}</h2><p>${copy}</p><button data-route="${route}">${action} ${icon('chevron-right')}</button></section>`;
}

function screenFor(model) {
  const screens = {
    discover: discoverScreen,
    subscriptions: subscriptionsScreen,
    updates: updatesScreen,
    visits: visitsScreen,
    seekerMe: seekerMeScreen,
    space: spaceScreen,
    subscriptionSuccess,
    farmerHome: farmerHomeScreen,
    farmerRecords: farmerRecordsScreen,
    recordEditor: recordEditorScreen,
    farmerVisits: farmerVisitsScreen,
    farmerVisitDetail: farmerVisitDetailScreen,
    farmerHarvest: farmerHarvestScreen,
    farmerOutcomeDetail: farmerOutcomeDetailScreen,
    farmerMe: farmerMeScreen
  };
  return (screens[model.route] || discoverScreen)(model);
}

function phoneMarkup(model, snapshot = false) {
  if (model.route === 'role') return `<div class="v3-phone-screen">${statusBar()}${roleScreen()}</div>`;
  if (model.route === 'channel') return `<div class="v3-phone-screen channel-mode">${statusBar(true)}${channelScreen(model)}</div>`;
  const baseNav = model.role === 'farmer' ? Object.hasOwn(farmerNav, model.route) : Object.hasOwn(seekerNav, model.route);
  return `<div class="v3-phone-screen ${model.role === 'farmer' ? 'farmer-app' : 'seeker-app'}">${statusBar()}${appHeader(model)}<div class="v3-scroll">${screenFor(model)}</div>${baseNav ? bottomNav(model) : ''}${!snapshot && model.notice ? `<div class="v3-toast">${icon('check-circle-2')}${model.notice}</div>` : ''}</div>`;
}

function renderFlowBoard() {
  document.body.classList.add('flow-export-mode');
  const subscribed = { subscribed: true, selectedPlot: 'tomato' };
  const pages = [
    ['00 · 身份入口', { role: '', route: 'role' }],
    ['U01 · 发现田地', { role: 'seeker', route: 'discover' }],
    ['U02 · 田地视频 / 未订阅', { role: 'seeker', route: 'channel', subscribed: false }],
    ['U03 · 订阅成功', { role: 'seeker', route: 'subscriptionSuccess', ...subscribed }],
    ['U04 · 我的订阅', { role: 'seeker', route: 'subscriptions', ...subscribed }],
    ['U05 · Farmer Space / 空间', { role: 'seeker', route: 'space', spaceTab: 'overview', ...subscribed }],
    ['U06 · Farmer Space / 成长', { role: 'seeker', route: 'space', spaceTab: 'growth', ...subscribed }],
    ['U07 · Farmer Space / 提案', { role: 'seeker', route: 'space', spaceTab: 'community', ...subscribed }],
    ['U08 · Farmer Space / 成果', { role: 'seeker', route: 'space', spaceTab: 'outcome', ...subscribed }],
    ['U09 · 探访预约', { role: 'seeker', route: 'visits', visitStage: 'booking', ...subscribed }],
    ['U10 · 等待确认', { role: 'seeker', route: 'visits', visitStage: 'pending', ...subscribed }],
    ['U11 · 入场凭证', { role: 'seeker', route: 'visits', visitStage: 'approved', ...subscribed }],
    ['U12 · 现场自动记录', { role: 'seeker', route: 'visits', visitStage: 'onsite', ...subscribed }],
    ['U13 · 探访反馈', { role: 'seeker', route: 'visits', visitStage: 'review', ...subscribed }],
    ['U14 · 订阅动态', { role: 'seeker', route: 'updates', visitStage: 'approved', ...subscribed }],
    ['U15 · 线上用户账户', { role: 'seeker', route: 'seekerMe', visitStage: 'approved', ...subscribed }],
    ['F01 · 今日工作台', { role: 'farmer', route: 'farmerHome' }],
    ['F02 · 内容记录', { role: 'farmer', route: 'farmerRecords' }],
    ['F03 · 编辑田间记录', { role: 'farmer', route: 'recordEditor' }],
    ['F04 · 预约管理', { role: 'farmer', route: 'farmerVisits' }],
    ['F05 · 预约详情', { role: 'farmer', route: 'farmerVisitDetail' }],
    ['F06 · 季末成果', { role: 'farmer', route: 'farmerHarvest' }],
    ['F07 · 成果包详情', { role: 'farmer', route: 'farmerOutcomeDetail' }],
    ['F08 · 农场账户', { role: 'farmer', route: 'farmerMe' }]
  ];
  document.querySelector('#app').innerHTML = `<main class="flow-board"><header><span>URBAN GARDEN SERVICE · INDEX 3</span><h1>双角色 App 实际页面流程</h1><p>线上用户与城市农夫使用独立导航。以下 24 个画面均为可运行原型中的实际页面。</p></header><section class="flow-group"><div class="flow-group-title seeker-flow"><span>VIBE SEEKER FLOW</span><strong>线上用户</strong></div><div class="flow-grid">${pages.slice(0, 16).map(([label, patch]) => flowItem(label, patch)).join('')}</div></section><section class="flow-group"><div class="flow-group-title farmer-flow"><span>CITY FARMER FLOW</span><strong>城市农夫</strong></div><div class="flow-grid">${pages.slice(16).map(([label, patch]) => flowItem(label, patch)).join('')}</div></section></main>`;
  createIcons({ icons });
}

function flowItem(label, patch) {
  const model = { ...state, liked: false, commentsOpen: false, notice: '', ...patch };
  return `<article class="flow-item"><div><span>${label}</span><small>${patch.role === 'farmer' ? '城市农夫端' : patch.role === 'seeker' ? '线上用户端' : '身份分流'}</small></div><div class="flow-phone">${phoneMarkup(model, true)}</div></article>`;
}

function render() {
  if (query.get('mode') === 'figma') return renderFlowBoard();
  document.body.classList.remove('flow-export-mode');
  document.querySelector('#app').innerHTML = `<main class="v3-stage"><div class="v3-device"><div class="v3-shell">${phoneMarkup(state)}</div></div><div class="v3-zoom">${Math.round(state.zoom * 100)}%</div></main>${overlayMarkup()}`;
  bindEvents();
  createIcons({ icons });
  applyZoom();
}

function overlayMarkup() {
  if (state.filterOpen) return `<div class="v3-overlay" data-close-overlay><section class="filter-sheet"><span></span><header><div><small>DISCOVERY FILTER</small><h2>筛选城市田地</h2></div><button data-close-overlay type="button" aria-label="关闭筛选">${icon('x')}</button></header><p>按地区、作物、造景和农夫特点组合筛选。</p><div class="filter-groups">${filterGroups.map(([key, title, options]) => `<section><strong>${title}</strong><div><button class="${state.filters[key] === '' ? 'active' : ''}" data-filter-key="${key}" data-filter-value="" type="button">全部</button>${options.map((option) => `<button class="${state.filters[key] === option ? 'active' : ''}" data-filter-key="${key}" data-filter-value="${option}" type="button">${option}</button>`).join('')}</div></section>`).join('')}</div><footer><button data-reset-filters type="button">重置</button><button data-apply-filters type="button">查看 ${filteredPlots(state).length} 块田地</button></footer></section></div>`;
  if (state.subscriptionInfoOpen) return `<div class="v3-overlay" data-close-overlay><section class="info-sheet"><span></span><header><div><small>SUBSCRIPTION BENEFITS</small><h2>订阅后才进入长期服务</h2></div><button data-close-overlay>${icon('x')}</button></header><article>${icon('bookmark')}<div><strong>Farmer Space</strong><p>完整成长记录、田间声音与照片。</p></div></article><article>${icon('calendar-days')}<div><strong>现场探访</strong><p>申请自助导览或农夫陪同。</p></div></article><article>${icon('sparkles')}<div><strong>季末成果</strong><p>根据真实收成接收作物与副产物。</p></div></article><button class="v3-primary" data-subscribe-primary>订阅这块田地</button></section></div>`;
  if (state.commentsOpen) return `<div class="v3-overlay" data-close-overlay><section class="comment-sheet"><span></span><header><strong>田地评论 · 128</strong><button data-close-overlay>${icon('x')}</button></header><article><b>禾</b><div><strong>小禾</strong><p>第一次看到屋顶番茄开花，好治愈。</p></div></article><article><b>L</b><div><strong>Lynn</strong><p>想知道怎么判断土壤湿度。</p></div></article><footer><span>友好地聊聊这块田地...</span><button>${icon('send')}</button></footer></section></div>`;
  return '';
}

function go(route) {
  state.route = route;
  state.notice = '';
  state.commentsOpen = false;
  state.subscriptionInfoOpen = false;
  state.filterOpen = false;
  render();
}

function bindEvents() {
  document.querySelectorAll('[data-select-role]').forEach((button) => button.addEventListener('click', () => {
    state.role = button.dataset.selectRole;
    go(state.role === 'farmer' ? 'farmerHome' : 'discover');
  }));
  document.querySelectorAll('[data-route]').forEach((button) => button.addEventListener('click', () => go(button.dataset.route)));
  document.querySelectorAll('[data-open-channel]').forEach((button) => button.addEventListener('click', () => {
    state.selectedPlot = button.dataset.openChannel;
    go('channel');
  }));
  document.querySelectorAll('[data-subscribe-primary]').forEach((button) => button.addEventListener('click', () => {
    state.subscribedPlots.add(state.selectedPlot);
    state.subscribed = true;
    state.subscriptionInfoOpen = false;
    go('subscriptionSuccess');
  }));
  document.querySelectorAll('[data-enter-space]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.enterSpace) state.selectedPlot = button.dataset.enterSpace;
    state.spaceTab = 'overview';
    go('space');
  }));
  document.querySelectorAll('[data-space-tab]').forEach((button) => button.addEventListener('click', () => {
    if (button.dataset.route) return;
    if (!isPlotSubscribed(state)) return;
    state.spaceTab = button.dataset.spaceTab;
    go('space');
  }));
  document.querySelector('[data-like]')?.addEventListener('click', () => {
    if (state.likedPlots.has(state.selectedPlot)) state.likedPlots.delete(state.selectedPlot);
    else state.likedPlots.add(state.selectedPlot);
    render();
  });
  document.querySelector('[data-comments]')?.addEventListener('click', () => {
    state.commentsOpen = true;
    render();
  });
  document.querySelector('[data-subscription-info]')?.addEventListener('click', () => {
    state.subscriptionInfoOpen = true;
    render();
  });
  document.querySelector('[data-open-filter]')?.addEventListener('click', () => {
    state.filterOpen = true;
    render();
  });
  document.querySelectorAll('[data-filter-key]').forEach((button) => button.addEventListener('click', () => {
    state.filters[button.dataset.filterKey] = button.dataset.filterValue;
    render();
  }));
  document.querySelectorAll('[data-reset-filters]').forEach((button) => button.addEventListener('click', () => {
    state.filters = { region: '', crop: '', landscape: '', farmer: '' };
    state.searchQuery = '';
    state.filterOpen = Boolean(button.closest('.filter-sheet'));
    render();
  }));
  document.querySelector('[data-apply-filters]')?.addEventListener('click', () => {
    state.filterOpen = false;
    render();
  });
  const searchInput = document.querySelector('[data-search-plots]');
  searchInput?.addEventListener('change', () => {
    state.searchQuery = searchInput.value;
    render();
  });
  searchInput?.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') return;
    state.searchQuery = searchInput.value;
    render();
  });
  document.querySelectorAll('[data-close-overlay]').forEach((button) => button.addEventListener('click', (event) => {
    if (event.target !== button && button.classList.contains('v3-overlay')) return;
    state.commentsOpen = false;
    state.subscriptionInfoOpen = false;
    state.filterOpen = false;
    render();
  }));
  document.querySelector('[data-toggle-sound]')?.addEventListener('click', () => {
    state.soundPlaying = !state.soundPlaying;
    render();
  });
  document.querySelectorAll('[data-growth-stage]').forEach((button) => button.addEventListener('click', () => {
    state.growthStage = button.dataset.growthStage;
    render();
  }));
  document.querySelectorAll('[data-visit-date]').forEach((button) => button.addEventListener('click', () => {
    state.visitDate = button.dataset.visitDate;
    render();
  }));
  document.querySelectorAll('[data-visit-mode]').forEach((button) => button.addEventListener('click', () => {
    state.visitMode = button.dataset.visitMode;
    render();
  }));
  document.querySelectorAll('[data-visit-time]').forEach((button) => button.addEventListener('click', () => {
    state.visitTime = button.dataset.visitTime;
    render();
  }));
  document.querySelector('[data-book-visit]')?.addEventListener('click', () => {
    state.visitStage = 'pending';
    render();
  });
  document.querySelector('[data-start-visit]')?.addEventListener('click', () => {
    state.visitStage = 'onsite';
    render();
  });
  document.querySelector('[data-finish-visit]')?.addEventListener('click', () => {
    state.visitStage = 'review';
    render();
  });
  document.querySelector('[data-publish-record]')?.addEventListener('click', () => {
    state.recordPublished = true;
    state.notice = '记录已发布到订阅者空间';
    render();
  });
  document.querySelector('[data-approve-visit]')?.addEventListener('click', () => {
    state.farmerVisitApproved = true;
    state.notice = '预约已确认，入场凭证已发送';
    render();
  });
  document.querySelectorAll('[data-outcome]').forEach((button) => button.addEventListener('click', () => {
    state.outcomeChoice = button.dataset.outcome;
    render();
  }));
  document.querySelectorAll('[data-remote]').forEach((button) => button.addEventListener('click', () => {
    const key = button.dataset.remote;
    state[key] = !state[key];
    const labels = { irrigationOn: '自动浇水', nutrientOn: '营养投放', coolingOn: '喷雾降温' };
    state.notice = `${labels[key]}已${state[key] ? '启动' : '停止'}`;
    render();
  }));
  document.querySelectorAll('[data-logout]').forEach((button) => button.addEventListener('click', () => {
    state.role = '';
    state.route = 'role';
    render();
  }));
  document.querySelector('[data-share]')?.addEventListener('click', () => {
    state.notice = '田地影像链接已准备好';
    render();
  });
  const channelFeed = document.querySelector('[data-channel-feed]');
  if (channelFeed) {
    let startY = 0;
    channelFeed.addEventListener('pointerdown', (event) => {
      startY = event.clientY;
    });
    channelFeed.addEventListener('pointerup', (event) => {
      const delta = startY - event.clientY;
      if (Math.abs(delta) > 48) changeChannel(delta > 0 ? 1 : -1);
    });
  }
}

function changeChannel(direction) {
  const now = Date.now();
  if (now - state.lastChannelSwipe < 450) return;
  state.lastChannelSwipe = now;
  const currentIndex = plots.findIndex((plot) => plot.id === state.selectedPlot);
  const nextIndex = (currentIndex + direction + plots.length) % plots.length;
  state.selectedPlot = plots[nextIndex].id;
  state.channelSwipeDirection = direction > 0 ? 'up' : 'down';
  state.commentsOpen = false;
  state.notice = '';
  render();
  window.setTimeout(() => { state.channelSwipeDirection = ''; }, 360);
}

function applyZoom() {
  document.documentElement.style.setProperty('--v3-zoom', state.zoom.toFixed(2));
  document.documentElement.style.setProperty('--v3-scaled-width', `${Math.ceil(402 * state.zoom)}px`);
  document.documentElement.style.setProperty('--v3-scaled-height', `${Math.ceil(874 * state.zoom)}px`);
  const label = document.querySelector('.v3-zoom');
  if (label) label.textContent = `${Math.round(state.zoom * 100)}%`;
}

window.addEventListener('wheel', (event) => {
  if (query.get('mode') === 'figma') return;
  if (event.ctrlKey) {
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    state.zoom = Math.min(1.8, Math.max(0.65, Number((state.zoom + direction * 0.08).toFixed(2))));
    localStorage.setItem('urbanGardenIndex3Zoom', state.zoom);
    applyZoom();
    return;
  }
  if (state.route === 'channel' && Math.abs(event.deltaY) > 30) {
    event.preventDefault();
    changeChannel(event.deltaY > 0 ? 1 : -1);
  }
}, { passive: false });

render();
