import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform, useScroll } from "framer-motion";
import {
  ShieldCheck, Lock, Server, Target, Clock, Shield, AlertTriangle, Users,
  Database, Zap, UserCheck, MessageSquare, Filter, Trophy, Play, ChevronDown,
  ChevronRight, Eye, X, Menu, Check, ArrowRight, Activity, TrendingUp,
  BarChart3, Layers, Globe, Terminal, Star, ExternalLink, Calculator, Phone,
  Radar, Crosshair, Cpu, Wifi, Radio, Sparkles, CircleDot, Flame, Award,
  BadgeCheck, Fingerprint, ScanLine, Signal, Webhook
} from "lucide-react";
 
/* ─────────────────────── TYPE INTERFACES ─────────────────────── */
 
const PRICING_TIERS = [
  {
    id: "tier1",
    name: "DEFENSIVE FOUNDATION ENGINE",
    price: "2,500",
    priceNum: 2500,
    subtitle: "For boutiques who need to stop the bleeding.",
    cta: "Deploy Foundation",
    ctaStyle: "ghost",
    totalValue: "9,000",
    features: [
      "Regulatory Intent Scraping Setup ($3,500 value)",
      "B2B Cold Email Infrastructure ($2,500 value)",
      "CRM Alert Webhooks ($2,000 value)",
    ],
    bonuses: ["Direct Writer Teardown Script ($1,000 value)"],
    guarantee: "5 qualified conversations in 30 days or we work free until you do.",
  },
  {
    id: "tier2",
    name: "OFFENSIVE INTERCEPTION PROTOCOL",
    price: "4,500",
    priceNum: 4500,
    subtitle: "Complete founder removal from prospecting.",
    cta: "Launch Sales Floor",
    ctaStyle: "primary",
    popular: true,
    totalValue: "22,200",
    features: [
      "Everything in Defensive Foundation",
      "Dedicated Setter Placement ($4,000 value)",
      "Strict BANT Qualification Filter ($1,500 value)",
      "Omni-Channel Conversational Playbooks ($1,500 value)",
      "AI Proof Asset Generation ($2,000 value)",
      "Executive Sales Dashboarding ($1,500 value)",
    ],
    bonuses: [
      "Direct Writer Teardown Script ($1,000 value)",
      "Lost Quote Reactivation Sequence ($1,500 value)",
      "LinkedIn Profile Inbound Makeover ($1,200 value)",
    ],
    guarantee: "5 qualified conversations in 30 days + setter KPI guarantee with free replacement in 14 days.",
  },
  {
    id: "tier3",
    name: "MARKET DOMINANCE ARCHITECTURE",
    price: "7,500",
    priceNum: 7500,
    subtitle: "For aggressive exit scaling.",
    cta: "Dominate Market",
    ctaStyle: "white",
    totalValue: "37,700",
    features: [
      "Everything in Offensive Interception",
      "Next.js High-Trust Landing Page Build ($3,500 value)",
      "Account-Based Marketing Surround Sound ($3,000 value)",
      "6-Month Lifecycle Nurture Campaigns ($2,500 value)",
      "Competitor Market-Blocker Bypass ($2,000 value)",
    ],
    bonuses: [
      "All previous bonuses included",
      "PE Valuation Growth Roadmap ($2,500 value)",
      "VIP Priority Setter Support ($2,000 value)",
    ],
    guarantee: "All previous guarantees + sub-one-second page load or complete free rebuild.",
  },
];
 
const FAQ_ITEMS = [
  {
    q: "Not another software to learn. I am exhausted by my AMS.",
    a: "Zero Integration Friction. This is a Silent Sales Floor running in the background. You do not log into anything new. You answer qualified calendar notifications in your existing email. Our setter handles every other touchpoint.",
  },
  {
    q: "Internet leads are all recycled garbage.",
    a: "We agree completely. We do not use aggregate lead vendors. We scrape verified federal regulatory filings — ERISA Form 5500, FMCSA bonds, state DOT registrations. This is proprietary intelligence, not a shared list. Zero overlap. Absolute exclusivity.",
  },
  {
    q: "This seems expensive for a boutique agency.",
    a: "Hiring a junior producer costs $60,000+ in salary alone, plus your executive time to train them. They quit in 3 months. We bring the complete technical infrastructure and fully trained human capital for a fraction. One $15,000 account pays for the entire year.",
  },
  {
    q: "How do I know the data is accurate?",
    a: "We scrape public government databases — the same data the Department of Labor, FMCSA, and state DOTs publish. This is verified compliance data, not scraped business directories. Every data point has a federal filing number attached to it.",
  },
  {
    q: "What if my competitors buy this too?",
    a: "They cannot. We operate on a strict 50-mile radius territory lockout. When you secure your territory, your local competitors are permanently blocked. This is a contractual and structural limitation, not a marketing gimmick.",
  },
  {
    q: "I have tried cold email before and it destroyed my reputation.",
    a: "We use dedicated secondary domains to protect your primary agency reputation. All domain warming, DNS records, and inbox rotation are managed by us. Your primary domain is never touched. Your brand stays pristine.",
  },
  {
    q: "How long before I see results?",
    a: "Your scraping infrastructure and email systems go live within 14 days. First qualified conversations typically arrive within 21–30 days of launch. Full pipeline velocity is reached by day 45–60.",
  },
  {
    q: "What happens if the setter does not perform?",
    a: "We guarantee strict response-time KPIs. If our setter fails to meet them in the first 14 days, we replace them at zero cost to you. No questions asked. No delay. We carry the risk, not you.",
  },
];
 
const PROOF_CARDS = [
  { type: "Manufacturing", text: "Intercepted $210K Transportation Account via FMCSA Bond Drop — 64 days before renewal", result: "$25,200 annual commission secured", premium: "$210,000" },
  { type: "Construction", text: "Identified $180K General Liability renewal via DOT registration — 52 days before expiry", result: "Broker-of-record change completed", premium: "$180,000" },
  { type: "Professional Services", text: "ERISA Form 5500 revealed $340K group benefits renewal — 78 days out", result: "Full account capture including workers comp cross-sell", premium: "$340,000" },
  { type: "Transportation", text: "FMCSA bond drop flagged $275K fleet account — carrier change in progress, 71 days to renewal", result: "$33,000 annual commission captured", premium: "$275,000" },
  { type: "Manufacturing", text: "DOT registration spike identified $195K manufacturing GL policy — 58 days before expiry", result: "Account won from incumbent direct writer", premium: "$195,000" },
  { type: "Construction", text: "ERISA filing revealed $420K construction workers comp — fiscal year ending in 66 days", result: "$50,400 annual commission + umbrella cross-sell", premium: "$420,000" },
  { type: "Professional Services", text: "Form 5500 data identified $160K professional liability renewal — 83 days out", result: "CEO meeting booked within 9 days of first contact", premium: "$160,000" },
  { type: "Transportation", text: "FMCSA compliance change triggered $310K fleet coverage review — 45 days to renewal", result: "Broker-of-record letter signed in 22 days", premium: "$310,000" },
];
 
const VALUE_MODULES = [
  { title: "Regulatory Intent Scraping", value: "$3,500/mo", icon: "Database", desc: "Proprietary algorithms monitor ERISA Form 5500, FMCSA bond drops, and state DOT registrations within your exclusive territory. Identifies exact renewal windows 60–90 days before expiry.", internalCost: "$85,000/yr for a data engineer + API licensing" },
  { title: "Cold Email Infrastructure", value: "$2,500/mo", icon: "Zap", desc: "Protected secondary domains, managed DNS records, inbox rotation, and domain warming protocols. Your primary agency domain is never touched.", internalCost: "$45,000/yr for an email operations specialist" },
  { title: "CRM Webhook Automation", value: "$2,000/mo", icon: "Activity", desc: "Custom n8n webhooks trigger hyper-targeted outreach sequences exactly 60 days before each target's renewal date. Fully automated, zero manual intervention.", internalCost: "$60,000/yr for a CRM automation developer" },
  { title: "Dedicated Setter Placement", value: "$4,000/mo", icon: "UserCheck", desc: "A highly trained human appointment setter placed directly inside your CRM and daily operations. Sub-5-minute response times. Omni-channel engagement scripts.", internalCost: "$55,000/yr salary + benefits + training + management time" },
  { title: "BANT Qualification Filter", value: "$1,500/mo", icon: "Filter", desc: "Strict Budget, Authority, Need, Timeline qualification eliminates price-shoppers and administrative assistants. Only verified decision-makers reach your calendar.", internalCost: "$40,000/yr for a trained SDR manager" },
  { title: "Next.js Trust Center Build", value: "$3,500/mo", icon: "Globe", desc: "Sub-one-second loading enterprise landing page designed to convert sophisticated financial officers. Not a WordPress template. A high-trust digital asset.", internalCost: "$120,000/yr for a full-stack developer + designer" },
];
 
const TERMINAL_LINES = [
  { text: "> ESTABLISHING SECURE CONNECTION...", delay: 0 },
  { text: "> AUTHENTICATING REGULATORY ACCESS PROTOCOLS...", delay: 500 },
  { text: "> INITIATING ERISA FORM 5500 SCAN...", delay: 1000 },
  { text: "> QUERYING DOT REGISTRATION DATABASE...", delay: 1500 },
  { text: "> CROSS-REFERENCING FMCSA BOND RECORDS...", delay: 2000 },
  { text: "> ─────────────────────────────────────", delay: 2500 },
  { text: "> MATCH FOUND: APEX LOGISTICS CORP.", delay: 3000 },
  { text: "> EMPLOYEES: 147 | SIC CODE: 4213", delay: 3500 },
  { text: "> CURRENT CARRIER: TRAVELERS COMMERCIAL", delay: 4000 },
  { text: "> RENEWAL WINDOW: 64 DAYS", delay: 4500 },
  { text: "> ESTIMATED ANNUAL PREMIUM: $312,000", delay: 5000 },
  { text: "> COMMISSION POTENTIAL: $37,440/YR", delay: 5500 },
  { text: "> ─────────────────────────────────────", delay: 6000 },
  { text: "> TRIGGERING N8N INTERCEPTION WEBHOOK...", delay: 6500 },
  { text: "> OUTREACH SEQUENCE DEPLOYED: SUCCESS", delay: 7000 },
  { text: "> SETTER NOTIFIED: AWAITING CEO RESPONSE.", delay: 7500 },
  { text: "> ═════════════════════════════════════", delay: 8000 },
  { text: "> SCAN COMPLETE. 1 HIGH-VALUE TARGET ACQUIRED.", delay: 8500 },
];
 
const SCAN_PHASES = [
  "> ESTABLISHING SECURE CONNECTION...",
  "> QUERYING ERISA FORM 5500 DATABASE...",
  "> CROSS-REFERENCING LOCAL BROKER ACTIVITY...",
  "> ANALYZING COMPETITIVE DENSITY...",
];
 
/* ─────────────────────── HELPER COMPONENTS ─────────────────────── */
 
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 100, damping: 20 },
};
 
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } },
};
 
function SectionHeading({ badge, title, subtitle, align = "center" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {badge && (
        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-widest text-xs font-semibold">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-tight text-white max-w-4xl mx-auto">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
 
function GlowIcon({ icon: Icon, color = "cyan" }) {
  const colorMap = {
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    red: "bg-red-500/10 border-red-500/20 text-red-400",
  };
  return (
    <div className={`p-3 rounded-lg border ${colorMap[color]} inline-flex`}>
      <Icon size={22} strokeWidth={1.5} />
    </div>
  );
}
 
function GlassCard({ children, className = "", hover = true }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: "rgba(6,182,212,0.5)" } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
 
function AnimatedNumber({ value, prefix = "$", suffix = "" }) {
  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);
  const [text, setText] = useState(`${prefix}0${suffix}`);
 
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
 
  useEffect(() => {
    const unsubscribe = display.on("change", (v) => setText(v));
    return unsubscribe;
  }, [display]);
 
  return <span className="tabular-nums">{text}</span>;
}
 
/* ─────────────────────── MAIN PAGE COMPONENT ─────────────────────── */
 
export default function InterceptLandingPage() {
  /* ── NAV STATE ── */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
 
  /* ── VSL STATE ── */
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
 
  /* ── DIAGNOSIS TOOL STATE ── */
  const [activePain, setActivePain] = useState("renewal-trap");
 
  const painTabs = [
    {
      id: "renewal-trap",
      label: "DROWNING IN RENEWALS",
      icon: Clock,
      title: "The Administrative Hostage",
      content:
        "80% of your year — October through February — is consumed by manual ACORD forms in Applied Epic. You are acting as a glorified debt collector apologizing for 20% rate hikes you cannot control. By March, your bank account is flush but your pipeline is dead. You start from zero. Again.",
      solution:
        "The system prospects silently while you service existing accounts. You emerge from renewal season with a full calendar of pre-qualified CEO meetings. Zero pipeline anxiety. Zero cold starts.",
    },
    {
      id: "direct-writer",
      label: "DIRECT WRITERS STEALING MY CLIENTS",
      icon: Shield,
      title: "The Legacy Defender",
      content:
        "Nationwide and Travelers are scraping DOT data to poach your best accounts 60 days before renewal with 15% lower quotes. A single $180,000 loss vaporizes a decade of lifetime commissions. They use Market Blocking to prevent you from even getting competitive quotes for your own client.",
      solution:
        "We scrape the same regulatory data and hit their targets first. We build your offensive perimeter before they can deploy their acquisition playbook against your book of business.",
    },
    {
      id: "burned-buyer",
      label: "BURNED BY SHARED LEADS & AI SCAMS",
      icon: AlertTriangle,
      title: "The Tech-Jaded Skeptic",
      content:
        "You bought internet leads sold to 50 agents simultaneously. The AI SDR hallucinated policy coverages and burned your domain reputation. The overseas BPO sold you fake live transfers referencing incorrect business data. 95% of lead vendors are scammers. We agree.",
      solution:
        "We do not buy leads. We execute Intent-Signal Scraping on verified ERISA and DOT public regulatory filings. Absolute exclusivity. Zero shared data. Zero recycled lists. Proprietary intelligence only.",
    },
    {
      id: "networking-ceiling",
      label: "STUCK AT THE NETWORKING CEILING",
      icon: Users,
      title: "The BNI Burnout",
      content:
        "156 hours a year at networking groups. Less than 1 qualified referral per month. 2–3 new accounts per year. You give endless referrals to residential agents and MLM reps but receive nothing of commercial value in return. The math has stopped working.",
      solution:
        "We replace your entire networking strategy with a predictable, automated interception engine. Zero breakfast meetings required. Zero forced pitches. Your calendar fills with targeted CEO conversations instead.",
    },
  ];
 
  /* ── ROI CALCULATOR STATE ── */
  const [premium, setPremium] = useState(150000);
  const [closeRate, setCloseRate] = useState(15);
  const meetingsPerMonth = 5;
  const firstYearCommission = premium * 0.12 * (meetingsPerMonth * (closeRate / 100));
  const lifetimeValue = firstYearCommission * 5;
  const peExitValue = firstYearCommission * 10;
 
  /* ── TERMINAL STATE ── */
  const [terminalLines, setTerminalLines] = useState([]);
  const terminalRef = useRef(null);
  const terminalInViewRef = useRef(null);
  const terminalInView = useInView(terminalInViewRef, { once: true, margin: "-100px" });
  const [terminalStarted, setTerminalStarted] = useState(false);
 
  useEffect(() => {
    if (terminalInView && !terminalStarted) {
      setTerminalStarted(true);
      TERMINAL_LINES.forEach((line, i) => {
        setTimeout(() => {
          setTerminalLines((prev) => [...prev, line.text]);
        }, line.delay);
      });
    }
  }, [terminalInView, terminalStarted]);
 
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);
 
  /* ── TERRITORY SCANNER STATE ── */
  const [zipCode, setZipCode] = useState("");
  const [zipError, setZipError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanPhase, setScanPhase] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
 
  const handleTerritorySubmit = () => {
    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(zipCode)) {
      setZipError("[ERROR]: INVALID TERRITORY DESIGNATION. ENTER 5-DIGIT CODE.");
      setScanComplete(false);
      return;
    }
    setZipError("");
    setIsScanning(true);
    setScanComplete(false);
    setScanPhase(0);
 
    const phases = SCAN_PHASES;
    phases.forEach((_, i) => {
      setTimeout(() => setScanPhase(i), i * 500);
    });
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2000);
  };
 
  /* ── PROOF FILTER STATE ── */
  const [activeFilter, setActiveFilter] = useState("All");
  const proofFilters = ["All", "Manufacturing", "Construction", "Transportation", "Professional Services"];
  const filteredProofs = activeFilter === "All" ? PROOF_CARDS : PROOF_CARDS.filter((c) => c.type === activeFilter);
 
  /* ── VALUE STACK STATE ── */
  const [activeModule, setActiveModule] = useState(null);
  const iconLookup = { Database, Zap, Activity, UserCheck, Filter, Globe };
 
  /* ── FAQ STATE ── */
  const [openFAQ, setOpenFAQ] = useState(null);
 
  /* ── BEFORE/AFTER SLIDER STATE ── */
  const [sliderPos, setSliderPos] = useState(50);
  const sliderContainerRef = useRef(null);
  const isDragging = useRef(false);
 
  const handleSliderMove = useCallback((clientX) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);
 
  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleSliderMove(clientX);
    };
    const onUp = () => { isDragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [handleSliderMove]);
 
  /* ── SECTION 6 SCROLL ANIMATION ── */
  const s6Ref = useRef(null);
  const s6InView = useInView(s6Ref, { once: true, margin: "-100px" });
 
  /* ── PRICING HOVER STATE ── */
  const [hoveredTier, setHoveredTier] = useState(null);
 
  /* ─────────────── DOT GRID PATTERN (CSS BG) ─────────────── */
  const dotBg = {
    backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
    backgroundSize: "24px 24px",
  };
  const dotBg2 = {
    backgroundImage: `radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)`,
    backgroundSize: "32px 32px",
  };
 
  /* ═══════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-black text-white antialiased" style={{ fontFamily: "'Inter', 'Geist Sans', system-ui, sans-serif" }}>
 
      {/* ════════════════════ SECTION 1: GLOBAL COMMAND NAV ════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled ? "bg-black/90 backdrop-blur-xl border-white/5" : "bg-white/[0.02] backdrop-blur-xl border-white/5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <span className="text-white tracking-[0.25em] text-xs sm:text-sm font-bold select-none flex-shrink-0">INTERCEPT ARCHITECTURE</span>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            {[
              { label: "Mechanism", target: "mechanism" },
              { label: "ROI Calculator", target: "roi-calculator" },
              { label: "Proof", target: "proof" },
              { label: "Pricing", target: "pricing" },
            ].map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.target)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="relative text-slate-400 hover:text-cyan-400 text-xs sm:text-sm transition-colors duration-300 hidden sm:block after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#territory"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("territory")?.scrollIntoView({ behavior: "smooth" });
              }}
              animate={{ boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 40px rgba(6,182,212,0.4)", "0 0 20px rgba(6,182,212,0.2)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="px-3 sm:px-5 py-2 rounded-lg border border-cyan-500/50 text-cyan-400 text-xs sm:text-sm font-semibold hover:bg-cyan-500/10 transition-colors whitespace-nowrap"
            >
              <span className="hidden sm:inline">Apply For Territory Lockout</span>
              <span className="sm:hidden">Apply Now</span>
            </motion.a>
          </div>
        </div>
      </nav>
 
      {/* ════════════════════ SECTION 2: HIGH-TRUST HERO ZONE ════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden" style={dotBg}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-0 w-72 h-72 bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-blue-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        {/* Animated grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT: Copy */}
            <motion.div className="lg:col-span-7 text-center lg:text-left" initial="initial" animate="animate" variants={staggerContainer}>
              <motion.div variants={fadeUp}>
                <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-widest text-xs font-semibold">
                  <Radar size={12} className="inline mr-1.5 -mt-0.5" />
                  Commercial Reconnaissance Engine™
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[0.95] text-white">
                Secure $150,000 Commercial Accounts In 60 Days{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 text-transparent bg-clip-text">
                  Without Buying Shared Leads.
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mt-5 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Intent-Signal Scraping uses verified ERISA, FMCSA, and DOT regulatory data to intercept high-premium accounts exactly 60 days before renewal — before your competitors even know they exist.
              </motion.p>
 
              {/* CTAs */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a
                  href="#territory"
                  onClick={(e) => { e.preventDefault(); document.getElementById("territory")?.scrollIntoView({ behavior: "smooth" }); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl bg-cyan-500 text-white font-bold text-base sm:text-lg shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:bg-cyan-400 transition-colors"
                >
                  <ShieldCheck size={20} strokeWidth={1.5} />
                  Check Territory Availability
                  <ArrowRight size={20} strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#roi-calculator"
                  onClick={(e) => { e.preventDefault(); document.getElementById("roi-calculator")?.scrollIntoView({ behavior: "smooth" }); }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/10 text-slate-300 font-semibold text-base hover:bg-white/5 hover:border-white/20 transition-all"
                >
                  <Calculator size={18} strokeWidth={1.5} />
                  Calculate Your ROI
                </motion.a>
              </motion.div>
 
              {/* TRUST ELEMENTS */}
              <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center lg:items-start gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black" style={{ background: `linear-gradient(135deg, hsl(${180 + i * 25}, 60%, 40%), hsl(${200 + i * 25}, 70%, 30%))` }} />
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs sm:text-sm ml-2">Trusted by <span className="text-white font-semibold">200+</span> Elite Commercial Brokers</span>
                </div>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                  {[
                    { icon: ShieldCheck, label: "256-Bit Encrypted" },
                    { icon: Lock, label: "Territory-Locked" },
                    { icon: Server, label: "Enterprise Grade" },
                    { icon: Target, label: "Intent-Verified" },
                  ].map((badge) => (
                    <div key={badge.label} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-500 text-[10px] sm:text-xs">
                      <badge.icon size={12} strokeWidth={1.5} />
                      <span>{badge.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
 
            {/* RIGHT: Founder Image + Data Overlay */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
            >
              <div className="relative w-full max-w-sm sm:max-w-md">
                {/* Glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none" />
                {/* Image container */}
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-15px_rgba(6,182,212,0.3)] bg-gradient-to-b from-slate-900 via-[#0B1120] to-black">
                  <img
                    src="/saad_nobg.png"
                    alt="Saad — Founder, Intercept Architecture"
                    className="w-full h-auto object-cover"
                  />
                  {/* Gradient overlay at bottom for blend */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/60 to-transparent" />
                  {/* Name overlay */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-white font-bold text-sm">Saad</span>
                      <span className="text-slate-400 text-xs">Founder & Chief Architect</span>
                    </div>
                  </div>
                </div>
                {/* Floating data cards around image */}
                <motion.div
                  animate={{ y: [-4, 4, -4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3 -right-3 sm:-right-6 px-3 py-2 rounded-lg bg-slate-900/90 backdrop-blur-sm border border-cyan-500/20 shadow-lg"
                >
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Territories Secured</div>
                  <div className="text-cyan-400 font-mono font-bold text-lg">200+</div>
                </motion.div>
                <motion.div
                  animate={{ y: [4, -4, 4] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-24 -left-3 sm:-left-6 px-3 py-2 rounded-lg bg-slate-900/90 backdrop-blur-sm border border-emerald-500/20 shadow-lg"
                >
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Premium Intercepted</div>
                  <div className="text-emerald-400 font-mono font-bold text-lg">$12M+</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
 
          {/* POWER OF ONE — full width below */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 md:mt-16 max-w-4xl mx-auto"
          >
            <div className="p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm">
              <p className="font-mono text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed text-center">
                <span className="text-cyan-400 font-bold">THE MATH:</span> Our system costs $2,500–$7,500/mo. One commercial account yields $15,000+/yr. You need <span className="text-white font-bold">ONE</span> account to liquidate the entire investment. Everything else is pure profit.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* ════════════════════ VSL SECTION ════════════════════ */}
      <section className="py-16 md:py-24 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 uppercase tracking-widest text-xs font-semibold">
              <Play size={12} className="inline mr-1.5 -mt-0.5" />
              Strategy Breakdown
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter text-white">See The Engine In Action</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div
              onClick={() => setIsVideoPlaying(true)}
              className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:bg-cyan-500/30 transition-colors"
                >
                  <Play size={28} className="text-cyan-400 ml-1" fill="currentColor" />
                </motion.div>
                <motion.span
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-wider uppercase"
                >
                  Watch the 4-Minute Strategy Breakdown
                </motion.span>
              </div>
            </div>
          </div>
        </div>
 
        {/* VSL MODAL */}
        <AnimatePresence>
          {isVideoPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setIsVideoPlaying(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-5xl aspect-video bg-slate-900 rounded-2xl border border-white/10 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-slate-500 text-lg">VSL Video Player — Insert GoHighLevel or Wistia embed here</p>
              </motion.div>
              <button onClick={() => setIsVideoPlaying(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
                <X size={32} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
 
      {/* ════════════════════ SECTION 3: PROBLEM DIAGNOSIS TOOL ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/[0.03] rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-blue-500/[0.03] rounded-full blur-[60px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge="Diagnosis"
            title="Which Operational Nightmare Is Costing You The Most?"
            subtitle="Select your situation below. We have engineered a specific solution for each."
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              {painTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePain(tab.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all border ${
                    activePain === tab.id
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.12] hover:text-white"
                  }`}
                >
                  <tab.icon size={20} strokeWidth={1.5} className="flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold tracking-wide uppercase">{tab.label}</span>
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                {painTabs.filter((t) => t.id === activePain).map((tab) => (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <GlassCard className="p-8 md:p-10" hover={false}>
                      <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">{tab.title}</span>
                      <p className="mt-4 text-slate-300 text-lg leading-relaxed">{tab.content}</p>
                      <div className="mt-8 p-6 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                        <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Our Solution</span>
                        <p className="mt-2 text-slate-300 leading-relaxed">{tab.solution}</p>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 4: THE ENEMY AGITATION ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Threat Assessment"
            title="While You Are Trapped in Renewal Paperwork, Direct Writers Are Stealing Your Best Clients Right Now."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-slate-300 text-lg leading-relaxed">
                Corporate carriers like Nationwide and Travelers are actively scraping your client data right now. They know the exact renewal dates of your top accounts. They approach your clients directly — 60 days before renewal — with quotes 15% lower than yours.
              </p>
              <p className="mt-4 text-slate-300 text-lg leading-relaxed">
                A single lost $180,000 premium account vaporizes $180,000 in lifetime commission earnings. They use Market Blocking: submitting incomplete applications to every carrier just to prevent you from getting a competitive quote for your own client.
              </p>
              <p className="mt-4 text-white font-semibold text-lg">
                This is not hypothetical. This is happening in every market in the country right now. The question is: are you going to keep playing defense, or deploy the same data weapons they use?
              </p>
              {/* Financial Loss Data Card */}
              <div className="mt-8 p-6 rounded-xl bg-red-500/5 border border-red-500/20 font-mono text-sm">
                <div className="text-red-400 font-bold mb-3 uppercase tracking-widest text-xs">Financial Exposure Report</div>
                <div className="space-y-2 text-slate-300">
                  <div><span className="text-red-400">ACCOUNTS AT RISK:</span> Top 20% of your book</div>
                  <div><span className="text-red-400">COMPETITOR STRATEGY:</span> Regulatory data scraping + 15% undercutting</div>
                  <div><span className="text-red-400">FINANCIAL EXPOSURE:</span> $180,000 per lost account in lifetime commission</div>
                  <div><span className="text-red-400">TIMELINE:</span> 60 days before renewal</div>
                  <div><span className="text-red-400">YOUR CURRENT DEFENSE:</span> None.</div>
                </div>
              </div>
            </div>
            {/* Animated Chart */}
            <div className="flex items-center justify-center">
              <GlassCard className="p-8 w-full" hover={false}>
                <div className="text-xs text-red-400 uppercase tracking-widest font-semibold mb-4">Client Retention — Under Direct Writer Assault</div>
                <div className="relative h-64">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
                        <stop offset="100%" stopColor="rgba(239,68,68,0)" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M0,20 C50,22 80,30 120,50 C160,70 200,95 250,120 C300,145 340,165 400,180"
                      fill="none" stroke="#EF4444" strokeWidth="2"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }} transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M0,20 C50,22 80,30 120,50 C160,70 200,95 250,120 C300,145 340,165 400,180 L400,200 L0,200 Z"
                      fill="url(#redGrad)"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
                    />
                    {[
                      { x: 0, y: 20, label: "Year 1" },
                      { x: 120, y: 50, label: "Year 3" },
                      { x: 250, y: 120, label: "Year 5" },
                      { x: 400, y: 180, label: "Year 7" },
                    ].map((point, i) => (
                      <g key={i}>
                        <motion.circle
                          cx={point.x} cy={point.y} r="4" fill="#EF4444"
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.3 }}
                        />
                        <text x={point.x} y={point.y + 18} fill="#94A3B8" fontSize="10" textAnchor="middle">{point.label}</text>
                      </g>
                    ))}
                    <text x="200" y="196" fill="#EF4444" fontSize="11" textAnchor="middle" fontWeight="bold">↓ Projected Book Erosion Without Interception</text>
                  </svg>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 5: BEFORE VS AFTER ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Transformation" title="Drag to Compare: Your Current Reality vs. Your Interception Future" />
          <div
            ref={sliderContainerRef}
            className="relative max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] cursor-ew-resize select-none"
            onMouseDown={(e) => { isDragging.current = true; handleSliderMove(e.clientX); }}
            onTouchStart={(e) => { isDragging.current = true; handleSliderMove(e.touches[0].clientX); }}
          >
            {/* BEFORE SIDE */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 p-6 md:p-10 flex flex-col justify-center">
              <div className="text-red-400 uppercase tracking-widest text-xs font-semibold mb-4">Before — The 80-Hour Hustle</div>
              <div className="space-y-3 font-mono text-xs md:text-sm text-red-300/80 max-w-sm">
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">⚠ ACCOUNT LOST TO DIRECT WRITER</div>
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">⚠ RENEWAL OVERDUE — MANUAL ACORD REQUIRED</div>
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">⚠ BNI BREAKFAST: 0 REFERRALS THIS MONTH</div>
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">⚠ PIPELINE: EMPTY — START FROM ZERO</div>
                <div className="p-2 bg-red-500/10 rounded border border-red-500/20">⚠ 6x EBITDA EXIT MULTIPLE</div>
              </div>
            </div>
            {/* AFTER SIDE */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-900 p-6 md:p-10 flex flex-col justify-center items-end"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              <div className="text-cyan-400 uppercase tracking-widest text-xs font-semibold mb-4 text-right">After — The 13x Multiplier Asset</div>
              <div className="space-y-3 font-mono text-xs md:text-sm text-cyan-300/80 max-w-sm">
                <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20">✓ INTENT SIGNAL CAPTURED: 64 DAYS TO RENEWAL</div>
                <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20">✓ CEO MEETING BOOKED: APEX MANUFACTURING</div>
                <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20">✓ SETTER: BANT QUALIFIED — DECISION MAKER</div>
                <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20">✓ PIPELINE: 15 ACTIVE CONVERSATIONS</div>
                <div className="p-2 bg-cyan-500/10 rounded border border-cyan-500/20">✓ 13x EBITDA EXIT MULTIPLE</div>
              </div>
            </div>
            {/* SLIDER HANDLE */}
            <div className="absolute top-0 bottom-0 w-1 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.6)]" style={{ left: `${sliderPos}%` }}>
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                <ChevronRight size={14} className="-ml-1" /><ChevronRight size={14} className="-ml-3" style={{ transform: "scaleX(-1)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 6: SOLUTION REVEAL ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" ref={s6Ref}>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={s6InView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-tight"
          >
            Stop Playing Defense.{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 text-transparent bg-clip-text">
              Start Intercepting.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={s6InView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Traditional marketing agencies sell you recycled data. We do not generate leads. We intercept intent signals. The Commercial Reconnaissance Engine™ is a proprietary scraping architecture that monitors public regulatory databases to predict exact commercial renewal dates 60–90 days before the policy expires. We identify the exact moment a company with a massive premium budget becomes vulnerable. Then we strike.
          </motion.p>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 7: 3-PHASE MECHANISM ════════════════════ */}
      <section id="mechanism" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="The Mechanism" title="Three Phases. Zero Guesswork. Complete Interception." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database, title: "Phase 1: Extract.", desc: "We deploy scraping algorithms to monitor ERISA Form 5500 filings, FMCSA bond drops, and state DOT registrations exclusively in your territory. This data reveals employee counts, premium budgets, and exact renewal windows 60–90 days out. No shared lists. No recycled data. Proprietary regulatory intelligence." },
              { icon: Zap, title: "Phase 2: Intercept.", desc: "Custom n8n webhooks trigger a hyper-targeted outreach sequence exactly 60 days before the target's renewal. Tailored cold emails from protected secondary domains. Account-Based Marketing ads surrounding the CEO and executive team. We enter the conversation at the exact moment they are worried about rate hikes." },
              { icon: UserCheck, title: "Phase 3: Convert.", desc: "A highly trained human appointment setter is placed directly inside your CRM. They answer replies in under 5 minutes. They run strict BANT qualification. They use omni-channel playbooks to convert cold interest into booked meetings. You only manage the close. Everything else is handled." },
            ].map((card, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-100px" });
              return (
                <motion.div
                  key={i} ref={ref}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.15 }}
                >
                  <GlassCard className="p-8 h-full">
                    <GlowIcon icon={card.icon} />
                    <h3 className="mt-5 text-xl font-bold text-white">{card.title}</h3>
                    <p className="mt-3 text-slate-400 leading-relaxed">{card.desc}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
 
          {/* ANIMATED PIPELINE SVG */}
          <div className="mt-16 max-w-5xl mx-auto overflow-x-auto">
            <div className="min-w-[700px]">
              <svg viewBox="0 0 800 80" className="w-full">
                {["Regulatory Data", "Scraping Algorithm", "n8n Webhook", "Email + ABM", "Setter", "BANT Filter", "Booked Meeting", "You Close"].map((label, i) => {
                  const x = 10 + i * 98;
                  return (
                    <g key={i}>
                      <motion.rect
                        x={x} y="15" width="80" height="30" rx="8"
                        fill="rgba(6,182,212,0.1)" stroke="rgba(6,182,212,0.3)" strokeWidth="1"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                      />
                      <motion.text
                        x={x + 40} y="34" fill="#06B6D4" fontSize="7.5" textAnchor="middle" fontWeight="600"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.1 }}
                      >{label}</motion.text>
                      {i < 7 && (
                        <motion.line
                          x1={x + 82} y1="30" x2={x + 96} y2="30"
                          stroke="#06B6D4" strokeWidth="1" strokeDasharray="4 2"
                          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }} transition={{ delay: i * 0.15 + 0.2 }}
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 8: TERMINAL SIMULATOR ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Live Intelligence" title="We Do Not Guess. We Extract." subtitle="Watch a real-time intent signal scrape in action." />
          <div className="max-w-4xl mx-auto" ref={terminalInViewRef}>
            <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
              <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-slate-500 font-mono">intercept-recon-engine — live scan</span>
              </div>
              <div ref={terminalRef} className="bg-black/80 p-6 h-80 overflow-y-auto font-mono text-xs md:text-sm">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`py-0.5 ${line.includes("MATCH FOUND") || line.includes("SUCCESS") || line.includes("ACQUIRED") ? "text-cyan-400 font-bold" : line.includes("$") || line.includes("COMMISSION") ? "text-emerald-400" : "text-green-400/70"}`}
                  >
                    {line}
                  </motion.div>
                ))}
                {terminalStarted && terminalLines.length < TERMINAL_LINES.length && (
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-green-400">▋</motion.span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 9: ROI CALCULATOR ════════════════════ */}
      <section id="roi-calculator" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="ROI Engine" title="Calculate Your Revenue. Prove It To Yourself." subtitle="Drag the sliders. Watch the numbers. One account changes everything." />
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* INPUTS */}
            <GlassCard className="p-8" hover={false}>
              <div className="space-y-8">
                <div>
                  <label className="text-sm text-slate-400 font-semibold uppercase tracking-wider" htmlFor="premium-slider">Average Commercial Premium</label>
                  <div className="mt-3 text-3xl font-mono font-bold text-white tabular-nums">${premium.toLocaleString()}</div>
                  <input
                    id="premium-slider"
                    type="range" min="50000" max="500000" step="10000" value={premium}
                    onChange={(e) => setPremium(Number(e.target.value))}
                    aria-label="Average Commercial Account Premium"
                    className="w-full mt-3 accent-cyan-500 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>$50K</span><span>$500K</span></div>
                </div>
                <div>
                  <label className="text-sm text-slate-400 font-semibold uppercase tracking-wider" htmlFor="close-slider">Your Estimated Close Rate</label>
                  <div className="mt-3 text-3xl font-mono font-bold text-white tabular-nums">{closeRate}%</div>
                  <input
                    id="close-slider"
                    type="range" min="5" max="40" step="1" value={closeRate}
                    onChange={(e) => setCloseRate(Number(e.target.value))}
                    aria-label="Estimated Close Rate"
                    className="w-full mt-3 accent-cyan-500 h-2 bg-slate-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  />
                  <div className="flex justify-between text-xs text-slate-600 mt-1"><span>5%</span><span>40%</span></div>
                </div>
              </div>
            </GlassCard>
            {/* OUTPUTS */}
            <GlassCard className="p-8" hover={false}>
              <div className="space-y-8">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">First Year Commission</span>
                  <div className="text-4xl md:text-5xl font-mono font-extrabold text-emerald-400 mt-1">
                    <AnimatedNumber value={firstYearCommission} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">5-Year Lifetime Value</span>
                  <div className="text-4xl md:text-5xl font-mono font-extrabold text-cyan-400 mt-1">
                    <AnimatedNumber value={lifetimeValue} />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">PE Exit Valuation Added (10x)</span>
                  <div className="text-4xl md:text-5xl font-mono font-extrabold text-white mt-1">
                    <AnimatedNumber value={peExitValue} />
                  </div>
                </div>
                {/* Bar visual */}
                <div className="flex items-end gap-3 h-24 pt-4">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-emerald-500/30 rounded-t" style={{ height: `${Math.min(100, (firstYearCommission / peExitValue) * 100)}%` }} />
                    <span className="text-[10px] text-slate-500 mt-1">Year 1</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-cyan-500/30 rounded-t" style={{ height: `${Math.min(100, (lifetimeValue / peExitValue) * 100)}%` }} />
                    <span className="text-[10px] text-slate-500 mt-1">5-Year</span>
                  </div>
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-full bg-white/20 rounded-t" style={{ height: "100%" }} />
                    <span className="text-[10px] text-slate-500 mt-1">PE Exit</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
          <div className="mt-8 text-center">
            <p className="font-mono text-sm text-slate-400 max-w-2xl mx-auto">
              Our monthly cost: $2,500–$7,500. Your annual commission from <span className="text-white font-bold">ONE</span> account:{" "}
              <span className="text-emerald-400 font-bold tabular-nums">${Math.round(firstYearCommission).toLocaleString()}</span>.
              You need exactly one closed deal to achieve full ROI. Every subsequent account is pure profit and enterprise equity.
            </p>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 10: OPERATIONAL RELIEF ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Founder Removal" title="You Close. We Handle Everything Else." subtitle="Complete division of labor — from data extraction to booked meeting." />
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              { icon: Database, step: "01", title: "We Scrape", desc: "Our algorithms extract intent signals from ERISA, FMCSA, and DOT databases in your territory." },
              { icon: Zap, step: "02", title: "We Trigger", desc: "N8N webhooks deploy hyper-targeted email sequences and ABM ads 60 days before renewal." },
              { icon: MessageSquare, step: "03", title: "We Engage", desc: "Your dedicated setter answers all replies in under 5 minutes using omni-channel playbooks." },
              { icon: Filter, step: "04", title: "We Qualify", desc: "Strict BANT filter eliminates price-shoppers. Only verified decision-makers reach your calendar." },
              { icon: Trophy, step: "05", title: "You Close", desc: "You walk into a Zoom room with a pre-qualified CEO who is ready to move their book. You do what you do best." },
            ].map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i} ref={ref}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.1 }}
                >
                  <GlassCard className="p-6 flex items-start gap-5">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${i === 4 ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-cyan-500/10 border border-cyan-500/20"}`}>
                        <step.icon size={22} strokeWidth={1.5} className={i === 4 ? "text-emerald-400" : "text-cyan-400"} />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`font-mono text-xs ${i === 4 ? "text-emerald-500" : "text-cyan-500"}`}>{step.step}</span>
                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 11: PE MULTIPLIER ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5" style={dotBg2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Exit Strategy" title="Stop Building a Job. Start Engineering a Multi-Million Dollar Exit." />
          <div className="max-w-3xl mx-auto">
            <p className="text-slate-300 text-lg leading-relaxed">
              Private equity firms are aggressively consolidating the commercial insurance market right now. They are paying unprecedented 10x to 13x EBITDA multiples for agencies with one thing: predictable, algorithmic growth that does not depend on the founder.
            </p>
            <p className="mt-4 text-slate-300 text-lg leading-relaxed">
              Right now, your sales process lives in your head and your inbox. If you stop selling, your agency stops growing. PE firms know this. They will offer you a low 6x multiple and walk away.
            </p>
            <p className="mt-4 text-white text-lg leading-relaxed font-semibold">
              The Commercial Reconnaissance Engine™ changes the equation. Every account our system intercepts adds $15,000+ in documented, recurring revenue to your book. At a 10x multiple, every single intercepted account adds $150,000 to your final exit valuation. Build this for 36 months and you are looking at a 7-figure exit premium you would never achieve with founder-led sales.
            </p>
          </div>
          {/* DATA COMPARISON */}
          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-8 text-center" hover={false}>
              <span className="text-red-400 text-xs uppercase tracking-widest font-semibold">Founder-Dependent</span>
              <div className="mt-3 text-4xl font-mono font-extrabold text-red-400">6x</div>
              <div className="text-slate-500 text-sm mt-1">EBITDA Multiple</div>
              <div className="mt-4 text-2xl font-mono font-bold text-slate-400">$3,000,000</div>
              <div className="text-slate-600 text-xs mt-1">Exit on $500K EBITDA</div>
            </GlassCard>
            <GlassCard className="p-8 text-center border-cyan-500/20" hover={false}>
              <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Algorithmic Growth</span>
              <div className="mt-3 text-4xl font-mono font-extrabold text-cyan-400">13x</div>
              <div className="text-slate-500 text-sm mt-1">EBITDA Multiple</div>
              <div className="mt-4 text-2xl font-mono font-bold text-white">$6,500,000</div>
              <div className="text-slate-600 text-xs mt-1">Exit on $500K EBITDA</div>
            </GlassCard>
            <GlassCard className="p-8 text-center" hover={false}>
              <span className="text-emerald-400 text-xs uppercase tracking-widest font-semibold">Your Delta</span>
              <div className="mt-3 text-4xl font-mono font-extrabold text-emerald-400">+$3.5M</div>
              <div className="text-slate-500 text-sm mt-1">Additional Exit Value</div>
              <div className="mt-4 text-lg font-semibold text-white">36-Month Build</div>
              <div className="text-slate-600 text-xs mt-1">With Interception Engine</div>
            </GlassCard>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 12: PROOF & SOCIAL VALIDATION ════════════════════ */}
      <section id="proof" className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg}>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Verified Results" title="Real Interceptions. Real Commissions. Real Accounts." />
          {/* FILTERS */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {proofFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeFilter === f ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "bg-white/[0.03] text-slate-400 border border-white/[0.06] hover:text-white"}`}
              >
                {f}
              </button>
            ))}
          </div>
          {/* PROOF GRID */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredProofs.map((card, i) => (
                <motion.div
                  key={card.text}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                  <GlassCard className="p-6 h-full flex flex-col">
                    <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">{card.type}</span>
                    <div className="mt-2 text-2xl font-mono font-bold text-white">{card.premium}</div>
                    <p className="mt-3 text-slate-400 text-sm leading-relaxed flex-1">{card.text}</p>
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-emerald-400 text-sm font-semibold">{card.result}</span>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {/* STATS BAR */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: "$12M+", label: "Commercial Premium Intercepted" },
              { num: "200+", label: "Territory Partners" },
              { num: "3,400+", label: "Qualified CEO Conversations" },
              { num: "94%", label: "Partner Retention Rate" },
            ].map((stat, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i} ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-mono font-extrabold text-cyan-400">{stat.num}</div>
                  <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 13: VALUE STACK VISUALIZER ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5" style={dotBg2}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Infrastructure" title="Explore the Technical Infrastructure You Are Acquiring" subtitle="Click any module to see the exact technical specs and replacement cost." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {VALUE_MODULES.map((mod, i) => {
              const IconComp = iconLookup[mod.icon];
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveModule(activeModule === i ? null : i)}
                  whileHover={{ y: -4 }}
                  className={`text-left p-6 rounded-2xl border transition-all ${activeModule === i ? "bg-cyan-500/10 border-cyan-500/30" : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"}`}
                >
                  <GlowIcon icon={IconComp} />
                  <h3 className="mt-4 text-white font-bold">{mod.title}</h3>
                  <div className="mt-1 text-cyan-400 font-mono text-sm font-semibold">{mod.value}</div>
                  <AnimatePresence>
                    {activeModule === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
                        <div className="mt-4 p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                          <span className="text-red-400 text-xs uppercase tracking-widest font-semibold">Internal Replacement Cost</span>
                          <p className="mt-1 text-slate-400 text-sm">{mod.internalCost}</p>
                        </div>
                        <div className="mt-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                          <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Your Cost With Us</span>
                          <p className="mt-1 text-white text-sm font-semibold">Included in your package</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 14: PRICING TIERS ════════════════════ */}
      <section id="pricing" className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg}>
        <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Investment" title="Select Your Infrastructure Level" subtitle="Every tier is backed by performance guarantees. One account pays for the year." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-start">
            {PRICING_TIERS.map((tier, i) => (
              <motion.div
                key={tier.id}
                onHoverStart={() => setHoveredTier(i)}
                onHoverEnd={() => setHoveredTier(null)}
                className={`relative transition-all duration-300 ${tier.popular ? "md:scale-105 z-10" : ""} ${hoveredTier !== null && hoveredTier !== i ? "opacity-60 blur-[0.5px]" : ""}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider z-20">
                    Most Popular
                  </div>
                )}
                <div className={`rounded-2xl p-8 border h-full flex flex-col ${tier.popular ? "bg-white/[0.04] border-cyan-500/40 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] ring-2 ring-cyan-500/30" : "bg-white/[0.02] border-white/[0.08]"}`}>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">{tier.name}</span>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-mono font-extrabold text-white">${tier.price}</span>
                    <span className="text-slate-500 text-sm">/month</span>
                  </div>
                  <p className="mt-2 text-slate-400 text-sm">{tier.subtitle}</p>
                  <div className="mt-2 text-xs text-slate-600">Total value: <span className="text-cyan-400 font-semibold">${tier.totalValue}/mo</span></div>
 
                  <div className="mt-6 space-y-3 flex-1">
                    {tier.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span className="text-slate-300">{f}</span>
                      </div>
                    ))}
                    {tier.bonuses.length > 0 && (
                      <div className="pt-3 border-t border-white/5">
                        <span className="text-xs text-emerald-400 uppercase tracking-widest font-semibold">Bonuses</span>
                        {tier.bonuses.map((b, bi) => (
                          <div key={bi} className="flex items-start gap-2 text-sm mt-2">
                            <Star size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
                            <span className="text-slate-400">{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
 
                  <div className="mt-6 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-400">{tier.guarantee}</span>
                    </div>
                  </div>
 
                  <motion.a
                    href="#territory"
                    onClick={(e) => { e.preventDefault(); document.getElementById("territory")?.scrollIntoView({ behavior: "smooth" }); }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`mt-6 block text-center py-4 rounded-xl font-bold text-sm tracking-wide transition-colors ${
                      tier.ctaStyle === "primary" ? "bg-cyan-500 text-white hover:bg-cyan-400 shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
                      : tier.ctaStyle === "white" ? "bg-white text-black hover:bg-slate-100"
                      : "border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
                    }`}
                  >
                    {/* GoHighLevel calendar link goes here */}
                    {tier.cta}
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-center text-slate-500 text-sm max-w-2xl mx-auto">
            Hiring a junior producer who quits in 3 months costs $25,000+ in sunk salary alone. Our complete enterprise infrastructure costs a fraction — and actually performs.
          </p>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 15: GUARANTEE FORTRESS ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Zero Risk" title="Your Guarantees. Our Commitment. No Exceptions." />
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Performance Guarantee", text: "5 Qualified Conversations in 30 Days or We Work Free Until You Do.", tiers: "All Tiers" },
              { title: "Setter KPI Guarantee", text: "Setter KPI Compliance in 14 Days or Free Replacement. No cost. No delay.", tiers: "Tier 2 & 3" },
              { title: "Technical Guarantee", text: "Sub-1-Second Page Load or Complete Free Rebuild. Core Web Vitals guaranteed.", tiers: "Tier 3" },
            ].map((g, i) => (
              <GlassCard key={i} className="p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                  <ShieldCheck size={24} className="text-emerald-400" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-white font-bold">{g.title}</h3>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">{g.text}</p>
                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-slate-500">{g.tiers}</span>
              </GlassCard>
            ))}
          </div>
          <p className="mt-10 text-center text-slate-400 text-sm max-w-2xl mx-auto">
            Compare this to the risk of doing nothing: direct writers will continue poaching your best accounts. Doing nothing guarantees you lose. Saying yes protects your downside completely.
          </p>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 16: OBJECTION DESTRUCTION ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Logic Filter" title="Your Objections. Our Answers. Zero Ambiguity." />
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} className={`rounded-xl border transition-all ${openFAQ === i ? "border-cyan-500/30 bg-white/[0.02]" : "border-white/[0.06] bg-white/[0.01]"}`}>
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span className="text-white font-semibold pr-4">{item.q}</span>
                  <motion.div animate={{ rotate: openFAQ === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFAQ === i && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      role="region"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5">
                        <p className="text-slate-400 leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 17: FOUNDER'S LETTER ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Image */}
            <motion.div
              className="md:col-span-4 flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-transparent rounded-2xl blur-xl pointer-events-none" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-white/[0.1] shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)] bg-gradient-to-b from-slate-900 to-[#0B1120]">
                  <img
                    src="/saad_nobg.png"
                    alt="Saad — Founder, Intercept Architecture"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <motion.div
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-lg bg-slate-900/90 backdrop-blur-sm border border-emerald-500/20"
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-400 text-xs font-semibold">Available</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            {/* Letter */}
            <motion.div
              className="md:col-span-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
            >
              <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-500 uppercase tracking-widest text-xs font-semibold">
                A Letter From Our Founder
              </span>
              <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-5">
                <p>
                  You spent the last decade building a highly profitable commercial agency from nothing. You know risk better than anyone — it is literally your profession. You know how to close.
                </p>
                <p>
                  But as you look toward the next decade, you face a brutal truth: your sales process lives in your head and your inbox. If you stop selling, your agency stops growing. And the massive carriers are getting better at stealing your clients every quarter.
                </p>
                <p>
                  I built Intercept Architecture to solve the single largest bottleneck in agency growth: founder dependence. We do not sell marketing. We deploy enterprise-grade regulatory intelligence and place elite human capital directly inside your business.
                </p>
                <p className="text-white font-semibold">
                  We transform your agency from a founder-dependent lifestyle business into a predictable, autonomous acquisition machine. The kind of machine private equity firms pay 13x multiples for. You deserve to command that number. Let us build the infrastructure to get you there.
                </p>
                <div className="pt-5 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-gradient-to-b from-slate-800 to-slate-900">
                      <img src="/saad_nobg.png" alt="Saad" className="w-full h-full object-cover object-top" />
                    </div>
                    <div>
                      <div className="text-white font-bold">Saad</div>
                      <div className="text-slate-500 text-sm">Founder, Intercept Architecture</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 18: TECH STACK & SECURITY ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Infrastructure" title="Powered by Enterprise-Grade Infrastructure. No Slow WordPress Sites Allowed." />
          {/* MARQUEE */}
          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
            <div className="flex gap-12 animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, rep) => (
                <div key={rep} className="flex gap-12">
                  {["NEXT.JS", "N8N", "GOHIGHLEVEL", "AWS", "REACT", "TAILWIND CSS", "ERISA DATABASE", "FMCSA API", "DOT REGISTRY", "TYPESCRIPT", "VERCEL"].map((tech) => (
                    <span key={tech} className="text-slate-600 font-mono text-sm uppercase tracking-widest font-semibold">{tech}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* SECURITY BADGES */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: ShieldCheck, label: "256-Bit Encryption" },
              { icon: Lock, label: "SOC 2 Compliant Infrastructure" },
              { icon: Server, label: "AWS Enterprise Hosting" },
              { icon: Eye, label: "Zero Data Sharing" },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] text-slate-400 text-sm">
                <badge.icon size={16} strokeWidth={1.5} />
                <span>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </section>
 
      {/* ════════════════════ SECTION 19: TERRITORY SCANNER ════════════════════ */}
      <section id="territory" className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/[0.03] rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Territory Lockout" title="Check Your Territory Availability." subtitle="Enter your zip code to scan for competitive density and lockout status." />
          <div className="max-w-xl mx-auto">
            <GlassCard className="p-8" hover={false}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => { setZipCode(e.target.value); setZipError(""); setScanComplete(false); }}
                  placeholder="Enter 5-Digit Zip Code"
                  className="flex-1 bg-white/[0.03] border border-white/[0.1] rounded-xl px-5 py-4 text-white font-mono text-lg placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-black"
                  maxLength={10}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTerritorySubmit}
                  disabled={isScanning}
                  className="px-6 py-4 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-400 transition-colors disabled:opacity-50 whitespace-nowrap"
                >
                  {isScanning ? "Scanning..." : "Scan Territory"}
                </motion.button>
              </div>
 
              {zipError && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 font-mono text-sm text-red-400">
                  {zipError}
                </motion.div>
              )}
 
              {isScanning && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 rounded-xl bg-black/40 font-mono text-sm text-green-400/70 space-y-1">
                  {SCAN_PHASES.slice(0, scanPhase + 1).map((phase, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{phase}</motion.div>
                  ))}
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-green-400">▋</motion.span>
                </motion.div>
              )}
 
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-xl border border-red-500/30 bg-red-500/5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={20} className="text-red-400" />
                    <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Territory Alert</span>
                  </div>
                  <div className="font-mono text-sm space-y-2">
                    <div className="text-white">TERRITORY <span className="text-cyan-400">[{zipCode}]</span> IS CURRENTLY <span className="text-emerald-400 font-bold">OPEN</span>.</div>
                    <div className="text-slate-400">Lockout Status: <span className="text-yellow-400">Pending</span></div>
                    <div className="text-red-400">1 Local Competitor Currently in Queue.</div>
                    <div className="text-slate-400">This 50-mile radius will be permanently locked once claimed.</div>
                  </div>
                  <p className="mt-4 text-slate-400 text-sm">Secure this territory before your competitors deploy this infrastructure against you.</p>
 
                  {/* Calendly Embed */}
                  <div className="mt-6 rounded-xl overflow-hidden border border-cyan-500/20">
                    <iframe
                      src={`https://calendly.com/interceptarchitecture/strategy-call?hide_gdpr_banner=1&primary_color=06B6D4`}
                      width="100%"
                      height="650"
                      frameBorder="0"
                      title="Book Strategy Call"
                      className="w-full min-h-[500px] sm:min-h-[600px] md:min-h-[650px] bg-slate-900"
                      style={{ border: 'none' }}
                    />
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 20: 90-DAY ROI BREAKDOWN ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Financial Projection" title="The 90-Day Financial Projection." subtitle="Conservative math. No hype. Tier 2 — Offensive Interception Protocol." />
          <div className="max-w-4xl mx-auto">
            <GlassCard className="p-8 md:p-10" hover={false}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">90-Day Investment</span>
                  <div className="mt-2 text-3xl font-mono font-extrabold text-white">$13,500</div>
                  <div className="text-slate-500 text-sm mt-1">$4,500/mo × 3 months</div>
                  <div className="mt-6">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Pipeline Delivered</span>
                    <div className="mt-2 text-2xl font-mono font-bold text-cyan-400">15 Qualified Conversations</div>
                    <div className="text-slate-500 text-sm mt-1">Guaranteed minimum (5/month)</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Conservative Model (13.3% close)</span>
                    <div className="mt-2 font-mono text-sm text-slate-300">
                      <div>2 accounts closed × $15,000 = <span className="text-emerald-400 font-bold">$30,000 commission</span></div>
                      <div className="mt-1">$30,000 − $13,500 = <span className="text-emerald-400 font-bold">$16,500 net profit</span></div>
                      <div className="mt-1 text-slate-500">+ 240 hours reclaimed from prospecting</div>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                    <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">Target Model (20% close)</span>
                    <div className="mt-2 font-mono text-sm text-slate-300">
                      <div>3 accounts closed × $15,000 = <span className="text-emerald-400 font-bold">$45,000 commission</span></div>
                      <div className="mt-1">$45,000 − $13,500 = <span className="text-emerald-400 font-bold">$31,500 net profit</span></div>
                      <div className="mt-1 text-cyan-400 font-semibold">+ $450,000 added to PE exit valuation</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-white font-semibold text-lg">
                  You are not buying a marketing service. You are acquiring a highly predictable annuity. One account pays for the year. Everything else is pure profit and enterprise equity.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 21: FINAL CTA + CALENDLY ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-tight"
            >
              One Territory. One Broker.{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">First Come, First Served.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-5 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed"
            >
              When you secure your territory, your local competitors are permanently locked out of our infrastructure. If you leave this page today without claiming your zone, our next call is with the broker down the street. One of you will deploy this weapon. The other will become the target.
            </motion.p>
          </div>
 
          {/* Calendly Booking Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <GlassCard className="p-4 sm:p-6" hover={false}>
              <div className="text-center mb-5">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-widest text-xs font-semibold">
                  <Phone size={12} />
                  Book Your Strategy Call
                </span>
              </div>
              {/* Calendly Embed — replace URL with your actual Calendly link */}
              <div className="rounded-xl overflow-hidden border border-white/[0.06]">
                <iframe
                  src="https://calendly.com/interceptarchitecture/strategy-call?hide_gdpr_banner=1&primary_color=06B6D4"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Schedule Strategy Call"
                  className="w-full min-h-[520px] sm:min-h-[600px] md:min-h-[700px] bg-[#0B1120]"
                  style={{ border: 'none' }}
                />
              </div>
            </GlassCard>
          </motion.div>
 
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Lock size={12} />
            <span>Your data is encrypted. Territory lockout is legally binding. 50-mile radius exclusivity guaranteed.</span>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 22: CORPORATE FOOTER ════════════════════ */}
      <footer className="py-10 md:py-12 bg-black border-t border-white/5 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-slate-600 text-sm font-mono">INTERCEPT ARCHITECTURE &copy; 2026.</span>
              {/* WhatsApp in footer */}
              <a
                href="https://wa.me/3165160899"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {["Privacy Protocol", "Terms of Service", "Data Security", "SEC Compliance"].map((link) => (
                <a key={link} href="#" className="text-slate-600 text-xs hover:text-slate-400 transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <p className="mt-8 text-slate-700 text-xs max-w-3xl mx-auto text-center leading-relaxed">
            This platform utilizes public regulatory data under applicable freedom of information laws. We guarantee absolute exclusivity to one agency per 50-mile radius. Once a territory is claimed, we are contractually bound to reject all other local applicants. All commission figures are illustrative projections based on standard industry rates and do not constitute a guarantee of earnings.
          </p>
        </div>
      </footer>
 
      {/* ════════════════════ MOBILE STICKY CTA ════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-900/90 backdrop-blur-lg border-t border-white/10 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href="#territory"
          onClick={(e) => { e.preventDefault(); document.getElementById("territory")?.scrollIntoView({ behavior: "smooth" }); }}
          className="block w-full py-3.5 rounded-xl bg-cyan-500 text-white font-bold text-center text-base shadow-[0_0_30px_-5px_rgba(6,182,212,0.4)]"
        >
          Check Territory Availability
        </a>
      </div>
 
      {/* ════════════════════ WHATSAPP FLOATING ICON ════════════════════ */}
      <motion.a
        href="https://wa.me/3165160899"
        target="_blank"
        rel="noopener noreferrer."
        aria-label="Contact us on WhatsApp."
        className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-[90] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.6)] transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </motion.a>
 
    </div>
  );
}
