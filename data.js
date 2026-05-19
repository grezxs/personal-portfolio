/* ─────────────────────────────────────────────────────────────────
   Portfolio data — Grace Chandra
   ───────────────────────────────────────────────────────────────── */

window.PORTFOLIO_DATA = {
  identity: {
    initials: "GC",
    name: "Grace Chandra",
    role: "Market Analyst · Power Trading",
    company: "TotalEnergies",
    location: "Markets & macro",
    ticker: "GC",
    coverage: "POWER TRADING · QUANT FINANCE · WRITING",
    listed: "2024",
    rating: "OPEN TO CHAT",
    photo: "uploads/profile_photo-1779107122001.png",
  },

  hero: {
    eyebrow: "PERSONAL PORTFOLIO · GRACE CHANDRA",
    headlinePre: "Markets,",
    headlineEm: "macro,",
    headlinePost: "and the occasional\nsensible explanation.",
    subhead:
      "I'm a Market Analyst in Power Trading at TotalEnergies. This is where I keep the side projects, research and writing that sit at the intersection of quantitative finance and plain English.",
  },

  // Light "ticker" — keeps the terminal feel but stops short of fake quotes.
  // Skills, focus areas and the things I'm currently doing.
  tape: [
    { sym: "ROLE",   val: "MKT ANL",   chg: "POWER", dir: "flat" },
    { sym: "FIRM",   val: "TOTALEN",   chg: "—",     dir: "flat" },
    { sym: "WRITE",  val: "POCKET·I",  chg: "LIVE",  dir: "up"   },
    { sym: "MSC",    val: "QUANT·FIN", chg: "—",     dir: "flat" },
    { sym: "BSC",    val: "AM·PB",     chg: "—",     dir: "flat" },
    { sym: "PY",     val: "ADV",       chg: "—",     dir: "flat" },
    { sym: "R",      val: "PROF",      chg: "—",     dir: "flat" },
    { sym: "SQL",    val: "PROF",      chg: "—",     dir: "flat" },
    { sym: "PORTOPT",val: "BL·MBTE",   chg: "+1",    dir: "up"   },
    { sym: "EQUITY", val: "REL·VAL",   chg: "LIVE",  dir: "up"   },
    { sym: "CREDIT", val: "EXP",       chg: "—",     dir: "flat" },
    { sym: "MACRO",  val: "X·ASSET",   chg: "—",     dir: "flat" },
    { sym: "CHAOS",  val: "ORG",       chg: "+1",    dir: "up"   },
    { sym: "BLOOMB", val: "OFF",       chg: "-24/7", dir: "down" },
  ],

  kpis: [
    { label: "Currently",         value: "Power",     delta: "Market Analyst · TotalEnergies", dir: "flat" },
    { label: "Side Projects",     value: "03",        delta: "shipped & live",                 dir: "up"   },
    { label: "Education",         value: "MSc",       delta: "Quantitative Finance",           dir: "flat" },
    { label: "Audience · Pocket Investo", value: "↑", delta: "Instagram · Medium",             dir: "up"   },
  ],

  about: {
    lead:
      "Hey there — welcome to my little corner of finance, markets, and organised chaos.",
    paragraphs: [
      "I'm Grace Chandra, currently working as a Market Analyst in Power Trading at TotalEnergies, where I spend most of my time thinking about markets, risk, macro trends, and trying to understand why prices occasionally decide to ignore logic entirely.",
      "This site is a collection of projects, research and ideas I've explored across quantitative finance, investing, portfolio strategy and market analysis. I've always believed the best way to truly understand something is to explain it simply — which is partly why I created Pocket Investo, a platform where I write and share content aimed at making finance more accessible, less intimidating, and hopefully a little less boring.",
      "Academically, I hold an MSc in Quantitative Finance and a Bachelor of Finance in Asset Management & Private Banking. Along the way I've worked across banking, credit analysis and cross-asset research — experiences that shaped both my technical foundation and how I think about markets today.",
      "Outside of finance, I enjoy building side projects around ideas I'm genuinely passionate about — which is ultimately what motivated this page. For me, side projects are where curiosity, creativity and finance intersect best.",
      "And yes — I firmly believe markets can be discussed without sounding like a Bloomberg terminal 24/7.",
    ],
    facts: [
      ["Currently",   "Market Analyst, Power Trading · TotalEnergies"],
      ["Writing",     "Pocket Investo — macro & multi-asset in plain English"],
      ["Education",   "MSc Quantitative Finance · BSc Asset Management & Private Banking"],
      ["Prior",       "Banking · Credit Analysis · Cross-asset Research"],
      ["Focus",       ["Macro", "Power", "Multi-asset", "Portfolio strategy", "Equity valuation"]],
      ["Stack",       ["Python", "R", "SQL", "Excel"]],
      ["Available",   "Open to research collaborations & conversations"],
    ],
  },

  portfolio: [
    {
      sym: "POCKET·I",
      name: "Pocket Investo",
      desc: "A media platform covering macro and multi-asset investing insights — written to make finance feel accessible, less intimidating, and a little less boring. Lives on Instagram and Medium.",
      stack: "Writing · Instagram · Medium",
      rating: "live",
      ratingLabel: "LIVE",
      year: "2024",
      perf: "ongoing",
      perfDir: "up",
      url: "https://www.instagram.com/pocketinvesto/",
    },
    {
      sym: "BL·MBTE",
      name: "Black–Litterman · Multi-Benchmark Tracking-Error Optimiser",
      desc: "Interactive portfolio-optimisation dashboard combining the Black–Litterman model with multi-benchmark tracking-error constraints. Lets you encode views and see them propagate through the allocation.",
      stack: "Python · Streamlit · HuggingFace",
      rating: "buy",
      ratingLabel: "PROJECT",
      year: "2025",
      perf: "live",
      perfDir: "up",
      url: "https://huggingface.co/spaces/gchandra19/BL-MBTE-Dashboard",
    },
    {
      sym: "EQ·VAL",
      name: "Valuation Dashboard — Equity Relative-Valuation Engine",
      desc: "A relative-valuation engine for single-stock analysis. Pulls peer multiples, computes a fair-value band, and shows where the implied rating sits versus consensus.",
      stack: "React · Vercel · Python API",
      rating: "buy",
      ratingLabel: "PROJECT",
      year: "2025",
      perf: "live",
      perfDir: "up",
      url: "https://stock-rating-analysis.vercel.app/",
    },
  ],

  contact: {
    lead:
      "Open to research collaborations, conversations about markets, and the occasional well-framed question.",
    note:
      "I read everything. Easiest to reach on LinkedIn — for code or longer threads, GitHub or email work too.",
    channels: [
      { label: "LinkedIn",      value: "/in/grace-c-152237333",       icon: "in", url: "https://www.linkedin.com/in/grace-c-152237333/" },
      { label: "GitHub",        value: "github.com/grezxs",           icon: "</>",url: "https://github.com/grezxs" },
      { label: "Email",         value: "gchandra@office-id.net",      icon: "@",  url: "mailto:gchandra@office-id.net" },
      { label: "Pocket Investo · Instagram", value: "@pocketinvesto", icon: "◎",  url: "https://www.instagram.com/pocketinvesto/" },
      { label: "Pocket Investo · Medium",    value: "medium.com/@pocketinvesto", icon: "M", url: "https://medium.com/@pocketinvesto" },
    ],
  },
};
