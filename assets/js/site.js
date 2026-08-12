/* Huy Bui — portfolio behaviour. No framework, no CDN.
   index.html holds the markup; this file fills the lists and wires the buttons. */

(() => {
  'use strict';

  /* Change a value and reload. Every layout option below still works. */

  const CONFIG = {
    theme: 'auto',            // 'auto' (follow OS) | 'light' | 'dark'
    lang: 'en',               // 'en' | 'vi'
    projectDetailOn: 'hover', // 'hover' | 'click'
    accentColor: '',          // '' keeps the stylesheet default, e.g. 'oklch(0.56 0.14 250)'
    navStyle: 'underline',    // 'underline' | 'index' | 'chips'
    expLayout: 'journal',     // 'journal' | 'detail' | 'compact'
    stackStyle: 'rows'        // 'rows' | 'matrix' | 'type' | 'numbered' | 'chips' | 'marquee'
  };

  /* English labels live in index.html on the [data-i18n] elements and are read
     at startup. DICT.vi holds the Vietnamese. The arrays below cover both. */

  const DICT = {
    en: {},
    vi: {
      'site.kicker': 'Portfolio / 2026',
      'lbl.profile': 'Giới thiệu',
      'hero.role': 'Kỹ sư phần mềm cấp cao · Trưởng nhóm',
      'hero.loc': 'Bình Thạnh, TP. Hồ Chí Minh — UTC+7',
      'hero.bio': 'Mười năm làm sản phẩm web, từ backend tới frontend — đi qua thương mại điện tử, y tế và bảo hiểm. Gần đây tập trung vào builder low-code, điều phối workflow và lập trình cùng AI.',
      'lbl.stack': 'Công nghệ',
      'lbl.work': 'Dự án',
      'f.all': 'Tất cả', 'f.product': 'Sản phẩm', 'f.platform': 'Nền tảng', 'f.consulting': 'Tư vấn',
      'work.open': 'Xem website',
      'lbl.exp': 'Kinh nghiệm',
      'exp.span': '2015 — 2026',
      'lbl.edu': 'Học vấn & Giải thưởng',
      'edu.all': 'Chứng chỉ',
      'lbl.contact': 'Liên hệ',
      'contact.cv': 'CV / PDF',
      'cv.title': 'CV',
      'cv.download': 'Tải về',
      'foot.colophon': 'Chữ IBM Plex · Làm bằng',
      'foot.right': '© 2026'
    }
  };

  /* Strings not in the markup, so they can't come from [data-i18n]. */
  const UI = {
    en: { current: 'Current', expOn: 'Compact', expOff: 'Full', light: 'Light', dark: 'Dark',
          toLight: 'Switch to light theme', toDark: 'Switch to dark theme', toLang: 'Chuyển sang tiếng Việt' },
    vi: { current: 'Hiện tại', expOn: 'Rút gọn', expOff: 'Đầy đủ', light: 'Sáng', dark: 'Tối',
          toLight: 'Chuyển sang chế độ sáng', toDark: 'Chuyển sang chế độ tối', toLang: 'Switch to English' }
  };

  /* cat: 'product' | 'platform' | 'consulting'   ·   url: '' hides the link button */
  const PROJECTS = [
    { y:'2025', cat:'consulting', n:'Hanoi Convention 2025', url:'https://hanoiconvention.org',
      stack:'WordPress · Next.js · NestJS · K8s',
      d:{ en:'CMS and online registration for the UN Convention against Cybercrime signing ceremony in Hanoi. Built with a government agency, from requirements through to on-premise deployment.',
          vi:'CMS và cổng đăng ký trực tuyến cho lễ ký Công ước Liên Hợp Quốc về tội phạm mạng tại Hà Nội. Phối hợp cùng cơ quan nhà nước từ lúc lấy yêu cầu đến khi triển khai on-premise.' },
      m:[['1,500+',{en:'Registrants',vi:'Đại biểu'}],['4 mo',{en:'Delivery',vi:'Thời gian'}]] },

    { y:'2025', cat:'platform', n:'Kasha Booking API', url:'https://kasha.io',
      stack:'NestJS · gRPC · RabbitMQ · Postgres',
      d:{ en:'Booking module backend, architected from inception through design and implementation to MVP launch, with gRPC and RabbitMQ carrying traffic between services.',
          vi:'Backend cho module đặt chỗ: tự dựng kiến trúc từ đầu, làm tới khi ra MVP. Các service giao tiếp với nhau qua gRPC và RabbitMQ.' },
      m:[['MVP',{en:'Shipped',vi:'Đã ra mắt'}],['10 mo',{en:'Engagement',vi:'Thời gian'}]] },

    { y:'2024', cat:'platform', n:'Product Builder', url:'https://covergo.com',
      stack:'Vue 3 · NestJS · PostgreSQL · Keycloak',
      d:{ en:'Low-code builder that lets insurers configure health, life, property and casualty products with minimal code — the core of the distribution platform.',
          vi:'Builder low-code giúp công ty bảo hiểm tự cấu hình sản phẩm sức khoẻ, nhân thọ, tài sản và trách nhiệm mà gần như không cần viết code — phần cốt lõi của nền tảng phân phối.' },
      m:[['1 wk',{en:'Time to market',vi:'Thời gian ra mắt'}],['4',{en:'Insurance lines',vi:'Dòng sản phẩm'}]] },

    { y:'2024', cat:'product', n:'Breezing.In', url:'https://breezing.in',
      stack:'Nuxt 3 · NestJS · MongoDB · AWS',
      d:{ en:'All-in-one event and booking platform, built as founding engineer from MVP through launch. Its offline check-in ran Saigon Summit 2024 with Tech in Asia.',
          vi:'Nền tảng quản lý sự kiện và đặt chỗ all-in-one, xây từ MVP tới lúc ra mắt với vai trò founding engineer. Tính năng check-in offline được dùng cho Saigon Summit 2024 cùng Tech in Asia.' },
      m:[['1,000+',{en:'Users',vi:'Người dùng'}],['3 mo',{en:'To launch',vi:'Đến khi ra mắt'}]] },

    { y:'2023', cat:'product', n:'Business Connect', url:'https://nic.gov.vn',
      stack:'Nuxt 3 · NestJS · MongoDB · AWS',
      d:{ en:'Business matchmaking platform for Vietnam International Innovation Expo 2023, owned end to end with a team of seven.',
          vi:'Nền tảng kết nối doanh nghiệp cho Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023. Phụ trách trọn gói cùng đội bảy người.' },
      m:[['15,000+',{en:'Expo visitors',vi:'Khách tham dự'}],['7',{en:'Engineers',vi:'Kỹ sư'}]] },

    { y:'2019', cat:'consulting', n:'Dental AI Imaging', url:'',
      stack:'PHP · Vue.js · Laravel · AWS Serverless',
      d:{ en:'AI-powered imaging tool and a microservices dental platform helping clinics diagnose more accurately — architecture, pre-sales, and ten developers across two engagements.',
          vi:'Công cụ xử lý ảnh bằng AI và nền tảng nha khoa dựng theo microservices, giúp phòng khám chẩn đoán chính xác hơn. Đảm nhận kiến trúc, pre-sales và điều phối mười lập trình viên qua hai dự án.' },
      m:[['$1M',{en:'Contract won',vi:'Hợp đồng'}],['10',{en:'Developers',vi:'Lập trình viên'}]] }
  ];

  const STACK = [
    [{en:'Languages',vi:'Ngôn ngữ'}, ['TypeScript','JavaScript','PHP','Java']],
    [{en:'Frontend',vi:'Frontend'}, ['Vue 3','Nuxt','React','Next.js','TailwindCSS','Vuetify','PrimeVue']],
    [{en:'Backend',vi:'Backend'}, ['Node.js','NestJS','Express','Laravel','Spring MVC']],
    [{en:'Data',vi:'Dữ liệu'}, ['PostgreSQL','MySQL','MongoDB','Redis','Oracle']],
    [{en:'Cloud & DevOps',vi:'Cloud & DevOps'}, ['AWS','Docker','Kubernetes','GitHub Actions','Grafana','OpenTelemetry']],
    [{en:'Integration',vi:'Tích hợp'}, ['REST','GraphQL','gRPC','RabbitMQ','Temporal']],
    [{en:'AI & Testing',vi:'AI & Testing'}, ['Claude Code','Cursor','Copilot','Jest','Playwright']]
  ];

  /* Education and awards. d: year(s), t: title, m: short tag. */
  const CREDENTIALS = [
    { d:'2024', m:{en:'Award',vi:'Giải'},
      t:{en:'Innovator Award — product innovation, CoverGo',
         vi:'Giải Innovator — đổi mới sản phẩm, CoverGo'} },
    { d:'2023', m:{en:'Award',vi:'Giải'},
      t:{en:'Best Dissertation Award — remote-work productivity',
         vi:'Giải Luận văn xuất sắc — năng suất làm việc từ xa'} },
    { d:'2021—23', m:{en:'Master',vi:'Thạc sĩ'},
      t:{en:'Master of Business Administration — Université Paris 1 Panthéon-Sorbonne',
         vi:'Thạc sĩ Quản trị Kinh doanh — Université Paris 1 Panthéon-Sorbonne'} },
    { d:'2011—15', m:{en:'Bachelor',vi:'Cử nhân'},
      t:{en:'Bachelor of Engineering, Information Systems — FPT University',
         vi:'Cử nhân Hệ thống thông tin — Đại học FPT'} }
  ];

  const EXP = [
    { p:'2024 — ', pn:{en:'now',vi:'nay'}, r:{en:'Senior Software Engineer / Squad Lead',vi:'Kỹ sư phần mềm cấp cao / Trưởng nhóm'}, c:'CoverGo',
      loc:{en:'Insurance',vi:'Bảo hiểm'}, s:'Vue 3 · NestJS · PostgreSQL · AWS · Temporal · Keycloak',
      d:{ en:'Lead and build the low-code product builder that lets insurers configure health, life, property and casualty products — a core part of the distribution platform.',
          vi:'Dẫn dắt và trực tiếp xây builder low-code, giúp công ty bảo hiểm tự cấu hình sản phẩm sức khoẻ, nhân thọ, tài sản và trách nhiệm — phần cốt lõi của nền tảng phân phối.' },
      b:[ { en:'Cut time-to-market for a new insurance product from a month to a week.',
            vi:'Giảm thời gian đưa sản phẩm bảo hiểm mới ra thị trường từ một tháng xuống một tuần.' },
          { en:'Delivered data anonymisation and deletion modules — configuration, scheduling, reporting, UI — for regulatory compliance and tenant-specific data policy.',
            vi:'Xây module ẩn danh hoá và xoá dữ liệu — cấu hình, lên lịch, báo cáo, UI — phục vụ tuân thủ quy định và chính sách dữ liệu riêng của từng khách hàng.' },
          { en:'Designed the workflow wrapper around Temporal so customer journeys and background processing compose without bespoke plumbing.',
            vi:'Thiết kế lớp wrapper cho Temporal, để các luồng nghiệp vụ phức tạp — hành trình khách hàng, job chạy nền — ghép lại được mà không phải dựng lại từ đầu mỗi lần.' },
          { en:'Built customer and broker portal demos with solution design for three prospective clients; used Cursor with Claude models to accelerate implementation by 40%.',
            vi:'Xây demo cổng khách hàng và cổng đại lý kèm thiết kế giải pháp cho ba khách hàng tiềm năng; dùng Cursor với các model Claude để tăng tốc triển khai 40%.' } ],
      m:[['1 wk',{en:'Time to market',vi:'Thời gian ra mắt'}],['40%',{en:'Faster delivery',vi:'Tăng tốc'}],['2024',{en:'Innovator award',vi:'Giải Innovator'}]] },

    { p:'2023', pn:{en:'',vi:''}, r:{en:'Technical Lead',vi:'Trưởng nhóm kỹ thuật'}, c:'National Innovation Center',
      loc:{en:'Government',vi:'Khu vực công'}, s:'Nuxt 3 · NestJS · MongoDB · WordPress · AWS · Firebase',
      d:{ en:'Owned every part of the product lifecycle for the business connect platform behind Vietnam International Innovation Expo 2023.',
          vi:'Phụ trách toàn bộ vòng đời sản phẩm của nền tảng kết nối doanh nghiệp cho Triển lãm Quốc tế Đổi mới sáng tạo Việt Nam 2023.' },
      b:[ { en:'Delivered a platform that supported more than 15,000 visitors during the expo.',
            vi:'Xây nền tảng phục vụ hơn 15.000 khách tham dự trong suốt triển lãm.' },
          { en:'Recruited and managed a team of seven, establishing coding standards and development process from scratch.',
            vi:'Tuyển và quản lý đội bảy người, thiết lập chuẩn code và quy trình phát triển từ đầu.' },
          { en:'Ran product demonstrations and fed customer feedback back into the roadmap with the team.',
            vi:'Trình bày sản phẩm và cùng đội đưa phản hồi khách hàng vào lộ trình phát triển.' } ],
      m:[['15,000+',{en:'Expo visitors',vi:'Khách tham dự'}],['7',{en:'Team size',vi:'Quy mô đội'}]] },

    { p:'2021 — 2023', pn:{en:'',vi:''}, r:{en:'Senior Software Engineer',vi:'Kỹ sư phần mềm cấp cao'}, c:'Pangara AB',
      loc:{en:'Platform / CMS',vi:'Nền tảng / CMS'}, s:'Vue.js · Node.js · Directus · Laravel · MySQL',
      d:{ en:'Built and customised a platform on the Directus headless CMS, and the extensions that made it usable by people who do not write code.',
          vi:'Xây và tuỳ biến nền tảng trên headless CMS Directus, kèm các extension để người không biết code vẫn dùng được.' },
      b:[ { en:'Cut project development time from two weeks to three days.',
            vi:'Giảm thời gian phát triển dự án từ hai tuần xuống ba ngày.' },
          { en:'Created custom extensions letting non-technical users build complex workflows and data management themselves.',
            vi:'Viết extension tuỳ biến để người không chuyên tự dựng workflow phức tạp và tự quản lý dữ liệu.' } ],
      m:[['3 days',{en:'Project setup',vi:'Khởi tạo dự án'}]] },

    { p:'2020 — 2021', pn:{en:'',vi:''}, r:{en:'Team Leader',vi:'Trưởng nhóm'}, c:'ICD Vietnam',
      loc:{en:'E-commerce',vi:'Thương mại điện tử'}, s:'Node.js · TypeScript · Express · Angular · Google App Engine',
      d:{ en:'Built and led the team behind a Japanese hypermarket group’s e-commerce platform.',
          vi:'Xây dựng và dẫn dắt đội phát triển nền tảng thương mại điện tử cho tập đoàn đại siêu thị Nhật Bản.' },
      b:[ { en:'Hired and led five engineers, shipping five major modules: pickup, sales reporting, reservations and loyalty campaigns.',
            vi:'Tuyển và dẫn dắt năm kỹ sư, hoàn thành năm module lớn: nhận hàng tại quầy, báo cáo bán hàng, đặt trước và chương trình khách hàng thân thiết.' },
          { en:'Optimised a data export handling more than 32M records, from four hours down to one.',
            vi:'Tối ưu quy trình xuất dữ liệu hơn 32 triệu bản ghi, từ bốn giờ xuống còn một giờ.' },
          { en:'Automated the deployment pipeline, taking releases from four hours to thirty minutes.',
            vi:'Tự động hoá pipeline triển khai, giảm thời gian phát hành từ bốn giờ xuống ba mươi phút.' } ],
      m:[['32M+',{en:'Records',vi:'Bản ghi'}],['1 hr',{en:'Export run',vi:'Xuất dữ liệu'}],['5',{en:'Engineers',vi:'Kỹ sư'}]] },

    { p:'2018 — 2020', pn:{en:'',vi:''}, r:{en:'Solution Architect & Pre-sale',vi:'Solution Architect & Pre-sales'}, c:'FPT Software',
      loc:{en:'Healthcare',vi:'Y tế'}, s:'PHP CodeIgniter · Vue.js · Laravel · Node.js · AWS Serverless · Swift',
      d:{ en:'Architected healthcare products and sold them: an AI-powered imaging tool and a microservices dental platform, across ten developers and two major engagements.',
          vi:'Vừa thiết kế kiến trúc vừa làm pre-sales cho các sản phẩm y tế: công cụ xử lý ảnh bằng AI và nền tảng nha khoa microservices, cùng mười lập trình viên qua hai dự án lớn.' },
      b:[ { en:'Secured a $1M contract with the top Korean dental company, and a $1M PHR project from a top-two medical equipment maker after on-site consultation in Japan.',
            vi:'Chốt hợp đồng 1 triệu USD với công ty nha khoa hàng đầu Hàn Quốc, và dự án PHR 1 triệu USD từ nhà sản xuất thiết bị y tế top 2 sau khi tư vấn trực tiếp tại Nhật.' },
          { en:'Led four proofs of concept for Medical IT Expo Japan: a PHR app, an EMR platform, blockchain medical records and an AR mobile game.',
            vi:'Dẫn dắt bốn bản PoC cho Medical IT Expo Nhật Bản: ứng dụng PHR, nền tảng EMR, quản lý dữ liệu y tế trên blockchain và game AR trên di động.' },
          { en:'Ran technical workshops and sharing sessions for more than fifty developers and technical leads.',
            vi:'Tổ chức workshop và buổi chia sẻ kỹ thuật cho hơn năm mươi lập trình viên và trưởng nhóm.' } ],
      m:[['$1M',{en:'Contract won',vi:'Hợp đồng'}],['10',{en:'Developers',vi:'Lập trình viên'}],['50+',{en:'Trained',vi:'Đã đào tạo'}]] },

    { p:'2016 — 2018', pn:{en:'',vi:''}, r:{en:'Senior Software Engineer',vi:'Kỹ sư phần mềm cấp cao'}, c:'NTT DATA',
      loc:{en:'Healthcare',vi:'Y tế'}, s:'Java · Spring MVC · Oracle · Terasoluna',
      d:{ en:'Built clinic search and integrated maps for the icashica.com dental marketplace, and moved the database underneath it.',
          vi:'Xây tính năng tìm phòng khám và tích hợp bản đồ cho sàn nha khoa icashica.com, đồng thời chuyển đổi cơ sở dữ liệu bên dưới.' },
      b:[ { en:'Led the migration from MS SQL to Oracle, taking query time from ten seconds to one.',
            vi:'Dẫn dắt việc chuyển từ MS SQL sang Oracle, giảm thời gian truy vấn từ mười giây xuống một giây.' },
          { en:'Mentored junior developers and ran knowledge-transfer sessions for the team.',
            vi:'Kèm cặp lập trình viên mới và tổ chức các buổi chuyển giao kiến thức cho đội.' } ],
      m:[['1 s',{en:'Query time',vi:'Thời gian truy vấn'}]] },

    { p:'2015', pn:{en:'',vi:''}, r:{en:'Software Programmer',vi:'Lập trình viên'}, c:'FPT Information System',
      loc:{en:'Enterprise / SAP',vi:'Doanh nghiệp / SAP'}, s:'SAP ABAP',
      d:{ en:'First role: custom programs built from customer requirements and basic design specifications.',
          vi:'Công việc đầu tiên: viết các chương trình theo yêu cầu khách hàng và tài liệu thiết kế cơ bản.' },
      b:[ { en:'Wrote and maintained technical documentation at 100% compliance with design review standards.',
            vi:'Viết và duy trì tài liệu kỹ thuật đạt 100% yêu cầu của chuẩn design review.' } ],
      m:[['100%',{en:'Review compliance',vi:'Đạt chuẩn review'}]] }
  ];

  /* --- state ---------------------------------------------------------------- */

  const root = document.querySelector('[data-page]');
  if (!root) return;

  const mqDark = window.matchMedia('(prefers-color-scheme: dark)');
  const mqCoarse = window.matchMedia('(hover:none),(pointer:coarse)');

  const state = {
    lang: 'en', theme: 'auto', cat: 'all',
    sel: 0, selPainted: false,
    expAll: false, expSel: 0, expRows: [], expBullets: [],
    activeNav: null, navStuck: null,
    cvOpener: null,
    en: {}, lastCursorAccent: null
  };

  const ui = () => UI[state.lang === 'vi' ? 'vi' : 'en'];

  /* Language and theme survive a reload. The inline script in <head> reads the
     same key. try/catch because localStorage throws in private mode. */

  const PREFS_KEY = 'hb.prefs';

  const readPrefs = () => {
    try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; }
    catch (e) { return {}; }
  };

  const savePrefs = () => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ lang: state.lang, theme: state.theme }));
    } catch (e) { /* private mode, quota — not worth failing over */ }
  };

  const app = {

    /* --- lifecycle -------------------------------------------------------- */

    init() {
      root.querySelectorAll('[data-i18n]').forEach(el => {
        state.en[el.getAttribute('data-i18n')] = el.textContent;
      });
      DICT.en = state.en;

      // A saved choice wins; CONFIG is only the first-visit default.
      const saved = readPrefs();
      state.lang = (saved.lang === 'vi' || saved.lang === 'en')
        ? saved.lang
        : (CONFIG.lang === 'vi' ? 'vi' : 'en');
      state.theme = ['light', 'dark', 'auto'].includes(saved.theme)
        ? saved.theme
        : ((CONFIG.theme === 'light' || CONFIG.theme === 'dark') ? CONFIG.theme : 'auto');
      state.cat = 'all';
      state.sel = 0;
      state.expAll = app.isCoarse();
      state.expSel = 0;

      if (CONFIG.accentColor) document.documentElement.style.setProperty('--accent', CONFIG.accentColor);

      app.buildList();
      app.applyLang();   // also renders experience, credentials, stack and the detail pane
      app.applyTheme();
      app.paintFilters(state.cat);
      app.wire();
      app.initNav();
    },

    wire() {
      const on = (sel, ev, fn) => root.querySelectorAll(sel).forEach(el => el.addEventListener(ev, fn));

      on('[data-lang-btn]', 'click', () => app.setLang(state.lang === 'vi' ? 'en' : 'vi'));
      on('[data-theme-btn]', 'click', () => {
        state.theme = app.resolvedTheme() === 'dark' ? 'light' : 'dark';
        app.applyTheme();
        savePrefs();
      });
      on('[data-exp-toggle]', 'click', () => app.toggleExpAll());
      on('[data-cv-open]', 'click', (e) => { e.preventDefault(); app.openCv(e.currentTarget); });
      on('[data-cv-close]', 'click', () => app.closeCv());
      // [data-cv-download] is left alone — it's a native download link.
      root.querySelectorAll('[data-filter]').forEach(b => {
        b.addEventListener('click', () => app.setFilter(b.getAttribute('data-filter')));
      });

      document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') app.closeCv(); });
      root.querySelector('[data-cv-modal]').addEventListener('mousedown', (ev) => {
        if (!ev.target.closest('[data-cv-panel]')) app.closeCv();
      });

      // Repaint if the OS theme flips while we're on 'auto'.
      mqDark.addEventListener('change', () => { if (state.theme === 'auto') app.applyTheme(); });
    },

    isCoarse() { return mqCoarse.matches; },

    /* --- nav -------------------------------------------------------------- */

    initNav() {
      const links = [...root.querySelectorAll('nav a')];
      const navStyle = CONFIG.navStyle || 'underline';

      links.forEach((a, i) => {
        if (navStyle === 'index') {
          a.style.cssText = 'display:inline-flex;align-items:baseline;gap:7px;color:var(--muted);transition:color .3s cubic-bezier(.33,.02,.24,1)';
          const n = document.createElement('span');
          n.setAttribute('data-navnum', '');
          n.setAttribute('aria-hidden', 'true');
          n.style.cssText = "font:400 10px/1 'IBM Plex Mono',ui-monospace,monospace;color:var(--muted);transition:color .3s cubic-bezier(.33,.02,.24,1)";
          n.textContent = String(i + 1).padStart(2, '0');
          a.prepend(n);
        } else if (navStyle === 'chips') {
          a.style.cssText = 'padding:7px 11px;border:1px solid transparent;border-radius:2px;color:var(--muted);transition:color .3s cubic-bezier(.33,.02,.24,1),border-color .3s cubic-bezier(.33,.02,.24,1),background .3s cubic-bezier(.33,.02,.24,1)';
        }
      });

      const setActive = (id) => {
        links.forEach(a => {
          const on = a.getAttribute('href') === '#' + id;
          a.style.color = on ? 'var(--fg)' : 'var(--muted)';
          if (on) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
          if (navStyle === 'index') {
            const n = a.querySelector('[data-navnum]');
            if (n) n.style.color = on ? 'var(--accent)' : 'var(--muted)';
          } else if (navStyle === 'chips') {
            a.style.borderColor = on ? 'var(--line)' : 'transparent';
            a.style.background = on ? 'var(--bg)' : 'transparent';
          } else {
            a.style.borderBottomColor = on ? 'var(--accent)' : 'transparent';
          }
        });
      };

      const sections = links.map(a => root.querySelector(a.getAttribute('href'))).filter(Boolean);
      const syncNav = () => {
        if (!sections.length) return;
        const line = window.innerHeight * 0.35;
        const last = sections[sections.length - 1];
        let id = sections[0].id;
        if (last.getBoundingClientRect().bottom <= window.innerHeight + 4) id = last.id;
        else sections.forEach(el => { if (el.getBoundingClientRect().top <= line) id = el.id; });
        if (id !== state.activeNav) { state.activeNav = id; setActive(id); }
      };

      const wrap = root.querySelector('[data-navwrap]');
      const bar = root.querySelector('[data-navbar]');
      const inner = root.querySelector('[data-navinner]');
      const sentinel = root.querySelector('[data-nav-sentinel]');

      // Edge-to-edge bar once the sentinel scrolls past the top.
      const syncSticky = () => {
        const on = sentinel.getBoundingClientRect().top < -6;
        if (on === state.navStuck) return;
        state.navStuck = on;
        wrap.style.top = '0px';
        wrap.style.margin = on ? '0 calc(-50vw + 50%)' : '0';
        bar.style.borderRadius = on ? '0' : '3px';
        bar.style.borderLeftColor = on ? 'transparent' : 'var(--line)';
        bar.style.borderRightColor = on ? 'transparent' : 'var(--line)';
        bar.style.borderTopColor = on ? 'transparent' : 'var(--line)';
        inner.style.maxWidth = on ? '1360px' : 'none';
        inner.style.padding = on ? '11px 24px' : '11px 16px';
      };

      // One tick per frame, instead of polling forever with requestAnimationFrame.
      let queued = false;
      const tick = () => { queued = false; syncSticky(); syncNav(); };
      const onScroll = () => { if (!queued) { queued = true; requestAnimationFrame(tick); } };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      tick();
    },

    /* --- theme and language ----------------------------------------------- */

    resolvedTheme() {
      return (state.theme === 'light' || state.theme === 'dark')
        ? state.theme
        : (mqDark.matches ? 'dark' : 'light');
    },

    applyTheme() {
      const html = document.documentElement;
      // On 'auto', leave data-theme off and let the CSS media query decide.
      if (state.theme === 'auto') html.removeAttribute('data-theme');
      else html.setAttribute('data-theme', state.theme);

      const t = app.resolvedTheme();
      const lab = root.querySelector('[data-theme-label]');
      if (lab) lab.textContent = ui()[t];
      const mk = root.querySelector('[data-theme-mark]');
      if (mk) {
        mk.style.background = t === 'dark' ? 'var(--fg)' : 'transparent';
        mk.style.boxShadow = 'none';
      }
      const btn = root.querySelector('[data-theme-btn]');
      if (btn) {
        btn.style.borderColor = 'var(--line)';
        btn.setAttribute('aria-label', t === 'dark' ? ui().toLight : ui().toDark);
      }
      app.syncCursor();
    },

    applyLang() {
      const d = DICT[state.lang] || {};
      root.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (d[k] != null) el.textContent = d[k];
        else if (state.en[k] != null) el.textContent = state.en[k];
      });
      const ll = root.querySelector('[data-lang-label]');
      if (ll) ll.textContent = state.lang.toUpperCase();
      const lb = root.querySelector('[data-lang-btn]');
      if (lb) lb.setAttribute('aria-label', ui().toLang);

      app.renderExp();
      state.selPainted = false;
      app.select(state.sel);
      app.renderCredentials();
      app.renderStack();
      document.documentElement.setAttribute('lang', state.lang);
    },

    setLang(l) { state.lang = l; app.applyLang(); app.applyTheme(); savePrefs(); },

    /* Rebuilds the accent-tinted pointer cursor for the live --accent value. */
    syncCursor() {
      const cs = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      if (!cs || cs === state.lastCursorAccent) return;
      state.lastCursorAccent = cs;
      const c = document.createElement('canvas');
      c.width = c.height = 1;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillStyle = cs;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      const hex = [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      const cur = (stroke) => "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cg stroke='%23" + stroke + "' stroke-width='1'%3E%3Cpath d='M12 1.5v7.5M12 15v7.5M1.5 12h7.5M15 12h7.5'/%3E%3C/g%3E%3Crect x='9.5' y='9.5' width='5' height='5' fill='%23" + hex + "'/%3E%3C/svg%3E\") 12 12, pointer";
      const sel = 'a,button,[data-row],[data-exp-row]';
      const dark = ':root[data-theme="dark"] ';
      const auto = ':root:not([data-theme="light"]) ';
      const list = (prefix, stroke) => sel.split(',').map(x => prefix + x).join(',') + '{cursor:' + cur(stroke) + '}';
      let el = document.getElementById('__cursor-accent');
      if (!el) { el = document.createElement('style'); el.id = '__cursor-accent'; document.head.appendChild(el); }
      el.textContent = list('', '384358') + '\n' +
        '@media (prefers-color-scheme: dark){' + list(auto, 'c9d2e0') + '}\n' +
        list(dark, 'c9d2e0');
    },

    /* --- projects --------------------------------------------------------- */

    buildList() {
      const host = root.querySelector('[data-list]');
      host.innerHTML = '';
      PROJECTS.forEach((p, i) => {
        const row = document.createElement('button');
        row.type = 'button';
        row.setAttribute('data-row', String(i));
        row.setAttribute('data-cat', p.cat);
        row.style.cssText = 'appearance:none;width:100%;text-align:left;background:transparent;border:0;border-bottom:1px solid var(--line);border-left:2px solid transparent;padding:14px 18px;display:flex;flex-direction:column;gap:5px;transition:background .3s cubic-bezier(.33,.02,.24,1),border-color .3s cubic-bezier(.33,.02,.24,1);font-family:inherit';
        const top = document.createElement('div');
        top.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:10px';
        const nm = document.createElement('span');
        nm.style.cssText = "font:500 14.5px/1.3 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg)";
        nm.textContent = p.n;
        const yr = document.createElement('span');
        yr.style.cssText = "font:400 11.5px/1 'IBM Plex Mono',ui-monospace,monospace;color:var(--muted);letter-spacing:.02em";
        yr.textContent = p.y;
        top.append(nm, yr);
        const st = document.createElement('div');
        st.style.cssText = "font:400 11.5px/1.5 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)";
        st.textContent = p.stack;
        row.append(top, st);
        const pick = () => app.select(i);
        row.addEventListener('mouseenter', () => {
          if (!app.isCoarse() && (CONFIG.projectDetailOn || 'hover') === 'hover') pick();
        });
        row.addEventListener('focus', pick);
        row.addEventListener('click', pick);
        host.appendChild(row);
      });
      root.querySelector('[data-count]').textContent = String(PROJECTS.length).padStart(2, '0');
      app.select(0);
    },

    select(i) {
      if (state.sel === i && state.selPainted) return;
      state.sel = i;
      state.selPainted = true;
      const p = PROJECTS[i];
      const L = state.lang || 'en';
      root.querySelectorAll('[data-row]').forEach(r => {
        const on = Number(r.getAttribute('data-row')) === i;
        r.style.borderLeftColor = on ? 'var(--accent)' : 'transparent';
        r.style.background = on ? 'var(--bg)' : 'transparent';
        r.setAttribute('aria-current', on ? 'true' : 'false');
      });
      root.querySelector('[data-d-title]').textContent = p.n;
      root.querySelector('[data-d-year]').textContent = p.y;
      root.querySelector('[data-d-desc]').textContent = p.d[L];
      root.querySelector('[data-d-stack]').textContent = p.stack;

      // Only projects with a public URL get the link button.
      const link = root.querySelector('[data-d-link]');
      if (link) {
        if (p.url) { link.href = p.url; link.style.display = 'flex'; }
        else { link.removeAttribute('href'); link.style.display = 'none'; }
      }

      const mh = root.querySelector('[data-d-metrics]');
      mh.innerHTML = '';
      mh.style.display = p.m.length ? 'grid' : 'none';
      p.m.forEach(([v, lab]) => {
        const c = document.createElement('div');
        const a = document.createElement('div');
        a.style.cssText = "font-family:'IBM Plex Mono',ui-monospace,monospace;font-weight:600;font-size:21.5px;letter-spacing:-0.02em;color:var(--fg)";
        a.textContent = v;
        const b = document.createElement('div');
        b.style.cssText = "margin-top:5px;font:400 10.5px/1.3 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)";
        b.textContent = lab[L];
        c.append(a, b);
        mh.appendChild(c);
      });
    },

    paintFilters(cat) {
      root.querySelectorAll('[data-filter]').forEach(b => {
        const on = b.getAttribute('data-filter') === cat;
        b.style.borderColor = on ? 'var(--accent)' : 'var(--line)';
        b.style.color = on ? 'var(--fg)' : 'var(--muted)';
        b.setAttribute('aria-pressed', String(on));
      });
    },

    setFilter(cat) {
      state.cat = cat;
      app.paintFilters(cat);
      let n = 0, first = null;
      root.querySelectorAll('[data-row]').forEach(r => {
        const show = cat === 'all' || r.getAttribute('data-cat') === cat;
        r.style.display = show ? '' : 'none';
        if (show) { n++; if (first === null) first = Number(r.getAttribute('data-row')); }
      });
      root.querySelector('[data-count]').textContent = String(n).padStart(2, '0');
      if (first !== null) { state.selPainted = false; app.select(first); }
    },

    /* --- experience ------------------------------------------------------- */

    renderExp() {
      const host = root.querySelector('[data-exp-body]');
      const btn = root.querySelector('[data-exp-toggle]');
      const L = state.lang === 'vi' ? 'vi' : 'en';
      const layout = CONFIG.expLayout || 'journal';
      host.innerHTML = '';
      host.style.flexDirection = 'row';
      state.expRows = [];
      state.expBullets = [];
      if (btn) btn.style.display = layout === 'detail' ? 'none' : 'flex';

      const bulletRow = (txt, small) => {
        const li = document.createElement('div');
        li.style.cssText = 'display:grid;grid-template-columns:14px 1fr;gap:10px;align-items:baseline';
        const d = document.createElement('span');
        d.style.cssText = "font:400 " + (small ? '10px' : '11px') + "/1.7 'IBM Plex Sans',system-ui,sans-serif;color:var(--accent)";
        d.textContent = '—';
        const t = document.createElement('span');
        t.style.cssText = "font:400 " + (small ? '11.5px' : '12.5px') + "/1.75 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);text-wrap:pretty";
        t.textContent = txt;
        li.append(d, t);
        return li;
      };

      if (layout === 'detail') {
        host.style.display = 'grid';
        host.style.gridTemplateColumns = 'minmax(260px,0.72fr) 1.28fr';
        const rail = document.createElement('div');
        rail.style.cssText = 'border-right:1px solid var(--line);overflow-y:auto;min-height:0';
        const pane = document.createElement('div');
        pane.style.cssText = 'padding:22px 26px;display:flex;flex-direction:column;gap:16px;min-height:0;overflow-y:auto';
        host.append(rail, pane);

        const paint = (i) => {
          state.expSel = i;
          const x = EXP[i];
          rail.querySelectorAll('[data-exp-row]').forEach(r => {
            const on = Number(r.getAttribute('data-exp-row')) === i;
            r.style.borderLeftColor = on ? 'var(--accent)' : 'transparent';
            r.style.background = on ? 'var(--bg)' : 'transparent';
          });
          pane.innerHTML = '';
          const head = document.createElement('div');
          head.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap';
          const ttl = document.createElement('div');
          const rt = document.createElement('div');
          rt.style.cssText = "font-family:'IBM Plex Sans',system-ui,sans-serif;font-weight:700;font-size:29.5px;letter-spacing:-0.02em;color:var(--fg)";
          rt.textContent = x.r[L];
          const cs = document.createElement('div');
          cs.style.cssText = "margin-top:6px;font:400 13.5px/1.5 'IBM Plex Sans',system-ui,sans-serif;color:var(--muted)";
          cs.textContent = x.c + ' · ' + x.loc[L];
          ttl.append(rt, cs);
          const per = document.createElement('div');
          per.style.cssText = "font:400 12.5px/1 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.04em;color:var(--muted)";
          per.textContent = x.p + (x.pn[L] || '');
          head.append(ttl, per);
          const lead = document.createElement('p');
          lead.style.cssText = "margin:0;font:400 14.5px/1.7 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);text-wrap:pretty";
          lead.textContent = x.d[L];
          const bl = document.createElement('div');
          bl.style.cssText = 'display:flex;flex-direction:column;gap:9px';
          x.b.forEach(b => bl.appendChild(bulletRow(b[L])));
          const met = document.createElement('div');
          met.style.cssText = 'display:grid;grid-template-columns:repeat(3,1fr);gap:14px;border-top:1px solid var(--line);padding-top:14px;margin-top:auto';
          x.m.forEach(([v, lab]) => {
            const c = document.createElement('div');
            const a = document.createElement('div');
            a.style.cssText = "font-family:'IBM Plex Mono',ui-monospace,monospace;font-weight:600;font-size:22.5px;letter-spacing:-0.02em;color:var(--fg)";
            a.textContent = v;
            const bq = document.createElement('div');
            bq.style.cssText = "margin-top:5px;font:400 10.5px/1.3 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)";
            bq.textContent = lab[L];
            c.append(a, bq);
            met.appendChild(c);
          });
          const st = document.createElement('div');
          st.style.cssText = "font:400 11.5px/1.6 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)";
          st.textContent = x.s;
          pane.append(head, lead, bl, met, st);
        };

        EXP.forEach((x, i) => {
          const row = document.createElement('button');
          row.type = 'button';
          row.setAttribute('data-exp-row', String(i));
          row.style.cssText = 'appearance:none;width:100%;text-align:left;background:transparent;border:0;border-bottom:1px solid var(--line);border-left:2px solid transparent;padding:16px 20px;display:flex;flex-direction:column;gap:5px;font-family:inherit;transition:background .3s cubic-bezier(.33,.02,.24,1),border-color .3s cubic-bezier(.33,.02,.24,1)';
          const p = document.createElement('span');
          p.style.cssText = "font:400 11.5px/1.4 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.06em;color:var(--muted)";
          p.textContent = x.p + (x.pn[L] || '');
          const r = document.createElement('span');
          r.style.cssText = "font:500 14.5px/1.4 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg)";
          r.textContent = x.r[L];
          const c = document.createElement('span');
          c.style.cssText = "font:400 12.5px/1.5 'IBM Plex Sans',system-ui,sans-serif;color:var(--muted)";
          c.textContent = x.c;
          row.append(p, r, c);
          row.addEventListener('mouseenter', () => paint(i));
          row.addEventListener('focus', () => paint(i));
          row.addEventListener('click', () => paint(i));
          rail.appendChild(row);
        });
        paint(Math.min(state.expSel || 0, EXP.length - 1));
        return;
      }

      if (layout === 'journal') {
        host.style.display = 'flex';
        host.style.flexDirection = 'column';
        EXP.forEach((x, i) => {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;flex-direction:column;gap:10px;flex:0 0 auto;padding:16px 26px;border-left:2px solid transparent;transition:background .3s cubic-bezier(.33,.02,.24,1),border-color .3s cubic-bezier(.33,.02,.24,1)' + (i ? ';border-top:1px solid var(--line)' : '');
          row.addEventListener('mouseenter', () => {
            if (app.isCoarse()) return;
            row.style.background = 'var(--bg)';
            row.style.borderLeftColor = 'var(--accent)';
            if (!state.expAll && row._bl) { row._bl.style.maxHeight = row._bl.scrollHeight + 'px'; row._bl.style.opacity = '1'; }
          });
          row.addEventListener('mouseleave', () => {
            row.style.background = 'transparent';
            row.style.borderLeftColor = 'transparent';
            if (!state.expAll && row._bl) { row._bl.style.maxHeight = '0px'; row._bl.style.opacity = '0'; }
          });
          const head = document.createElement('div');
          head.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:24px;flex-wrap:wrap';
          const left = document.createElement('div');
          const r = document.createElement('span');
          r.style.cssText = "font-family:'IBM Plex Sans',system-ui,sans-serif;font-weight:600;font-size:14.5px;letter-spacing:0;color:var(--fg)";
          r.textContent = x.r[L];
          const c = document.createElement('span');
          c.style.cssText = "display:block;margin-top:4px;font:400 12px/1.5 'IBM Plex Sans',system-ui,sans-serif;color:var(--muted)";
          c.textContent = x.c + ' · ' + x.loc[L];
          left.append(r, c);
          const meta = document.createElement('div');
          meta.style.cssText = 'display:flex;align-items:center;gap:11px;flex:none';
          if (i === 0) {
            const tag = document.createElement('span');
            tag.style.cssText = "border:1px solid var(--accent);border-radius:2px;padding:4px 7px;font:500 10px/1 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:var(--accent)";
            tag.textContent = ui().current;
            meta.appendChild(tag);
          }
          const p = document.createElement('span');
          p.style.cssText = "font:500 13.5px/1.4 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:-0.01em;color:var(--fg);white-space:nowrap";
          p.textContent = (x.p + (x.pn[L] || '')).replace(' — ', '—');
          meta.appendChild(p);
          head.append(left, meta);
          const lead = document.createElement('p');
          lead.style.cssText = "margin:0;font:400 14px/1.7 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);text-wrap:pretty";
          lead.textContent = x.d[L];
          const bl = document.createElement('div');
          bl.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;transition:max-height .36s cubic-bezier(.22,.61,.36,1),opacity .26s ease;opacity:' + (state.expAll ? '1' : '0') + ';max-height:' + (state.expAll ? '600px' : '0px');
          state.expBullets.push(bl);
          row._bl = bl;
          x.b.forEach(b => {
            const li = document.createElement('div');
            li.style.cssText = 'display:grid;grid-template-columns:6px 1fr;gap:13px;align-items:start;padding:10px 0;border-top:1px solid var(--line)';
            const ix = document.createElement('span');
            ix.style.cssText = 'width:6px;height:6px;margin-top:9px;background:var(--accent)';
            const tx = document.createElement('span');
            tx.style.cssText = "font:400 13px/1.7 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);text-wrap:pretty";
            tx.textContent = b[L];
            li.append(ix, tx);
            bl.appendChild(li);
          });
          const foot = document.createElement('div');
          foot.style.cssText = 'display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;padding-top:4px';
          const st = document.createElement('span');
          st.style.cssText = "font:400 10.5px/1.5 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)";
          st.textContent = x.s;
          const met = document.createElement('span');
          met.style.cssText = 'display:flex;gap:22px;flex-wrap:wrap';
          x.m.forEach(([v, lab]) => {
            const cell = document.createElement('span');
            cell.style.cssText = 'display:flex;align-items:baseline;gap:7px';
            const vv = document.createElement('span');
            vv.style.cssText = "font:500 14px/1 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:-0.01em;color:var(--fg)";
            vv.textContent = v;
            const ll = document.createElement('span');
            ll.style.cssText = "font:400 10.5px/1 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)";
            ll.textContent = lab[L];
            cell.append(vv, ll);
            met.appendChild(cell);
          });
          foot.append(st, met);
          row.append(head, lead, bl, foot);
          host.appendChild(row);
        });
        if (state.expAll) requestAnimationFrame(() => state.expBullets.forEach(bl => { bl.style.maxHeight = bl.scrollHeight + 'px'; }));
        app.setExpToggleLabel();
        return;
      }

      // compact — hover / expand-all list
      host.style.display = 'flex';
      host.style.flexDirection = 'column';
      host.style.padding = '4px 24px 12px';
      host.style.boxSizing = 'border-box';
      host.style.justifyContent = 'space-between';
      host.style.overflowY = state.expAll ? 'auto' : 'hidden';
      EXP.forEach((x, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'border-top:1px solid var(--line);padding:16px 0';
        if (i === EXP.length - 1) row.style.borderBottom = '1px solid var(--line)';
        const head = document.createElement('div');
        head.style.cssText = 'display:grid;grid-template-columns:120px 1fr 14px;gap:14px;align-items:baseline';
        const per = document.createElement('span');
        per.style.cssText = "font:400 12.5px/1.4 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.02em;color:var(--muted)";
        per.textContent = x.p + (x.pn[L] || '');
        const mid = document.createElement('span');
        const rr = document.createElement('span');
        rr.style.cssText = "font:500 15.5px/1.4 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg)";
        rr.textContent = x.r[L];
        const cc = document.createElement('span');
        cc.style.cssText = "display:block;margin-top:3px;font:400 13px/1.6 'IBM Plex Sans',system-ui,sans-serif;color:var(--muted)";
        cc.textContent = x.c;
        mid.append(rr, cc);
        const sign = document.createElement('span');
        sign.style.cssText = "font:400 13.5px/1 'IBM Plex Sans',system-ui,sans-serif;color:var(--accent);transition:transform .34s cubic-bezier(.33,.02,.24,1)";
        sign.textContent = '+';
        head.append(per, mid, sign);
        const det = document.createElement('div');
        det.style.cssText = 'max-height:0;opacity:0;overflow:hidden;transition:max-height .26s ease,opacity .34s cubic-bezier(.33,.02,.24,1),margin .26s ease';
        const inner = document.createElement('div');
        inner.style.cssText = 'padding-left:134px;display:flex;flex-direction:column;gap:8px';
        const lead = document.createElement('p');
        lead.style.cssText = "margin:0;font:400 13.5px/1.7 'IBM Plex Sans',system-ui,sans-serif;color:var(--muted);text-wrap:pretty";
        lead.textContent = x.d[L];
        inner.appendChild(lead);
        x.b.forEach(b => inner.appendChild(bulletRow(b[L], true)));
        const ds = document.createElement('div');
        ds.style.cssText = "margin-top:4px;font:400 10.5px/1.5 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);opacity:.8";
        ds.textContent = x.s;
        inner.appendChild(ds);
        det.appendChild(inner);
        row.append(head, det);
        const open = () => { det.style.maxHeight = '320px'; det.style.opacity = '1'; det.style.marginTop = '12px'; sign.style.transform = 'rotate(45deg)'; };
        const close = () => { det.style.maxHeight = '0'; det.style.opacity = '0'; det.style.marginTop = '0'; sign.style.transform = 'none'; };
        state.expRows.push({ open, close });
        row.addEventListener('mouseenter', () => { if (!state.expAll) open(); });
        row.addEventListener('mouseleave', () => { if (!state.expAll) close(); });
        if (state.expAll) open();
        host.appendChild(row);
      });
      app.setExpToggleLabel();
    },

    toggleExpAll() {
      state.expAll = !state.expAll;
      if (state.expBullets && state.expBullets.length) {
        state.expBullets.forEach(bl => {
          const h = bl.scrollHeight;
          if (state.expAll) {
            bl.style.maxHeight = h + 'px';
            bl.style.opacity = '1';
          } else {
            bl.style.maxHeight = h + 'px';
            void bl.offsetHeight;
            bl.style.maxHeight = '0px';
            bl.style.opacity = '0';
          }
        });
        app.setExpToggleLabel();
        return;
      }
      app.renderExp();
    },

    setExpToggleLabel() {
      const lab = root.querySelector('[data-exp-toggle-label]');
      const arw = root.querySelector('[data-exp-toggle-arrow]');
      if (!lab) return;
      lab.textContent = state.expAll ? ui().expOn : ui().expOff;
      if (arw) arw.textContent = state.expAll ? '↑' : '↓';
      const btn = root.querySelector('[data-exp-toggle]');
      if (btn) {
        btn.style.color = state.expAll ? 'var(--fg)' : 'var(--muted)';
        btn.setAttribute('aria-expanded', String(state.expAll));
      }
    },

    /* --- education & awards ----------------------------------------------- */

    renderCredentials() {
      const host = root.querySelector('[data-edu-list]');
      const L = state.lang === 'vi' ? 'vi' : 'en';
      host.innerHTML = '';
      const cnt = root.querySelector('[data-edu-count]');
      if (cnt) cnt.textContent = String(CREDENTIALS.length).padStart(2, '0');
      // Rows share the panel height instead of leaving a gap at the bottom.
      // flex:1 0 auto grows them but never squashes a title that wraps.
      host.style.display = 'flex';
      host.style.flexDirection = 'column';
      CREDENTIALS.forEach((p, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'flex:1 0 auto;display:grid;grid-template-columns:66px 1fr 58px;gap:16px;align-items:center;padding:14px 22px;border-left:2px solid transparent' + (i ? ';border-top:1px solid var(--line)' : '');
        const d = document.createElement('span');
        d.style.cssText = "font:400 11.5px/1.5 'IBM Plex Mono',ui-monospace,monospace;letter-spacing:.02em;color:var(--muted)";
        d.textContent = p.d;
        const t = document.createElement('span');
        t.style.cssText = "font:500 14px/1.5 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);text-wrap:pretty";
        t.textContent = p.t[L];
        const m = document.createElement('span');
        m.style.cssText = "font:400 10.5px/1.5 'IBM Plex Mono',ui-monospace,monospace;color:var(--accent);text-align:right";
        m.textContent = p.m[L];
        row.append(d, t, m);
        host.appendChild(row);
      });
    },

    /* --- stack ------------------------------------------------------------ */

    renderStack() {
      const host = root.querySelector('[data-stack-body]');
      const L = state.lang === 'vi' ? 'vi' : 'en';
      const style = CONFIG.stackStyle || 'rows';
      host.innerHTML = '';
      const cnt = root.querySelector('[data-stack-count]');
      if (cnt) cnt.textContent = String(STACK.reduce((a, [, it]) => a + it.length, 0)).padStart(2, '0');
      host.style.alignItems = 'stretch';

      if (style === 'matrix') {
        host.style.display = 'grid';
        host.style.gridTemplateColumns = 'repeat(' + STACK.length + ',1fr)';
        STACK.forEach(([cat, items], i) => {
          const col = document.createElement('div');
          col.style.cssText = 'padding:14px 20px;display:flex;flex-direction:column;gap:8px;min-width:0;overflow:hidden' + (i ? ';border-left:1px solid var(--line)' : '');
          const h = document.createElement('div');
          h.style.cssText = "font:500 10.5px/1 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)";
          h.textContent = cat[L];
          col.appendChild(h);
          const list = document.createElement('div');
          list.style.cssText = 'display:flex;flex-direction:column;gap:5px';
          items.forEach(it => {
            const r = document.createElement('span');
            r.style.cssText = "font:400 13.5px/1.35 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg)";
            r.textContent = it;
            list.appendChild(r);
          });
          col.appendChild(list);
          host.appendChild(col);
        });
        return;
      }

      if (style === 'rows') {
        host.style.display = 'flex';
        host.style.flexDirection = 'column';
        STACK.forEach(([cat, items], i) => {
          const r = document.createElement('div');
          r.style.cssText = 'display:grid;grid-template-columns:150px 1fr;gap:20px;align-items:center;padding:9px 22px;flex:1;min-height:0' + (i ? ';border-top:1px solid var(--line)' : '');
          const h = document.createElement('span');
          h.style.cssText = "font:500 10.5px/1.4 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.13em;text-transform:uppercase;color:var(--muted)";
          h.textContent = cat[L];
          const v = document.createElement('span');
          v.style.cssText = "font:400 14px/1.5 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);letter-spacing:.02em";
          v.textContent = items.join('  ·  ');
          r.append(h, v);
          host.appendChild(r);
        });
        return;
      }

      if (style === 'type') {
        host.style.display = 'flex';
        host.style.alignItems = 'center';
        const box = document.createElement('div');
        box.style.cssText = "padding:16px 22px;font-family:'IBM Plex Sans',system-ui,sans-serif;font-weight:700;font-size:23.5px;line-height:1.42;letter-spacing:-0.015em;color:var(--fg);text-wrap:pretty";
        STACK.forEach(([, items]) => items.forEach(it => {
          const sp = document.createElement('span');
          sp.textContent = it;
          box.appendChild(sp);
          const dot = document.createElement('span');
          dot.style.color = 'var(--accent)';
          dot.textContent = '  ·  ';
          box.appendChild(dot);
        }));
        box.lastChild.remove();
        host.appendChild(box);
        return;
      }

      if (style === 'numbered') {
        host.style.display = 'grid';
        host.style.gridTemplateColumns = 'repeat(5,1fr)';
        host.style.gridAutoRows = 'minmax(0,1fr)';
        host.style.gridAutoFlow = 'row';
        host.style.padding = '10px 12px';
        host.style.boxSizing = 'border-box';
        let n = 0;
        STACK.forEach(([, items]) => items.forEach(it => {
          n++;
          const c = document.createElement('div');
          c.style.cssText = 'display:flex;align-items:center;gap:9px;padding:0 10px;min-width:0';
          const ix = document.createElement('span');
          ix.style.cssText = "font:400 10.5px/1 'IBM Plex Mono',ui-monospace,monospace;color:var(--accent);font-variant-numeric:tabular-nums";
          ix.textContent = String(n).padStart(2, '0');
          const nm = document.createElement('span');
          nm.style.cssText = "font:400 13px/1.3 'IBM Plex Sans',system-ui,sans-serif;color:var(--fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis";
          nm.textContent = it;
          c.append(ix, nm);
          host.appendChild(c);
        }));
        return;
      }

      if (style === 'chips') {
        host.style.display = 'flex';
        host.style.alignItems = 'center';
        const wrap = document.createElement('div');
        wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:7px;padding:16px 20px';
        STACK.forEach(([, items]) => items.forEach(it => {
          const c = document.createElement('span');
          c.style.cssText = "border:1px solid var(--line);border-radius:2px;padding:7px 11px;font:400 12.5px/1 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.08em;color:var(--fg)";
          c.textContent = it;
          wrap.appendChild(c);
        }));
        host.appendChild(wrap);
        return;
      }

      // marquee — counter-scrolling rails, two categories per rail
      host.style.display = 'flex';
      host.style.flexDirection = 'column';
      host.style.justifyContent = 'center';
      const all = STACK.map(([, items]) => items);
      const rails = [];
      for (let i = 0; i < all.length; i += 2) rails.push(all[i].concat(all[i + 1] || []));
      rails.forEach((items, i) => {
        const clip = document.createElement('div');
        clip.style.cssText = 'overflow:hidden;padding:9px 0;-webkit-mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent);mask-image:linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)';
        const track = document.createElement('div');
        track.style.cssText = 'display:flex;width:max-content;animation:marq ' + (i % 2 ? 46 : 34) + 's linear infinite' + (i % 2 ? ';animation-direction:reverse' : '');
        for (let k = 0; k < 2; k++) {
          const g = document.createElement('div');
          g.style.cssText = "display:flex;gap:34px;padding:0 17px;font:400 14px/1 'IBM Plex Sans',system-ui,sans-serif;letter-spacing:.06em;color:" + (i % 2 ? 'var(--muted)' : 'var(--fg)') + ';white-space:nowrap';
          items.concat(items).forEach(it => { const sp = document.createElement('span'); sp.textContent = it; g.appendChild(sp); });
          track.appendChild(g);
        }
        clip.appendChild(track);
        host.appendChild(clip);
      });
    },

    /* --- CV --------------------------------------------------------------- */

    /* The CV is a real file. Both controls are plain links to it, so they work
       with JS off; this only adds the preview. The path comes from the link. */
    openCv(opener) {
      const modal = root.querySelector('[data-cv-modal]');
      const href = (opener && opener.getAttribute('href'))
        || root.querySelector('[data-cv-download]').getAttribute('href');
      const frame = root.querySelector('[data-cv-frame]');
      if (frame.getAttribute('src') !== href) frame.setAttribute('src', href);
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      // activeElement can be <body>, so take the opener from the event.
      state.cvOpener = opener || root.querySelector('[data-cv-open]');
      const close = modal.querySelector('[data-cv-close]');
      if (close) close.focus();
    },

    closeCv() {
      const modal = root.querySelector('[data-cv-modal]');
      if (modal.style.display === 'none') return;
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
      if (state.cvOpener && state.cvOpener.focus) state.cvOpener.focus();
      state.cvOpener = null;
    }
  };

  app.init();
})();
