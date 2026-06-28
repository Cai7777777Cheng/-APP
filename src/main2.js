import './styles.css';
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
  rooftop: asset('real-rooftop-farmer.png'),
  seeds: asset('real-seed-selection.png'),
  plot: asset('real-adopted-plot.png'),
  outcome: asset('real-harvest-outcome.png')
};

function readStoredSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch {
    return new Set();
  }
}

const savedZoom = Number(localStorage.getItem('urbanGardenIndex2Zoom'));
const storedVisitStage = localStorage.getItem('vibeSeekerVisitStage');

const state = {
  route: 'discover',
  selectedPlot: 'tomato',
  city: '全部',
  filter: '近期更新',
  subscribed: readStoredSet('vibeSeekerSubscriptions'),
  adopted: readStoredSet('vibeSeekerAdoptions'),
  likedPlots: new Set(),
  likedUpdates: new Set(),
  voted: new Set(),
  channelComments: ['第一次看到屋顶番茄开花，好治愈。', '阿青会分享怎么判断土壤湿度吗？'],
  proposals: [
    { id: 'closeup', title: '下次多拍一些花蕾近景', author: '小禾', votes: 46, status: '农夫评估中' },
    { id: 'sound', title: '想听一次清晨浇水时的环境声', author: 'Lynn', votes: 31, status: '已加入记录计划' }
  ],
  joinSheet: false,
  joinSuccess: '',
  commentOpen: false,
  proposalOpen: false,
  spaceTab: 'intro',
  farmerTab: 'records',
  visitDate: '29',
  visitMode: 'self',
  visitStage: ['booking', 'pending', 'approved', 'onsite', 'feedback', 'complete'].includes(storedVisitStage) ? storedVisitStage : 'booking',
  visitCaptureCount: 4,
  visitRating: 0,
  recordPublished: false,
  outcomeReleased: true,
  outcomeChoice: '',
  notice: '',
  zoom: Number.isFinite(savedZoom) && savedZoom >= 0.65 && savedZoom <= 1.8 ? savedZoom : 1
};

const navItems = {
  discover: { label: '发现', icon: 'compass', title: '城市田地' },
  subscriptions: { label: '订阅', icon: 'bookmark', title: '我的订阅' },
  updates: { label: '动态', icon: 'radio', title: '田地动态' },
  visit: { label: '探访', icon: 'map-pin', title: '现场探访' },
  profile: { label: '我的', icon: 'user-round', title: '我的' }
};

const plots = [
  {
    id: 'tomato',
    title: '屋顶番茄地块',
    crop: '樱桃番茄',
    city: '上海',
    district: '长宁区',
    farmer: '农夫阿青',
    process: '从花蕾到第一颗成熟果实',
    stage: '现蕾期 · 第 4 周',
    updated: '今天 08:36',
    mediaLabel: '今日新记录',
    plays: 286,
    subscribers: 1284,
    likes: 3860,
    distance: '1.2 km',
    image: assets.plot,
    farmerImage: assets.rooftop
  },
  {
    id: 'herbs',
    title: '运河香草花园',
    crop: '罗勒 · 薄荷',
    city: '杭州',
    district: '拱墅区',
    farmer: '农夫雨川',
    process: '跟着香气记录每一次修剪',
    stage: '旺长期 · 第 7 周',
    updated: '今天 07:50',
    mediaLabel: '清晨影像',
    plays: 142,
    subscribers: 807,
    likes: 2120,
    distance: '176 km',
    image: assets.seeds,
    farmerImage: assets.seeds
  },
  {
    id: 'greens',
    title: '平江社区叶菜园',
    crop: '生菜 · 羽衣甘蓝',
    city: '苏州',
    district: '姑苏区',
    farmer: '农夫林一',
    process: '每周一次社区采收与分享',
    stage: '采收期 · 第 9 周',
    updated: '昨天 17:20',
    mediaLabel: '采收记录',
    plays: 98,
    subscribers: 663,
    likes: 1780,
    distance: '98 km',
    image: assets.rooftop,
    farmerImage: assets.rooftop
  }
];

const cities = ['全部', '上海', '杭州', '苏州'];
const filters = ['近期更新', '离我最近', '成长阶段'];

function icon(name, label = '') {
  return `<i data-lucide="${name}" aria-hidden="true"></i>${label ? `<span>${label}</span>` : ''}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getPlot(id = state.selectedPlot) {
  return plots.find((plot) => plot.id === id) ?? plots[0];
}

function isSubscribed(id = state.selectedPlot) {
  return state.subscribed.has(id);
}

function isAdopted(id = state.selectedPlot) {
  return state.adopted.has(id);
}

function saveParticipation() {
  localStorage.setItem('vibeSeekerSubscriptions', JSON.stringify([...state.subscribed]));
  localStorage.setItem('vibeSeekerAdoptions', JSON.stringify([...state.adopted]));
}

function saveVisitStage() {
  localStorage.setItem('vibeSeekerVisitStage', state.visitStage);
}

function statusBar(onMedia = false) {
  return `
    <div class="status-bar ${onMedia ? 'on-media' : ''}" aria-label="设备状态栏">
      <strong>9:41</strong>
      <span class="dynamic-island" aria-hidden="true"></span>
      <span class="status-icons">${icon('signal')}${icon('wifi')}${icon('battery-full')}</span>
    </div>
  `;
}

function topBar() {
  const isSpace = state.route === 'space';
  const isFarmer = state.route === 'farmer';
  const isSubpage = isSpace || isFarmer;
  const title = isSpace ? 'Farmer Space' : isFarmer ? '农夫工作台' : navItems[state.route]?.title ?? 'Vibe Seeker';
  const backRoute = isFarmer ? 'profile' : 'subscriptions';
  return `
    <header class="app-header">
      <button class="header-action ${isSubpage ? '' : 'brand-mark'}" type="button" ${isSubpage ? `data-route="${backRoute}"` : 'data-route="discover"'} aria-label="${isSubpage ? '返回' : '返回发现'}">
        ${icon(isSubpage ? 'arrow-left' : 'sprout')}
      </button>
      <div class="header-title">
        <span>${isFarmer ? 'FARMER CONSOLE' : 'URBAN VIBESEEKER'}</span>
        <h1>${title}</h1>
      </div>
      <button class="header-action notification-action" type="button" aria-label="通知">${icon('bell')}<b aria-hidden="true"></b></button>
    </header>
  `;
}

function sectionHead(eyebrow, title, action = '') {
  return `
    <div class="section-head">
      <div><span>${eyebrow}</span><h3>${title}</h3></div>
      ${action}
    </div>
  `;
}

function discoverScreen() {
  const visiblePlots = state.city === '全部' ? plots : plots.filter((plot) => plot.city === state.city);
  const featured = visiblePlots[0] ?? plots[0];
  const rest = plots.filter((plot) => plot.id !== featured.id);

  return `
    <section class="discover-intro">
      <button class="location-line" type="button">${icon('map-pin')}<span>上海及附近城市</span>${icon('chevron-down')}</button>
      <h2>看看城市农夫<br>今天记录了什么</h2>
      <p>先从田间影像认识一块田地，再决定是否订阅它的长期成长。</p>
    </section>

    <button class="search-field" type="button" aria-label="搜索城市、农夫或作物">
      ${icon('search')}<span>搜索城市、农夫或作物</span>${icon('list-filter')}
    </button>

    <div class="city-row" aria-label="城市筛选">
      ${cities.map((city) => `<button class="${state.city === city ? 'active' : ''}" data-city="${city}" type="button">${city}</button>`).join('')}
    </div>

    <section class="discovery-section">
      ${sectionHead('FIELD CHANNEL', '今天的田间影像', `<span class="result-count">${featured.updated}</span>`)}
      <button class="lead-live" data-open-channel="${featured.id}" type="button" aria-label="查看${featured.title}田地频道">
        <img src="${featured.image}" alt="${featured.title}" />
        <span class="live-badge neutral-badge">${icon('video')}${featured.mediaLabel}</span>
        <span class="viewer-badge">${icon('play')}${featured.plays}</span>
        <div class="lead-live-copy">
          <span>${featured.city} · ${featured.district}</span>
          <h3>${featured.title}</h3>
          <p>${featured.farmer}记录了${featured.stage}</p>
          <small>${featured.process}</small>
        </div>
      </button>
    </section>

    <section class="nearby-section">
      ${sectionHead('CITY FARMERS', '更多城市田地', '<button class="text-action" type="button">查看地图</button>')}
      <div class="filter-row">
        ${filters.map((filter) => `<button class="${state.filter === filter ? 'active' : ''}" data-filter="${filter}" type="button">${filter}</button>`).join('')}
      </div>
      <div class="farm-list">
        ${rest.map((plot) => `
          <button class="farm-row" data-open-channel="${plot.id}" type="button" aria-label="查看${plot.title}">
            <span class="farm-photo"><img src="${plot.image}" alt="${plot.title}" /><i class="mini-live replay">${plot.mediaLabel}</i></span>
            <span class="farm-copy">
              <small>${plot.city} · ${plot.district}</small>
              <strong>${plot.title}</strong>
              <span>${plot.crop} · ${plot.stage}</span>
              <em>${icon('bookmark')}${plot.subscribers.toLocaleString()} 人订阅</em>
            </span>
            ${icon('chevron-right')}
          </button>
        `).join('')}
      </div>
    </section>
  `;
}

function channelScreen() {
  const plot = getPlot();
  const liked = state.likedPlots.has(plot.id);
  const subscribed = isSubscribed(plot.id);
  const adopted = isAdopted(plot.id);
  const totalLikes = plot.likes + (liked ? 1 : 0);
  const subscriberCount = plot.subscribers + (subscribed ? 1 : 0);

  return `
    <main class="live-room">
      <img class="live-background" src="${plot.image}" alt="${plot.title}田间影像" />
      <div class="live-shade" aria-hidden="true"></div>

      <header class="live-header">
        <button type="button" data-route="discover" aria-label="返回发现">${icon('arrow-left')}</button>
        <img src="${plot.farmerImage}" alt="${plot.farmer}" />
        <div><strong>${plot.farmer}</strong><span>${plot.city} · ${plot.district}</span></div>
        <span class="live-label media-label">${icon('video')}田间记录</span>
        <button type="button" aria-label="更多">${icon('more-horizontal')}</button>
      </header>

      <div class="live-topic"><span>${plot.stage}</span><strong>${plot.title}</strong></div>

      <aside class="live-actions" aria-label="田地频道互动">
        <button class="${liked ? 'active' : ''}" data-like-channel type="button" aria-label="喜欢这段记录">${icon('heart')}<span>${totalLikes.toLocaleString()}</span></button>
        <button data-toggle-comments type="button" aria-label="查看评论">${icon('message-circle')}<span>${state.channelComments.length + 126}</span></button>
        <button data-share type="button" aria-label="分享田地影像">${icon('share-2')}<span>分享</span></button>
      </aside>

      <section class="live-bottom">
        <div class="floating-comments" aria-label="田地频道评论">
          <p><strong>小禾</strong> 第一次看到屋顶番茄开花，好治愈。</p>
          <p><strong>Lynn</strong> 想知道阿青怎么判断土壤湿度。</p>
        </div>
        <div class="live-description">
          <div><span>${plot.process}</span><small>${icon('users')}${subscriberCount.toLocaleString()} 人已订阅这块田地</small></div>
          <button type="button" data-open-join>${subscribed ? (adopted ? '共同认养中' : '已订阅') : '订阅 / 认养'}</button>
        </div>
        <div class="live-input-row">
          <button class="comment-input" data-toggle-comments type="button">${icon('message-circle')}<span>聊聊这段田间记录...</span></button>
          ${subscribed ? `<button class="space-entry" data-enter-space="${plot.id}" type="button">进入 Farmer Space ${icon('chevron-right')}</button>` : `<button class="quick-follow" data-open-join type="button">${icon('bookmark')}</button>`}
        </div>
      </section>
    </main>
  `;
}

function subscriptionsScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('还没有订阅田地', '先从田地频道认识不同城市的农夫。订阅后，这里会出现专属 Farmer Space。', '去发现田地', 'discover');
  }

  return `
    <section class="page-intro compact-intro">
      <span>MY SUBSCRIPTIONS</span>
      <h2>持续关注的田地</h2>
      <p>同一块田地可以被多位 Vibe Seeker 共同订阅与关注。</p>
    </section>
    <section class="subscription-list">
      ${subscribedPlots.map((plot) => `
        <article class="subscription-card">
          <button class="subscription-image" data-open-channel="${plot.id}" type="button" aria-label="查看${plot.title}田地频道">
            <img src="${plot.image}" alt="${plot.title}" />
            <span class="replay-badge">${plot.updated}更新</span>
          </button>
          <div class="subscription-copy">
            <span>${plot.city} · ${plot.district}</span>
            <h3>${plot.title}</h3>
            <p>${plot.stage} · ${plot.farmer}</p>
            <div class="subscription-state"><span>${isAdopted(plot.id) ? icon('sprout', '共同认养中') : icon('bookmark', '已订阅')}</span><small>${(plot.subscribers + 1).toLocaleString()} 位订阅者</small></div>
            <button data-enter-space="${plot.id}" type="button">进入 Farmer Space ${icon('chevron-right')}</button>
          </div>
        </article>
      `).join('')}
    </section>
  `;
}

function lockedState(title, text, action, route) {
  return `
    <section class="locked-state">
      <span class="locked-icon">${icon('lock-keyhole')}</span>
      <small>SUBSCRIBERS ONLY</small>
      <h2>${title}</h2>
      <p>${text}</p>
      <button type="button" data-route="${route}">${action} ${icon('chevron-right')}</button>
    </section>
  `;
}

function spaceScreen() {
  const plot = getPlot();
  if (!isSubscribed(plot.id)) {
    return lockedState('订阅后解锁 Farmer Space', '这里包含更详细的田间影像、环境声音、成长档案、社区提案和本季成果。', '回到田地频道', 'discover');
  }

  return `
    <section class="space-hero">
      <img src="${plot.image}" alt="${plot.title}" />
      <span class="exclusive-badge">${icon('bookmark')}订阅者专享</span>
      <div class="space-hero-copy">
        <span>FARMER SPACE INTRODUCTION</span>
        <h2>${plot.title}</h2>
        <p>${plot.farmer} · ${plot.city}${plot.district}</p>
      </div>
    </section>

    <section class="space-stats">
      <div><span>当前阶段</span><strong>${plot.stage.split(' · ')[0]}</strong></div>
      <div><span>订阅者</span><strong>${(plot.subscribers + 1).toLocaleString()}</strong></div>
      <div><span>下次更新</span><strong>明天</strong></div>
    </section>

    <nav class="space-tabs four-tabs" aria-label="Farmer Space 内容">
      <button class="${state.spaceTab === 'intro' ? 'active' : ''}" data-space-tab="intro" type="button">空间</button>
      <button class="${state.spaceTab === 'growth' ? 'active' : ''}" data-space-tab="growth" type="button">成长</button>
      <button class="${state.spaceTab === 'proposals' ? 'active' : ''}" data-space-tab="proposals" type="button">提案</button>
      <button class="${state.spaceTab === 'outcome' ? 'active' : ''}" data-space-tab="outcome" type="button">成果</button>
    </nav>

    ${spaceTabContent(plot)}
  `;
}

function spaceTabContent(plot) {
  if (state.spaceTab === 'growth') return growthArchive(plot);
  if (state.spaceTab === 'proposals') return proposalPanel();
  if (state.spaceTab === 'outcome') return outcomePanel(plot);

  return `
    <section class="space-content">
      <article class="farmer-note">
        <img src="${plot.farmerImage}" alt="${plot.farmer}" />
        <div><span>来自${plot.farmer}</span><strong>欢迎来到这块田地的长期记录空间</strong><p>我会把日常巡园中值得分享的画面、声音和变化更新在这里。</p></div>
      </article>

      ${sectionHead('FIELD VIDEOS', '田间影像', '<button class="circle-action" type="button" aria-label="查看全部影像">' + icon('chevron-right') + '</button>')}
      <div class="video-carousel">
        ${[
          [assets.rooftop, '农夫的晨间巡园', '01:24'],
          [assets.plot, '第一簇番茄花蕾', '00:48'],
          [assets.seeds, '本周养护准备', '01:06']
        ].map(([src, title, duration]) => `
          <button class="video-card" type="button">
            <span class="video-cover"><img src="${src}" alt="${title}" /><i>${icon('play')}</i><small>${duration}</small></span>
            <strong>${title}</strong><span>2 小时前</span>
          </button>
        `).join('')}
      </div>

      <section class="field-sound">
        <button type="button" aria-label="播放田间声音">${icon('volume-2')}</button>
        <div><span>FIELD SOUND · 08:36</span><strong>清晨的风与浇水声</strong></div>
        <div class="waveform" aria-hidden="true">${Array.from({ length: 22 }, (_, index) => `<i style="--wave:${11 + ((index * 13) % 30)}px"></i>`).join('')}</div>
      </section>

      ${sectionHead('PHOTO FEED', '本周影像')}
      <div class="photo-mosaic"><img class="photo-main" src="${assets.plot}" alt="地块近景" /><img src="${assets.rooftop}" alt="农夫巡园" /><img src="${assets.seeds}" alt="种植准备" /></div>
    </section>
  `;
}

function growthArchive(plot) {
  return `
    <section class="growth-archive">
      <div class="growth-heading"><span>WEEK 04</span><h3>从长叶进入现蕾期</h3><p>这些内容只对订阅者开放，用来持续理解真实种植过程。</p></div>
      <div class="stage-track"><i class="done"></i><i class="done"></i><i class="done"></i><i class="current"></i><i></i></div>
      <div class="stage-labels"><span>播种</span><span>发芽</span><span>长叶</span><span class="active">现蕾</span><span>结果</span></div>
      <article class="archive-card"><img src="${plot.image}" alt="本周成长记录" /><div><span>今天 08:36 · ${plot.farmer}</span><strong>发现第一簇花蕾，叶片状态稳定。</strong><p>土壤湿度正常，今天不需要额外浇水。</p><button class="${state.likedUpdates.has('week4') ? 'active' : ''}" data-like-update="week4" type="button">${icon('heart')} ${state.likedUpdates.has('week4') ? '已喜欢' : '喜欢这条记录'}</button></div></article>
      <article class="archive-text"><span>第 3 周</span><strong>完成第一次支架调整</strong><p>植株高度达到 28 cm，主茎生长稳定。</p></article>
      <article class="archive-text"><span>第 2 周</span><strong>新叶开始展开</strong><p>连续两天日照充足，叶片颜色正常。</p></article>
    </section>
  `;
}

function proposalPanel() {
  return `
    <section class="proposal-panel">
      <div class="proposal-intro">
        <span class="proposal-icon">${icon('thumbs-up')}</span>
        <div><small>COMMUNITY PROPOSALS</small><h3>提出想法，一起投票</h3><p>提案会交给农夫参考。农夫将结合天气、作物状态和工作安排决定是否采纳，不保证执行。</p></div>
      </div>
      <button class="new-proposal" data-open-proposal type="button">${icon('circle-plus')}提出一个新建议</button>
      <div class="proposal-list">
        ${state.proposals.map((proposal) => {
          const voted = state.voted.has(proposal.id);
          return `<article class="proposal-card"><div><span>${escapeHtml(proposal.author)} 提议</span><strong>${escapeHtml(proposal.title)}</strong><small>${proposal.status}</small></div><button class="${voted ? 'active' : ''}" data-vote="${proposal.id}" type="button">${icon('thumbs-up')}<span>${proposal.votes + (voted ? 1 : 0)}</span></button></article>`;
        }).join('')}
      </div>
      <div class="farmer-discretion">${icon('shield-check')}<span><strong>决定权属于农夫</strong>投票代表社区兴趣，不会直接控制浇水、修剪或采收等田间操作。</span></div>
    </section>
  `;
}

function outcomePanel(plot) {
  return `
    <section class="outcome-panel">
      <div class="outcome-cover">
        <img src="${assets.outcome}" alt="${plot.title}本季成果包" />
        <span>${icon('sparkles')}本季成果已整理</span>
      </div>
      <div class="outcome-title"><span>SEASONAL OUTCOME</span><h3>把这段共同成长带回家</h3><p>农夫会将可分享的作物、副产物与种植记录整理为订阅者成果包。内容随真实收成变化，不保证固定数量。</p></div>
      <div class="outcome-items">
        <article>${icon('sprout')}<div><strong>新鲜番茄</strong><span>本季采收 · 约 500g</span></div></article>
        <article>${icon('leaf')}<div><strong>罗勒干香草</strong><span>修剪副产物再利用</span></div></article>
        <article>${icon('file-text')}<div><strong>个人种植记录卡</strong><span>你的订阅与探访片段</span></div></article>
      </div>
      ${state.outcomeChoice ? `
        <div class="outcome-confirm">${icon('check-circle-2')}<div><strong>${state.outcomeChoice === 'pickup' ? '已选择到场领取' : '已选择同城配送'}</strong><span>${state.outcomeChoice === 'pickup' ? '6 月 30 日后可在屋顶农场领取' : '预计 7 月 2 日送达，请留意通知'}</span></div></div>
      ` : `
        <div class="outcome-actions">
          <button data-outcome-choice="pickup" type="button">${icon('map-pin')}到场领取</button>
          <button data-outcome-choice="delivery" type="button">${icon('navigation')}同城配送</button>
        </div>
      `}
      <div class="outcome-note">${icon('shield-check')}<span><strong>以真实收成为准</strong>成果包是订阅服务的季末反馈，不是固定产量的商品承诺。</span></div>
    </section>
  `;
}

function updatesScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('订阅后才有专属动态', '成长提醒、农夫记录、探访进度和季末成果只向对应订阅者开放。', '去发现田地', 'discover');
  }
  const plot = subscribedPlots[0];
  const visitMessage = state.visitStage === 'approved' ? '农夫已确认你的探访申请' : state.visitStage === 'pending' ? '探访申请正在等待农夫确认' : '本周仍有可预约的探访时段';
  return `
    <section class="page-intro compact-intro">
      <span>SUBSCRIBED FEED</span><h2>田地正在发生什么</h2><p>来自你所订阅田地的阶段变化、农夫记录和服务进度。</p>
    </section>
    <section class="update-feed">
      <article class="stage-alert">${icon('sprout')}<div><span>${plot.title}</span><strong>成长阶段已更新为“现蕾期”</strong><small>今天 08:36</small></div></article>
      <article class="feed-card"><img src="${plot.image}" alt="${plot.title}成长动态" /><div><span>${plot.farmer} · 2 小时前</span><strong>今天发现了第一簇花蕾，叶片状态很好。</strong><p>完整记录已同步到 Farmer Space。</p><button data-enter-space="${plot.id}" type="button">查看完整记录 ${icon('chevron-right')}</button></div></article>
      <article class="feed-note">${icon('calendar-days')}<div><span>探访进度</span><strong>${visitMessage}</strong><small>进入探访页查看完整流程</small></div><button data-route="visit" type="button">查看</button></article>
      <article class="feed-note outcome-feed-note">${icon('sparkles')}<div><span>本季成果</span><strong>订阅者成果包已开放选择</strong><small>番茄、香草副产物与种植记录卡</small></div><button data-open-outcome type="button">查看</button></article>
    </section>
  `;
}

function visitScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('订阅田地后开放探访', '当田地进入适合参观的阶段，订阅者可以申请自助导览或农夫陪同。', '去发现田地', 'discover');
  }
  const plot = subscribedPlots[0];
  if (state.visitStage === 'pending') return visitPending(plot);
  if (state.visitStage === 'approved') return visitApproved(plot);
  if (state.visitStage === 'onsite') return visitOnsite(plot);
  if (state.visitStage === 'feedback') return visitFeedback(plot);
  if (state.visitStage === 'complete') return visitComplete(plot);
  return visitBooking(plot);
}

function visitBooking(plot) {
  const dates = [['28', '周日'], ['29', '周一'], ['30', '周二'], ['01', '周三'], ['02', '周四']];
  const modes = [
    { id: 'self', icon: 'route', title: '自助导览', text: '扫码入场，按路线自由参观' },
    { id: 'farmer', icon: 'message-circle', title: '农夫陪同', text: '提交申请，由农夫确认是否有时间' }
  ];
  return `
    <section class="visit-hero"><img src="${plot.farmerImage}" alt="${plot.title}探访" /><div><span>SUBSCRIBER VISIT</span><h2>去现场见见<br>你关注的田地</h2><p>${plot.title}本周开放预约。</p></div></section>
    <section class="visit-content">
      ${sectionHead('选择日期', '预约一次现场探访')}
      <div class="date-picker">${dates.map(([date, day]) => `<button class="${state.visitDate === date ? 'active' : ''}" data-date="${date}" type="button"><span>${day}</span><strong>${date}</strong></button>`).join('')}</div>
      <div class="visit-modes">${modes.map((mode) => `<button class="${state.visitMode === mode.id ? 'active' : ''}" data-visit-mode="${mode.id}" type="button"><span>${icon(mode.icon)}</span><div><strong>${mode.title}</strong><small>${mode.text}</small></div><i></i></button>`).join('')}</div>
      <div class="visit-summary">${icon('calendar-days')}<div><span>6 月 ${state.visitDate} 日 · 16:00</span><strong>Urban Garden 屋顶农场</strong><small>${icon('clock-3')}约 50 分钟</small></div></div>
      <button class="primary-cta" data-book type="button">${icon('calendar-days')}提交探访申请</button>
    </section>
  `;
}

function visitPending(plot) {
  return `
    <section class="service-status-hero pending-status">${icon('clock-3')}<span>REQUEST SENT</span><h2>等待农夫确认</h2><p>申请已发送给${plot.farmer}，确认后会生成入场凭证。</p></section>
    <section class="service-body">
      ${sectionHead('申请详情', '6 月 ' + state.visitDate + ' 日 · 16:00')}
      <article class="request-summary-card"><img src="${plot.image}" alt="${plot.title}" /><div><span>${plot.city}${plot.district}</span><strong>${plot.title}</strong><small>${state.visitMode === 'self' ? '自助导览' : '农夫陪同'} · 约 50 分钟</small></div></article>
      <div class="status-timeline">
        <article class="done">${icon('check')}<div><strong>申请已提交</strong><span>今天 09:18</span></div></article>
        <article class="current">${icon('clock-3')}<div><strong>农夫确认中</strong><span>通常在 24 小时内回复</span></div></article>
        <article>${icon('map-pin')}<div><strong>生成入场凭证</strong><span>确认后自动开放</span></div></article>
      </div>
      <div class="service-tip">${icon('bell')}<span><strong>不需要反复联系农夫</strong>状态变化会通过“动态”与系统通知同步给你。</span></div>
      <button class="secondary-cta" data-cancel-visit type="button">取消本次申请</button>
    </section>
  `;
}

function qrPattern() {
  return Array.from({ length: 81 }, (_, index) => {
    const row = Math.floor(index / 9);
    const col = index % 9;
    const corner = (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);
    const active = corner || ((row * 5 + col * 3 + row * col) % 7 < 3);
    return `<i class="${active ? 'active' : ''}"></i>`;
  }).join('');
}

function visitApproved(plot) {
  return `
    <section class="service-status-hero approved-status">${icon('check-circle-2')}<span>REQUEST APPROVED</span><h2>探访已确认</h2><p>${plot.farmer}已为你保留 6 月 ${state.visitDate} 日的参观时段。</p></section>
    <section class="service-body">
      <article class="entry-pass">
        <div class="entry-pass-head"><div><span>URBAN GARDEN PASS</span><strong>${plot.title}</strong></div>${icon('sprout')}</div>
        <div class="qr-pattern" aria-label="入场二维码">${qrPattern()}</div>
        <p>到达入口后扫描园区二维码，或向农夫出示此凭证。</p>
        <div><span>6 月 ${state.visitDate} 日</span><strong>16:00</strong><span>${state.visitMode === 'self' ? '自助导览' : '农夫陪同'}</span></div>
      </article>
      <div class="visit-ready-list">
        <article>${icon('route')}<div><strong>路线已准备</strong><span>3 个参观点 · 约 50 分钟</span></div></article>
        <article>${icon('camera')}<div><strong>体验记录已开启</strong><span>到场后自动整理照片与参观点</span></div></article>
      </div>
      <button class="primary-cta" data-start-visit type="button">${icon('map-pin')}模拟到场并开始探访</button>
    </section>
  `;
}

function visitOnsite(plot) {
  return `
    <section class="onsite-map">
      <img src="${plot.image}" alt="${plot.title}现场" />
      <div class="capture-pill">${icon('camera')}自动记录中 · ${state.visitCaptureCount} 个片段</div>
      <div class="onsite-copy"><span>ON-SITE JOURNEY</span><h2>沿着作物的成长路线走走</h2><p>当前：番茄支架与花蕾观察区</p></div>
    </section>
    <section class="service-body onsite-body">
      <div class="journey-progress"><span style="--progress:66%"></span></div>
      <div class="journey-stops">
        <article class="done">${icon('check')}<div><span>01</span><strong>扫码进入屋顶农场</strong><small>16:02 · 已自动记录</small></div></article>
        <article class="current">${icon('sprout')}<div><span>02</span><strong>观察番茄花蕾与支架</strong><small>停留 12 分钟</small></div></article>
        <article>${icon('users')}<div><span>03</span><strong>和农夫聊聊本周养护</strong><small>下一站</small></div></article>
      </div>
      <div class="capture-strip">
        <img src="${assets.plot}" alt="自动记录的田地照片" />
        <img src="${assets.rooftop}" alt="自动记录的农夫照片" />
        <button data-capture type="button" aria-label="记录这一刻">${icon('camera')}<span>记录</span></button>
      </div>
      <button class="primary-cta" data-complete-visit type="button">${icon('check-circle-2')}完成路线并留下反馈</button>
    </section>
  `;
}

function visitFeedback(plot) {
  return `
    <section class="feedback-hero"><img src="${plot.farmerImage}" alt="${plot.title}探访回顾" /><div>${icon('check')}<span>VISIT COMPLETE</span><h2>今天的探访感觉如何？</h2><p>你的简短反馈会帮助农夫改进下一次接待。</p></div></section>
    <section class="service-body feedback-body">
      ${sectionHead('SHORT FEEDBACK', '为本次体验评分')}
      <div class="rating-row" aria-label="体验评分">
        ${[1, 2, 3, 4, 5].map((rating) => `<button class="${state.visitRating >= rating ? 'active' : ''}" data-rate="${rating}" type="button" aria-label="${rating}星">${icon('sparkles')}</button>`).join('')}
      </div>
      <textarea class="feedback-input" data-feedback-input placeholder="写下一句印象，例如：第一次看见番茄花蕾……"></textarea>
      <div class="experience-preview">${icon('image')}<div><strong>体验片段已自动整理</strong><span>${state.visitCaptureCount} 张照片 · 1 段短视频 · 3 个参观点</span></div></div>
      <button class="primary-cta" data-submit-feedback type="button">${icon('send')}提交反馈并生成回顾</button>
    </section>
  `;
}

function visitComplete(plot) {
  return `
    <section class="memory-header"><span>MY VISIT MEMORY</span><h2>一次发生在屋顶上的相遇</h2><p>6 月 ${state.visitDate} 日 · ${plot.title}</p></section>
    <section class="memory-mosaic"><img class="memory-main" src="${assets.plot}" alt="田地体验照片" /><img src="${assets.rooftop}" alt="与农夫交流" /><img src="${assets.seeds}" alt="观察作物" /></section>
    <section class="service-body memory-body">
      <article class="memory-summary">${icon('sparkles')}<div><span>本次体验回顾</span><strong>走过 3 个参观点，留下 ${state.visitCaptureCount} 个片段</strong><p>你观察了番茄花蕾、听农夫讲解支架调整，也为这块田地补充了一段共同记忆。</p></div></article>
      <div class="points-earned"><strong>+120</strong><span>体验积分已到账</span><small>可用于下一次农场活动预约</small></div>
      <button class="primary-cta" data-enter-space="${plot.id}" type="button">返回 Farmer Space</button>
      <button class="secondary-cta" data-reset-visit type="button">预约下一次探访</button>
    </section>
  `;
}

function profileScreen() {
  return `
    <section class="profile-head"><span class="profile-avatar">${icon('user-round')}</span><div><span>VIBE SEEKER</span><h2>你好，城市观察者</h2><p>关注、探访并记录真实发生的种植过程。</p></div></section>
    <section class="profile-stats"><div><strong>${state.subscribed.size}</strong><span>订阅田地</span></div><div><strong>${state.adopted.size}</strong><span>共同认养</span></div><div><strong>${state.voted.size}</strong><span>参与投票</span></div></section>
    <section class="profile-section">
      ${sectionHead('MY ACTIVITY', '我的参与')}
      <button data-route="subscriptions" type="button">${icon('bookmark')}<span><strong>我的订阅</strong><small>查看已解锁的 Farmer Space</small></span>${icon('chevron-right')}</button>
      <button data-route="visit" type="button">${icon('map-pin')}<span><strong>现场探访</strong><small>预约、入场、体验记录与回顾</small></span>${icon('chevron-right')}</button>
      <button data-open-outcome type="button">${icon('sparkles')}<span><strong>本季成果</strong><small>查看作物、副产物与领取状态</small></span>${icon('chevron-right')}</button>
    </section>
    <section class="role-switch-card">
      <div>${icon('leaf')}<span><strong>农夫管理端</strong><small>发布日常记录、处理预约与整理季末成果</small></span></div>
      <button data-route="farmer" type="button">切换身份 ${icon('chevron-right')}</button>
    </section>
  `;
}

function farmerScreen() {
  return `
    <section class="farmer-console-head">
      <img src="${assets.rooftop}" alt="农夫阿青" />
      <div><span>FARMER SPACE MANAGER</span><h2>早上好，阿青</h2><p>屋顶番茄地块 · 今日有 3 项待处理</p></div>
    </section>
    <section class="farmer-glance">
      <article><span>${icon('image')}</span><div><strong>6</strong><small>今日记录</small></div></article>
      <article><span>${icon('calendar-days')}</span><div><strong>${state.visitStage === 'pending' ? '2' : '1'}</strong><small>预约请求</small></div></article>
      <article><span>${icon('sparkles')}</span><div><strong>36</strong><small>成果包</small></div></article>
    </section>
    <nav class="farmer-tabs" aria-label="农夫工作台">
      <button class="${state.farmerTab === 'records' ? 'active' : ''}" data-farmer-tab="records" type="button">日常记录</button>
      <button class="${state.farmerTab === 'requests' ? 'active' : ''}" data-farmer-tab="requests" type="button">预约请求</button>
      <button class="${state.farmerTab === 'outcomes' ? 'active' : ''}" data-farmer-tab="outcomes" type="button">季末成果</button>
    </nav>
    ${farmerTabContent()}
  `;
}

function farmerTabContent() {
  if (state.farmerTab === 'requests') return farmerRequests();
  if (state.farmerTab === 'outcomes') return farmerOutcomes();
  return farmerRecords();
}

function farmerRecords() {
  return `
    <section class="farmer-console-body">
      ${sectionHead('TODAY · WEEK 04', '今天的田间记录', '<button class="circle-action" type="button" aria-label="新增记录">' + icon('circle-plus') + '</button>')}
      <article class="record-draft">
        <div class="record-media-grid"><img src="${assets.plot}" alt="番茄花蕾" /><img src="${assets.seeds}" alt="养护准备" /><span>${icon('mic-2')}00:38</span></div>
        <div class="record-draft-copy"><span>${state.recordPublished ? '已发布到订阅空间' : '草稿箱 · 自动保存'}</span><strong>第一簇花蕾与晨间土壤状态</strong><p>系统已把今天拍摄的影像、语音与环境数据整理为一条记录。</p></div>
        <div class="record-actions"><button type="button">${icon('file-text')}编辑</button><button class="primary-small ${state.recordPublished ? 'done' : ''}" data-publish-record type="button">${icon(state.recordPublished ? 'check' : 'send')}${state.recordPublished ? '已发布' : '发布'}</button></div>
      </article>
      <div class="farmer-daily-list">
        <article>${icon('droplets')}<div><strong>07:40 · 完成晨间浇水</strong><span>土壤湿度 62%，无需补水</span></div><em>已记录</em></article>
        <article>${icon('camera')}<div><strong>08:12 · 拍摄花蕾近景</strong><span>3 张照片 · 自动关联第 4 周</span></div><em>草稿</em></article>
        <article>${icon('heart')}<div><strong>收到 86 次用户回应</strong><span>12 条评论已汇总，2 条建议待查看</span></div><em>查看</em></article>
      </div>
      <div class="service-tip">${icon('shield-check')}<span><strong>农夫保留种植决定权</strong>用户反馈会被整理为参考，不会自动变成田间操作指令。</span></div>
    </section>
  `;
}

function farmerRequests() {
  const hasCurrentRequest = state.visitStage === 'pending';
  const currentApproved = ['approved', 'onsite', 'feedback', 'complete'].includes(state.visitStage);
  return `
    <section class="farmer-console-body">
      ${sectionHead('VISIT REQUESTS', '线上用户的探访申请')}
      ${hasCurrentRequest || currentApproved ? `
        <article class="visitor-request featured-request">
          <div class="visitor-avatar">城</div>
          <div><span>订阅者 · 城市观察者</span><strong>6 月 ${state.visitDate} 日 · 16:00</strong><p>${state.visitMode === 'self' ? '申请自助导览' : '希望农夫陪同'} · 预计 50 分钟</p></div>
          <em>${currentApproved ? '已确认' : '待处理'}</em>
          ${hasCurrentRequest ? `<div class="request-actions"><button data-decline-visit type="button">改期</button><button data-approve-visit type="button">${icon('check')}确认预约</button></div>` : `<div class="approved-request-note">${icon('check-circle-2')}入场凭证已发送给用户</div>`}
        </article>
      ` : '<div class="empty-request">' + icon('calendar-days') + '<strong>当前没有新的申请</strong><span>用户提交后会出现在这里。</span></div>'}
      <article class="visitor-request">
        <div class="visitor-avatar muted-avatar">禾</div>
        <div><span>订阅者 · 小禾</span><strong>6 月 30 日 · 10:30</strong><p>农夫陪同 · 想了解香草修剪</p></div>
        <em>待处理</em>
        <div class="request-actions"><button type="button">改期</button><button type="button">${icon('check')}确认预约</button></div>
      </article>
      <div class="request-settings">${icon('clock-3')}<div><strong>本周接待时间</strong><span>周一、周三 16:00 · 周日 10:30</span></div><button type="button">编辑</button></div>
    </section>
  `;
}

function farmerOutcomes() {
  return `
    <section class="farmer-console-body">
      <div class="farmer-outcome-cover"><img src="${assets.outcome}" alt="本季订阅者成果包" /><div><span>SEASON CLOSING</span><h3>把真实收成整理成一份回应</h3><p>本季预计可整理 36 份订阅者成果包。</p></div></div>
      <div class="pack-progress"><div><span>成果包准备进度</span><strong>28 / 36</strong></div><i><b></b></i></div>
      <div class="pack-list">
        <article>${icon('sprout')}<div><strong>新鲜番茄</strong><span>已称重 · 18 kg</span></div><em>完成</em></article>
        <article>${icon('leaf')}<div><strong>修剪副产物：干罗勒</strong><span>已分装 · 36 袋</span></div><em>完成</em></article>
        <article>${icon('file-text')}<div><strong>个人种植记录卡</strong><span>自动合成中 · 28 份</span></div><em>进行中</em></article>
      </div>
      <button class="primary-cta ${state.outcomeReleased ? 'released' : ''}" data-release-outcome type="button">${icon(state.outcomeReleased ? 'check-circle-2' : 'send')}${state.outcomeReleased ? '领取通知已发送' : '向订阅者发布领取通知'}</button>
      <div class="service-tip">${icon('leaf')}<span><strong>副产物也有去处</strong>修剪下来的香草、种子与可加工果实会被优先纳入成果包，减少浪费。</span></div>
    </section>
  `;
}

function joinSheet() {
  const plot = getPlot();
  return `
    <div class="overlay-backdrop" data-close-sheet></div>
    <section class="join-sheet" role="dialog" aria-label="选择参与方式">
      <div class="sheet-handle"></div>
      <header><div><span>JOIN THIS PLOT</span><h2>选择参与这块田地的方式</h2></div><button data-close-sheet type="button" aria-label="关闭">${icon('x')}</button></header>
      <p class="sheet-lead">订阅与认养都不是独占关系，同一块田地可以被多位用户共同关注。</p>
      <button class="join-option" data-subscribe type="button">
        <span class="option-icon">${icon('bookmark')}</span>
        <span><strong>订阅田地</strong><small>关注田间影像与成长更新，解锁 Farmer Space、探访与季末成果。</small></span>
        <em>${isSubscribed(plot.id) ? '已订阅' : '免费'}</em>
      </button>
      <button class="join-option featured" data-adopt type="button">
        <span class="option-icon">${icon('sprout')}</span>
        <span><strong>共同认养</strong><small>在订阅基础上建立更长期的关系，参与社区提案与本季成果。</small></span>
        <em>${isAdopted(plot.id) ? '认养中' : '本季'}</em>
      </button>
      <div class="join-footnote">${icon('users')}当前已有 ${plot.subscribers.toLocaleString()} 位用户订阅这块田地</div>
    </section>
  `;
}

function successDialog() {
  const plot = getPlot();
  const adopted = state.joinSuccess === 'adopt';
  return `
    <div class="overlay-backdrop strong"></div>
    <section class="success-dialog" role="dialog" aria-label="${adopted ? '认养成功' : '订阅成功'}">
      <span class="success-icon">${icon('check')}</span>
      <small>${adopted ? 'ADOPTION CONFIRMED' : 'SUBSCRIPTION CONFIRMED'}</small>
      <h2>${adopted ? '共同认养成功' : '订阅成功'}</h2>
      <p>${plot.title}的 Farmer Space 已解锁，你可以查看成长记录、申请探访并接收本季成果。</p>
      <button class="dialog-primary" data-enter-space="${plot.id}" type="button">进入 Farmer Space</button>
      <button class="dialog-secondary" data-success-close type="button">继续看田间影像</button>
    </section>
  `;
}

function commentDrawer() {
  return `
    <div class="overlay-backdrop" data-toggle-comments></div>
    <section class="comment-drawer" role="dialog" aria-label="田地频道评论">
      <div class="sheet-handle"></div>
      <header><strong>田地频道评论 · ${state.channelComments.length + 126}</strong><button data-toggle-comments type="button" aria-label="关闭评论">${icon('x')}</button></header>
      <div class="comment-list">
        ${state.channelComments.map((comment, index) => `<article><span>${index % 2 ? 'L' : '禾'}</span><div><strong>${index % 2 ? 'Lynn' : '小禾'}</strong><p>${escapeHtml(comment)}</p></div></article>`).join('')}
      </div>
      <div class="comment-compose"><input data-comment-input aria-label="评论内容" placeholder="友好地聊聊这块田地..." /><button data-send-comment type="button" aria-label="发送评论">${icon('send')}</button></div>
    </section>
  `;
}

function proposalComposer() {
  return `
    <div class="overlay-backdrop" data-close-proposal></div>
    <section class="proposal-composer" role="dialog" aria-label="提出新建议">
      <div class="sheet-handle"></div>
      <header><div><span>NEW PROPOSAL</span><h2>提出一个新建议</h2></div><button data-close-proposal type="button" aria-label="关闭">${icon('x')}</button></header>
      <p>请描述你希望农夫考虑的内容。建议不会直接变成田间指令。</p>
      <textarea data-proposal-input aria-label="建议内容" placeholder="例如：希望下次看看番茄花的近景……"></textarea>
      <button class="primary-cta" data-submit-proposal type="button">${icon('send')}提交给社区投票</button>
    </section>
  `;
}

function bottomNav() {
  return `
    <nav class="bottom-nav" aria-label="主要导航">
      ${Object.entries(navItems).map(([id, item]) => `<button class="${state.route === id ? 'active' : ''}" data-route="${id}" type="button" aria-label="${item.label}"><span>${icon(item.icon)}</span><small>${item.label}</small></button>`).join('')}
    </nav>
  `;
}

function screenMarkup() {
  const screens = {
    discover: discoverScreen,
    subscriptions: subscriptionsScreen,
    updates: updatesScreen,
    visit: visitScreen,
    profile: profileScreen,
    space: spaceScreen,
    farmer: farmerScreen
  };
  return (screens[state.route] ?? discoverScreen)();
}

function overlays() {
  if (state.joinSuccess) return successDialog();
  if (state.commentOpen) return commentDrawer();
  if (state.proposalOpen) return proposalComposer();
  if (state.joinSheet) return joinSheet();
  return '';
}

function applyZoom() {
  document.documentElement.style.setProperty('--prototype-zoom', state.zoom.toFixed(2));
  document.documentElement.style.setProperty('--scaled-phone-height', `${Math.ceil(874 * state.zoom)}px`);
  document.documentElement.style.setProperty('--scaled-phone-width', `${Math.ceil(402 * state.zoom)}px`);
  const value = document.querySelector('[data-zoom-value]');
  if (value) value.textContent = `${Math.round(state.zoom * 100)}%`;
}

function render(keepScroll = false) {
  const previousScroll = keepScroll ? document.querySelector('.screen-body')?.scrollTop ?? 0 : 0;
  const media = state.route === 'channel';
  const baseRoute = Object.hasOwn(navItems, state.route);
  const bodyClass = state.route === 'space' ? 'space-body' : state.route === 'farmer' ? 'farmer-body' : '';
  document.querySelector('#app').innerHTML = `
    <main class="stage">
      <div class="zoom-meter" data-zoom-value>${Math.round(state.zoom * 100)}%</div>
      <div class="device-space">
        <div class="phone-shell" aria-label="iPhone 17 中文 App 原型">
          <div class="phone-screen ${media ? 'live-mode' : ''}">
            ${statusBar(media)}
            ${media ? channelScreen() : `${topBar()}<div class="screen-body ${bodyClass}">${screenMarkup()}</div>${baseRoute ? bottomNav() : ''}`}
            ${overlays()}
            ${state.notice ? `<div class="toast" role="status">${icon('check-circle-2')}<span>${state.notice}</span></div>` : ''}
          </div>
        </div>
      </div>
    </main>
  `;

  bindEvents();
  createIcons({ icons });
  applyZoom();
  const screen = document.querySelector('.screen-body');
  if (screen) screen.scrollTop = previousScroll;
}

function resetDevicePosition() {
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }));
}

function goTo(route) {
  state.route = route;
  state.notice = '';
  state.joinSheet = false;
  state.commentOpen = false;
  state.proposalOpen = false;
  state.joinSuccess = '';
  render();
  resetDevicePosition();
}

function bindEvents() {
  document.querySelectorAll('[data-route]').forEach((button) => button.addEventListener('click', () => goTo(button.dataset.route)));

  document.querySelectorAll('[data-city]').forEach((button) => button.addEventListener('click', () => {
    state.city = button.dataset.city;
    render(true);
  }));

  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    render(true);
  }));

  document.querySelectorAll('[data-open-channel]').forEach((button) => button.addEventListener('click', () => {
    state.selectedPlot = button.dataset.openChannel;
    state.route = 'channel';
    state.notice = '';
    render();
    resetDevicePosition();
  }));

  document.querySelector('[data-like-channel]')?.addEventListener('click', () => {
    if (state.likedPlots.has(state.selectedPlot)) state.likedPlots.delete(state.selectedPlot);
    else state.likedPlots.add(state.selectedPlot);
    render();
  });

  document.querySelectorAll('[data-toggle-comments]').forEach((button) => button.addEventListener('click', () => {
    state.commentOpen = !state.commentOpen;
    render();
  }));

  document.querySelector('[data-send-comment]')?.addEventListener('click', () => {
    const input = document.querySelector('[data-comment-input]');
    const value = input?.value.trim();
    if (!value) return;
    state.channelComments.push(value);
    render();
  });

  document.querySelectorAll('[data-open-join]').forEach((button) => button.addEventListener('click', () => {
    state.joinSheet = true;
    render();
  }));

  document.querySelectorAll('[data-close-sheet]').forEach((button) => button.addEventListener('click', () => {
    state.joinSheet = false;
    render();
  }));

  document.querySelector('[data-subscribe]')?.addEventListener('click', () => {
    state.subscribed.add(state.selectedPlot);
    saveParticipation();
    state.joinSheet = false;
    state.joinSuccess = 'subscribe';
    render();
  });

  document.querySelector('[data-adopt]')?.addEventListener('click', () => {
    state.subscribed.add(state.selectedPlot);
    state.adopted.add(state.selectedPlot);
    saveParticipation();
    state.joinSheet = false;
    state.joinSuccess = 'adopt';
    render();
  });

  document.querySelector('[data-success-close]')?.addEventListener('click', () => {
    state.joinSuccess = '';
    render();
  });

  document.querySelectorAll('[data-enter-space]').forEach((button) => button.addEventListener('click', () => {
    state.selectedPlot = button.dataset.enterSpace;
    state.spaceTab = 'intro';
    goTo('space');
  }));

  document.querySelectorAll('[data-space-tab]').forEach((button) => button.addEventListener('click', () => {
    state.spaceTab = button.dataset.spaceTab;
    render();
  }));

  document.querySelector('[data-open-outcome]')?.addEventListener('click', () => {
    const firstSubscription = plots.find((plot) => state.subscribed.has(plot.id));
    if (!firstSubscription) {
      state.notice = '先订阅一块田地，才能查看对应的季末成果';
      render();
      return;
    }
    state.selectedPlot = firstSubscription.id;
    state.spaceTab = 'outcome';
    goTo('space');
  });

  document.querySelectorAll('[data-outcome-choice]').forEach((button) => button.addEventListener('click', () => {
    state.outcomeChoice = button.dataset.outcomeChoice;
    state.notice = state.outcomeChoice === 'pickup' ? '已选择到场领取' : '已选择同城配送';
    render(true);
  }));

  document.querySelector('[data-like-update]')?.addEventListener('click', (event) => {
    const id = event.currentTarget.dataset.likeUpdate;
    if (state.likedUpdates.has(id)) state.likedUpdates.delete(id);
    else state.likedUpdates.add(id);
    render(true);
  });

  document.querySelectorAll('[data-vote]').forEach((button) => button.addEventListener('click', () => {
    const id = button.dataset.vote;
    if (state.voted.has(id)) state.voted.delete(id);
    else state.voted.add(id);
    render(true);
  }));

  document.querySelector('[data-open-proposal]')?.addEventListener('click', () => {
    state.proposalOpen = true;
    render();
  });

  document.querySelectorAll('[data-close-proposal]').forEach((button) => button.addEventListener('click', () => {
    state.proposalOpen = false;
    render();
  }));

  document.querySelector('[data-submit-proposal]')?.addEventListener('click', () => {
    const input = document.querySelector('[data-proposal-input]');
    const value = input?.value.trim();
    if (!value) return;
    state.proposals.unshift({ id: `proposal-${Date.now()}`, title: value, author: '我', votes: 0, status: '等待社区投票' });
    state.proposalOpen = false;
    state.notice = '建议已提交，等待社区投票';
    render(true);
  });

  document.querySelectorAll('[data-date]').forEach((button) => button.addEventListener('click', () => {
    state.visitDate = button.dataset.date;
    render(true);
  }));

  document.querySelectorAll('[data-visit-mode]').forEach((button) => button.addEventListener('click', () => {
    state.visitMode = button.dataset.visitMode;
    render(true);
  }));

  document.querySelector('[data-book]')?.addEventListener('click', () => {
    state.visitStage = 'pending';
    saveVisitStage();
    render();
  });

  document.querySelector('[data-cancel-visit]')?.addEventListener('click', () => {
    state.visitStage = 'booking';
    saveVisitStage();
    render();
  });

  document.querySelectorAll('[data-farmer-tab]').forEach((button) => button.addEventListener('click', () => {
    state.farmerTab = button.dataset.farmerTab;
    render();
  }));

  document.querySelector('[data-publish-record]')?.addEventListener('click', () => {
    state.recordPublished = true;
    state.notice = '田间记录已同步给订阅者';
    render(true);
  });

  document.querySelector('[data-approve-visit]')?.addEventListener('click', () => {
    state.visitStage = 'approved';
    saveVisitStage();
    state.notice = '预约已确认，入场凭证已发送';
    render(true);
  });

  document.querySelector('[data-decline-visit]')?.addEventListener('click', () => {
    state.notice = '已向用户发送改期建议';
    render(true);
  });

  document.querySelector('[data-release-outcome]')?.addEventListener('click', () => {
    state.outcomeReleased = true;
    state.notice = '领取通知已发送给 36 位订阅者';
    render(true);
  });

  document.querySelector('[data-start-visit]')?.addEventListener('click', () => {
    state.visitStage = 'onsite';
    saveVisitStage();
    render();
  });

  document.querySelector('[data-capture]')?.addEventListener('click', () => {
    state.visitCaptureCount += 1;
    state.notice = '这一刻已加入体验记录';
    render(true);
  });

  document.querySelector('[data-complete-visit]')?.addEventListener('click', () => {
    state.visitStage = 'feedback';
    saveVisitStage();
    render();
  });

  document.querySelectorAll('[data-rate]').forEach((button) => button.addEventListener('click', () => {
    state.visitRating = Number(button.dataset.rate);
    render(true);
  }));

  document.querySelector('[data-submit-feedback]')?.addEventListener('click', () => {
    if (!state.visitRating) {
      state.notice = '请先为这次体验评分';
      render(true);
      return;
    }
    state.visitStage = 'complete';
    saveVisitStage();
    render();
  });

  document.querySelector('[data-reset-visit]')?.addEventListener('click', () => {
    state.visitStage = 'booking';
    state.visitRating = 0;
    saveVisitStage();
    render();
  });

  document.querySelector('[data-share]')?.addEventListener('click', () => {
    state.notice = '田地影像链接已准备好';
    render();
  });
}

window.addEventListener('wheel', (event) => {
  if (!event.ctrlKey) return;
  event.preventDefault();
  const direction = event.deltaY > 0 ? -1 : 1;
  state.zoom = Number(Math.min(1.8, Math.max(0.65, state.zoom + direction * 0.08)).toFixed(2));
  localStorage.setItem('urbanGardenIndex2Zoom', String(state.zoom));
  applyZoom();
}, { passive: false });

render();
