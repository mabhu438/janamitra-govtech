import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

type Entry = { en: string; te: string };

const D = {
  "nav.home": { en: "Home", te: "హోమ్" },
  "nav.documents": { en: "My documents", te: "నా పత్రాలు" },
  "nav.feeguard": { en: "FeeGuard", te: "ఫీజు గార్డ్" },
  "nav.ask": { en: "Ask", te: "అడగండి" },
  "nav.help": { en: "Help", te: "సహాయం" },
  "nav.settings": { en: "Settings", te: "సెట్టింగ్స్" },
  "nav.scan": { en: "Scan a document", te: "పత్రం స్కాన్ చేయండి" },
  "nav.guest": { en: "Guest", te: "అతిథి" },
  "nav.menu": { en: "Open menu", te: "మెనూ తెరవండి" },

  "brand.name": { en: "JanaMitra AI", te: "జనమిత్ర AI" },
  "brand.tagline": {
    en: "Your documents. Your rights. Your language.",
    te: "మా ప్రభుత్వం.. మా హక్కులు.. మా భాష",
  },

  "hero.kicker": { en: "A companion for your paperwork", te: "మీ పేపర్‌వర్క్‌కు ఒక సహచరుడు" },
  "hero.title1": { en: "Government", te: "ప్రభుత్వ పత్రాలు," },
  "hero.title2": { en: "documents,", te: "" },
  "hero.title3": { en: "made simple.", te: "సులభంగా." },
  "hero.body": {
    en: "Scan a document, understand what matters in Telugu, and see the next steps in plain language.",
    te: "పత్రాన్ని స్కాన్ చేయండి, ముఖ్యమైన విషయాలను తెలుగులో అర్థం చేసుకోండి, తదుపరి చర్యలను సరళ భాషలో తెలుసుకోండి.",
  },
  "hero.point1": { en: "Plain Telugu", te: "సరళ తెలుగు" },
  "hero.point2": { en: "Your documents, your choice", te: "మీ పత్రాలు, మీ ఇష్టం" },

  "card.kicker": { en: "01 / Get started", te: "01 / ప్రారంభించండి" },
  "card.private": { en: "Nothing sent without consent", te: "మీ అనుమతి లేకుండా ఏమీ పంపబడదు" },
  "card.title": { en: "Add your document", te: "మీ పత్రాన్ని జోడించండి" },
  "card.sub": {
    en: "Try an electricity bill, scheme letter, or ration notice.",
    te: "విద్యుత్ బిల్లు, పథకం లేఖ లేదా రేషన్ నోటీసుతో ప్రయత్నించండి.",
  },
  "card.dropTe": {
    en: "Take a clear photo or choose a file",
    te: "పత్రం ఫోటో తీయండి లేదా ఫైల్ ఎంచుకోండి",
  },
  "card.dropEn": { en: "Take a clear photo or choose a file", te: "స్పష్టమైన ఫోటో తీయండి లేదా ఫైల్ ఎంచుకోండి" },
  "card.pickFile": { en: "Choose a file", te: "ఫైల్ ఎంచుకోండి" },
  "card.takePhoto": { en: "Take a photo", te: "ఫోటో తీయండి" },
  "card.formats": { en: "JPG, PNG, PDF · up to 10 MB", te: "JPG, PNG, PDF · గరిష్ఠం 10 MB" },
  "card.dropHere": { en: "or drop a file here", te: "లేదా ఫైల్ ఇక్కడ వదలండి" },
  "card.selected": { en: "Ready to scan:", te: "స్కాన్‌కు సిద్ధం:" },
  "card.continue": { en: "Continue to scan", te: "స్కాన్ కొనసాగించండి" },
  "card.orSample": { en: "Or try a sample", te: "లేదా నమూనా ప్రయత్నించండి" },
  "card.demoNote": {
    en: "Fictional demo data — not an official document",
    te: "కల్పిత నమూనా డేటా — అధికారిక పత్రం కాదు",
  },
  "card.sample": { en: "Sample", te: "నమూనా" },
  "card.fileTooBig": { en: "File is larger than 10 MB.", te: "ఫైల్ 10 MB కంటే పెద్దది." },
  "card.fileType": { en: "Only JPG, PNG and PDF files are supported.", te: "JPG, PNG మరియు PDF ఫైళ్లు మాత్రమే సపోర్ట్ చేయబడతాయి." },

  "features.kicker": { en: "Made to be useful", te: "ఉపయోగపడేలా రూపొందించబడింది" },
  "features.title": { en: "From understanding to next steps", te: "అర్థం చేసుకోవడం నుండి తదుపరి చర్యల వరకు" },
  "features.sub": {
    en: "Find the information you need without getting lost in official wording.",
    te: "అధికారిక పదాలలో తప్పిపోకుండా మీకు కావాల్సిన సమాచారాన్ని పొందండి.",
  },
  "features.1.t": { en: "Understand in Telugu", te: "తెలుగులో అర్థం చేసుకోండి" },
  "features.1.d": {
    en: "See important details explained in everyday language.",
    te: "ముఖ్యమైన వివరాలు రోజువారీ భాషలో వివరించబడతాయి.",
  },
  "features.2.t": { en: "Listen to your document", te: "మీ పత్రాన్ని వినండి" },
  "features.2.d": {
    en: "Listen to the explanation when a compatible voice is available.",
    te: "అనుకూలమైన వాయిస్ అందుబాటులో ఉన్నప్పుడు వివరణను వినండి.",
  },
  "features.3.t": { en: "FeeGuard", te: "ఫీజు గార్డ్" },
  "features.3.d": {
    en: "Compare a fee you were shown with a reference amount you trust.",
    te: "చూపించిన ఫీజును మీరు నమ్మే రిఫరెన్స్ మొత్తంతో పోల్చండి.",
  },
  "features.4.t": { en: "Keep important dates in view", te: "ముఖ్య తేదీలను కనిపించేలా ఉంచండి" },
  "features.4.d": {
    en: "Spot deadlines and practical actions found in the document.",
    te: "పత్రంలో ఉన్న గడువులు మరియు ఆచరణాత్మక చర్యలను గుర్తించండి.",
  },

  "steps.kicker": { en: "02 / Three simple steps", te: "02 / మూడు సరళ దశలు" },
  "steps.title": { en: "You stay in control.", te: "నియంత్రణ మీ చేతుల్లోనే ఉంటుంది." },
  "steps.1.t": { en: "Photograph your paper", te: "మీ పత్రాన్ని ఫోటో తీయండి" },
  "steps.1.d": { en: "Or choose a file from your device.", te: "లేదా మీ పరికరం నుండి ఫైల్ ఎంచుకోండి." },
  "steps.2.t": { en: "Understand it in your language", te: "మీ భాషలో అర్థం చేసుకోండి" },
  "steps.2.d": { en: "Get a clear view of what matters.", te: "ముఖ్యమైన విషయాల స్పష్టమైన అవలోకనం పొందండి." },
  "steps.3.t": { en: "Know what to do next", te: "తర్వాత ఏమి చేయాలో తెలుసుకోండి" },
  "steps.3.d": {
    en: "Take the next step with information you can check.",
    te: "సరిచూచగల సమాచారంతో తదుపరి చర్య తీసుకోండి.",
  },

  "disclaimer.text": {
    en: "Independent assistance. JanaMitra AI is not a government department. Confirm important amounts, deadlines, and eligibility with official sources.",
    te: "స్వతంత్ర సహాయం. జనమిత్ర AI ప్రభుత్వ శాఖ కాదు. ముఖ్యమైన మొత్తాలు, గడువులు మరియు అర్హతలను అధికారిక వనరులతో సరిచూసుకోండి.",
  },
  "footer.line": {
    en: "Your Documents. Your Rights. Your Language.",
    te: "మీ పత్రాలు. మీ హక్కులు. మీ భాష.",
  },
  "footer.disclaimer": {
    en: "Independent assistance, not a government department. Confirm important information with official sources.",
    te: "స్వతంత్ర సహాయం, ప్రభుత్వ శాఖ కాదు. ముఖ్యమైన సమాచారాన్ని అధికారిక వనరులతో సరిచూసుకోండి.",
  },

  "scan.kicker": { en: "Scan / Review", te: "స్కాన్ / సమీక్ష" },
  "scan.title": { en: "Reading your document", te: "మీ పత్రాన్ని చదువుతోంది" },
  "scan.loading": { en: "Preparing a plain-language summary…", te: "సరళ భాషలో సారాంశం తయారవుతోంది…" },
  "scan.resultTitle": { en: "What this document says", te: "ఈ పత్రం చెప్పేది" },
  "scan.resultSub": {
    en: "Key details, in everyday language. Always confirm with the original paper.",
    te: "ముఖ్య వివరాలు, రోజువారీ భాషలో. ఎప్పుడూ అసలు పత్రంతో సరిచూసుకోండి.",
  },
  "scan.factsTitle": { en: "Key facts", te: "ముఖ్య నిజాలు" },
  "scan.tipsTitle": { en: "What you can do next", te: "మీరు చేయగలిగినవి" },
  "scan.ask": { en: "Ask about this document", te: "ఈ పత్రం గురించి అడగండి" },
  "scan.compare": { en: "Compare the fee", te: "ఫీజును పోల్చండి" },
  "scan.save": { en: "Save to My documents", te: "నా పత్రాలలో సేవ్ చేయండి" },
  "scan.saved": { en: "Saved to My documents.", te: "నా పత్రాలలో సేవ్ చేయబడింది." },
  "scan.pickTitle": { en: "Choose a document to scan", te: "స్కాన్ చేయడానికి పత్రాన్ని ఎంచుకోండి" },
  "scan.pickSub": {
    en: "Pick a sample below, or add your own file. Nothing is uploaded without your consent.",
    te: "క్రింద నమూనాను ఎంచుకోండి, లేదా మీ స్వంత ఫైల్ జోడించండి. మీ అనుమతి లేకుండా ఏమీ అప్‌లోడ్ చేయబడదు.",
  },
  "scan.missing": { en: "No document is queued for a scan.", te: "స్కాన్ కోసం ఏ పత్రం సిద్ధంగా లేదు." },
  "scan.upload.title": { en: "Your file is queued", te: "మీ ఫైల్ సిద్ధంగా ఉంది" },
  "scan.upload.note": {
    en: "This starter does not read file contents. Give the document a name and it will be kept on this device for your review.",
    te: "ఈ స్టార్టర్ ఫైల్ లోపలి విషయాలు చదవదు. పత్రానికి పేరు పెట్టండి, అది మీ సమీక్ష కోసం ఈ పరికరంలో భద్రపరచబడుతుంది.",
  },
  "scan.nameLabel": { en: "Document name", te: "పత్రం పేరు" },
  "scan.namePh": { en: "e.g. Electricity bill", te: "ఉదా. విద్యుత్ బిల్లు" },
  "scan.reviewBadge": { en: "Needs review", te: "సమీక్ష అవసరం" },
  "scan.fileInfo": { en: "File", te: "ఫైల్" },

  "docs.kicker": { en: "Document history", te: "పత్ర చరిత్ర" },
  "docs.title": { en: "My documents", te: "నా పత్రాలు" },
  "docs.note": {
    en: "Accounts and private storage are not enabled in this demo. Only fictional sample documents and files you save on this device are listed here.",
    te: "ఈ డెమోలో ఖాతాలు మరియు ప్రైవేట్ స్టోరేజ్ పని చేయవు. కల్పిత నమూనా పత్రాలు మరియు మీరు ఈ పరికరంలో సేవ్ చేసిన ఫైళ్లు మాత్రమే ఇక్కడ కనిపిస్తాయి.",
  },
  "docs.searchPh": { en: "Search by title, department or reference", te: "పేరు, శాఖ లేదా రిఫరెన్స్‌తో వెతకండి" },
  "docs.filter.all": { en: "All", te: "అన్నీ" },
  "docs.filter.bills": { en: "Bills", te: "బిల్లులు" },
  "docs.filter.schemes": { en: "Schemes", te: "పథకాలు" },
  "docs.filter.notices": { en: "Notices", te: "నోటీసులు" },
  "docs.filter.uploads": { en: "My files", te: "నా ఫైళ్లు" },
  "docs.empty.title": { en: "No documents match", te: "సరిపోయే పత్రాలు లేవు" },
  "docs.empty.desc": {
    en: "Try a different search or filter, or scan a new document.",
    te: "వేరే వెతుకుడి లేదా ఫిల్టర్ ప్రయత్నించండి, లేదా కొత్త పత్రం స్కాన్ చేయండి.",
  },
  "docs.empty.cta": { en: "Scan a document", te: "పత్రం స్కాన్ చేయండి" },
  "docs.view": { en: "View", te: "చూడండి" },
  "docs.delete": { en: "Delete", te: "తొలగించండి" },
  "docs.deleted": { en: "Document removed from this device.", te: "పత్రం ఈ పరికరం నుండి తొలగించబడింది." },
  "docs.badge.demo": { en: "Demo", te: "నమూనా" },
  "docs.badge.local": { en: "On this device", te: "ఈ పరికరంలో" },
  "docs.footnote": {
    en: "These are sample records, not a personal document history.",
    te: "ఇవి నమూనా రికార్డులు, వ్యక్తిగత పత్ర చరిత్ర కాదు.",
  },
  "docs.detailsTitle": { en: "Document details", te: "పత్ర వివరాలు" },
  "docs.privateNote": {
    en: "Files you save stay on this device only. They are not sent anywhere.",
    te: "మీరు సేవ్ చేసిన ఫైళ్లు ఈ పరికరంలో మాత్రమే ఉంటాయి. ఎక్కడికీ పంపబడవు.",
  },

  "fee.kicker": { en: "FeeGuard / Fee comparison", te: "ఫీజు గార్డ్ / ఫీజు పోలిక" },
  "fee.title": { en: "Compare a fee", te: "ఫీజును పోల్చండి" },
  "fee.sub": {
    en: "No verified official fee schedule is connected. This tool compares only the amounts you enter.",
    te: "ధృవీకరించిన అధికారిక ఫీజు పట్టిక అనుసంధానించబడలేదు. ఈ సాధనం మీరు నమోదు చేసిన మొత్తాలను మాత్రమే పోలుస్తుంది.",
  },
  "fee.warning": {
    en: "This is not official verification. An amount difference alone does not establish an improper charge.",
    te: "ఇది అధికారిక ధృవీకరణ కాదు. మొత్తంలో తేడా ఒక్కటే తప్పు వసూలు అని నిర్ధారించదు.",
  },
  "fee.amountShown": { en: "Amount shown (INR)", te: "చూపించిన మొత్తం (INR)" },
  "fee.amountRef": { en: "Reference amount you want to compare (INR)", te: "పోల్చాల్సిన రిఫరెన్స్ మొత్తం (INR)" },
  "fee.refSource": { en: "Reference source (optional)", te: "రిఫరెన్స్ మూలం (ఐచ్ఛికం)" },
  "fee.refSourcePh": { en: "e.g. fee schedule you have", te: "ఉదా. మీ వద్ద ఉన్న ఫీజు పట్టిక" },
  "fee.compare": { en: "Compare amounts", te: "మొత్తాలను పోల్చండి" },
  "fee.again": { en: "Compare another amount", te: "మరో మొత్తాన్ని పోల్చండి" },
  "fee.result.title": { en: "Comparison result", te: "పోలిక ఫలితం" },
  "fee.match": {
    en: "The amounts match. The amount shown equals your reference amount.",
    te: "మొత్తాలు సరిపోలిపోయాయి. చూపించిన మొత్తం మీ రిఫరెన్స్ మొత్తానికి సమానం.",
  },
  "fee.over": {
    en: "The amount shown is higher than your reference amount by the difference below. Check the official schedule before you pay.",
    te: "చూపించిన మొత్తం మీ రిఫరెన్స్ మొత్తం కంటే క్రింది తేడా అధికంగా ఉంది. చెల్లించే ముందు అధికారిక పట్టికను సరిచూసుకోండి.",
  },
  "fee.under": {
    en: "The amount shown is lower than your reference amount. Your reference may include other charges.",
    te: "చూపించిన మొత్తం మీ రిఫరెన్స్ మొత్తం కంటే తక్కువగా ఉంది. మీ రిఫరెన్స్‌లో ఇతర ఛార్జీలు చేరి ఉండవచ్చు.",
  },
  "fee.difference": { en: "Difference", te: "తేడా" },
  "fee.percent": { en: "Compared to your reference", te: "మీ రిఫరెన్స్‌తో పోలిస్తే" },
  "fee.sourceShown": { en: "Reference source", te: "రిఫరెన్స్ మూలం" },
  "fee.error.amounts": {
    en: "Enter both amounts to compare.",
    te: "పోల్చడానికి రెండు మొత్తాలను నమోదు చేయండి.",
  },
  "fee.error.invalid": {
    en: "Enter valid amounts greater than zero.",
    te: "సున్నా కంటే ఎక్కువ సరైన మొత్తాలను నమోదు చేయండి.",
  },

  "ask.kicker": { en: "Document-grounded questions", te: "పత్రం ఆధారిత ప్రశ్నలు" },
  "ask.title": { en: "Ask JanaMitra", te: "జనమిత్రను అడగండి" },
  "ask.sub": {
    en: "This local demo answers only from fictional sample documents. No AI Q&A service is connected.",
    te: "ఈ స్థానిక డెమో కల్పిత నమూనా పత్రాల నుండి మాత్రమే సమాధానం ఇస్తుంది. AI ప్రశ్నోత్తర సేవ అనుసంధానించబడలేదు.",
  },
  "ask.note": {
    en: "Questions not answered by the selected text are left unanswered.",
    te: "ఎంచుకున్న పత్రంలో లేని ప్రశ్నలకు సమాధానం ఇవ్వబడదు.",
  },
  "ask.docLabel": { en: "Sample document", te: "నమూనా పత్రం" },
  "ask.suggested": { en: "Suggested questions", te: "సూచించిన ప్రశ్నలు" },
  "ask.placeholder": { en: "What does this sample document say?", te: "ఈ నమూనా పత్రం ఏమి చెబుతుంది?" },
  "ask.label": { en: "Your question (up to 500 characters)", te: "మీ ప్రశ్న (500 అక్షరాల వరకు)" },
  "ask.send": { en: "Search the document", te: "పత్రంలో వెతకండి" },
  "ask.thinking": { en: "Searching the document…", te: "పత్రంలో వెతుకుతోంది…" },
  "ask.fallback": {
    en: "This answer isn't in the selected document's text. Try one of the suggested questions, or a question about the amounts, dates or reference numbers it contains.",
    te: "ఈ సమాధానం ఎంచుకున్న పత్రంలో లేదు. సూచించిన ప్రశ్నలు లేదా పత్రంలోని మొత్తాలు, తేదీలు, రిఫరెన్స్ నంబర్ల గురించి అడగండి.",
  },
  "ask.empty.title": { en: "Start a conversation", te: "సంభాషణ ప్రారంభించండి" },
  "ask.empty.desc": {
    en: "Choose a sample document, then ask a question. Answers come only from that document.",
    te: "నమూనా పత్రాన్ని ఎంచుకోండి, తర్వాత ప్రశ్న అడగండి. సమాధానాలు ఆ పత్రం నుండి మాత్రమే వస్తాయి.",
  },
  "ask.clear": { en: "Clear conversation", te: "సంభాషణ తొలగించండి" },
  "ask.grounded": { en: "Answered from the document", te: "పత్రం నుండి సమాధానం" },
  "ask.you": { en: "You", te: "మీరు" },
  "ask.assistant": { en: "JanaMitra", te: "జనమిత్ర" },

  "help.kicker": { en: "Prepare a request", te: "విజ్ఞప్తి సిద్ధం చేయండి" },
  "help.title": { en: "Help & grievance draft", te: "సహాయం & ఫిర్యాదు ముసాయిదా" },
  "help.sub": {
    en: "Draft a request using facts you confirm. This will not be submitted to any department.",
    te: "మీరు ధృవీకరించిన నిజాలతో విజ్ఞప్తిని రూపొందించండి. ఇది ఏ శాఖకు సమర్పించబడదు.",
  },
  "help.alert": {
    en: "Draft only — no complaint is filed. Verified official portal details are not available.",
    te: "ముసాయిదా మాత్రమే — ఫిర్యాదు నమోదు కాదు. ధృవీకరించిన అధికారిక పోర్టల్ వివరాలు అందుబాటులో లేవు.",
  },
  "help.dept": { en: "Department or office", te: "శాఖ లేదా కార్యాలయం" },
  "help.deptPh": { en: "Enter a name you have verified", te: "మీరు ధృవీకరించిన పేరు నమోదు చేయండి" },
  "help.facts": { en: "What happened?", te: "ఏమి జరిగింది?" },
  "help.factsPh": { en: "Describe only facts you have confirmed.", te: "మీరు ధృవీకరించిన నిజాలను మాత్రమే వివరించండి." },
  "help.docRef": { en: "Document reference (optional)", te: "పత్ర రిఫరెన్స్ (ఐచ్ఛికం)" },
  "help.consent": { en: "I consent to include this reference in the draft.", te: "ఈ రిఫరెన్స్‌ను ముసాయిదాలో చేర్చడానికి నన్ను అంగీకరిస్తున్నాను." },
  "help.create": { en: "Create draft", te: "ముసాయిదా సిద్ధం చేయండి" },
  "help.checklistTitle": { en: "Evidence checklist", te: "సాక్ష్య జాబితా" },
  "help.checklistSub": { en: "Consider preparing these items if they apply:", te: "వర్తిస్తే ఈ అంశాలను సిద్ధం చేయండి:" },
  "help.checklist.1": { en: "Copy of the notice or receipt", te: "నోటీసు లేదా రసీదు కాపీ" },
  "help.checklist.2": { en: "Proof of any payment made", te: "చేసిన చెల్లింపుకు రుజువు" },
  "help.checklist.3": { en: "Dates and details of prior contact", te: "గత సంప్రదింపుల తేదీలు మరియు వివరాలు" },
  "help.checklist.4": { en: "The resolution you are requesting", te: "మీరు కోరుతున్న పరిష్కారం" },
  "help.previewTitle": { en: "Your draft", te: "మీ ముసాయిదా" },
  "help.copy": { en: "Copy draft", te: "ముసాయిదా కాపీ" },
  "help.download": { en: "Download .txt", te: ".txt డౌన్‌లోడ్" },
  "help.copied": { en: "Draft copied to the clipboard.", te: "ముసాయిదా క్లిప్‌బోర్డ్‌కు కాపీ అయింది." },
  "help.error.dept": { en: "Enter the department or office name.", te: "శాఖ లేదా కార్యాలయం పేరు నమోదు చేయండి." },
  "help.error.facts": { en: "Describe what happened in a few words.", te: "ఏమి జరిగిందో కొన్ని మాటల్లో వివరించండి." },
  "help.error.consent": { en: "Tick the consent box or leave the reference empty.", te: "అంగీకార పెట్టెకు గుర్తు పెట్టండి లేదా రిఫరెన్స్ ఖాళీగా వదలండి." },

  "settings.kicker": { en: "Preferences", te: "ప్రాధాన్యతలు" },
  "settings.title": { en: "Settings", te: "సెట్టింగ్స్" },
  "settings.sub": {
    en: "Language, theme, privacy and accessibility choices are stored on this device only.",
    te: "భాష, థీమ్, గోప్యత మరియు సౌలభ్య ఎంపికలు ఈ పరికరంలో మాత్రమే నిల్వ ఉంటాయి.",
  },
  "settings.language": { en: "Language", te: "భాష" },
  "settings.languageSub": { en: "Interface language for titles, labels and buttons.", te: "శీర్షికలు, లేబిళ్లు, బటన్ల కోసం ఇంటర్‌ఫేస్ భాష." },
  "settings.theme": { en: "Theme", te: "థీమ్" },
  "settings.themeSub": { en: "Choose how JanaMitra looks on this device.", te: "ఈ పరికరంలో జనమిత్ర ఎలా కనిపించాలో ఎంచుకోండి." },
  "settings.theme.light": { en: "Light", te: "లైట్" },
  "settings.theme.dark": { en: "Dark", te: "డార్క్" },
  "settings.privacy": { en: "Privacy", te: "గోప్యత" },
  "settings.privacySub": { en: "Nothing leaves this device without your consent.", te: "మీ అనుమతి లేకుండా ఏమీ ఈ పరికరం నుండి బయటకు వెళ్ళదు." },
  "settings.saveHistory": { en: "Keep saved documents on this device", te: "సేవ్ చేసిన పత్రాలను ఈ పరికరంలో ఉంచుకోండి" },
  "settings.clearData": { en: "Clear saved documents", te: "సేవ్ చేసిన పత్రాలను తొలగించండి" },
  "settings.cleared": { en: "Saved documents were removed from this device.", te: "సేవ్ చేసిన పత్రాలు ఈ పరికరం నుండి తొలగించబడ్డాయి." },
  "settings.a11y": { en: "Accessibility", te: "సౌలభ్యత" },
  "settings.a11ySub": { en: "Adjust text size, contrast and motion.", te: "టెక్స్ట్ పరిమాణం, కాంట్రాస్ట్ మరియు మోషన్ సర్దుబాటు చేయండి." },
  "settings.textSize": { en: "Text size", te: "టెక్స్ట్ పరిమాణం" },
  "settings.text.default": { en: "Default", te: "డిఫాల్ట్" },
  "settings.text.lg": { en: "Large", te: "పెద్ద" },
  "settings.text.xl": { en: "Larger", te: "మరింత పెద్ద" },
  "settings.contrast": { en: "High contrast", te: "అధిక కాంట్రాస్ట్" },
  "settings.motion": { en: "Reduce motion", te: "మోషన్ తగ్గించండి" },

  "common.cancel": { en: "Cancel", te: "రద్దు చేయండి" },
  "common.close": { en: "Close", te: "మూసివేయండి" },
  "common.save": { en: "Save", te: "సేవ్ చేయండి" },
  "common.back": { en: "Back to home", te: "హోమ్‌కి వెళ్ళండి" },
  "common.optional": { en: "Optional", te: "ఐచ్ఛికం" },
} satisfies Record<string, Entry>;

export type TKey = keyof typeof D;

export function getEntry(key: TKey): Entry {
  return D[key];
}

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TKey) => string;
  pick: (v: { en: string; te: string }) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  lang,
  setLang,
  children,
}: {
  lang: Lang;
  setLang: (lang: Lang) => void;
  children: ReactNode;
}) {
  const t = useCallback(
    (key: TKey) => {
      const entry = D[key];
      if (!entry) return key;
      return entry[lang] || entry.en;
    },
    [lang],
  );

  const pick = useCallback((v: { en: string; te: string }) => v[lang] || v.en, [lang]);

  const value = useMemo(() => ({ lang, setLang, t, pick }), [lang, setLang, t, pick]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
