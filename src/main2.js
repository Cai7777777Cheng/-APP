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

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const assets = {
  rooftop: asset('real-rooftop-farmer.png'),
  seeds: asset('real-seed-selection.png'),
  plot: asset('real-adopted-plot.png')
};

function readStoredSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  } catch {
    return new Set();
  }
}

const savedZoom = Number(localStorage.getItem('urbanGardenIndex2Zoom'));

const state = {
  route: 'discover',
  selectedPlot: 'tomato',
  city: '全部',
  filter: '正在直播',
  subscribed: readStoredSet('vibeSeekerSubscriptions'),
  adopted: readStoredSet('vibeSeekerAdoptions'),
  likedPlots: new Set(),
  likedUpdates: new Set(),
  voted: new Set(),
  liveComments: ['第一次看屋顶番茄开花，好治愈。', '阿青今天会讲怎么判断土壤湿度吗？'],
  proposals: [
    { id: 'closeup', title: '下次直播多拍一些花蕾近景', author: '小禾', votes: 46, status: '农夫评估中' },
    { id: 'sound', title: '想听一次清晨浇水时的环境声', author: 'Lynn', votes: 31, status: '已加入素材计划' }
  ],
  joinSheet: false,
  joinSuccess: '',
  commentOpen: false,
  proposalOpen: false,
  spaceTab: 'intro',
  visitDate: '29',
  visitMode: 'self',
  notice: '',
  zoom: Number.isFinite(savedZoom) && savedZoom >= 0.65 && savedZoom <= 1.8 ? savedZoom : 1
};

const navItems = {
  discover: { label: '发现', icon: 'compass', title: '城市田地' },
  subscriptions: { label: '订阅', icon: 'bookmark', title: '我的订阅' },
  updates: { label: '动态', icon: 'radio', title: '田地动态' },
  visit: { label: '探访', icon: 'map-pin', title: '预约探访' },
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
    live: true,
    viewers: 286,
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
    live: true,
    viewers: 142,
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
    live: false,
    viewers: 0,
    subscribers: 663,
    likes: 1780,
    distance: '98 km',
    image: assets.rooftop,
    farmerImage: assets.rooftop
  }
];

const cities = ['全部', '上海', '杭州', '苏州'];
const filters = ['正在直播', '离我最近', '成长阶段'];

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
  const title = isSpace ? 'Farmer Space' : navItems[state.route]?.title ?? 'Vibe Seeker';
  return `
    <header class="app-header">
      <button class="header-action ${isSpace ? '' : 'brand-mark'}" type="button" ${isSpace ? 'data-route="subscriptions"' : 'data-route="discover"'} aria-label="${isSpace ? '返回我的订阅' : '返回发现'}">
        ${icon(isSpace ? 'arrow-left' : 'sprout')}
      </button>
      <div class="header-title">
        <span>URBAN VIBESEEKER</span>
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
      <h2>看看城市农夫<br>今天在种什么</h2>
      <p>先从公开直播认识一块田地，再决定是否订阅它的长期成长。</p>
    </section>

    <button class="search-field" type="button" aria-label="搜索城市、农夫或作物">
      ${icon('search')}<span>搜索城市、农夫或作物</span>${icon('list-filter')}
    </button>

    <div class="city-row" aria-label="城市筛选">
      ${cities.map((city) => `<button class="${state.city === city ? 'active' : ''}" data-city="${city}" type="button">${city}</button>`).join('')}
    </div>

    <section class="discovery-section">
      ${sectionHead('LIVE NOW', '正在发生的种植现场', `<span class="result-count">${featured.viewers} 人正在看</span>`)}
      <button class="lead-live" data-open-live="${featured.id}" type="button" aria-label="进入${featured.title}直播间">
        <img src="${featured.image}" alt="${featured.title}" />
        <span class="live-badge"><i></i>直播中</span>
        <span class="viewer-badge">${icon('users')}${featured.viewers}</span>
        <div class="lead-live-copy">
          <span>${featured.city} · ${featured.district}</span>
          <h3>${featured.title}</h3>
          <p>${featured.farmer}正在记录${featured.stage}</p>
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
          <button class="farm-row" data-open-live="${plot.id}" type="button" aria-label="查看${plot.title}">
            <span class="farm-photo"><img src="${plot.image}" alt="${plot.title}" />${plot.live ? '<i class="mini-live">LIVE</i>' : '<i class="mini-live replay">回放</i>'}</span>
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

function liveRoom() {
  const plot = getPlot();
  const liked = state.likedPlots.has(plot.id);
  const subscribed = isSubscribed(plot.id);
  const adopted = isAdopted(plot.id);
  const totalLikes = plot.likes + (liked ? 1 : 0);
  const subscriberCount = plot.subscribers + (subscribed ? 1 : 0);

  return `
    <main class="live-room">
      <img class="live-background" src="${plot.image}" alt="${plot.title}实时画面" />
      <div class="live-shade" aria-hidden="true"></div>

      <header class="live-header">
        <button type="button" data-route="discover" aria-label="返回发现">${icon('arrow-left')}</button>
        <img src="${plot.farmerImage}" alt="${plot.farmer}" />
        <div><strong>${plot.farmer}</strong><span>${plot.city} · ${plot.district}</span></div>
        <span class="live-label"><i></i>直播中</span>
        <button type="button" aria-label="更多">${icon('more-horizontal')}</button>
      </header>

      <div class="live-topic"><span>${plot.stage}</span><strong>${plot.title}</strong></div>

      <aside class="live-actions" aria-label="直播互动">
        <button class="${liked ? 'active' : ''}" data-like-live type="button" aria-label="点赞直播">${icon('heart')}<span>${totalLikes.toLocaleString()}</span></button>
        <button data-toggle-comments type="button" aria-label="查看评论">${icon('message-circle')}<span>${state.liveComments.length + 126}</span></button>
        <button data-share type="button" aria-label="分享直播">${icon('share-2')}<span>分享</span></button>
      </aside>

      <section class="live-bottom">
        <div class="floating-comments" aria-label="直播评论">
          <p><strong>小禾</strong> 第一次看屋顶番茄开花，好治愈。</p>
          <p><strong>Lynn</strong> 今天会讲怎么判断土壤湿度吗？</p>
        </div>
        <div class="live-description">
          <div><span>${plot.process}</span><small>${icon('users')}${subscriberCount.toLocaleString()} 人已订阅这块田地</small></div>
          <button type="button" data-open-join>${subscribed ? (adopted ? '已共同认养' : '已订阅') : '订阅 / 认养'}</button>
        </div>
        <div class="live-input-row">
          <button class="comment-input" data-toggle-comments type="button">${icon('message-circle')}<span>和直播间聊聊...</span></button>
          ${subscribed ? `<button class="space-entry" data-enter-space="${plot.id}" type="button">进入 Farmer Space ${icon('chevron-right')}</button>` : `<button class="quick-follow" data-open-join type="button">${icon('bookmark')}</button>`}
        </div>
      </section>
    </main>
  `;
}

function subscriptionsScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('还没有订阅田地', '先去公开直播间认识不同城市的农夫。订阅后，这里才会出现专属 Farmer Space。', '去发现田地', 'discover');
  }

  return `
    <section class="page-intro compact-intro">
      <span>MY SUBSCRIPTIONS</span>
      <h2>持续关注的田地</h2>
      <p>订阅不具有排他性，同一块田地可以被多位 Vibe Seeker 共同关注。</p>
    </section>
    <section class="subscription-list">
      ${subscribedPlots.map((plot) => `
        <article class="subscription-card">
          <button class="subscription-image" data-open-live="${plot.id}" type="button" aria-label="进入${plot.title}直播间">
            <img src="${plot.image}" alt="${plot.title}" />
            ${plot.live ? '<span class="live-badge"><i></i>直播中</span>' : '<span class="replay-badge">最近更新 2 小时前</span>'}
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
    return lockedState('订阅后解锁 Farmer Space', '这里包含更详细的田地视频、环境声音、成长档案以及社区提案。', '回到直播间', 'discover');
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

    <nav class="space-tabs" aria-label="Farmer Space 内容">
      <button class="${state.spaceTab === 'intro' ? 'active' : ''}" data-space-tab="intro" type="button">空间介绍</button>
      <button class="${state.spaceTab === 'growth' ? 'active' : ''}" data-space-tab="growth" type="button">成长记录</button>
      <button class="${state.spaceTab === 'proposals' ? 'active' : ''}" data-space-tab="proposals" type="button">共创提案</button>
    </nav>

    ${spaceTabContent(plot)}
  `;
}

function spaceTabContent(plot) {
  if (state.spaceTab === 'growth') return growthArchive(plot);
  if (state.spaceTab === 'proposals') return proposalPanel();

  return `
    <section class="space-content">
      <article class="farmer-note">
        <img src="${plot.farmerImage}" alt="${plot.farmer}" />
        <div><span>来自${plot.farmer}</span><strong>欢迎来到这块田地的长期记录空间</strong><p>我会把日常巡园中值得分享的画面、声音和变化更新在这里。</p></div>
      </article>

      ${sectionHead('FIELD VIDEOS', '田间视频', '<button class="circle-action" type="button" aria-label="查看全部视频">' + icon('chevron-right') + '</button>')}
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

function updatesScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('订阅后才有专属动态', '公开直播之外的成长提醒、农夫更新和阶段变化只向订阅者开放。', '去发现田地', 'discover');
  }
  const plot = subscribedPlots[0];
  return `
    <section class="page-intro compact-intro">
      <span>SUBSCRIBED FEED</span><h2>田地正在发生什么</h2><p>来自你所订阅田地的阶段变化与农夫更新。</p>
    </section>
    <section class="update-feed">
      <article class="stage-alert">${icon('sprout')}<div><span>${plot.title}</span><strong>成长阶段已更新为“现蕾期”</strong><small>今天 08:36</small></div></article>
      <article class="feed-card"><img src="${plot.image}" alt="${plot.title}成长动态" /><div><span>${plot.farmer} · 2 小时前</span><strong>今天发现了第一簇花蕾，叶片状态很好。</strong><p>完整记录已同步到 Farmer Space。</p><button data-enter-space="${plot.id}" type="button">查看完整记录 ${icon('chevron-right')}</button></div></article>
      <article class="feed-note">${icon('volume-2')}<div><span>新增声音</span><strong>清晨浇水时的田间环境声</strong><small>00:38 · 仅订阅者可听</small></div><button data-enter-space="${plot.id}" type="button">播放</button></article>
    </section>
  `;
}

function visitScreen() {
  const subscribedPlots = plots.filter((plot) => state.subscribed.has(plot.id));
  if (!subscribedPlots.length) {
    return lockedState('订阅田地后开放探访', '当田地进入适合参观的阶段，订阅者可以申请自助导览或农夫陪同。', '去发现田地', 'discover');
  }
  const plot = subscribedPlots[0];
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

function profileScreen() {
  return `
    <section class="profile-head"><span class="profile-avatar">${icon('user-round')}</span><div><span>VIBE SEEKER</span><h2>你好，城市观察者</h2><p>记录真实发生的种植过程。</p></div></section>
    <section class="profile-stats"><div><strong>${state.subscribed.size}</strong><span>订阅田地</span></div><div><strong>${state.adopted.size}</strong><span>共同认养</span></div><div><strong>${state.voted.size}</strong><span>参与投票</span></div></section>
    <section class="profile-section">
      ${sectionHead('MY ACTIVITY', '我的参与')}
      <button data-route="subscriptions" type="button">${icon('bookmark')}<span><strong>我的订阅</strong><small>查看已解锁的 Farmer Space</small></span>${icon('chevron-right')}</button>
      <button data-route="updates" type="button">${icon('radio')}<span><strong>成长动态</strong><small>订阅田地的最新变化</small></span>${icon('chevron-right')}</button>
      <button data-route="visit" type="button">${icon('map-pin')}<span><strong>探访申请</strong><small>查看与管理现场预约</small></span>${icon('chevron-right')}</button>
    </section>
    <section class="role-note">${icon('leaf')}<div><strong>当前身份：Vibe Seeker</strong><span>农夫管理工具与线上用户界面分开，不出现在本端导航中。</span></div></section>
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
        <span><strong>订阅田地</strong><small>免费关注直播与成长更新，解锁 Farmer Space、提案和投票。</small></span>
        <em>${isSubscribed(plot.id) ? '已订阅' : '免费'}</em>
      </button>
      <button class="join-option featured" data-adopt type="button">
        <span class="option-icon">${icon('sprout')}</span>
        <span><strong>共同认养</strong><small>在订阅基础上建立更长期的关系，参与本季成果与线下探访。</small></span>
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
      <p>${plot.title}的 Farmer Space 已解锁，你可以查看更详细的田间内容并参与社区提案。</p>
      <button class="dialog-primary" data-enter-space="${plot.id}" type="button">进入 Farmer Space</button>
      <button class="dialog-secondary" data-success-close type="button">继续看直播</button>
    </section>
  `;
}

function commentDrawer() {
  return `
    <div class="overlay-backdrop" data-toggle-comments></div>
    <section class="comment-drawer" role="dialog" aria-label="直播评论">
      <div class="sheet-handle"></div>
      <header><strong>直播评论 · ${state.liveComments.length + 126}</strong><button data-toggle-comments type="button" aria-label="关闭评论">${icon('x')}</button></header>
      <div class="comment-list">
        ${state.liveComments.map((comment, index) => `<article><span>${index % 2 ? 'L' : '禾'}</span><div><strong>${index % 2 ? 'Lynn' : '小禾'}</strong><p>${escapeHtml(comment)}</p></div></article>`).join('')}
      </div>
      <div class="comment-compose"><input data-comment-input aria-label="评论内容" placeholder="友善地聊聊这块田地..." /><button data-send-comment type="button" aria-label="发送评论">${icon('send')}</button></div>
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
      <textarea data-proposal-input aria-label="建议内容" placeholder="例如：希望下次直播看看番茄花的近景..."></textarea>
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
    space: spaceScreen
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
  const live = state.route === 'live';
  const baseRoute = Object.hasOwn(navItems, state.route);
  document.querySelector('#app').innerHTML = `
    <main class="stage">
      <div class="zoom-meter" data-zoom-value>${Math.round(state.zoom * 100)}%</div>
      <div class="device-space">
        <div class="phone-shell" aria-label="iPhone 17 中文 App 原型">
          <div class="phone-screen ${live ? 'live-mode' : ''}">
            ${statusBar(live)}
            ${live ? liveRoom() : `${topBar()}<div class="screen-body ${state.route === 'space' ? 'space-body' : ''}">${screenMarkup()}</div>${baseRoute ? bottomNav() : ''}`}
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

  document.querySelectorAll('[data-open-live]').forEach((button) => button.addEventListener('click', () => {
    state.selectedPlot = button.dataset.openLive;
    state.route = 'live';
    state.notice = '';
    render();
    resetDevicePosition();
  }));

  document.querySelector('[data-like-live]')?.addEventListener('click', () => {
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
    state.liveComments.push(value);
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
    state.notice = `已提交 6 月 ${state.visitDate} 日的探访申请`;
    render(true);
  });

  document.querySelector('[data-share]')?.addEventListener('click', () => {
    state.notice = '直播链接已准备好';
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
