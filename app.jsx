/* global React, ReactDOM */
const { useState, useEffect, useMemo } = React;

/* ──────────────────────────────────────────────────────────────────
   Tweak defaults
   ────────────────────────────────────────────────────────────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "#ff9e1b",
  "density": "default",
  "showTape": true
}/*EDITMODE-END*/;

/* ──────────────────────────────────────────────────────────────────
   Ticker tape
   ────────────────────────────────────────────────────────────────── */
function Tape() {
  const items = window.PORTFOLIO_DATA.tape;
  // duplicate for seamless scroll
  const doubled = [...items, ...items];
  return (
    <div className="tape">
      <div className="tape-inner">
        {doubled.map((t, i) => (
          <span className="tape-item" key={i}>
            <span className="sym">{t.sym}</span>
            <span className={t.dir}>{t.val}</span>
            <span className={t.dir}>
              <span className="arrow">{t.dir === 'up' ? '▲' : t.dir === 'down' ? '▼' : '◆'}</span>{' '}
              {t.chg}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Brand + session
   ────────────────────────────────────────────────────────────────── */
function Topbar({ now }) {
  const d = window.PORTFOLIO_DATA.identity;
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">{d.initials}</div>
        <div className="brand-text">
          <div className="brand-name">{d.name} / Personal</div>
          <div className="brand-sub">{d.coverage}</div>
        </div>
      </div>
      <div className="session-meta">
        <span><span className="live-dot"></span>LIVE</span>
        <span>SESSION · {now}</span>
        <span>{d.location.toUpperCase()}</span>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Nav
   ────────────────────────────────────────────────────────────────── */
const PAGES = [
  { id: 'home',      label: 'Home',      idx: '01' },
  { id: 'about',     label: 'About',     idx: '02' },
  { id: 'portfolio', label: 'Portfolio', idx: '03' },
  { id: 'contact',   label: 'Contact',   idx: '04' },
];

function Nav({ page, setPage }) {
  return (
    <nav className="nav" role="tablist" aria-label="Primary">
      {PAGES.map(p => (
        <button
          key={p.id}
          className={`nav-tab ${page === p.id ? 'active' : ''}`}
          onClick={() => setPage(p.id)}
          role="tab"
          aria-selected={page === p.id}
        >
          <span className="idx">{p.idx}</span>
          <span>{p.label}</span>
        </button>
      ))}
      <div className="nav-spacer" />
      <div className="nav-cmd">
        <span>NAV</span>
        <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd>
      </div>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────────
   HOME PAGE
   ────────────────────────────────────────────────────────────────── */
function HomePage({ setPage }) {
  const d = window.PORTFOLIO_DATA;
  return (
    <div className="page" data-screen-label="01 Home">
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow-row">
            <span className="accent">●</span>
            <span>{d.hero.eyebrow}</span>
            <span className="rule" />
          </div>

          <h1 className="headline">
            {d.hero.headlinePre}{' '}
            <em>{d.hero.headlineEm}</em>
            <br />
            <span className="thin">{d.hero.headlinePost.split('\n')[0]}</span>
            <br />
            <span className="thin">{d.hero.headlinePost.split('\n')[1]}</span>
          </h1>

          <p className="subhead">{d.hero.subhead}</p>

          <div className="rating-strip">
            <span className="rating-pill">● {d.identity.rating}</span>
            <span className="rating-meta">
              MARKET ANALYST · POWER TRADING · <span className="num">TOTALENERGIES</span>
            </span>
          </div>

          <div className="cta-row">
            <a className="btn btn-primary" href="#" onClick={(e) => { e.preventDefault(); setPage('portfolio'); }}>
              View Portfolio <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#" onClick={(e) => { e.preventDefault(); setPage('contact'); }}>
              Get in Touch
            </a>
          </div>

          <div className="cmdline">
            <span className="prompt">$</span>
            <span>type <strong style={{color:'var(--fg-1)'}}>about</strong>, <strong style={{color:'var(--fg-1)'}}>portfolio</strong> or <strong style={{color:'var(--fg-1)'}}>contact</strong></span>
            <span className="cursor"></span>
          </div>
        </div>

        <aside className="hero-right">
          <div className="profile-card">
            <div className="profile-card-head">
              <span>{d.identity.ticker} · PROFILE</span>
              <span className="right"><span /><span /><span /></span>
            </div>
            <div className="profile-photo">
              {d.identity.photo ? (
                <img src={d.identity.photo} alt={d.identity.name} />
              ) : (
                <div className="profile-photo-placeholder">
                  <span className="initials">{d.identity.initials}</span>
                  <span className="hint">[ Drop a photo here ]</span>
                </div>
              )}
            </div>
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-label">Role</div>
                <div className="profile-stat-value" style={{fontSize: '13px'}}>{d.identity.role}</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-label">Firm</div>
                <div className="profile-stat-value" style={{fontSize: '13px'}}>{d.identity.company}</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-label">Focus</div>
                <div className="profile-stat-value" style={{fontSize: '13px'}}>Macro · Power</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-label">Writing</div>
                <div className="profile-stat-value up" style={{fontSize: '13px'}}>Pocket Investo ▲</div>
              </div>
            </div>
            <div className="profile-card-foot">
              <span>Status · Available</span>
              <span>v 2026.1</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>At a glance</h2>
          <span className="id">/ SUMMARY</span>
          <span className="meta">UPDATED 2026</span>
        </div>
        <div className="kpis">
          {d.kpis.map((k, i) => (
            <div className="kpi" key={i}>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-value">{k.value}</div>
              <div className={`kpi-delta ${k.dir}`}>
                {k.dir === 'up' ? '▲ ' : k.dir === 'down' ? '▼ ' : '◆ '}{k.delta}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   ABOUT PAGE
   ────────────────────────────────────────────────────────────────── */
function AboutPage() {
  const d = window.PORTFOLIO_DATA;
  return (
    <div className="page" data-screen-label="02 About">
      <div className="eyebrow-row">
        <span className="accent">02 /</span>
        <span>About · Issuer Profile</span>
        <span className="rule" />
      </div>
      <h1 className="headline" style={{fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 36}}>
        A short note on <em>who</em><br />
        <span className="thin">is behind the ticker.</span>
      </h1>

      <div className="about-grid">
        <div className="about-photo">
          <div className="frame">
            {d.identity.photo ? (
              <img src={d.identity.photo} alt={d.identity.name} />
            ) : (
              <div className="placeholder">{d.identity.initials}</div>
            )}
          </div>
          <div className="caption">
            <span>FIG. 01 · PORTRAIT</span>
            <span>{d.identity.name.toUpperCase()}</span>
          </div>
        </div>

        <div className="about-body">
          <p className="lead">{d.about.lead}</p>
          {d.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}

          <dl className="facts">
            {d.about.facts.map(([k, v], i) => (
              <React.Fragment key={i}>
                <dt>{k}</dt>
                <dd>
                  {Array.isArray(v)
                    ? v.map((t, j) => <span key={j} className="tag">{t}</span>)
                    : v}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   PORTFOLIO PAGE
   ────────────────────────────────────────────────────────────────── */
function PortfolioPage() {
  const items = window.PORTFOLIO_DATA.portfolio;
  return (
    <div className="page" data-screen-label="03 Portfolio">
      <div className="eyebrow-row">
        <span className="accent">03 /</span>
        <span>Portfolio · Selected Holdings</span>
        <span className="rule" />
      </div>
      <h1 className="headline" style={{fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 28}}>
        Things I've <em>built,</em><br />
        <span className="thin">shipped, or written.</span>
      </h1>
      <p className="subhead">
        {items.length} side projects. Click any row to open it. "Ratings" reflect my own conviction, not anyone else's.
      </p>

      <table className="holdings-table">
        <thead>
          <tr>
            <th style={{width: 90}}>Sym</th>
            <th>Project</th>
            <th style={{width: 140}}>Stack</th>
            <th style={{width: 90}}>Rating</th>
            <th className="num" style={{width: 80}}>Year</th>
            <th className="num" style={{width: 90}}>Δ</th>
            <th style={{width: 40}}></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} onClick={() => window.open(it.url, '_blank', 'noopener')}>
              <td><span className="sym">{it.sym}</span></td>
              <td>
                <div className="name">{it.name}</div>
                <div className="desc">{it.desc}</div>
              </td>
              <td style={{color: 'var(--fg-3)'}}>{it.stack}</td>
              <td><span className={`rating ${it.rating}`}>{it.ratingLabel}</span></td>
              <td className="num" style={{color: 'var(--fg-3)'}}>{it.year}</td>
              <td className={`num perf ${it.perfDir}`}>{it.perf}</td>
              <td className="num"><span className="link-arrow">↗</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   CONTACT PAGE
   ────────────────────────────────────────────────────────────────── */
function ContactPage() {
  const d = window.PORTFOLIO_DATA.contact;
  return (
    <div className="page" data-screen-label="04 Contact">
      <div className="eyebrow-row">
        <span className="accent">04 /</span>
        <span>Contact · Open Channels</span>
        <span className="rule" />
      </div>
      <h1 className="headline" style={{fontSize: 'clamp(40px, 6vw, 72px)', marginBottom: 28}}>
        <em>Reach</em> me<br />
        <span className="thin">on any of these.</span>
      </h1>

      <div className="contact-prose">
        <p className="lead">{d.lead}</p>
        <p>{d.note}</p>
      </div>

      <div className="contact-grid">
        {d.channels.map((c, i) => (
          <a className="contact-card" href={c.url} key={i} target={c.url.startsWith('mailto') ? '_self' : '_blank'} rel="noopener">
            <div className="contact-icon">{c.icon}</div>
            <div className="contact-body">
              <div className="contact-label">{c.label}</div>
              <div className="contact-value">{c.value}</div>
            </div>
            <div className="contact-go">↗</div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Tweaks panel
   ────────────────────────────────────────────────────────────────── */
function Tweaks() {
  const { useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle } = window;
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    document.documentElement.dataset.theme = t.theme;
    document.documentElement.dataset.density = t.density;
    // accent override
    document.documentElement.style.setProperty('--action', t.accent);
    // recompute hover from accent
    document.documentElement.style.setProperty('--action-hover', t.accent);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Theme">
        <TweakRadio
          label="Mode"
          value={t.theme}
          onChange={(v) => setTweak('theme', v)}
          options={[
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
          ]}
        />
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)}
          options={['#ff9e1b', '#4ade80', '#60a5fa', '#990f3d']}
        />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio
          label="Density"
          value={t.density}
          onChange={(v) => setTweak('density', v)}
          options={[
            { label: 'Compact', value: 'compact' },
            { label: 'Default', value: 'default' },
            { label: 'Roomy',   value: 'comfortable' },
          ]}
        />
        <TweakToggle
          label="Ticker tape"
          value={t.showTape}
          onChange={(v) => setTweak('showTape', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

/* ──────────────────────────────────────────────────────────────────
   App
   ────────────────────────────────────────────────────────────────── */
function useHashPage() {
  const get = () => {
    const h = (location.hash || '').replace('#', '');
    return PAGES.find(p => p.id === h) ? h : 'home';
  };
  const [page, setPage] = useState(get);
  useEffect(() => {
    const on = () => setPage(get());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  const go = (id) => { location.hash = id; setPage(id); window.scrollTo({top: 0, behavior: 'smooth'}); };
  return [page, go];
}

function App() {
  const [page, setPage] = useHashPage();
  const [now, setNow] = useState(() => formatNow());

  useEffect(() => {
    const i = setInterval(() => setNow(formatNow()), 1000);
    return () => clearInterval(i);
  }, []);

  // keyboard nav 1-4
  useEffect(() => {
    const handler = (e) => {
      if (e.target.matches('input, textarea, [contenteditable]')) return;
      const map = { '1':'home','2':'about','3':'portfolio','4':'contact' };
      if (map[e.key]) { setPage(map[e.key]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setPage]);

  // Read showTape from tweaks (via DOM-attribute hack so we don't re-render entire app)
  const [tapeOn, setTapeOn] = useState(() => TWEAK_DEFAULTS.showTape);
  useEffect(() => {
    const on = (e) => {
      if (e.data?.type === '__edit_mode_set_keys' && 'showTape' in (e.data.edits || {})) {
        setTapeOn(e.data.edits.showTape);
      }
    };
    window.addEventListener('message', on);
    return () => window.removeEventListener('message', on);
  }, []);

  return (
    <>
      {tapeOn && <Tape />}
      <div className="app">
        <Topbar now={now} />
        <Nav page={page} setPage={setPage} />

        {page === 'home'      && <HomePage setPage={setPage} />}
        {page === 'about'     && <AboutPage />}
        {page === 'portfolio' && <PortfolioPage />}
        {page === 'contact'   && <ContactPage />}

        <footer className="footer">
          <div className="col">
            <div>© 2026 {window.PORTFOLIO_DATA.identity.name}</div>
            <div>All rights reserved · v 2026.1</div>
          </div>
          <div className="col">
            <div>Press <strong style={{color:'var(--fg-2)'}}>1 2 3 4</strong> to switch pages</div>
            <div>Click any holding to open it</div>
          </div>
          <p className="disclaimer">
            None of this is investment advice — it's a personal portfolio dressed in market clothes for fun.
          </p>
        </footer>
      </div>
      <Tweaks />
    </>
  );
}

function formatNow() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2,'0');
  const mm = String(d.getMinutes()).padStart(2,'0');
  const ss = String(d.getSeconds()).padStart(2,'0');
  return `${hh}:${mm}:${ss} ET`;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
