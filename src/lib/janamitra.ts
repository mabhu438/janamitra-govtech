import type { TKey } from "./i18n";

/** A string available in both interface languages. */
export type Bi = { te: string; en: string };

export type SampleKind = "bill" | "scheme" | "notice";

export type FactTemplate = { en: string; te: string };

export type Fact = {
  key: string;
  label: Bi;
  value: Bi;
  /** Words (EN + TE, lowercase) that link a user question to this fact. */
  keywords: string[];
  /** Plain-language answer template; {v} is replaced with the fact value. */
  template: FactTemplate;
};

export type SampleDoc = {
  id: string;
  kind: SampleKind;
  title: Bi;
  refNo: string;
  dept: Bi;
  /** Amount relevant to FeeGuard, if any. */
  fee?: number;
  facts: Fact[];
  tips: Bi[];
};

export const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: "demo-eb-2048",
    kind: "bill",
    title: { te: "విద్యుత్ బిల్లు", en: "Electricity bill" },
    refNo: "DEMO-EB-2048",
    dept: { te: "విద్యుత్ శాఖ (కల్పితం)", en: "Electricity Department (fictional)" },
    fee: 1240,
    facts: [
      {
        key: "amount",
        label: { te: "చెల్లించాల్సిన మొత్తం", en: "Amount to pay" },
        value: { te: "₹1,240", en: "₹1,240" },
        keywords: ["pay", "amount", "much", "cost", "fee", "bill", "ఎంత", "మొత్తం", "చెల్లించ", "ఫీజు"],
        template: {
          en: "This document says the amount to pay is {v}.",
          te: "ఈ పత్రం ప్రకారం చెల్లించాల్సిన మొత్తం {v}.",
        },
      },
      {
        key: "dueDate",
        label: { te: "చెల్లింపు గడువు", en: "Payment due date" },
        value: { te: "30 నవంబర్ 2026", en: "30 November 2026" },
        keywords: ["due", "date", "deadline", "last", "గడువు", "తేదీ", "చివరి"],
        template: {
          en: "The due date written on the bill is {v}. Paying after this date can attract a late fee.",
          te: "బిల్లుపై రాసిన చెల్లింపు గడువు {v}. ఈ తేదీ తర్వాత చెల్లిస్తే ఆలస్య రుసుము వచ్చే అవకాశం ఉంది.",
        },
      },
      {
        key: "consumerNo",
        label: { te: "వినియోగదారు నంబర్", en: "Consumer number" },
        value: { te: "20-104-889", en: "20-104-889" },
        keywords: ["reference", "number", "consumer", "id", "నంబర్", "రిఫరెన్స్", "వినియోగదారు"],
        template: {
          en: "The consumer number printed on this bill is {v}. Quote it for any service request.",
          te: "ఈ బిల్లుపై ముద్రించిన వినియోగదారు నంబర్ {v}. ఏదైనా సేవా అభ్యర్థనకు దీన్ని చెప్పండి.",
        },
      },
      {
        key: "units",
        label: { te: "ఈ నెల వినియోగం", en: "Units consumed" },
        value: { te: "212 యూనిట్లు", en: "212 units" },
        keywords: ["units", "consumed", "usage", "reading", "యూనిట్", "వినియోగం", "రీడింగ్"],
        template: {
          en: "This bill records {v} for the billing period shown on it.",
          te: "ఈ బిల్లు ప్రకారం ఈ బిల్లింగ్ కాలానికి {v} నమోదైనవి.",
        },
      },
      {
        key: "tariff",
        label: { te: "ట్యారిఫ్ వర్గం", en: "Tariff category" },
        value: { te: "గృహ – B", en: "Domestic – B" },
        keywords: ["tariff", "category", "slab", "domestic", "ట్యారిఫ్", "వర్గం"],
        template: {
          en: "The bill is calculated under the {v} tariff category.",
          te: "ఈ బిల్లు {v} ట్యారిఫ్ వర్గం ప్రకారం లెక్కించబడింది.",
        },
      },
    ],
    tips: [
      {
        te: "గడువు తర్వాత ఆలస్య రుసుము నివారించడానికి 30 నవంబర్ 2026 లోపు చెల్లించండి.",
        en: "Pay before 30 November 2026 to avoid a late fee.",
      },
      {
        te: "బిల్లు మొత్తం మీ ఊహకు భిన్నంగా ఉంటే FeeGuard తో రిఫరెన్స్ మొత్తంతో పోల్చండి.",
        en: "If the amount looks off, compare it with a reference amount using FeeGuard.",
      },
      {
        te: "ఏదైనా ఫిర్యాదుకు వినియోగదారు నంబర్ మరియు బిల్లు నంబర్ సిద్ధంగా ఉంచండి.",
        en: "Keep the consumer and bill numbers ready for any complaint.",
      },
    ],
  },
  {
    id: "demo-sc-7319",
    kind: "scheme",
    title: { te: "ఎక్కువ కట్టవలసి వచ్చిన పథకం లేఖ", en: "Scheme support letter" },
    refNo: "DEMO-SC-7319",
    dept: { te: "వ్యవసాయ శాఖ (కల్పితం)", en: "Agriculture Department (fictional)" },
    facts: [
      {
        key: "benefit",
        label: { te: "పథకం సహాయం", en: "Scheme benefit" },
        value: { te: "ప్రతి పంట సీజన్‌కు ₹6,000", en: "₹6,000 per crop season" },
        keywords: ["benefit", "money", "amount", "get", "support", "సహాయం", "డబ్బు", "మొత్తం"],
        template: {
          en: "This letter mentions a support amount of {v} under the scheme.",
          te: "ఈ లేఖ ప్రకారం పథకం కింద {v} సహాయం పొందవచ్చు.",
        },
      },
      {
        key: "eligibility",
        label: { te: "అర్హత", en: "Who is eligible" },
        value: { te: "చిన్న మరియు సన్నకారు రైతులు", en: "Small and marginal farmers" },
        keywords: ["eligible", "eligibility", "who", "farmer", "అర్హత", "రైతు", "ఎవరు"],
        template: {
          en: "According to the letter, {v} are eligible for this scheme.",
          te: "లేఖ ప్రకారం {v} ఈ పథకానికి అర్హులు.",
        },
      },
      {
        key: "lastDate",
        label: { te: "దరఖాస్తు చివరి తేదీ", en: "Application last date" },
        value: { te: "15 డిసెంబర్ 2026", en: "15 December 2026" },
        keywords: ["last", "date", "apply", "deadline", "తేదీ", "దరఖాస్తు", "గడువు"],
        template: {
          en: "The last date to apply, as written in the letter, is {v}.",
          te: "లేఖలో రాసిన ప్రకారం దరఖాస్తుకు చివరి తేదీ {v}.",
        },
      },
      {
        key: "reference",
        label: { te: "లేఖ రిఫరెన్స్", en: "Letter reference" },
        value: { te: "DEMO-SC-7319", en: "DEMO-SC-7319" },
        keywords: ["reference", "number", "id", "రిఫరెన్స్", "నంబర్"],
        template: {
          en: "The reference number on this letter is {v}.",
          te: "ఈ లేఖపై రిఫరెన్స్ నంబర్ {v}.",
        },
      },
    ],
    tips: [
      {
        te: "గడువు ముగిసే ముందు దరఖాస్తు చేయడానికి భూమి పట్టా మరియు ఆధార్ సిద్ధంగా ఉంచండి.",
        en: "Keep the land record and Aadhaar ready before applying.",
      },
      {
        te: "అర్హత వివరాలను అధికారిక పోర్టల్ లేదా మీ వ్యవసాయ కార్యాలయంలో సరిచూసుకోండి.",
        en: "Confirm eligibility details at the official portal or your agriculture office.",
      },
    ],
  },
  {
    id: "demo-rc-5502",
    kind: "notice",
    title: { te: "రేషన్ కార్డ్ నోటీసు", en: "Ration card notice" },
    refNo: "DEMO-RC-5502",
    dept: { te: "రాష్ట్ర పౌర సరఫరాల శాఖ (కల్పితం)", en: "Civil Supplies Department (fictional)" },
    facts: [
      {
        key: "action",
        label: { te: "తీసుకోవాల్సిన చర్య", en: "Action required" },
        value: { te: "ఈ-కెవైసీ పూర్తి చేయండి", en: "Complete e-KYC" },
        keywords: ["action", "do", "required", "ekyc", "e-kyc", "చర్య", "ఇకెవైసీ", "చేయాలి"],
        template: {
          en: "The notice asks card holders to {v}.",
          te: "ఈ నోటీసు ప్రకారం కార్డు దారులు {v} అవసరం.",
        },
      },
      {
        key: "lastDate",
        label: { te: "గడువు తేదీ", en: "Deadline" },
        value: { te: "10 డిసెంబర్ 2026", en: "10 December 2026" },
        keywords: ["deadline", "date", "last", "గడువు", "తేదీ", "చివరి"],
        template: {
          en: "The deadline written in the notice is {v}.",
          te: "నోటీసులో రాసిన గడువు తేదీ {v}.",
        },
      },
      {
        key: "cardNo",
        label: { te: "రేషన్ కార్డ్ నంబర్", en: "Ration card number" },
        value: { te: "RC-77-40213", en: "RC-77-40213" },
        keywords: ["card", "number", "ration", "reference", "కార్డ్", "నంబర్", "రేషన్"],
        template: {
          en: "The ration card number shown in the notice is {v}.",
          te: "నోటీసులో చూపిన రేషన్ కార్డ్ నంబర్ {v}.",
        },
      },
      {
        key: "shop",
        label: { te: "న్యాయవాది దుకాణం కోడ్", en: "Fair price shop code" },
        value: { te: "FPS-1132", en: "FPS-1132" },
        keywords: ["shop", "code", "fps", "fair", "దుకాణం", "కోడ్"],
        template: {
          en: "Your fair price shop code in this notice is {v}.",
          te: "ఈ నోటీసు ప్రకారం మీ దుకాణం కోడ్ {v}.",
        },
      },
    ],
    tips: [
      {
        te: "గడువు 10 డిసెంబర్ 2026 లోపు ఈ-కెవైసీ పూర్తి చేయకపోతే సరఫరా తాత్కాలికంగా నిలిపివేయబడే అవకాశం ఉంది.",
        en: "Complete e-KYC before 10 December 2026 or supplies can be paused temporarily.",
      },
      {
        te: "కార్డుపై ఉన్న అన్ని సభ్యుల వివరాలు సరిగ్గా ఉన్నాయో లేదో సరిచూసుకోండి.",
        en: "Check that every member listed on the card still appears correctly.",
      },
    ],
  },
];

export function getSampleDoc(id: string): SampleDoc | undefined {
  return SAMPLE_DOCS.find((d) => d.id === id);
}

/* ------------------------------------------------------------------ */
/* Saved documents (device-local)                                      */
/* ------------------------------------------------------------------ */

export type SavedDoc = {
  id: string;
  title: string;
  fileName: string;
  size: number;
  mime: string;
  createdAt: number;
  preview?: string;
  note?: string;
};

const DOCS_KEY = "jm.documents";
const SETTINGS_KEY = "jm.settings";
const SCAN_KEY = "jm.pendingScan";

export function loadSavedDocs(): SavedDoc[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(DOCS_KEY);
    const parsed = raw ? (JSON.parse(raw) as SavedDoc[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function persistSavedDocs(docs: SavedDoc[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DOCS_KEY, JSON.stringify(docs));
}

/* ------------------------------------------------------------------ */
/* Settings                                                            */
/* ------------------------------------------------------------------ */

export type TextSize = "default" | "lg" | "xl";
export type ThemeChoice = "light" | "dark";

export type Settings = {
  lang: "en" | "te";
  theme: ThemeChoice;
  saveHistory: boolean;
  textSize: TextSize;
  contrast: boolean;
  reduceMotion: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  lang: "en",
  theme: "light",
  saveHistory: true,
  textSize: "default",
  contrast: false,
  reduceMotion: false,
};

export function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<Settings>) : {};
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function persistSettings(settings: Settings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function applySettings(settings: Settings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", settings.theme === "dark");
  root.dataset["text"] = settings.textSize;
  if (settings.contrast) {
    root.dataset["contrast"] = "high";
  } else {
    delete root.dataset["contrast"];
  }
  if (settings.reduceMotion) {
    root.dataset["motion"] = "reduced";
  } else {
    delete root.dataset["motion"];
  }
}

/* ------------------------------------------------------------------ */
/* Scan handoff (in-session, not persisted)                            */
/* ------------------------------------------------------------------ */

export type PendingScan =
  | { type: "sample"; id: string }
  | { type: "upload"; fileName: string; size: number; mime: string; preview?: string };

export function setPendingScan(scan: PendingScan) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SCAN_KEY, JSON.stringify(scan));
}

export function getPendingScan(): PendingScan | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(SCAN_KEY);
    return raw ? (JSON.parse(raw) as PendingScan) : null;
  } catch {
    return null;
  }
}

export function clearPendingScan() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SCAN_KEY);
}

/* ------------------------------------------------------------------ */
/* File rules                                                          */
/* ------------------------------------------------------------------ */

export const MAX_FILE_MB = 10;
export const ACCEPTED_MIMES = ["image/jpeg", "image/png", "application/pdf"];

/* ------------------------------------------------------------------ */
/* FeeGuard comparison                                                 */
/* ------------------------------------------------------------------ */

export type FeeVerdict = "match" | "over" | "under";

export type FeeComparison = {
  difference: number;
  /** Percent difference relative to the reference amount; null when reference is 0. */
  percent: number | null;
  verdict: FeeVerdict;
};

/**
 * Compare an amount shown to the user with a reference amount.
 * Both inputs are in INR. A positive difference means the shown amount
 * is higher than the reference.
 */
export function compareFees(shown: number, reference: number): FeeComparison {
  const difference = Math.round((shown - reference) * 100) / 100;
  const percent = reference > 0 ? Math.round((difference / reference) * 1000) / 10 : null;
  const verdict: FeeVerdict = difference === 0 ? "match" : difference > 0 ? "over" : "under";
  return { difference, percent, verdict };
}

/* ------------------------------------------------------------------ */
/* Document-grounded answering                                         */
/* ------------------------------------------------------------------ */

export type AskOutcome =
  | { grounded: true; fact: Fact; answer: string }
  | { grounded: false };

/**
 * Match a question against a sample document's facts using keyword overlap.
 * Returns a grounded answer assembled from the matched fact, or a
 * not-grounded outcome when nothing in the document covers the question.
 */
export function answerFromDoc(doc: SampleDoc, question: string, lang: "en" | "te"): AskOutcome {
  const q = question.toLowerCase().trim();
  if (!q) return { grounded: false };

  let best: { fact: Fact; score: number } | null = null;

  for (const fact of doc.facts) {
    let score = 0;
    const haystack = [fact.label.en, fact.label.te, fact.value.en, fact.value.te].join(" ").toLowerCase();
    for (const kw of fact.keywords) {
      if (q.includes(kw)) score += 2;
      if (haystack.includes(kw) && q.length > 0) score += 1;
    }
    if (score > 0 && (!best || score > best.score)) best = { fact, score };
  }

  if (!best || best.score < 2) return { grounded: false };

  const template = lang === "te" ? best.fact.template.te : best.fact.template.en;
  const value = lang === "te" ? best.fact.value.te : best.fact.value.en;
  const answer = template.replace("{v}", value);
  return { grounded: true, fact: best.fact, answer };
}

/* ------------------------------------------------------------------ */
/* Grievance draft                                                     */
/* ------------------------------------------------------------------ */

export type GrievanceInput = {
  department: string;
  facts: string;
  docRef?: string;
};

export function buildGrievanceDraft(input: GrievanceInput, on: Date = new Date()): string {
  const date = on.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  const lines = [
    `Date: ${date}`,
    "",
    `To,`,
    `The Officer in Charge,`,
    `${input.department.trim()}`,
    "",
    `Subject: Request for review and resolution`,
    "",
    `Respected Sir/Madam,`,
    "",
    `I wish to bring the following matter to your notice.`,
    "",
    `${input.facts.trim()}`,
    "",
  ];

  if (input.docRef?.trim()) {
    lines.push(`For reference, the document number related to this matter is ${input.docRef.trim()}.`);
    lines.push("");
  }

  lines.push(
    "I request that this matter be examined and a suitable resolution be communicated to me.",
    "",
    "Thank you.",
    "",
    "Yours faithfully,",
    "[Your name]",
    "[Address / contact number]",
  );

  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/* Misc helpers                                                        */
/* ------------------------------------------------------------------ */

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function filterKeyFor(kind: SampleKind): "bills" | "schemes" | "notices" {
  return kind === "bill" ? "bills" : kind === "scheme" ? "schemes" : "notices";
}

export function docsFilterLabelKey(filter: string): TKey {
  switch (filter) {
    case "bills":
      return "docs.filter.bills";
    case "schemes":
      return "docs.filter.schemes";
    case "notices":
      return "docs.filter.notices";
    case "uploads":
      return "docs.filter.uploads";
    default:
      return "docs.filter.all";
  }
}
