import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView, useSpring, useTransform, useScroll } from "framer-motion";
import {
  ShieldCheck, Lock, Server, Target, Clock, Shield, AlertTriangle, Users,
  Database, Zap, UserCheck, MessageSquare, Filter, Trophy, Play, ChevronDown,
  ChevronRight, Eye, X, Check, ArrowRight, Activity, TrendingUp,
  Globe, Star, ExternalLink, Phone, Radar
} from "lucide-react";
 
const FOUNDER_IMG = "https://i.ibb.co/jPw2nsyf/saad-blue-3piece-pic.png";
 
/* ─── CALENDLY URL — Replace this with your actual Calendly link ─── */
const CALENDLY_URL = "https://calendly.com/saadziasaadzia21/30min";
 
/* ─────────────────────── TYPE INTERFACES ─────────────────────── */
 
const PRICING_TIERS = [
  {
    id: "tier1",
    name: "DEFENSIVE FOUNDATION ENGINE",
    price: "2,500",
    priceNum: 2500,
    subtitle: "For boutique commercial brokers exhausted by networking and tired of shared internet leads. You are losing accounts to direct writers and need an immediate defensive perimeter.",
    cta: "Deploy Foundation",
    ctaStyle: "ghost",
    totalValue: "9,000",
    whoFor: "Boutique brokers who need to stop the bleeding.",
    whatItDoes: "Tracks local regulatory data and builds a clean outbound infrastructure. In 30 days, stops your reliance on bad data, establishes a reliable cold email pipeline, and alerts you the moment a target enters its renewal window.",
    features: [
      "Regulatory Intent Scraping Setup ($3,500/mo value) — ERISA Form 5500, DOT registrations, isolates large employee counts and shifting financial bonds",
      "B2B Cold Email Infrastructure ($2,500/mo value) — secondary domains, domain warming, DNS config, inbox rotation, 90%+ inbox placement rate",
      "CRM Alert Webhooks ($2,000/mo value) — n8n webhooks connect scraped data to your CRM, sub-5-minute response alerts",
    ],
    bonuses: ["Direct Writer Teardown Script ($1,000 value) — exact conversational framework to expose direct writer tactics, increases cold response rate by 20%"],
    guarantee: "If you do not secure at least 5 qualified commercial conversations in your first 30 days, we manage the system for free until you do.",
    scarcityTitle: "The 50-Mile Radius Lockout",
    scarcityText: "We rely on finite regulatory data. There are only so many large manufacturing and construction firms renewing in your territory. We cannot mathematically run this architecture for two competing brokers in the same city. It dilutes the data and ruins the conversion rate. When you secure your territory, your local competitors are permanently blocked. If you pass today, our next meeting is with your biggest local competitor.",
    urgencyTitle: "The 60-Day Intent Death Clock",
    urgencyText: "Right now, highly lucrative accounts in your city are actively crossing the 60-day renewal threshold. Every single week you delay, another batch of targeted CEOs enters the direct writer pipeline. You are not delaying a business decision — you are actively forfeiting $15,000 commission checks to your competitors. The intent data is decaying right now.",
    riskTitle: "The Asymmetric Risk Reversal",
    riskText: "You have been burned by the lead generation cartel before. That is why we take the operational risk completely off your shoulders. We put it in writing. If you deploy our infrastructure and do not secure at least 5 qualified conversations in 30 days, we manage the entire system for free until you do. The only actual financial risk you face is leaving this page empty-handed.",
    roi90: { investment: "$7,500", meetings: "15", conservativeClose: "6.6%", conservativeAccounts: "1", conservativeCommission: "$15,000", conservativeProfit: "$7,500", conservativeROI: "100%", conservativeLifetime: "$75,000", conservativeLifetimeROI: "900%", targetClose: "13.3%", targetAccounts: "2", targetCommission: "$30,000", targetProfit: "$22,500", targetROI: "300%", targetLifetime: "$150,000", targetLifetimeROI: "1,900%", hours: null },
    prepay: [
      { period: "3 months", paid: 3, free: 1, delivered: 4, value: "$36,000", payment: "$7,500", save: "$28,500", pct: "79%" },
      { period: "6 months", paid: 6, free: 2, delivered: 8, value: "$72,000", payment: "$15,000", save: "$57,000", pct: "79%" },
      { period: "12 months", paid: 12, free: 4, delivered: 16, value: "$144,000", payment: "$30,000", save: "$114,000", pct: "79%" },
    ],
  },
  {
    id: "tier2",
    name: "OFFENSIVE INTERCEPTION PROTOCOL",
    price: "4,500",
    priceNum: 4500,
    subtitle: "For established agencies managing over $1M in premium, trapped in the renewal season bottleneck. You have capital but zero time to manage a sales pipeline.",
    cta: "Launch Sales Floor",
    ctaStyle: "primary",
    popular: true,
    totalValue: "22,200",
    whoFor: "Agencies with capital but zero time to prospect.",
    whatItDoes: "Completely removes the founder from the prospecting phase. Places a dedicated human setter in your business. You wake up to a calendar full of highly qualified commercial appointments.",
    features: [
      "Everything in Defensive Foundation",
      "Dedicated Setter Placement ($4,000/mo value) — trained professional monitors inbox and CRM full-time, buys back 20 hours/week",
      "Strict BANT Qualification Filter ($1,500/mo value) — Budget, Authority, Need, Timeline verification before any meeting is booked",
      "Omni-Channel Conversational Playbooks ($1,500/mo value) — exact scripts to transition cold replies into booked meetings, +30% conversion rate",
      "AI Proof Asset Generation ($2,000/mo value) — converts past wins into sharp case studies attached to outreach",
      "Executive Sales Dashboarding ($1,500/mo value) — single-screen command center tracking setter metrics, booked calls, and closed revenue",
    ],
    bonuses: [
      "Direct Writer Teardown Script ($1,000 value) — +20% cold response rate",
      "Lost Quote Reactivation Sequence ($1,500 value) — automatically revives dead deals in your AMS",
      "LinkedIn Profile Inbound Makeover ($1,200 value) — turns your profile into a high-converting landing page",
    ],
    guarantee: "5 qualified conversations in 30 days or we work free. Setter KPI compliance in 14 days or free replacement.",
    scarcityTitle: "Strict Human Capacity Limits",
    scarcityText: "We do not sell a generic software subscription. We place a highly trained human being directly into your CRM. Sourcing, vetting, and training B2B setters who understand commercial insurance takes immense resources. We only graduate and place 3 elite setters per month. When those 3 placements are claimed, our doors close until next quarter. If you do not secure your setter today, you will spend your entire renewal season managing your inbox alone.",
    urgencyTitle: "The Junior Producer Fallacy",
    urgencyText: "You hire a junior producer. $60,000 base salary. Payroll taxes, benefits, software licenses. 100 hours of your time training them on commercial risk. Three months later, they fail to generate a single qualified lead. They quit. You lose $25,000+ in sunk costs and a full quarter of your year. Our complete infrastructure costs a fraction of a junior salary — and actually performs.",
    riskTitle: "The Territorial Lockout",
    riskText: "We track finite regulatory intent signals. We refuse to place two setters in the same city to compete against each other — it cannibalizes the data. When you claim your territory, competitors are permanently locked out. If you leave this page without securing your zone, our next call is to your biggest competitor. One of you will deploy a dedicated setter. The other will become the victim.",
    roi90: { investment: "$13,500", meetings: "15", conservativeClose: "13.3%", conservativeAccounts: "2", conservativeCommission: "$30,000", conservativeProfit: "$16,500", conservativeROI: "122%", conservativeLifetime: "$150,000", conservativeLifetimeROI: "1,011%", targetClose: "20%", targetAccounts: "3", targetCommission: "$45,000", targetProfit: "$31,500", targetROI: "233%", targetLifetime: "$225,000", targetLifetimeROI: "1,566%", hours: "240" },
    prepay: [
      { period: "3 months", paid: 3, free: 1, delivered: 4, value: "$88,800", payment: "$13,500", save: "$75,300", pct: "84%" },
      { period: "6 months", paid: 6, free: 2, delivered: 8, value: "$177,600", payment: "$27,000", save: "$150,600", pct: "84%" },
      { period: "12 months", paid: 12, free: 4, delivered: 16, value: "$355,200", payment: "$54,000", save: "$301,200", pct: "84%" },
    ],
  },
  {
    id: "tier3",
    name: "MARKET DOMINANCE ARCHITECTURE",
    price: "7,500",
    priceNum: 7500,
    subtitle: "For aggressive agency owners focused on rapid expansion, capturing regional market share, and maximizing their private equity exit valuation.",
    cta: "Dominate Market",
    ctaStyle: "white",
    totalValue: "37,700",
    whoFor: "Agencies engineering a 7-figure PE exit.",
    whatItDoes: "Deploys every weapon in our arsenal. High-speed Next.js trust centers, stealth ABM ads, long-term nurture systems. You dictate the market, poach at will, and scale your agency valuation exponentially.",
    features: [
      "Everything in Offensive Interception",
      "Next.js High-Trust Landing Page Build ($3,500/mo value) — sub-1-second load, corporate-grade credibility that outclasses every WordPress competitor",
      "Account-Based Marketing Surround Sound ($3,000/mo value) — targeted ads to the exact CEOs you email, creates illusion of massive market authority",
      "6-Month Lifecycle Nurture Campaigns ($2,500/mo value) — captures 80% of revenue lost by agencies who quit following up after 2 weeks",
      "Competitor Market-Blocker Bypass ($2,000/mo value) — ABM + email sequencing hits 90 days out, before competitors can block your market access",
    ],
    bonuses: [
      "All previous bonuses included",
      "PE Valuation Growth Roadmap ($2,500 value) — aligns growth metrics with private equity buyout requirements",
      "VIP Priority Setter Support ($2,000 value) — ongoing top-tier training, continuously improving conversion ratios",
    ],
    guarantee: "All previous guarantees + sub-one-second page load or complete free rebuild.",
    scarcityTitle: "The Two Agency Capacity Limit",
    scarcityText: "Building a custom Next.js trust center, deploying ABM, and training a dedicated setter requires massive internal resources. We strictly accept only 2 new agency partners per quarter. Once those 2 slots are filled, our doors firmly close. We completely refuse to compromise build quality. If you hesitate today, you will wait at least 4 months to access this infrastructure.",
    urgencyTitle: "The Private Equity Market Window",
    urgencyText: "Right now, PE firms are aggressively consolidating the commercial insurance market, paying unprecedented multiples for algorithmic growth. But financial windows close. Every month you operate without this dashboard is a month of verifiable data you cannot present to a buyer. You are actively bleeding millions in future exit valuation by waiting.",
    riskTitle: "The Premium Infrastructure Reality",
    riskText: "Cheap agencies use recycled lists and offshore labor. They burn your email reputation. We build custom-coded enterprise assets — senior developers writing precise scraping algorithms, dedicated setters generating PE-level reporting. You are not paying a high price for marketing. You are buying guaranteed market dominance at a severe discount.",
    roi90: { investment: "$22,500", meetings: "20", conservativeClose: "15%", conservativeAccounts: "3", conservativeCommission: "$45,000", conservativeProfit: "$22,500", conservativeROI: "100%", conservativeLifetime: "$225,000", conservativeLifetimeROI: null, targetClose: "25%", targetAccounts: "5", targetCommission: "$75,000", targetProfit: "$52,500", targetROI: "233%", targetLifetime: "$375,000", targetLifetimeROI: null, hours: "240", conservativePE: "$450,000", targetPE: "$750,000" },
    prepay: [
      { period: "3 months", paid: 3, free: 1, delivered: 4, value: "$150,800", payment: "$22,500", save: "$128,300", pct: "85%" },
      { period: "6 months", paid: 6, free: 2, delivered: 8, value: "$301,600", payment: "$45,000", save: "$256,600", pct: "85%" },
      { period: "12 months", paid: 12, free: 4, delivered: 16, value: "$603,200", payment: "$90,000", save: "$513,200", pct: "85%" },
    ],
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
 
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 z-[101] origin-left"
      style={{ scaleX }}
    />
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
  /* ── VIDEO STATE (removed — using HTML5 video now) ── */
 
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
  const [showCalendly, setShowCalendly] = useState(false);
 
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
    <div className="min-h-screen bg-black text-white antialiased selection:bg-cyan-500/20 selection:text-cyan-200" style={{ fontFamily: "'Inter', 'Geist Sans', system-ui, sans-serif" }}>
 
      {/* ════════════════════ SCROLL PROGRESS BAR ════════════════════ */}
      <ScrollProgress />
 
      {/* ════════════════════ SECTION 1: GLOBAL COMMAND NAV ════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${scrolled ? "bg-black/90 backdrop-blur-xl border-white/5" : "bg-white/[0.02] backdrop-blur-xl border-white/5"}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
          <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-white tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.25em] text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold select-none flex-shrink-0 cursor-pointer hover:text-cyan-400 transition-colors duration-300">INTERCEPT ARCHITECTURE</a>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              { label: "Mechanism", target: "mechanism" },
              { label: "ROI", target: "roi-calculator" },
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
                className="relative text-slate-400 hover:text-cyan-400 text-[10px] sm:text-xs md:text-sm transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              animate={{ boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 40px rgba(6,182,212,0.4)", "0 0 20px rgba(6,182,212,0.2)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="px-2 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-lg border border-cyan-500/50 text-cyan-400 text-[10px] sm:text-xs md:text-sm font-semibold hover:bg-cyan-500/10 transition-colors whitespace-nowrap"
            >
              <span className="hidden md:inline">Apply For Territory Lockout</span>
              <span className="md:hidden">Apply</span>
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
        {/* Floating animated data nodes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { x: "10%", y: "20%", size: 4, delay: 0, dur: 6 },
            { x: "85%", y: "15%", size: 3, delay: 1, dur: 7 },
            { x: "70%", y: "70%", size: 5, delay: 2, dur: 5 },
            { x: "15%", y: "75%", size: 3, delay: 0.5, dur: 8 },
            { x: "50%", y: "10%", size: 4, delay: 1.5, dur: 6 },
            { x: "90%", y: "50%", size: 3, delay: 3, dur: 7 },
            { x: "30%", y: "85%", size: 4, delay: 2.5, dur: 5 },
            { x: "60%", y: "40%", size: 3, delay: 0.8, dur: 9 },
          ].map((node, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-cyan-400"
              style={{ left: node.x, top: node.y, width: node.size, height: node.size }}
              animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 0.5], y: [0, -30, 0] }}
              transition={{ duration: node.dur, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
            />
          ))}
          {/* Animated connection lines between nodes */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
            <motion.line x1="10%" y1="20%" x2="50%" y2="10%" stroke="#06B6D4" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 0 }} />
            <motion.line x1="85%" y1="15%" x2="70%" y2="70%" stroke="#06B6D4" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
            <motion.line x1="15%" y1="75%" x2="60%" y2="40%" stroke="#06B6D4" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 2 }} />
          </svg>
        </div>
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div className="text-center max-w-4xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
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
              <motion.p variants={fadeUp} className="mt-6 text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Intent-Signal Scraping uses verified ERISA, FMCSA, and DOT regulatory data to intercept high-premium accounts exactly 60 days before renewal — before your competitors even know they exist.
              </motion.p>
 
              {/* STRATEGY BREAKDOWN VIDEO */}
              <motion.div variants={fadeUp} className="mt-12 max-w-4xl mx-auto">
                <div className="text-center mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 uppercase tracking-widest text-xs font-semibold">
                    <Play size={12} className="inline" />
                    Strategy Breakdown
                  </span>
                  <h3 className="mt-3 text-xl sm:text-2xl font-bold text-white">See Why 200+ Brokers Chose This Weapon</h3>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-20px_rgba(6,182,212,0.15)]">
                  <div className="bg-slate-900/50 px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                    </div>
                    <span className="text-slate-600 font-mono text-xs hidden sm:block">strategy-breakdown.mp4</span>
                  </div>
                  <video
                    controls
                    preload="metadata"
                    className="w-full aspect-video bg-black"
                    poster=""
                  >
                    <source src="/Architecting_the_Silent_Sales_Floor.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </motion.div>
 
              {/* CTA */}
              <motion.div variants={fadeUp} className="mt-10">
                <motion.a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:bg-cyan-400 transition-colors"
                >
                  <ShieldCheck size={20} strokeWidth={1.5} />
                  Book Your Strategy Call
                  <ArrowRight size={20} strokeWidth={1.5} />
                </motion.a>
              </motion.div>
 
              {/* TRUST ELEMENTS */}
              <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-black" style={{ background: `linear-gradient(135deg, hsl(${180 + i * 25}, 60%, 40%), hsl(${200 + i * 25}, 70%, 30%))` }} />
                    ))}
                  </div>
                  <span className="text-slate-400 text-xs sm:text-sm ml-2">Trusted by <span className="text-white font-semibold">200+</span> Elite Commercial Brokers</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
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
                  <svg viewBox="0 0 440 220" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                    <defs>
                      <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgba(239,68,68,0.3)" />
                        <stop offset="100%" stopColor="rgba(239,68,68,0)" />
                      </linearGradient>
                    </defs>
                    <motion.path
                      d="M30,25 C70,28 100,38 150,58 C190,78 230,100 280,128 C320,150 360,168 410,182"
                      fill="none" stroke="#EF4444" strokeWidth="2.5"
                      initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }} transition={{ duration: 2, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M30,25 C70,28 100,38 150,58 C190,78 230,100 280,128 C320,150 360,168 410,182 L410,205 L30,205 Z"
                      fill="url(#redGrad)"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ duration: 1, delay: 1 }}
                    />
                    {[
                      { x: 30, y: 25, label: "Year 1" },
                      { x: 150, y: 58, label: "Year 3" },
                      { x: 280, y: 128, label: "Year 5" },
                      { x: 410, y: 182, label: "Year 7" },
                    ].map((point, i) => (
                      <g key={i}>
                        <motion.circle
                          cx={point.x} cy={point.y} r="5" fill="#EF4444"
                          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.3 }}
                        />
                        <text x={point.x} y={point.y + 20} fill="#94A3B8" fontSize="11" textAnchor="middle" fontWeight="500">{point.label}</text>
                      </g>
                    ))}
                    <text x="220" y="215" fill="#EF4444" fontSize="10" textAnchor="middle" fontWeight="bold">↓ Projected Book Erosion Without Interception</text>
                  </svg>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 5: BEFORE VS AFTER ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-red-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Transformation" title="Drag to Compare: Your Current Reality vs. Your Interception Future" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            <div
              ref={sliderContainerRef}
              className="relative max-w-5xl mx-auto aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.08] cursor-ew-resize select-none shadow-[0_0_80px_-20px_rgba(6,182,212,0.1)]"
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
          </motion.div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 6: SOLUTION REVEAL ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg}>
        {/* Animated radar background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-[500px] h-[500px] opacity-[0.06]">
            <circle cx="200" cy="200" r="60" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            <circle cx="200" cy="200" r="180" fill="none" stroke="#06B6D4" strokeWidth="0.5" />
            <line x1="200" y1="20" x2="200" y2="380" stroke="#06B6D4" strokeWidth="0.3" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#06B6D4" strokeWidth="0.3" />
            <motion.line
              x1="200" y1="200" x2="200" y2="20"
              stroke="#06B6D4" strokeWidth="1.5"
              style={{ transformOrigin: "200px 200px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle cx="260" cy="140" r="4" fill="#06B6D4"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.circle cx="140" cy="260" r="3" fill="#10B981"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
            />
            <motion.circle cx="300" cy="220" r="5" fill="#06B6D4"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 2 }}
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10" ref={s6Ref}>
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
      <section id="mechanism" className="py-28 md:py-36 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg2}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/[0.015] rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/[0.01] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="The Mechanism" title="Three Phases. Zero Guesswork. Complete Interception." />
 
          {/* Bento Box Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-6xl mx-auto">
            {/* Phase 1 — Large card spanning 7 cols */}
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <div className="group relative h-full rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/[0.06] via-[#0a0f1c] to-[#050505] border border-cyan-500/[0.12] transition-all duration-500 hover:border-cyan-500/25 hover:shadow-[0_0_60px_-20px_rgba(6,182,212,0.2)]">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <GlowIcon icon={Database} />
                    <div>
                      <span className="text-cyan-400/60 text-[10px] uppercase tracking-[0.3em] font-bold">Phase 01</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Extract.</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
                    We deploy scraping algorithms to monitor ERISA Form 5500 filings, FMCSA bond drops, and state DOT registrations exclusively in your territory. This data reveals employee counts, premium budgets, and exact renewal windows 60–90 days out.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {["ERISA Form 5500", "FMCSA Bonds", "DOT Registrations", "Workers' Comp Mods"].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-cyan-500/[0.06] border border-cyan-500/[0.1] text-cyan-400/80 text-[10px] uppercase tracking-widest font-semibold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
 
            {/* Phase 2 — Tall card spanning 5 cols */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
            >
              <div className="group relative h-full rounded-3xl overflow-hidden bg-gradient-to-b from-white/[0.03] via-[#080c15] to-[#050505] border border-white/[0.06] transition-all duration-500 hover:border-cyan-500/20 hover:shadow-[0_0_50px_-20px_rgba(6,182,212,0.15)]">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                <div className="p-8 sm:p-10">
                  <div className="flex items-center gap-4 mb-6">
                    <GlowIcon icon={Zap} />
                    <div>
                      <span className="text-slate-500 text-[10px] uppercase tracking-[0.3em] font-bold">Phase 02</span>
                      <h3 className="text-2xl font-extrabold text-white tracking-tight">Intercept.</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Custom n8n webhooks trigger a hyper-targeted outreach sequence exactly 60 days before the target's renewal. Tailored cold emails from protected secondary domains. ABM ads surrounding the CEO and executive team. We enter the conversation at the exact moment they are worried about rate hikes.
                  </p>
                  <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[10px] text-slate-600 uppercase tracking-[0.2em] font-bold mb-2">Trigger Window</div>
                    <div className="text-3xl font-mono font-black text-cyan-400">60 <span className="text-lg text-slate-500 font-normal">days before renewal</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
 
            {/* Phase 3 — Full-width card */}
            <motion.div
              className="md:col-span-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.3 }}
            >
              <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-500/[0.04] via-[#080c15] to-cyan-500/[0.04] border border-white/[0.06] transition-all duration-500 hover:border-emerald-500/20 hover:shadow-[0_0_60px_-20px_rgba(16,185,129,0.15)]">
                <div className="h-[1px] w-full bg-gradient-to-r from-emerald-400/30 via-transparent to-cyan-400/30" />
                <div className="p-8 sm:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8">
                      <div className="flex items-center gap-4 mb-5">
                        <GlowIcon icon={UserCheck} color="emerald" />
                        <div>
                          <span className="text-emerald-400/60 text-[10px] uppercase tracking-[0.3em] font-bold">Phase 03</span>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Convert.</h3>
                        </div>
                      </div>
                      <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                        A highly trained human appointment setter is placed directly inside your CRM. They answer replies in under 5 minutes. They run strict BANT qualification. They use omni-channel playbooks to convert cold interest into booked meetings. You only manage the close. Everything else is handled.
                      </p>
                    </div>
                    <div className="md:col-span-4 flex flex-col gap-3">
                      {[
                        { label: "Response Time", value: "< 5 min", color: "text-emerald-400" },
                        { label: "Qualification", value: "BANT Verified", color: "text-cyan-400" },
                        { label: "Your Role", value: "Close Only", color: "text-white" },
                      ].map((stat) => (
                        <div key={stat.label} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:bg-white/[0.04]">
                          <div className="text-[9px] text-slate-600 uppercase tracking-[0.25em] font-bold">{stat.label}</div>
                          <div className={`text-lg font-mono font-bold ${stat.color} mt-0.5`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
 
          {/* ANIMATED PIPELINE SVG */}
          <div className="mt-20 max-w-5xl mx-auto overflow-x-auto">
            <div className="min-w-[700px]">
              <svg viewBox="0 0 800 80" className="w-full">
                {["Regulatory Data", "Scraping Algorithm", "n8n Webhook", "Email + ABM", "Setter", "BANT Filter", "Booked Meeting", "You Close"].map((label, i) => {
                  const x = 10 + i * 98;
                  return (
                    <g key={i}>
                      <motion.rect
                        x={x} y="15" width="80" height="30" rx="10"
                        fill="rgba(6,182,212,0.06)" stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                      />
                      <motion.text
                        x={x + 40} y="34" fill="#06B6D4" fontSize="7" textAnchor="middle" fontWeight="600" opacity="0.8"
                        initial={{ opacity: 0 }} whileInView={{ opacity: 0.8 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.12 + 0.1 }}
                      >{label}</motion.text>
                      {i < 7 && (
                        <g>
                          <motion.line
                            x1={x + 82} y1="30" x2={x + 96} y2="30"
                            stroke="rgba(6,182,212,0.2)" strokeWidth="0.5"
                            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.12 + 0.2 }}
                          />
                          <motion.circle
                            r="1.5" fill="#06B6D4"
                            animate={{ cx: [x + 82, x + 96], opacity: [0, 0.6, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "linear" }}
                            cy="30"
                          />
                        </g>
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
      <section className="py-28 md:py-36 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="Founder Removal" title="You Close. We Handle Everything Else." subtitle="Five synchronized phases. Zero manual intervention. Complete operational liberation." />
          <div className="max-w-4xl mx-auto">
            {/* Connected timeline */}
            {[
              { icon: Database, step: "01", title: "We Scrape", desc: "Our algorithms extract intent signals from ERISA, FMCSA, and DOT databases exclusively within your territory. Employee counts, premium budgets, and exact fiscal year cycles — delivered 60–90 days before renewal.", color: "cyan" },
              { icon: Zap, step: "02", title: "We Trigger", desc: "Custom n8n webhooks deploy hyper-targeted email sequences from protected secondary domains and ABM ads surrounding the CEO and executive team — precisely 60 days before the renewal window opens.", color: "cyan" },
              { icon: MessageSquare, step: "03", title: "We Engage", desc: "Your dedicated setter answers all replies in under 5 minutes using omni-channel conversational playbooks. Every cold reply is transitioned into a genuine business conversation.", color: "cyan" },
              { icon: Filter, step: "04", title: "We Qualify", desc: "Strict BANT qualification filter eliminates price-shoppers and administrative assistants. Budget, Authority, Need, Timeline — verified before any meeting touches your calendar.", color: "cyan" },
              { icon: Trophy, step: "05", title: "You Close", desc: "You walk into a Zoom room with a pre-qualified CEO who is ready to move their book of business. You do what you do best. Everything else has already been handled.", color: "emerald" },
            ].map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              const isLast = i === 4;
              return (
                <div key={i} className="relative">
                  {/* Vertical connector line */}
                  {i < 4 && (
                    <div className="absolute left-[27px] top-[72px] w-px h-4 bg-gradient-to-b from-cyan-500/30 to-transparent hidden sm:block" />
                  )}
                  <motion.div
                    ref={ref}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ type: "spring", stiffness: 100, damping: 20, delay: i * 0.12 }}
                    className="mb-4"
                  >
                    <div className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-500 group hover:border-${isLast ? 'emerald' : 'cyan'}-500/30 ${
                      isLast
                        ? "bg-gradient-to-r from-emerald-500/[0.04] via-emerald-500/[0.02] to-transparent border-emerald-500/10"
                        : "bg-white/[0.015] border-white/[0.06]"
                    }`}>
                      {/* Top shine */}
                      <div className={`absolute top-0 left-0 right-0 h-px ${isLast ? "bg-gradient-to-r from-emerald-500/30 via-emerald-400/10 to-transparent" : "bg-gradient-to-r from-white/[0.06] via-white/[0.02] to-transparent"}`} />
 
                      <div className="flex items-start gap-4 sm:gap-6">
                        {/* Step number + icon */}
                        <div className="flex-shrink-0 relative">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                            isLast
                              ? "bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]"
                              : "bg-cyan-500/10 border border-cyan-500/20 group-hover:shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                          } transition-shadow`}>
                            <step.icon size={22} strokeWidth={1.5} className={isLast ? "text-emerald-400" : "text-cyan-400"} />
                          </div>
                          <span className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-mono font-black ${
                            isLast ? "bg-emerald-500 text-white" : "bg-slate-800 text-cyan-400 border border-cyan-500/30"
                          }`}>{step.step}</span>
                        </div>
 
                        {/* Content */}
                        <div className="flex-1">
                          <h3 className={`text-lg sm:text-xl font-bold ${isLast ? "text-emerald-400" : "text-white"}`}>{step.title}</h3>
                          <p className="mt-1.5 text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
 
                        {/* Arrow indicator */}
                        {!isLast && (
                          <div className="hidden sm:flex items-center">
                            <ChevronDown size={18} className="text-cyan-500/30" />
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
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
              {/* Animated bar */}
              <div className="mt-4 h-24 flex items-end justify-center">
                <motion.div className="w-16 bg-gradient-to-t from-red-500/30 to-red-500/10 rounded-t-lg border border-red-500/20"
                  initial={{ height: 0 }} whileInView={{ height: "46%" }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
            </GlassCard>
            <GlassCard className="p-8 text-center border-cyan-500/20" hover={false}>
              <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Algorithmic Growth</span>
              <div className="mt-3 text-4xl font-mono font-extrabold text-cyan-400">13x</div>
              <div className="text-slate-500 text-sm mt-1">EBITDA Multiple</div>
              <div className="mt-4 text-2xl font-mono font-bold text-white">$6,500,000</div>
              <div className="text-slate-600 text-xs mt-1">Exit on $500K EBITDA</div>
              {/* Animated bar */}
              <div className="mt-4 h-24 flex items-end justify-center">
                <motion.div className="w-16 bg-gradient-to-t from-cyan-500/40 to-cyan-500/10 rounded-t-lg border border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)]"
                  initial={{ height: 0 }} whileInView={{ height: "100%" }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4 }}
                />
              </div>
            </GlassCard>
            <GlassCard className="p-8 text-center" hover={false}>
              <span className="text-emerald-400 text-xs uppercase tracking-widest font-semibold">Your Delta</span>
              <div className="mt-3 text-4xl font-mono font-extrabold text-emerald-400">+$3.5M</div>
              <div className="text-slate-500 text-sm mt-1">Additional Exit Value</div>
              <div className="mt-4 text-lg font-semibold text-white">36-Month Build</div>
              <div className="text-slate-600 text-xs mt-1">With Interception Engine</div>
              {/* Animated arrow */}
              <div className="mt-4 h-24 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <TrendingUp size={48} className="text-emerald-400" strokeWidth={1.5} />
                </motion.div>
              </div>
            </GlassCard>
          </div>
 
          {/* Animated timeline visualization */}
          <div className="mt-12 max-w-3xl mx-auto">
            <GlassCard className="p-6" hover={false}>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-semibold text-center mb-4">36-Month Valuation Growth Projection</div>
              <div className="relative h-32">
                <svg viewBox="0 0 500 120" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                  {/* Grid lines */}
                  {[0, 1, 2, 3].map((i) => (
                    <line key={i} x1="40" y1={20 + i * 30} x2="480" y2={20 + i * 30} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  ))}
                  {/* Y axis labels */}
                  <text x="5" y="25" fill="#64748B" fontSize="8">$6.5M</text>
                  <text x="5" y="55" fill="#64748B" fontSize="8">$5.0M</text>
                  <text x="5" y="85" fill="#64748B" fontSize="8">$3.5M</text>
                  <text x="5" y="110" fill="#64748B" fontSize="8">$3.0M</text>
                  {/* Founder-dependent flat line */}
                  <motion.line x1="40" y1="110" x2="480" y2="105" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 4"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
                  />
                  <text x="400" y="100" fill="#EF4444" fontSize="8">6x (Founder-Led)</text>
                  {/* Algorithmic growth curve */}
                  <motion.path d="M40,110 C120,105 200,80 280,55 C360,30 420,22 480,18" fill="none" stroke="#06B6D4" strokeWidth="2.5"
                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5 }}
                  />
                  {/* Glow area under curve */}
                  <motion.path d="M40,110 C120,105 200,80 280,55 C360,30 420,22 480,18 L480,110 L40,110 Z"
                    fill="url(#cyanGradPE)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.5 }}
                  />
                  <defs>
                    <linearGradient id="cyanGradPE" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(6,182,212,0.2)" />
                      <stop offset="100%" stopColor="rgba(6,182,212,0)" />
                    </linearGradient>
                  </defs>
                  <text x="400" y="35" fill="#06B6D4" fontSize="8" fontWeight="bold">13x (Algorithmic)</text>
                  {/* X axis labels */}
                  <text x="40" y="118" fill="#64748B" fontSize="7">Month 0</text>
                  <text x="170" y="118" fill="#64748B" fontSize="7">Month 12</text>
                  <text x="310" y="118" fill="#64748B" fontSize="7">Month 24</text>
                  <text x="445" y="118" fill="#64748B" fontSize="7">Month 36</text>
                </svg>
              </div>
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
              { num: "$12M+", label: "Commercial Premium Intercepted", barPct: 85 },
              { num: "200+", label: "Territory Partners", barPct: 65 },
              { num: "3,400+", label: "Qualified CEO Conversations", barPct: 92 },
              { num: "94%", label: "Partner Retention Rate", barPct: 94 },
            ].map((stat, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={i} ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-mono font-extrabold text-cyan-400">{stat.num}</div>
                  <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                  {/* Animated progress bar */}
                  <div className="mt-3 h-1 bg-white/5 rounded-full overflow-hidden mx-auto max-w-[120px]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${stat.barPct}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                    />
                  </div>
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
      <section id="pricing" className="py-28 md:py-36 bg-black border-t border-white/5 relative overflow-hidden">
        {/* Premium background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cyan-500/[0.02] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/[0.015] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-emerald-500/[0.01] rounded-full blur-[100px]" />
        </div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
 
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <span className="inline-block mb-5 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-[0.2em] text-xs font-bold">
              Select Your Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-white leading-tight">
              Deploy Your Acquisition<br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 text-transparent bg-clip-text">Architecture.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">One account pays for the year. Everything after is compounding profit and enterprise equity.</p>
          </motion.div>
 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-[1200px] mx-auto items-stretch">
            {PRICING_TIERS.map((tier, i) => {
              const isPopular = tier.popular;
              const isWhite = tier.ctaStyle === "white";
              return (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  onHoverStart={() => setHoveredTier(i)}
                  onHoverEnd={() => setHoveredTier(null)}
                  className={`relative group transition-all duration-500 ${isPopular ? "lg:-mt-6 lg:mb-0 z-10" : ""} ${hoveredTier !== null && hoveredTier !== i ? "opacity-50 scale-[0.98]" : ""}`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]"
                      >
                        Most Popular
                      </motion.div>
                    </div>
                  )}
 
                  {/* Card */}
                  <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-500 ${
                    isPopular
                      ? "bg-gradient-to-b from-cyan-500/[0.08] via-slate-900/80 to-slate-950 border-2 border-cyan-500/30 shadow-[0_0_80px_-20px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_100px_-15px_rgba(6,182,212,0.5)]"
                      : isWhite
                        ? "bg-gradient-to-b from-white/[0.04] via-slate-900/60 to-slate-950 border border-white/[0.1] group-hover:border-white/20"
                        : "bg-gradient-to-b from-white/[0.02] via-slate-950 to-black border border-white/[0.06] group-hover:border-cyan-500/20"
                  }`}>
                    {/* Top shine line */}
                    <div className={`h-[1px] w-full ${isPopular ? "bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" : "bg-gradient-to-r from-transparent via-white/10 to-transparent"}`} />
 
                    <div className="p-7 sm:p-8 flex flex-col h-full">
                      {/* Tier header */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-2 h-2 rounded-full ${isPopular ? "bg-cyan-400" : isWhite ? "bg-white" : "bg-slate-500"}`} />
                          <span className={`text-[10px] uppercase tracking-[0.25em] font-bold ${isPopular ? "text-cyan-400" : "text-slate-500"}`}>{tier.name}</span>
                        </div>
 
                        {/* Price */}
                        <div className="flex items-end gap-1.5">
                          <span className="text-slate-500 text-lg font-light mt-auto">$</span>
                          <span className={`text-5xl sm:text-6xl font-mono font-black tracking-tighter leading-none ${isPopular ? "text-white" : "text-slate-200"}`}>{tier.price}</span>
                          <span className="text-slate-600 text-sm mb-1.5 font-light">/mo</span>
                        </div>
 
                        <p className="mt-3 text-slate-400 text-xs sm:text-sm leading-relaxed">{tier.subtitle}</p>
 
                        {/* Value badge */}
                        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
                          <span className="text-emerald-400 font-mono text-xs font-bold">${tier.totalValue}/mo value</span>
                        </div>
                      </div>
 
                      {/* Divider */}
                      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />
 
                      {/* Features */}
                      <div className="space-y-3 flex-1">
                        {tier.features.map((f, fi) => (
                          <div key={fi} className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${isPopular ? "bg-cyan-500/15" : "bg-white/[0.04]"}`}>
                              <Check size={11} className={isPopular ? "text-cyan-400" : "text-slate-400"} strokeWidth={2.5} />
                            </div>
                            <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">{f}</span>
                          </div>
                        ))}
                      </div>
 
                      {/* Bonuses */}
                      {tier.bonuses.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                          <div className="flex items-center gap-2 mb-3">
                            <Star size={12} className="text-emerald-400" />
                            <span className="text-[10px] text-emerald-400 uppercase tracking-[0.2em] font-bold">Included Bonuses</span>
                          </div>
                          {tier.bonuses.map((b, bi) => (
                            <div key={bi} className="flex items-start gap-2.5 text-xs mt-2">
                              <div className="w-1 h-1 rounded-full bg-emerald-400/60 mt-1.5 flex-shrink-0" />
                              <span className="text-slate-500">{b}</span>
                            </div>
                          ))}
                        </div>
                      )}
 
                      {/* Guarantee */}
                      <div className="mt-5 p-3.5 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10">
                        <div className="flex items-start gap-2.5">
                          <ShieldCheck size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-[11px] text-slate-400 leading-relaxed">{tier.guarantee}</span>
                        </div>
                      </div>
 
                      {/* Scarcity */}
                      <div className="mt-4 p-3.5 rounded-xl bg-red-500/[0.02] border border-red-500/[0.08]">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-red-400/80 text-[9px] uppercase tracking-[0.2em] font-bold">{tier.scarcityTitle}</span>
                        </div>
                        <p className="text-slate-600 text-[10px] leading-relaxed">{tier.scarcityText}</p>
                      </div>
 
                      {/* CTA */}
                      <motion.a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`mt-6 block text-center py-4 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 ${
                          isPopular
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:shadow-[0_0_60px_-10px_rgba(6,182,212,0.7)]"
                            : isWhite
                              ? "bg-white text-black hover:bg-slate-100 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]"
                              : "border border-white/10 text-slate-300 hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/[0.03]"
                        }`}
                      >
                        {tier.cta}
                        <ArrowRight size={16} className="inline ml-2 -mt-0.5" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
 
          {/* Price anchoring */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.05]">
              <AlertTriangle size={14} className="text-yellow-400/60" />
              <span className="text-slate-500 text-xs sm:text-sm">
                Hiring a junior producer who quits in 3 months costs <span className="text-white font-semibold">$25,000+</span> in sunk salary. Replicating Tier 3 internally: <span className="text-white font-semibold">$300,000+/yr</span> in payroll.
              </span>
            </div>
          </motion.div>
 
          {/* Prepay Savings */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <span className="inline-block mb-3 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-[0.2em] text-xs font-bold">Prepay & Save</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">Lock In Your Rate. Unlock Bonus Months.</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {PRICING_TIERS.map((tier, ti) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ti * 0.1 }}
                  className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5 hover:border-cyan-500/20 transition-all"
                >
                  <div className="text-[10px] text-cyan-400 uppercase tracking-[0.2em] font-bold mb-4">{tier.name}</div>
                  <div className="space-y-2.5">
                    {tier.prepay.map((row, ri) => (
                      <div key={ri} className="p-3 rounded-xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-white text-xs font-bold">{row.period}</span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold">{row.pct} OFF</span>
                        </div>
                        <div className="text-[10px] text-slate-500 space-y-0.5">
                          <div>Pay {row.paid} → Get <span className="text-cyan-400 font-semibold">{row.free} free</span> ({row.delivered} months total)</div>
                          <div className="text-emerald-400/80 font-semibold">You save {row.save}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 15: GUARANTEE FORTRESS ════════════════════ */}
      <section className="py-28 md:py-36 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[150px]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block mb-5 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 uppercase tracking-[0.2em] text-xs font-bold">
              Iron-Clad Protection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
              We Carry the Risk.<br />
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 text-transparent bg-clip-text">You Carry the Profit.</span>
            </h2>
          </motion.div>
 
          {/* Single premium guarantee card */}
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden"
            >
              {/* Border gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent p-[1px]">
                <div className="w-full h-full rounded-3xl bg-slate-950" />
              </div>
 
              <div className="relative p-8 sm:p-10 md:p-12">
                {/* Centered shield icon */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center"
                    whileInView={{ scale: [0.8, 1.05, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <ShieldCheck size={36} className="text-emerald-400" strokeWidth={1.5} />
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-emerald-400/20"
                      animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </motion.div>
                </div>
 
                {/* 3 guarantees in a premium grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { num: "01", title: "Performance Guarantee", text: "5 Qualified Conversations in 30 Days — or we manage the entire system for free until you do. No excuses. No asterisks.", tiers: "All Tiers", color: "from-emerald-500/10 to-emerald-500/5", border: "border-emerald-500/15", accent: "text-emerald-400" },
                    { num: "02", title: "Setter KPI Guarantee", text: "Our placed setter meets strict response-time KPIs within 14 days — or we replace them at zero cost to you. Immediate. No delay.", tiers: "Tier 2 & 3", color: "from-cyan-500/10 to-cyan-500/5", border: "border-cyan-500/15", accent: "text-cyan-400" },
                    { num: "03", title: "Technical Guarantee", text: "Sub-one-second page load time passing Core Web Vitals — or we rebuild the entire landing page for free. Performance is non-negotiable.", tiers: "Tier 3", color: "from-blue-500/10 to-blue-500/5", border: "border-blue-500/15", accent: "text-blue-400" },
                  ].map((g, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.15 }}
                      className={`relative p-6 rounded-2xl bg-gradient-to-b ${g.color} border ${g.border} group hover:border-opacity-40 transition-all duration-500`}
                    >
                      <div className={`font-mono text-3xl font-black ${g.accent} opacity-20 absolute top-4 right-5`}>{g.num}</div>
                      <h3 className="text-white font-bold text-base mb-3">{g.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{g.text}</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${g.accent.replace('text-', 'bg-')}`} />
                        <span className="text-slate-600 text-[10px] uppercase tracking-widest font-semibold">{g.tiers}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
 
                {/* Bottom risk comparison */}
                <div className="mt-10 pt-8 border-t border-white/5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-red-500/[0.03] border border-red-500/[0.08]">
                      <div className="flex items-center gap-2 mb-3">
                        <X size={16} className="text-red-400" />
                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Risk of Doing Nothing</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">Direct writers continue poaching your best accounts. Your pipeline stays empty after every renewal season. Your agency valuation stagnates at 6x. Doing nothing guarantees you lose.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/[0.08]">
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck size={16} className="text-emerald-400" />
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Risk of Saying Yes</span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed">Your downside is completely protected by written guarantees. If we fail to deliver, we work for free. The only actual financial risk is leaving this page empty-handed.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 16: OBJECTION DESTRUCTION ════════════════════ */}
      <section className="py-28 md:py-36 bg-black border-t border-white/5 relative overflow-hidden" style={dotBg}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/[0.02] rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="inline-block mb-5 px-5 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 uppercase tracking-[0.2em] text-xs font-bold">
              Intelligence Briefing
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter text-white leading-tight">
              Every Objection.<br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 text-transparent bg-clip-text">Destroyed With Data.</span>
            </h2>
          </motion.div>
 
          <div className="max-w-3xl mx-auto space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group rounded-2xl border transition-all duration-500 overflow-hidden ${
                  openFAQ === i
                    ? "border-cyan-500/30 bg-gradient-to-r from-cyan-500/[0.04] via-transparent to-transparent shadow-[0_0_40px_-15px_rgba(6,182,212,0.15)]"
                    : "border-white/[0.06] bg-white/[0.01] hover:border-white/[0.1]"
                }`}
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  aria-expanded={openFAQ === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  {/* Number */}
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold transition-colors ${
                    openFAQ === i ? "bg-cyan-500/20 text-cyan-400" : "bg-white/[0.03] text-slate-600"
                  }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <span className={`font-semibold text-sm sm:text-base flex-1 pr-2 transition-colors ${openFAQ === i ? "text-white" : "text-slate-300"}`}>{item.q}</span>
                  <motion.div
                    animate={{ rotate: openFAQ === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      openFAQ === i ? "bg-cyan-500/15" : "bg-white/[0.03]"
                    }`}
                  >
                    <ChevronDown size={16} className={openFAQ === i ? "text-cyan-400" : "text-slate-500"} />
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
                      <div className="px-6 pb-6 pl-[4.5rem]">
                        <div className="h-px bg-gradient-to-r from-cyan-500/20 via-cyan-500/5 to-transparent mb-4" />
                        <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ════════════════════ ABOUT THE FOUNDER — Saad Zia ════════════════════ */}
      <section className="py-24 md:py-32 bg-slate-950 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading badge="The Architect" title="Your Competitors Hire Agencies. You Deploy an Architect." />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Image */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
            >
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent rounded-3xl blur-2xl pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_-20px_rgba(6,182,212,0.2)]">
                  <img
                    src="https://i.ibb.co/jPw2nsyf/saad-blue-3piece-pic.png"
                    alt="Saad Zia — Revenue Architect & Founder"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-white font-bold text-sm">Saad Zia</span>
                        </div>
                        <span className="text-slate-400 text-xs">Revenue Architect & Founder</span>
                      </div>
                      <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                        <span className="text-cyan-400 font-mono text-xs font-bold">$12M+ Intercepted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
 
            {/* Copy */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.15 }}
            >
              <div className="space-y-5 text-slate-300 text-base sm:text-lg leading-relaxed">
                <p>
                  Marketing agencies learn your industry from a pitch deck. <span className="text-white font-semibold">Saad Zia learned it from the data layer.</span> He built the Commercial Reconnaissance Engine™ at the intersection of three disciplines no agency combines: regulatory data scraping, enterprise automation, and high-ticket B2B conversion architecture.
                </p>
                <p>
                  He codes the scraping algorithms that monitor ERISA Form 5500 filings and FMCSA bond drops. He architects the n8n webhooks that trigger interception sequences exactly 60 days before renewal. He engineers the BANT qualification scripts and Direct Writer Teardown frameworks that convert Level-5 cynical buyers — the same brokers who have already been burned by every lead vendor on the market.
                </p>
                <p className="text-white font-semibold">
                  The result: a single intelligence architecture that intercepts $150,000+ commercial accounts before your competitors know the renewal window opened. Not outsourced tactics. Not recycled lists. One system. One architect. $180,000 in lifetime commission — protected.
                </p>
              </div>
 
              {/* Capabilities */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "ERISA & DOT Scraping",
                  "n8n Webhook Architecture",
                  "Next.js Trust Centers",
                  "BANT Qualification Design",
                  "Market Blocking Countermeasures",
                  "PE Exit Positioning",
                ].map((skill, si) => (
                  <motion.div
                    key={si}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + si * 0.05 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
 
              {/* CTA */}
              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-cyan-500 text-white font-bold text-sm shadow-[0_0_30px_-8px_rgba(6,182,212,0.4)] hover:bg-cyan-400 transition-all duration-300"
                >
                  <Phone size={16} />
                  Book a 1-on-1 Strategy Call
                  <ArrowRight size={16} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/saadzia2199"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, borderColor: "rgba(10,102,194,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-300 text-sm font-semibold hover:bg-[#0A66C2]/10 hover:text-white transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" className="fill-[#0A66C2] group-hover:fill-[#3b8de0] transition-colors duration-300">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Connect on LinkedIn
                </motion.a>
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
            ].map((badge, bi) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: bi * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(6,182,212,0.3)" }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] text-slate-400 text-sm transition-all cursor-default"
              >
                <badge.icon size={16} strokeWidth={1.5} />
                <span>{badge.label}</span>
              </motion.div>
            ))}
          </div>
 
          {/* Animated data flow architecture diagram */}
          <div className="mt-12 max-w-3xl mx-auto">
            <GlassCard className="p-6" hover={false}>
              <div className="text-xs text-cyan-400 uppercase tracking-widest font-semibold text-center mb-4">Architecture Data Flow</div>
              <svg viewBox="0 0 600 160" className="w-full" preserveAspectRatio="xMidYMid meet">
                {[
                  { x: 20, label: "ERISA / DOT", sub: "Data Source", color: "#EF4444" },
                  { x: 140, label: "Scraping Engine", sub: "n8n Webhooks", color: "#06B6D4" },
                  { x: 270, label: "Cold Email", sub: "Infrastructure", color: "#06B6D4" },
                  { x: 400, label: "Setter CRM", sub: "BANT Filter", color: "#10B981" },
                  { x: 520, label: "YOU CLOSE", sub: "Revenue", color: "#10B981" },
                ].map((node, ni) => (
                  <g key={ni}>
                    <motion.rect
                      x={node.x} y="40" width="90" height="50" rx="10"
                      fill="rgba(255,255,255,0.02)" stroke={node.color} strokeWidth="1"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: ni * 0.2 }}
                    />
                    <motion.text
                      x={node.x + 45} y="60" fill="white" fontSize="8" textAnchor="middle" fontWeight="600"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: ni * 0.2 + 0.1 }}
                    >{node.label}</motion.text>
                    <motion.text
                      x={node.x + 45} y="75" fill="#64748B" fontSize="7" textAnchor="middle"
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: ni * 0.2 + 0.15 }}
                    >{node.sub}</motion.text>
                    {ni < 4 && (
                      <g>
                        <motion.line
                          x1={node.x + 92} y1="65" x2={node.x + 128} y2="65"
                          stroke={node.color} strokeWidth="1"
                          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }} transition={{ delay: ni * 0.2 + 0.3, duration: 0.5 }}
                        />
                        {/* Animated pulse dot traveling along line */}
                        <motion.circle
                          r="2.5" fill={node.color}
                          animate={{ cx: [node.x + 92, node.x + 128], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: ni * 0.5, ease: "linear" }}
                          cy="65"
                        />
                      </g>
                    )}
                  </g>
                ))}
                {/* Animated data flow label */}
                <motion.text x="300" y="130" fill="#06B6D4" fontSize="9" textAnchor="middle" fontWeight="bold"
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity }}
                >60-DAY INTERCEPTION PIPELINE — FULLY AUTOMATED</motion.text>
              </svg>
            </GlassCard>
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
          html { scroll-behavior: smooth; }
          * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
          ::selection { background: rgba(6,182,212,0.2); color: #e0f2fe; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: #050505; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.15); }
          input[type="range"]::-webkit-slider-thumb { transition: all 0.2s ease; }
          input[type="range"]::-webkit-slider-thumb:hover { transform: scale(1.2); box-shadow: 0 0 15px rgba(6,182,212,0.5); }
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                  {/* Radar visual */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 120 120" className="w-full h-full">
                        <circle cx="60" cy="60" r="20" fill="none" stroke="rgba(6,182,212,0.15)" strokeWidth="0.5" />
                        <circle cx="60" cy="60" r="40" fill="none" stroke="rgba(6,182,212,0.1)" strokeWidth="0.5" />
                        <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="0.5" />
                        <line x1="60" y1="5" x2="60" y2="115" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />
                        <line x1="5" y1="60" x2="115" y2="60" stroke="rgba(6,182,212,0.06)" strokeWidth="0.5" />
                        <motion.line
                          x1="60" y1="60" x2="60" y2="5"
                          stroke="#06B6D4" strokeWidth="1.5"
                          style={{ transformOrigin: "60px 60px" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle cx="60" cy="60" r="55" fill="none" stroke="#06B6D4" strokeWidth="1"
                          animate={{ opacity: [0.3, 0.8, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-cyan-400 font-mono text-[9px] font-bold">{zipCode}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 font-mono text-sm text-green-400/70 space-y-1">
                    {SCAN_PHASES.slice(0, scanPhase + 1).map((phase, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{phase}</motion.div>
                    ))}
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} className="text-green-400">▋</motion.span>
                  </div>
                </motion.div>
              )}
 
              {scanComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Alert Box */}
                  <div className="mt-6 p-5 rounded-xl border border-red-500/30 bg-red-500/5 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={18} className="text-red-400" />
                      <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Territory Alert</span>
                    </div>
                    <div className="font-mono text-sm space-y-1.5">
                      <div className="text-white">TERRITORY <span className="text-cyan-400">[{zipCode}]</span> IS CURRENTLY <span className="text-emerald-400 font-bold">OPEN</span>.</div>
                      <div className="text-slate-400">Lockout Status: <span className="text-yellow-400">Pending</span></div>
                      <div className="text-red-400">1 Local Competitor Currently in Queue.</div>
                    </div>
                  </div>
 
                  {/* Step-by-step booking guide */}
                  <div className="mt-6 space-y-3">
                    {/* What happens next — 3 steps */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <div className="text-white font-semibold text-sm mb-4">Here is exactly what happens next:</div>
                      <div className="space-y-3">
                        {[
                          { step: "1", title: "15-Minute Strategy Call", desc: "We analyze your territory, current book size, and growth goals. Zero pitch — pure intelligence briefing.", icon: Phone },
                          { step: "2", title: "Custom Interception Blueprint", desc: "Within 48 hours you receive a territory-specific scraping plan with projected renewal targets in your zip code.", icon: Target },
                          { step: "3", title: "Deploy in 14 Days", desc: "Infrastructure goes live. First qualified CEO conversations within 21–30 days.", icon: Zap },
                        ].map((item) => (
                          <div key={item.step} className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-cyan-400 font-mono font-bold text-xs">{item.step}</span>
                            </div>
                            <div>
                              <div className="text-white text-sm font-semibold">{item.title}</div>
                              <div className="text-slate-500 text-xs mt-0.5">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
 
                    {/* Guarantees reminder */}
                    <div className="flex flex-wrap gap-3">
                      {[
                        { icon: ShieldCheck, text: "5 conversations in 30 days or we work free" },
                        { icon: Lock, text: "50-mile exclusive territory lockout" },
                        { icon: Clock, text: "15 min call — zero obligation" },
                      ].map((g, i) => (
                        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 text-[10px] sm:text-xs">
                          <g.icon size={12} strokeWidth={1.5} />
                          <span>{g.text}</span>
                        </div>
                      ))}
                    </div>
 
                    {/* CTA — Toggle Calendly */}
                    {!showCalendly ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCalendly(true)}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:bg-cyan-400 transition-colors"
                      >
                        <Phone size={20} />
                        Pick a Time — Lock My Territory
                        <ArrowRight size={20} />
                      </motion.button>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white text-sm font-semibold">Select a time that works for you:</span>
                          <button onClick={() => setShowCalendly(false)} className="text-slate-500 hover:text-white text-xs transition-colors">Collapse</button>
                        </div>
                        {/* Calendly Booking Card */}
                        <div className="rounded-xl border border-cyan-500/20 bg-gradient-to-br from-[#0a0f1c] via-[#0B1120] to-[#070b14] p-6 sm:p-8 text-center">
                          <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                            <Phone size={28} className="text-cyan-400" />
                          </div>
                          <h4 className="text-white font-bold text-lg">Book Your 15-Minute Strategy Call</h4>
                          <p className="text-slate-400 text-sm mt-2 max-w-sm mx-auto">Pick a time on our calendar. Zero pitch — pure intelligence briefing on your territory.</p>
                          <div className="mt-4 flex flex-wrap justify-center gap-3">
                            {[
                              { icon: Clock, text: "15 minutes" },
                              { icon: ShieldCheck, text: "Zero obligation" },
                              { icon: Lock, text: "Territory held 72 hours" },
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-slate-400 text-xs">
                                <item.icon size={12} strokeWidth={1.5} />
                                <span>{item.text}</span>
                              </div>
                            ))}
                          </div>
                          <motion.a
                            href={CALENDLY_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] hover:bg-cyan-400 transition-colors w-full sm:w-auto"
                          >
                            <Phone size={20} />
                            Open Calendar & Pick a Time
                            <ExternalLink size={16} />
                          </motion.a>
                          <p className="text-slate-600 text-[10px] mt-3">Opens Calendly in a new tab — select a slot that works for you</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 20: 90-DAY ROI BREAKDOWN — ALL TIERS ════════════════════ */}
      <section className="py-24 md:py-32 bg-black border-t border-white/5" style={dotBg}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading badge="Financial Projection" title="The 90-Day Financial Projection." subtitle="Conservative math. No hype. Every tier — complete ROI matrices." />
          <div className="space-y-8 max-w-6xl mx-auto">
            {PRICING_TIERS.map((tier) => (
              <GlassCard key={tier.id} className="p-6 sm:p-8 md:p-10" hover={false}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                  <div>
                    <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">{tier.name}</span>
                    <div className="text-white font-bold text-lg mt-1">${tier.price}/month</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">90-Day Investment</span>
                    <div className="text-2xl font-mono font-extrabold text-white">{tier.roi90.investment}</div>
                  </div>
                </div>
 
                {/* Pipeline */}
                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <span className="text-cyan-400 font-mono font-bold text-xl">{tier.roi90.meetings} Qualified Conversations</span>
                      <span className="text-slate-500 text-xs ml-2">guaranteed minimum</span>
                    </div>
                    {tier.roi90.hours && <span className="text-slate-400 text-sm">+ {tier.roi90.hours} hours reclaimed</span>}
                  </div>
                </div>
 
                {/* Two-column ROI Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Conservative */}
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Conservative Model ({tier.roi90.conservativeClose} close rate)</span>
                    <div className="mt-3 space-y-2 font-mono text-sm">
                      <div className="flex justify-between"><span className="text-slate-400">Accounts Won</span><span className="text-white font-bold">{tier.roi90.conservativeAccounts}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Year 1 Commission</span><span className="text-emerald-400 font-bold">{tier.roi90.conservativeCommission}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Net Profit</span><span className="text-emerald-400 font-bold">{tier.roi90.conservativeProfit}</span></div>
                      <div className="flex justify-between border-t border-white/5 pt-2"><span className="text-slate-400">Year 1 ROI</span><span className="text-white font-bold">{tier.roi90.conservativeROI}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">5-Year Lifetime Value</span><span className="text-cyan-400 font-bold">{tier.roi90.conservativeLifetime}</span></div>
                      {tier.roi90.conservativeLifetimeROI && <div className="flex justify-between"><span className="text-slate-400">Lifetime ROI</span><span className="text-cyan-400 font-bold">{tier.roi90.conservativeLifetimeROI}</span></div>}
                      {tier.roi90.conservativePE && <div className="flex justify-between"><span className="text-slate-400">PE Exit Value Added</span><span className="text-white font-bold">{tier.roi90.conservativePE}</span></div>}
                    </div>
                  </div>
                  {/* Target */}
                  <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                    <span className="text-xs text-cyan-400 uppercase tracking-widest font-semibold">Target Model ({tier.roi90.targetClose} close rate)</span>
                    <div className="mt-3 space-y-2 font-mono text-sm">
                      <div className="flex justify-between"><span className="text-slate-400">Accounts Won</span><span className="text-white font-bold">{tier.roi90.targetAccounts}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Year 1 Commission</span><span className="text-emerald-400 font-bold">{tier.roi90.targetCommission}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Net Profit</span><span className="text-emerald-400 font-bold">{tier.roi90.targetProfit}</span></div>
                      <div className="flex justify-between border-t border-white/5 pt-2"><span className="text-slate-400">Year 1 ROI</span><span className="text-white font-bold">{tier.roi90.targetROI}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">5-Year Lifetime Value</span><span className="text-cyan-400 font-bold">{tier.roi90.targetLifetime}</span></div>
                      {tier.roi90.targetLifetimeROI && <div className="flex justify-between"><span className="text-slate-400">Lifetime ROI</span><span className="text-cyan-400 font-bold">{tier.roi90.targetLifetimeROI}</span></div>}
                      {tier.roi90.targetPE && <div className="flex justify-between"><span className="text-slate-400">PE Exit Value Added</span><span className="text-white font-bold">{tier.roi90.targetPE}</span></div>}
                    </div>
                  </div>
                </div>
 
                {/* Risk reversal for this tier */}
                <div className="mt-5 p-4 rounded-xl bg-emerald-500/[0.03] border border-emerald-500/10">
                  <div className="text-emerald-400 text-[10px] uppercase tracking-widest font-semibold mb-1">{tier.riskTitle}</div>
                  <p className="text-slate-400 text-xs leading-relaxed">{tier.riskText}</p>
                </div>
              </GlassCard>
            ))}
          </div>
 
          {/* Closing line */}
          <div className="mt-10 text-center">
            <p className="text-white font-semibold text-lg max-w-3xl mx-auto">
              You are not buying a marketing service. You are acquiring a highly predictable annuity. One account pays for the year. Everything else is pure profit and enterprise equity.
            </p>
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
 
          {/* Booking Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Left — Why book now */}
              <div className="md:col-span-2 space-y-4">
                <GlassCard className="p-6" hover={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <Phone size={16} className="text-cyan-400" />
                    </div>
                    <span className="text-white font-bold text-sm">Strategy Call</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Clock size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 text-sm">15 minutes — zero fluff, pure strategy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Target size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 text-sm">We analyze your territory and current book</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <ShieldCheck size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 text-sm">No pitch. If it is not a fit, we tell you</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Lock size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 text-sm">Territory is held for 72 hours after booking</span>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-white/5">
                    <div className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold mb-2">What you walk away with:</div>
                    <div className="space-y-2">
                      {[
                        "Territory density report for your zip code",
                        "Estimated renewal targets in your area",
                        "Custom ROI projection for your book size",
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Check size={12} className="text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-300 text-xs">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
 
                {/* Testimonial snippet */}
                <GlassCard className="p-5" hover={false}>
                  <div className="text-slate-400 text-xs leading-relaxed italic">
                    "I expected a sales pitch. Instead they showed me exactly which accounts in my zip code were approaching renewal. I signed up that day."
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600" />
                    <div>
                      <div className="text-white text-xs font-semibold">Commercial Broker</div>
                      <div className="text-slate-600 text-[10px]">$3.2M annual premium</div>
                    </div>
                  </div>
                </GlassCard>
              </div>
 
              {/* Right — Calendly Booking Card */}
              <div className="md:col-span-3">
                <GlassCard className="p-5 sm:p-6 md:p-8" hover={false}>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 uppercase tracking-widest text-xs font-semibold mb-6">
                      <Phone size={12} />
                      Select Your Time
                    </span>
 
                    <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-5">
                      <Phone size={32} className="text-cyan-400" />
                    </div>
 
                    <h3 className="text-white font-bold text-xl">15-Minute Strategy Call</h3>
                    <p className="text-slate-400 text-sm mt-2 max-w-xs mx-auto">No pitch. We analyze your territory and show you the exact accounts approaching renewal in your zip code.</p>
 
                    {/* Time slot indicators */}
                    <div className="mt-6 space-y-2 max-w-xs mx-auto">
                      {[
                        { day: "This Week", slots: "3 slots remaining", color: "text-red-400" },
                        { day: "Next Week", slots: "7 slots available", color: "text-yellow-400" },
                        { day: "Week After", slots: "12 slots available", color: "text-emerald-400" },
                      ].map((row, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                          <span className="text-slate-300 text-sm">{row.day}</span>
                          <span className={`text-xs font-mono font-semibold ${row.color}`}>{row.slots}</span>
                        </div>
                      ))}
                    </div>
 
                    <motion.a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={{ boxShadow: ["0 0 30px rgba(6,182,212,0.3)", "0 0 50px rgba(6,182,212,0.5)", "0 0 30px rgba(6,182,212,0.3)"] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="mt-6 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-cyan-500 text-white font-bold text-lg hover:bg-cyan-400 transition-colors w-full"
                    >
                      <Phone size={20} />
                      Book My Strategy Call
                      <ExternalLink size={16} />
                    </motion.a>
 
                    <div className="mt-4 flex flex-wrap justify-center gap-3">
                      {[
                        { icon: ShieldCheck, text: "5 conversations guaranteed" },
                        { icon: Lock, text: "Territory held for you" },
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400/80 text-[10px] sm:text-xs">
                          <item.icon size={12} strokeWidth={1.5} />
                          <span>{item.text}</span>
                        </div>
                      ))}
                    </div>
 
                    <p className="text-slate-600 text-[10px] mt-4">Opens Calendly in a new tab</p>
                  </div>
                </GlassCard>
              </div>
            </div>
          </motion.div>
 
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <Lock size={12} />
            <span>Your data is encrypted. Territory lockout is legally binding. 50-mile radius exclusivity guaranteed.</span>
          </div>
        </div>
      </section>
 
      {/* ════════════════════ SECTION 22: CORPORATE FOOTER ════════════════════ */}
      <footer className="py-14 md:py-16 bg-[#030305] border-t border-white/[0.03] pb-28 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <a href="#hero" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-slate-700 text-[11px] font-mono tracking-[0.15em] hover:text-cyan-400 transition-colors duration-300 cursor-pointer">INTERCEPT ARCHITECTURE &copy; 2026</a>
              <div className="h-3 w-px bg-white/[0.06] hidden sm:block" />
              <span className="text-slate-700 text-[11px] font-mono tracking-widest uppercase">Secure B2B Reconnaissance</span>
              {/* WhatsApp in footer */}
              <a
                href="https://wa.me/message/M6AEG7RDYV57M1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/[0.06] border border-[#25D366]/15 text-[#25D366]/80 text-[11px] font-semibold hover:bg-[#25D366]/15 hover:text-[#25D366] transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-5 md:gap-6">
              {["Privacy Protocol", "Terms of Service", "Data Security", "SEC Compliance"].map((link) => (
                <a key={link} href="#" className="text-slate-700 text-[11px] hover:text-slate-400 transition-all duration-300 tracking-wide">{link}</a>
              ))}
            </div>
          </div>
          <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />
          <p className="mt-8 text-slate-800 text-[10px] max-w-3xl mx-auto text-center leading-relaxed tracking-wide">
            This platform utilizes public regulatory data under applicable freedom of information laws. We guarantee absolute exclusivity to one agency per 50-mile radius. Once a territory is claimed, we are contractually bound to reject all other local applicants. All commission figures are illustrative projections based on standard industry rates and do not constitute a guarantee of earnings.
          </p>
        </div>
      </footer>
 
      {/* ════════════════════ MOBILE STICKY CTA ════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-lg border-t border-white/5 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-center text-base shadow-[0_0_40px_-10px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-[0.98]"
        >
          Check Territory Availability
        </a>
      </div>
 
      {/* ════════════════════ WHATSAPP FLOATING ICON ════════════════════ */}
      <motion.a
        href="https://wa.me/message/M6AEG7RDYV57M1"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-[90] group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Outer glow ring — subtle, always visible */}
        <div className="absolute inset-0 rounded-full bg-[#25D366]/20 blur-md group-hover:bg-[#25D366]/30 transition-all duration-500" />
        {/* Button */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center shadow-[0_2px_16px_rgba(37,211,102,0.35)] group-hover:shadow-[0_4px_24px_rgba(37,211,102,0.5)] transition-all duration-300 border border-white/10">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </div>
      </motion.a>
 
    </div>
  );
}
 












