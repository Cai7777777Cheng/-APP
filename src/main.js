import './styles.css';
import {
  ArrowRight,
  Battery,
  Bell,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Clock3,
  Droplets,
  FileText,
  Heart,
  Home,
  Image,
  Leaf,
  MapPinned,
  MessageCircle,
  Mic2,
  Navigation,
  Package,
  QrCode,
  Radio,
  Route,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Sun,
  UserRound,
  Video,
  Waves,
  createIcons
} from 'lucide';

const iconSet = {
  ArrowRight,
  Battery,
  Bell,
  BookOpen,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  CircleDollarSign,
  Clock3,
  Droplets,
  FileText,
  Heart,
  Home,
  Image,
  Leaf,
  MapPinned,
  MessageCircle,
  Mic2,
  Navigation,
  Package,
  QrCode,
  Radio,
  Route,
  Search,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sprout,
  Sun,
  UserRound,
  Video,
  Waves
};

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const assets = {
  hero: asset('hero-rooftop.png'),
  farm: asset('farm-overview.png'),
  market: asset('market-service.png'),
  aiSeed: asset('ai-seed.png'),
  publish: asset('space-subscribe.png'),
  garden: asset('my-garden.png'),
  vibe: asset('vibe-seeker-rec.png'),
  visit: asset('vibe-live-care.png')
};

const state = {
  view: 'overview',
  seed: 'tomato',
  support: 'photo',
  visit: 'qr',
  farmerTab: 'draft'
};

const views = {
  overview: { label: 'Journey', icon: 'home', title: 'Service Journey' },
  subscribe: { label: 'Subscribe', icon: 'sprout', title: 'Subscribe' },
  space: { label: 'Space', icon: 'leaf', title: 'My Space' },
  visit: { label: 'Visit', icon: 'map-pinned', title: 'Visit' },
  farmer: { label: 'Farmer', icon: 'user-round', title: 'Farmer Desk' }
};

const journey = [
  {
    id: 'subscribe',
    step: '01',
    title: 'Select a location',
    copy: 'Choose a nearby urban farm, check AI seed recommendations, then subscribe to a personal planting space.',
    icon: 'map-pinned'
  },
  {
    id: 'space',
    step: '02',
    title: 'Enter the planting space',
    copy: 'Open Farmer Space Introduction, follow week-by-week growth, and watch media updates from the plot.',
    icon: 'leaf'
  },
  {
    id: 'space',
    step: '03',
    title: 'Make a light wish',
    copy: 'Send photo, sound, sunlight, or water support through permission-based remote care.',
    icon: 'heart'
  },
  {
    id: 'farmer',
    step: '04',
    title: 'Co-create at milestones',
    copy: 'The farmer gives bounded choices at growth and harvest moments instead of accepting direct commands.',
    icon: 'shield-check'
  },
  {
    id: 'visit',
    step: '05',
    title: 'Go offline nearby',
    copy: 'Schedule a visit, scan the plot QR code, take a self-guided tour, and meet growers when available.',
    icon: 'route'
  }
];

const principles = [
  {
    title: 'Parallel Growing',
    copy: 'Vibe Seekers grow a small companion crop at home while the farmer keeps authority over the main physical plot.',
    icon: 'sprout',
    tone: 'accent-green'
  },
  {
    title: 'Permission-Based Remote Care',
    copy: 'Remote support becomes water, light, supplies, or credits only after sensor status and farmer rules allow it.',
    icon: 'shield-check',
    tone: 'accent-sky'
  },
  {
    title: 'Authorized Milestone Co-Creation',
    copy: 'At harvest and growth nodes, users vote from acceptable options prepared by the farmer and platform.',
    icon: 'check-circle-2',
    tone: 'accent-amber'
  }
];

const locations = [
  { id: 'roof', title: 'Rooftop Garden A', meta: '1.2 km · greens and herbs', match: 96 },
  { id: 'market', title: 'Market-side Farm', meta: '2.4 km · tomato beds', match: 91 },
  { id: 'school', title: 'Community Greenhouse', meta: '3.1 km · beginner plots', match: 88 }
];

const seeds = [
  { id: 'tomato', name: 'Cherry Tomato', tag: 'easy-to-grow', days: '45 days', match: 94, color: '#f26b4b' },
  { id: 'basil', name: 'Sweet Basil', tag: 'home kit', days: '28 days', match: 88, color: '#44a267' },
  { id: 'lettuce', name: 'Baby Lettuce', tag: 'fast harvest', days: '32 days', match: 91, color: '#8abf45' }
];

const supportActions = [
  { id: 'photo', label: 'Photo', icon: 'image', meta: 'Ask for a close-up' },
  { id: 'sound', label: 'Sound', icon: 'mic-2', meta: 'Leave a short blessing' },
  { id: 'sun', label: 'Sunlight', icon: 'sun', meta: 'Convert to care credit' },
  { id: 'water', label: 'Water', icon: 'droplets', meta: 'Needs permission gate' }
];

const visitSteps = [
  { id: 'qr', title: 'QR verification', icon: 'qr-code', meta: 'Scan the parcel code at the entrance' },
  { id: 'tour', title: 'Self-guided tour', icon: 'route', meta: 'Follow the route without interrupting work' },
  { id: 'grower', title: 'Visit with growers', icon: 'message-circle', meta: 'Optional conversation window' }
];

function icon(name, label = '') {
  return `<i data-lucide="${name}" aria-hidden="true"></i>${label ? `<span>${label}</span>` : ''}`;
}

function selectedSeed() {
  return seeds.find((seed) => seed.id === state.seed) ?? seeds[0];
}

function selectedSupport() {
  return supportActions.find((support) => support.id === state.support) ?? supportActions[0];
}

function appHeader() {
  return `
    <div class="status-bar">
      <span>9:41</span>
      <span class="status-icons">${icon('radio')}${icon('waves')}${icon('battery')}</span>
    </div>
    <header class="app-header">
      <button class="icon-button" type="button" data-view="overview" aria-label="Back to journey">${icon('chevron-left')}</button>
      <div>
        <p>Urban Garden Service</p>
        <h1>${views[state.view].title}</h1>
      </div>
      <button class="icon-button" type="button" aria-label="Notifications">${icon('bell')}</button>
    </header>
  `;
}

function bottomNav() {
  return `
    <nav class="bottom-nav" aria-label="Primary">
      ${Object.entries(views)
        .map(
          ([id, item]) => `
            <button class="${state.view === id ? 'active' : ''}" data-view="${id}" type="button">
              ${icon(item.icon)}
              <span>${item.label}</span>
            </button>
          `
        )
        .join('')}
    </nav>
  `;
}

function hero() {
  return `
    <section class="hero-card">
      <img src="${assets.hero}" alt="Rooftop urban farm service scene" />
      <div class="hero-copy">
        <p>Vibe Seeker x Urban Farmer</p>
        <h2>Grow together without taking over the farm</h2>
        <span>One service links subscription, media updates, light interaction, farmer approval, and offline visits.</span>
        <button class="primary-button" data-view="subscribe" type="button">${icon('arrow-right', 'Start the journey')}</button>
      </div>
    </section>
  `;
}

function overviewScreen() {
  return `
    ${hero()}
    <section class="section-block">
      <div class="section-heading">
        <p>Subscribe to Urban Farmer · 5 scenarios</p>
        <h3>The app follows the storyboard order</h3>
      </div>
      <div class="journey-list">
        ${journey
          .map(
            (item) => `
              <button class="journey-step" data-view="${item.id}" type="button">
                <span class="step-index">${item.step}</span>
                <span class="step-icon">${icon(item.icon)}</span>
                <strong>${item.title}</strong>
                <small>${item.copy}</small>
              </button>
            `
          )
          .join('')}
      </div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p>Service rules</p>
        <h3>What protects both sides</h3>
      </div>
      ${principles
        .map(
          (item) => `
            <article class="text-card ${item.tone}">
              ${icon(item.icon)}
              <div>
                <strong>${item.title}</strong>
                <span>${item.copy}</span>
              </div>
            </article>
          `
        )
        .join('')}
    </section>
  `;
}

function subscribeScreen() {
  const seed = selectedSeed();
  return `
    <section class="image-panel">
      <img src="${assets.aiSeed}" alt="AI seed recommendation storyboard" />
      <div class="image-badge">${icon('sparkles', 'AI seed recommendation')}</div>
    </section>
    <section class="section-block">
      <div class="section-heading row">
        <div>
          <p>Scenario 01</p>
          <h3>Select location · Subscribe · Choose seeds</h3>
        </div>
        <button class="icon-button solid" type="button" aria-label="Filter">${icon('sliders-horizontal')}</button>
      </div>
      <div class="search-row">
        ${icon('search')}
        <span>Nearby organic vegetable garden</span>
      </div>
      <div class="location-list">
        ${locations
          .map(
            (item, index) => `
              <article class="${index === 0 ? 'active' : ''}">
                <strong>${item.title}</strong>
                <span>${item.meta}</span>
                <em>${item.match}%</em>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p>Seed recommendation</p>
        <h3>Choose a companion crop</h3>
      </div>
      <div class="seed-list">
        ${seeds
          .map(
            (item) => `
              <button class="seed-card ${state.seed === item.id ? 'active' : ''}" data-seed="${item.id}" type="button">
                <span class="seed-dot" style="background:${item.color}"></span>
                <strong>${item.name}</strong>
                <small>${item.match}% match · ${item.days} · ${item.tag}</small>
              </button>
            `
          )
          .join('')}
      </div>
    </section>
    <section class="subscription-card">
      <div>
        <p>Subscription summary</p>
        <h3>${seed.name} in Rooftop Garden A</h3>
        <span>Monthly plan · personal planting space · farmer-approved updates</span>
      </div>
      <div class="recommend-grid">
        <span>${icon('leaf')}Easy to grow</span>
        <span>${icon('heart')}User preference</span>
        <span>${icon('shield-check')}Brand recommendation</span>
      </div>
      <button class="primary-button" data-view="space" type="button">${icon('check-circle-2', 'Open personal space')}</button>
    </section>
  `;
}

function spaceScreen() {
  const support = selectedSupport();
  return `
    <section class="garden-hero">
      <img src="${assets.garden}" alt="My urban garden growth update" />
      <div class="garden-live">${icon('camera')}<span>Current Week 5 · sprouting</span></div>
    </section>
    <section class="progress-card">
      <div class="section-heading row">
        <div>
          <p>Scenario 02</p>
          <h3>Farmer's Space Introduction</h3>
        </div>
        <span class="status-pill">Live plot</span>
      </div>
      <div class="growth-line">
        ${['Space', 'Seed', 'Sprout', 'Wish', 'Harvest'].map((item, index) => `<span class="${index <= 2 ? 'done' : ''}">${item}</span>`).join('')}
      </div>
      <div class="update-feed">
        <strong>Farmer update</strong>
        <span>The platform groups video, photo, and voice updates into this plant space so the user follows growth without asking the farmer repeatedly.</span>
      </div>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p>Scenario 03 · Wishing Well</p>
        <h3>Light interaction with permission gates</h3>
      </div>
      <div class="support-grid">
        ${supportActions
          .map(
            (item) => `
              <button class="${state.support === item.id ? 'active' : ''}" data-support="${item.id}" type="button">
                ${icon(item.icon)}
                <strong>${item.label}</strong>
                <span>${item.meta}</span>
              </button>
            `
          )
          .join('')}
      </div>
      <article class="permission-card">
        ${icon('shield-check')}
        <div>
          <strong>${support.label} request is checked first</strong>
          <span>If the action is unsuitable, it becomes plant-care supply or project credit instead of direct remote control.</span>
        </div>
      </article>
    </section>
    <section class="image-panel short">
      <img src="${assets.publish}" alt="Farmer update publishing storyboard" />
      <div class="image-badge">${icon('send', 'Farmer publishes selected clips')}</div>
    </section>
  `;
}

function visitScreen() {
  return `
    <section class="image-panel tall">
      <img src="${assets.visit}" alt="Visit booking and QR verification storyboard" />
      <div class="image-badge">${icon('map-pinned', 'Nearby offline experience')}</div>
    </section>
    <section class="visit-card">
      <div class="section-heading row">
        <div>
          <p>Scenario 05</p>
          <h3>Schedule a visit</h3>
        </div>
        <span class="status-pill amber">Jun 29</span>
      </div>
      <div class="appointment-list">
        <span>${icon('calendar-days')}2026.06.29</span>
        <span>${icon('clock-3')}16:00-16:50</span>
        <span>${icon('navigation')}Self-guided first, grower chat optional</span>
      </div>
      <button class="primary-button amber-button" type="button">${icon('calendar-days', 'Book a visit')}</button>
    </section>
    <section class="section-block">
      <div class="section-heading">
        <p>On-site service journey</p>
        <h3>Verify, explore, then meet growers</h3>
      </div>
      <div class="visit-options">
        ${visitSteps
          .map(
            (item) => `
              <button class="${state.visit === item.id ? 'active' : ''}" data-visit="${item.id}" type="button">
                ${icon(item.icon)}
                <strong>${item.title}</strong>
                <span>${item.meta}</span>
              </button>
            `
          )
          .join('')}
      </div>
    </section>
  `;
}

function farmerScreen() {
  return `
    <section class="desk-top">
      <div>
        <p>Scenario 04 · Urban Farmer</p>
        <h3>Publish updates without losing control</h3>
      </div>
      <button class="icon-button solid" type="button" aria-label="Drafts">${icon('file-text')}</button>
    </section>
    <section class="image-panel short">
      <img src="${assets.publish}" alt="Farmer one-click edit and publish storyboard" />
      <div class="image-badge">${icon('send', 'One-click edit and publish')}</div>
    </section>
    <section class="section-block">
      <div class="farmer-tabs" aria-label="Farmer workflow">
        <button class="${state.farmerTab === 'draft' ? 'active' : ''}" data-farmer-tab="draft" type="button">Drafts</button>
        <button class="${state.farmerTab === 'gate' ? 'active' : ''}" data-farmer-tab="gate" type="button">Permission</button>
        <button class="${state.farmerTab === 'harvest' ? 'active' : ''}" data-farmer-tab="harvest" type="button">Harvest</button>
      </div>
      ${farmerPanel()}
    </section>
  `;
}

function farmerPanel() {
  const panels = {
    draft: [
      ['camera', 'Auto draft from field work', 'Camera clips, photos, and voice notes enter a private draft box before publishing.'],
      ['send', 'Curated publishing', 'The farmer edits once and shares a concise growth update to subscribed Vibe Seekers.']
    ],
    gate: [
      ['shield-check', 'Remote requests are bounded', 'Water, light, and plant-care support are checked by sensor data and farmer settings.'],
      ['circle-dollar-sign', 'Unsuitable actions convert', 'If support is not needed, it becomes supplies, service credit, or project contribution.']
    ],
    harvest: [
      ['package', 'Authorized outcome options', 'Users choose from farmer-approved package, timing, and message options.'],
      ['book-open', 'Story summary', 'The platform summarizes the harvest story without creating constant chat pressure.']
    ]
  };

  return panels[state.farmerTab]
    .map(
      ([itemIcon, title, copy], index) => `
        <article class="text-card ${index === 0 ? 'accent-sky' : 'accent-green'}">
          ${icon(itemIcon)}
          <div>
            <strong>${title}</strong>
            <span>${copy}</span>
          </div>
        </article>
      `
    )
    .join('');
}

function screenMarkup() {
  const screens = {
    overview: overviewScreen,
    subscribe: subscribeScreen,
    space: spaceScreen,
    visit: visitScreen,
    farmer: farmerScreen
  };
  return screens[state.view]();
}

function render() {
  document.querySelector('#app').innerHTML = `
    <main class="stage">
      <div class="phone-shell" aria-label="iPhone 17 app prototype">
        <div class="dynamic-island" aria-hidden="true"></div>
        <div class="phone-screen">
          ${appHeader()}
          <div class="screen-body">
            ${screenMarkup()}
          </div>
          ${bottomNav()}
        </div>
      </div>
    </main>
  `;

  bindEvents();
  createIcons({ icons: iconSet });
}

function bindEvents() {
  document.querySelectorAll('[data-view]').forEach((button) => {
    button.addEventListener('click', () => {
      state.view = button.dataset.view;
      render();
    });
  });

  document.querySelectorAll('[data-seed]').forEach((button) => {
    button.addEventListener('click', () => {
      state.seed = button.dataset.seed;
      render();
    });
  });

  document.querySelectorAll('[data-support]').forEach((button) => {
    button.addEventListener('click', () => {
      state.support = button.dataset.support;
      render();
    });
  });

  document.querySelectorAll('[data-visit]').forEach((button) => {
    button.addEventListener('click', () => {
      state.visit = button.dataset.visit;
      render();
    });
  });

  document.querySelectorAll('[data-farmer-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.farmerTab = button.dataset.farmerTab;
      render();
    });
  });
}

render();
