const INITIAL_USER_PROFILE = {
  name: "Anya Bandgar",
  email: "anyabandgar458@gmail.com",
  educationStage: "graduate_job_seeker",
  degreeOrStream: "Bachelor Degree (Final Year / Graduate)",
  currentYear: "Final Year Aspirant",
  targetGoal: "National & State Competitive Exams",
  targetExamId: "upsc_cse",
  targetYear: "2026",
  dailyHours: 4,
  language: "en",
  weakTopics: ["Data Interpretation & Quant", "Indian Polity & Constitutional Articles", "Logical Reasoning & Reading Comprehension"],
  strongTopics: ["Modern Indian History", "General Science & Environment", "Basic Numeracy & Arithmetic"],
  completedTopicIds: ["upsc-topic-1", "upsc-topic-2"],
  bookmarkedResourceIds: ["res-ncert-polity", "res-khan-quant", "res-pib-current"],
  bookmarkedQuestionIds: ["pyq-upsc-polity-1", "pyq-ssc-quant-1"],
  streakDays: 14,
  totalStudyMinutes: 2540,
  questionsSolved: 183,
  correctAnswers: 143,
  lastActiveDate: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
};
const EXAMS_DATABASE = [
  {
    id: "upsc_cse",
    name: "UPSC CSE",
    fullName: "Civil Services Examination (IAS, IPS, IFS, IRS)",
    conductingBody: "Union Public Service Commission (UPSC)",
    officialWebsite: "https://upsc.gov.in",
    notificationPeriod: "February annually",
    examDates: "Prelims in May/June, Mains in September",
    educationalQualification: "Candidate must hold a degree of any recognized University in India. Final year appearing students are fully eligible to apply for Prelims.",
    allowedStreams: ["Any bachelor degree (B.A., B.Sc., B.Com, B.Tech, MBBS, BBA, BCA, etc.)"],
    minimumMarks: "Pass degree from a recognized university. No minimum % cutoff required.",
    ageCriteriaGeneral: "Minimum 21 years and Maximum 32 years as on 1st August of the exam year. Max 6 attempts.",
    ageRelaxations: {
      obc: "Up to 35 years (3 years relaxation), 9 attempts",
      scSt: "Up to 37 years (5 years relaxation), Unlimited attempts until age limit",
      pwd: "Up to 42 years (10 years relaxation), 9 attempts for Gen/OBC, unlimited for SC/ST",
      ews: "No age relaxation (Max 32 years), 6 attempts"
    },
    examStages: [
      {
        stageName: "Stage 1: Civil Services Preliminary Exam",
        format: "Two objective papers: GS Paper I (200 marks) + CSAT Paper II (200 marks, qualifying at 33%)",
        marks: 400,
        duration: "2 Hours per paper",
        negativeMarking: "1/3rd (0.33%) deduction for each incorrect answer"
      },
      {
        stageName: "Stage 2: Civil Services Mains Exam",
        format: "Written Descriptive (9 papers: 2 qualifying languages, 1 Essay, 4 GS Papers, 2 Optional Papers)",
        marks: 1750,
        duration: "5 Days (3 Hours per paper)",
        negativeMarking: "Descriptive assessment"
      },
      {
        stageName: "Stage 3: Personality Test (Interview)",
        format: "Direct Board Interview assessing leadership, integrity, analytical temperament, and societal vision",
        marks: 275,
        duration: "30-45 minutes",
        negativeMarking: "N/A"
      }
    ],
    subjectWeightage: [
      { subject: "Indian Polity & Governance", weightagePercentage: 18, keyTopics: ["Constitutional Framework", "Fundamental Rights & Duties", "Judiciary", "Panchayati Raj"] },
      { subject: "Modern Indian History & Culture", weightagePercentage: 16, keyTopics: ["Freedom Struggle (1857-1947)", "Art & Architecture", "Socio-religious Reforms"] },
      { subject: "Indian Economy & Social Development", weightagePercentage: 16, keyTopics: ["Monetary & Fiscal Policy", "Inflation & Growth", "Sustainable Development Goals", "Budget"] },
      { subject: "Environment & Ecology", weightagePercentage: 15, keyTopics: ["Biodiversity Hotspots", "Climate Treaties", "Protected Area Network", "Pollution Control"] },
      { subject: "General Science & Emerging Tech", weightagePercentage: 12, keyTopics: ["Biotechnology", "Space Missions", "AI & Quantum Computing", "Health & Diseases"] },
      { subject: "Geography (Indian & Physical)", weightagePercentage: 13, keyTopics: ["Monsoon Systems", "Plate Tectonics", "Rivers & Drainage", "Resource Distribution"] },
      { subject: "Current Affairs & International Relations", weightagePercentage: 10, keyTopics: ["Bilateral Treaties", "Multilateral Forums (G20, QUAD, BRICS)", "Important National Schemes"] }
    ],
    verifiedDate: "August 2026",
    officialSourceLabel: "UPSC Official Annual Notification & Civil Services Examination Rules"
  },
  {
    id: "ssc_cgl",
    name: "SSC CGL",
    fullName: "Staff Selection Commission - Combined Graduate Level Examination",
    conductingBody: "Staff Selection Commission (SSC)",
    officialWebsite: "https://ssc.gov.in",
    notificationPeriod: "June - July annually",
    examDates: "Tier-1 in September/October, Tier-2 in December/January",
    educationalQualification: "Bachelor's Degree from a recognized University or equivalent. Final year candidates can also apply provided they acquire essential qualification on or before the cutoff date.",
    allowedStreams: ["All undergraduate degrees recognized by UGC"],
    minimumMarks: "Pass degree (Some specific posts like Assistant Audit Officer require commerce/finance background for preference).",
    ageCriteriaGeneral: "18 to 27 years or 18 to 30/32 years depending on specific post group.",
    ageRelaxations: {
      obc: "3 years relaxation (up to 33/35 years)",
      scSt: "5 years relaxation (up to 35/37 years)",
      pwd: "10 to 15 years relaxation depending on category",
      ews: "No age relaxation"
    },
    examStages: [
      {
        stageName: "Tier-I (Computer Based Test)",
        format: "Objective Multiple Choice: Reasoning, General Awareness, Quantitative Aptitude, English Comprehension",
        marks: 200,
        duration: "60 Minutes",
        negativeMarking: "0.50 marks deducted for each wrong answer"
      },
      {
        stageName: "Tier-II (Computer Based Test + Data Entry Skill Test)",
        format: "Paper-I: Math, Reasoning, English, General Awareness, Computer Knowledge Module + Typing Test",
        marks: 390,
        duration: "2 Hours 15 Minutes + 15 Min Typing",
        negativeMarking: "1 mark deducted for each wrong answer in Section I & II"
      }
    ],
    subjectWeightage: [
      { subject: "Quantitative Aptitude (Arithmetic & Advanced Math)", weightagePercentage: 30, keyTopics: ["Trigonometry", "Geometry & Mensuration", "Algebra", "Profit & Loss", "Time & Work"] },
      { subject: "Reasoning & General Intelligence", weightagePercentage: 28, keyTopics: ["Syllogism", "Blood Relations", "Coding-Decoding", "Series", "Non-Verbal Analogies"] },
      { subject: "English Language & Comprehension", weightagePercentage: 27, keyTopics: ["Active/Passive Voice", "Direct/Indirect Speech", "Reading Comprehension", "Idioms & Vocab"] },
      { subject: "General Awareness & Static GK", weightagePercentage: 15, keyTopics: ["Indian Constitution", "Ancient & Modern History", "Science in Daily Life", "Current Affairs"] }
    ],
    verifiedDate: "July 2026",
    officialSourceLabel: "SSC Official Recruitment Notice"
  },
  {
    id: "ibps_po",
    name: "IBPS / SBI PO",
    fullName: "Probationary Officer & Management Trainee Recruitment (Public Sector Banks & SBI)",
    conductingBody: "Institute of Banking Personnel Selection (IBPS) & State Bank of India",
    officialWebsite: "https://ibps.in",
    notificationPeriod: "August - September annually",
    examDates: "Prelims in October, Mains in November, Interviews in Jan/Feb",
    educationalQualification: "A Degree (Graduation) in any discipline from a University recognized by the Govt. of India or any equivalent qualification.",
    allowedStreams: ["Any stream (Arts, Science, Commerce, Engineering, Agriculture, Management)"],
    minimumMarks: "Pass degree (No minimum percentage required for IBPS PO; 50% for select specialist scales)",
    ageCriteriaGeneral: "20 to 30 years as on date of notification",
    ageRelaxations: {
      obc: "3 years relaxation (up to 33 years)",
      scSt: "5 years relaxation (up to 35 years)",
      pwd: "10 years relaxation (up to 40 years)",
      ews: "No age relaxation"
    },
    examStages: [
      {
        stageName: "Preliminary Examination (Objective CBT)",
        format: "English Language (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs)",
        marks: 100,
        duration: "60 Minutes (20 min sectional limit)",
        negativeMarking: "0.25 marks deduction per wrong answer"
      },
      {
        stageName: "Main Examination (Objective + Descriptive)",
        format: "Reasoning & Computer (45 Qs), General/Economy/Banking Awareness (40 Qs), English (35 Qs), Data Analysis & Interpretation (35 Qs) + Descriptive English (Letter & Essay)",
        marks: 225,
        duration: "3 Hours 30 Minutes",
        negativeMarking: "0.25 marks deduction per wrong answer"
      },
      {
        stageName: "Interview & Psychometric Evaluation",
        format: "Personal Interview & Group Discussion assessing financial acumen, communication, and leadership",
        marks: 100,
        duration: "20-30 Minutes",
        negativeMarking: "N/A"
      }
    ],
    subjectWeightage: [
      { subject: "Data Analysis & Interpretation (DI)", weightagePercentage: 35, keyTopics: ["Pie Charts & Caselets", "Radar & Bar Graphs", "Probability & Missing DI", "Data Sufficiency"] },
      { subject: "Reasoning Ability & Puzzles", weightagePercentage: 30, keyTopics: ["Floor/Box Puzzles", "Circular Seating Arrangements", "Machine Input-Output", "Reverse Syllogisms"] },
      { subject: "Banking & Financial Awareness", weightagePercentage: 20, keyTopics: ["RBI Monetary Policy", "NPA & Basel III Norms", "Financial Inclusion & UPI", "Current Fiscal News"] },
      { subject: "English Language", weightagePercentage: 15, keyTopics: ["Cloze Test", "Reading Comprehension", "Sentence Rearrangement", "Error Spotting"] }
    ],
    verifiedDate: "September 2026",
    officialSourceLabel: "IBPS Official Common Recruitment Process Notification"
  },
  {
    id: "nda_exam",
    name: "NDA & NA",
    fullName: "National Defence Academy & Naval Academy Examination",
    conductingBody: "Union Public Service Commission (UPSC)",
    officialWebsite: "https://upsc.gov.in",
    notificationPeriod: "Twice a year (Dec-Jan for NDA-I, May-Jun for NDA-II)",
    examDates: "April (NDA-I) and September (NDA-II)",
    educationalQualification: "For Army Wing: 12th Class pass of 10+2 pattern or equivalent. For Air Force and Naval Wings: 12th Class pass with Physics, Chemistry and Mathematics.",
    allowedStreams: ["12th Standard PCM for Navy/Air Force; Any stream for Army Wing"],
    minimumMarks: "Pass certificate in 10+2. Candidates appearing in 12th standard are also eligible.",
    ageCriteriaGeneral: "Must be between 16.5 and 19.5 years on the date of course commencement.",
    ageRelaxations: {
      obc: "No age relaxation for defence commission",
      scSt: "No age relaxation",
      pwd: "Not applicable (Armed Forces medical standards apply)",
      ews: "No age relaxation"
    },
    examStages: [
      {
        stageName: "Written Examination",
        format: "Mathematics (300 marks) + General Ability Test (GAT) (600 marks)",
        marks: 900,
        duration: "2.5 Hours each paper",
        negativeMarking: "0.83 marks for Math, 1.33 marks for GAT per wrong answer"
      },
      {
        stageName: "SSB Interview (Services Selection Board)",
        format: "5-Day comprehensive personality evaluation: Screening, Psychological tests, Group Tasks, Personal Interview",
        marks: 900,
        duration: "5 Days residential",
        negativeMarking: "Officer Like Qualities (OLQ) evaluation"
      }
    ],
    subjectWeightage: [
      { subject: "Mathematics (11th & 12th Level)", weightagePercentage: 35, keyTopics: ["Trigonometry", "Matrices & Determinants", "Calculus", "Vector Algebra", "Probability"] },
      { subject: "English (Vocabulary & Grammar)", weightagePercentage: 25, keyTopics: ["Grammar Usage", "Comprehension", "Synonyms & Antonyms", "Sentence Ordering"] },
      { subject: "General Science (Physics, Chem, Bio)", weightagePercentage: 25, keyTopics: ["Newtonian Mechanics", "Electricity & Magnetism", "Acids & Bases", "Human Biology"] },
      { subject: "History, Geography & Current Affairs", weightagePercentage: 15, keyTopics: ["Indian Freedom Movement", "World Geography & Climate", "Defence News"] }
    ],
    verifiedDate: "July 2026",
    officialSourceLabel: "UPSC NDA & NA Official Notification"
  },
  {
    id: "cat_exam",
    name: "CAT",
    fullName: "Common Admission Test for Indian Institutes of Management (IIMs)",
    conductingBody: "Rotating IIM (e.g. IIM Calcutta / Bangalore)",
    officialWebsite: "https://iimcat.ac.in",
    notificationPeriod: "Late July / Early August",
    examDates: "Last Sunday of November",
    educationalQualification: "Bachelor Degree with at least 50% marks or equivalent CGPA (45% for SC, ST and PwD). Final year students are eligible.",
    allowedStreams: ["Any bachelor degree (Engineering, Commerce, Humanities, Science, etc.)"],
    minimumMarks: "50% aggregate for General/NC-OBC/EWS, 45% for SC/ST/PwD",
    ageCriteriaGeneral: "No age limit.",
    ageRelaxations: {
      obc: "No age limit (Category cutoff relaxation applies)",
      scSt: "No age limit (Category cutoff relaxation applies)",
      pwd: "No age limit (Category cutoff relaxation applies)",
      ews: "No age limit"
    },
    examStages: [
      {
        stageName: "Computer Based Test",
        format: "3 Sections: VARC (24 Qs), DILR (20 Qs), QA (22 Qs)",
        marks: 198,
        duration: "120 Minutes (40 Minutes sectional time limit)",
        negativeMarking: "+3 for correct, -1 for incorrect MCQ. Zero negative for Non-MCQ (TITA)."
      }
    ],
    subjectWeightage: [
      { subject: "Quantitative Aptitude (QA)", weightagePercentage: 33, keyTopics: ["Arithmetic", "Algebra & Quadratic Equations", "Geometry & Mensuration", "Number Systems"] },
      { subject: "Verbal Ability & Reading Comprehension (VARC)", weightagePercentage: 36, keyTopics: ["RC Passages (Philosophy, Science, Economics)", "Para Jumbles", "Summary Completion"] },
      { subject: "Data Interpretation & Logical Reasoning (DILR)", weightagePercentage: 31, keyTopics: ["Arrangements & Puzzles", "Matrix & Grid Games", "Charts & Graphs", "Set Theory Venn Diagrams"] }
    ],
    verifiedDate: "August 2026",
    officialSourceLabel: "IIM CAT Official Press Release & Admission Policy"
  },
  {
    id: "state_psc",
    name: "State PSC (MPSC / UPPSC / BPSC)",
    fullName: "State Public Service Commission Examinations (Deputy Collector, DSP, Tehsildar)",
    conductingBody: "Respective State Public Service Commissions",
    officialWebsite: "https://mpsc.gov.in",
    notificationPeriod: "Varies by state (Usually Spring / Autumn)",
    examDates: "Prelims, Mains & Interview cycles",
    educationalQualification: "Graduate in any discipline from a recognized University. State language proficiency required for specific administrative roles.",
    allowedStreams: ["Any recognized bachelor degree"],
    minimumMarks: "Pass degree (No minimum percentage required)",
    ageCriteriaGeneral: "19 or 21 to 38/40 years (varies per state guidelines)",
    ageRelaxations: {
      obc: "3 to 5 years relaxation per state rules",
      scSt: "5 years relaxation",
      pwd: "Up to 45 years in most states",
      ews: "Per state gazette norms"
    },
    examStages: [
      {
        stageName: "State Preliminary Exam",
        format: "General Studies Paper I + CSAT / Aptitude Paper II",
        marks: 400,
        duration: "2 Hours per paper",
        negativeMarking: "0.25 to 0.33 marks per wrong answer"
      },
      {
        stageName: "State Mains Written Exam",
        format: "Descriptive or Objective papers covering State History, Geography, Polity, Language, and General Studies",
        marks: 800,
        duration: "Multiple sessions",
        negativeMarking: "Per state syllabus specification"
      },
      {
        stageName: "Interview / Viva-Voce",
        format: "Board interview testing state administrative awareness and ethical temperament",
        marks: 100,
        duration: "25-35 Minutes",
        negativeMarking: "N/A"
      }
    ],
    subjectWeightage: [
      { subject: "State Specific History, Culture & Geography", weightagePercentage: 30, keyTopics: ["State Social Reformers", "River Basins & Agriculture", "State Industrial Policy", "Tribal Culture"] },
      { subject: "Indian Polity & Governance", weightagePercentage: 25, keyTopics: ["State Legislature", "High Courts", "Panchayati Raj & Zilla Parishad", "Right to Information"] },
      { subject: "Economy & Planning", weightagePercentage: 25, keyTopics: ["State Budget", "Agriculture Economics", "Cooperative Movement", "Infrastructural Schemes"] },
      { subject: "General Science & Mental Ability", weightagePercentage: 20, keyTopics: ["Science in Daily Life", "Logical Reasoning", "Numerical Puzzles"] }
    ],
    verifiedDate: "September 2026",
    officialSourceLabel: "State Public Service Commission Gazettes"
  },
  {
    id: "gate_exam",
    name: "GATE (Engineering & Tech)",
    fullName: "Graduate Aptitude Test in Engineering (All 30 Disciplines: CSE, Mech, Civil, ECE, EE, etc.)",
    conductingBody: "IISc / IITs (National Coordination Board)",
    officialWebsite: "https://gate.iisc.ac.in",
    notificationPeriod: "August - September annually",
    examDates: "First two weekends of February",
    educationalQualification: "Bachelor degree in Engineering / Technology / Architecture / Science / Humanities or currently in the 3rd year or higher of any undergraduate degree program.",
    allowedStreams: ["All Engineering Branches, B.Sc, BCA, MCA, M.Sc, etc."],
    minimumMarks: "No minimum percentage required to appear.",
    ageCriteriaGeneral: "No age limit whatsoever.",
    ageRelaxations: {
      obc: "No age restriction",
      scSt: "No age restriction",
      pwd: "No age restriction (Compensatory time & scribe allowed)",
      ews: "No age restriction"
    },
    examStages: [
      {
        stageName: "Computer Based Test (Single Paper)",
        format: "Online CBT with MCQs, MSQs, and NAT questions",
        marks: 100,
        duration: "180 Minutes (3 Hours)",
        negativeMarking: "1/3 mark for 1-mark MCQ, 2/3 mark for 2-mark MCQ. No negative marking for NAT or MSQ."
      }
    ],
    subjectWeightage: [
      { subject: "Engineering Mathematics / Core Mathematics", weightagePercentage: 15, keyTopics: ["Calculus", "Linear Algebra", "Probability & Statistics", "Discrete Math"] },
      { subject: "Core Technical Branch Subjects", weightagePercentage: 70, keyTopics: ["Branch Specific Foundational Theories", "Applied Design & Systems", "Analytical Problem Solving"] },
      { subject: "General Aptitude", weightagePercentage: 15, keyTopics: ["Verbal Ability", "Numerical Computation", "Spatial Aptitude"] }
    ],
    verifiedDate: "September 2026",
    officialSourceLabel: "GATE National Coordination Board Brochure"
  }
];
const CAREERS_DATABASE = [
  {
    id: "civil_services_officer",
    title: "Civil Services Officer (IAS / IPS / IFS / IRS)",
    sector: "Government of India - Administrative & Diplomatic Services",
    shortDescription: "Lead public policy, district administration, national security, law enforcement, and foreign diplomacy.",
    fullDescription: "Civil servants formulate and execute government policies, maintain public order, manage emergency responses, spearhead rural development initiatives, and represent India in bilateral and multilateral international negotiations.",
    requiredEducation: ["Any Bachelor Degree (Recognized University)"],
    coreSkills: ["Broad Analytical Reasoning", "Public Administration & Ethics", "Crisp Written Communication", "Crisis Management", "Empathetic Leadership"],
    salaryRangeINR: "\u20B956,100 basic + DA + HRA (Level 10 Pay Matrix) up to Cabinet Secretary (Level 17)",
    growthOutlook: "Pinnacle of administrative leadership in India.",
    topRecruiters: ["Government of India", "State Governments"],
    entryExams: ["UPSC Civil Services Examination (CSE)", "State Public Service Commission Exams (MPSC, UPPSC, BPSC, etc.)"],
    dayInTheLife: "Morning briefing on district law & order, inspecting government health centers and schools, reviewing disaster mitigation funds, meeting citizens in public grievance redressal, and chairing development committees.",
    pathwayFrom10th: ["Any 10+2 stream (Humanities, Science, or Commerce)", "Any recognized Bachelor Degree", "Habit of reading quality newspapers (The Hindu / Indian Express)", "UPSC Mains Answer writing foundation"],
    pathwayFromDiploma: ["Diploma in any field", "Lateral Degree or Open University Degree (UGC recognized)", "Start GS preparation during graduation"],
    pathwayFromBTech: ["Degree provides strong analytical base", "Choose optional subject", "Target 1-2 years of intensive structured study"],
    recommendedRoadmapId: "roadmap_upsc_cse"
  },
  {
    id: "central_govt_officer",
    title: "Central Government Inspector & Officer (SSC CGL)",
    sector: "Central Ministries & Law Enforcement (Income Tax, Customs, CBI, ASO)",
    shortDescription: "Key executive roles in Central Secretariats, Ministry of External Affairs, Central Bureau of Investigation, and Indirect Taxes.",
    fullDescription: "Officers selected through SSC CGL serve as the executive backbone of central ministries, analyzing financial statements, inspecting cargo, assisting diplomatic missions, and auditing national expenditure.",
    requiredEducation: ["Any Bachelor Degree from a recognized University"],
    coreSkills: ["Quantitative Aptitude & Calculation Speed", "Logical Reasoning", "Statutory Compliance & Auditing", "Verbal Communication", "Data Entry Accuracy"],
    salaryRangeINR: "\u20B944,900 - \u20B91,42,400 (Level 7 / Level 8 Pay Matrix)",
    growthOutlook: "High Stability with time-bound promotions to Assistant Commissioner, Deputy Director, and Joint Commissioner.",
    topRecruiters: ["Central Board of Direct Taxes (CBDT)", "Central Bureau of Investigation (CBI)", "Ministry of External Affairs (MEA)", "CAG Office"],
    entryExams: ["SSC CGL (Combined Graduate Level)"],
    dayInTheLife: "Verifying corporate and individual tax filings, drafting ministerial briefings, liaising with enforcement officers, processing statutory reports, and conducting compliance audits.",
    pathwayFrom10th: ["Complete 10+2 in any stream with solid math basics", "Pursue any undergraduate degree", "Master speed calculations and English vocabulary"],
    pathwayFromDiploma: ["Diploma + Bachelor degree completion", "Prepare for Tier-1 and Tier-2 speed test format"],
    pathwayFromBTech: ["Graduate degree qualifies directly", "Leverage quant skills for fast math scoring", "Focus on General Awareness and English Grammar"],
    recommendedRoadmapId: "roadmap_ssc_cgl"
  },
  {
    id: "bank_probationary_officer",
    title: "Bank Probationary Officer / Branch Manager",
    sector: "Banking & Financial Institutions (SBI, PNB, Bank of Baroda, RBI)",
    shortDescription: "Manage credit disbursements, branch operations, loan appraisals, corporate banking, and financial inclusions.",
    fullDescription: "Bank Probationary Officers undergo two years of rigorous on-job training in treasury, forex, retail lending, agriculture credit, and branch operations before taking charge as Branch Managers, Chief Managers, and Assistant General Managers.",
    requiredEducation: ["Any Bachelor Degree in Arts, Science, Commerce, Engineering, or Agriculture"],
    coreSkills: ["High-Speed Numerical Calculations", "Data Interpretation & Graphs", "Risk Assessment & Credit Appraisal", "Financial Regulations", "Customer Service"],
    salaryRangeINR: "\u20B98,00,000 - \u20B914,00,000 CTC + Leased Accommodation & Concessional Loans",
    growthOutlook: "Rapid merit-based promotions to Chief General Manager, Executive Director, and Managing Director.",
    topRecruiters: ["State Bank of India (SBI)", "Punjab National Bank", "Bank of Baroda", "Canara Bank", "Reserve Bank of India (RBI Grade B)"],
    entryExams: ["IBPS PO", "SBI PO", "RBI Grade B", "IBPS Clerk"],
    dayInTheLife: "Scrutinizing loan proposals and mortgage collateral, analyzing balance sheets of MSME applicants, reconciling daily ledger balances, and cross-selling mutual funds and insurance.",
    pathwayFrom10th: ["10+2 in any stream (Commerce or Science beneficial)", "Any Bachelor degree", "Dedicate 6-9 months to speed mock tests and DI puzzles"],
    pathwayFromDiploma: ["Complete diploma + degree", "Practice Vedic math tricks and reasoning puzzles"],
    pathwayFromBTech: ["Analytical background provides competitive edge in DI and Reasoning sections"],
    recommendedRoadmapId: "roadmap_banking_po"
  },
  {
    id: "business_leader_mba",
    title: "Management Consultant & Corporate Business Leader",
    sector: "Corporate Strategy, Management Consulting & Product Leadership",
    shortDescription: "Drive enterprise transformations, market expansion, private equity evaluations, and Fortune 500 corporate strategy.",
    fullDescription: "Graduates from top Indian Institutes of Management (IIMs) and premier business schools spearhead mergers & acquisitions, supply chain optimizations, product strategy, and organizational turnarounds across international markets.",
    requiredEducation: ["Any Bachelor Degree (Min 50%) + MBA / PGDM from top tier institution"],
    coreSkills: ["Strategic Problem Solving", "Quantitative Financial Modeling", "High-Speed Reading & Synthesis", "Executive Communication", "Team Negotiation"],
    salaryRangeINR: "\u20B922,00,000 - \u20B960,00,000+ CTC per annum",
    growthOutlook: "Pinnacle of executive leadership, fast-track to Partner, VP, and Chief Executive Officer (CEO).",
    topRecruiters: ["McKinsey & Co", "Boston Consulting Group (BCG)", "Bain & Co", "Goldman Sachs", "Amazon", "Tata Sons", "Google"],
    entryExams: ["CAT (Common Admission Test)", "XAT", "GMAT"],
    dayInTheLife: "Presenting strategic frameworks to C-suite clients, building DCF financial valuation models, analyzing competitive market matrices, and facilitating cross-functional sprint planning.",
    pathwayFrom10th: ["10+2 in any stream", "Bachelor degree with stellar academic records", "Participate in leadership, sports, or debates for profile building"],
    pathwayFromDiploma: ["Diploma + B.Tech / B.Com / B.Sc", "Target 99+ percentile in CAT"],
    pathwayFromBTech: ["Strong quant base helps in QA and DILR", "Strengthen verbal reading comprehension with diverse essays (Aeon, The Economist)"],
    recommendedRoadmapId: "roadmap_cat_mba"
  },
  {
    id: "ai_ml_engineer",
    title: "AI & Machine Learning Engineer",
    sector: "Technology & Artificial Intelligence",
    shortDescription: "Design, develop, and deploy production machine learning models, neural networks, and generative AI systems.",
    fullDescription: "AI/ML Engineers build data pipelines, train transformer models, fine-tune LLMs, optimize inference latency, and deploy scalable AI solutions across cloud infrastructures.",
    requiredEducation: ["Degree in CSE, IT, AI/DS, Electrical, Math, or B.Sc / BCA with strong portfolio"],
    coreSkills: ["Python & C++", "PyTorch / TensorFlow", "Linear Algebra & Probability", "Data Structures & Algorithms", "MLOps & Vector Databases"],
    salaryRangeINR: "\u20B910,00,000 - \u20B935,00,000+ per annum",
    growthOutlook: "Exceptional (+38% expansion over 5 years across India & Global tech hubs)",
    topRecruiters: ["Google DeepMind", "Microsoft India", "NVIDIA", "Amazon AWS", "Flipkart", "Zomato", "Leading AI Startups"],
    entryExams: ["Campus Placements / Open Source Proof-of-Work", "GATE (for IIT research M.Tech)"],
    dayInTheLife: "Starts with analyzing model training runs, testing feature embeddings, writing clean Python pipelines, refactoring API endpoints, and reviewing algorithmic PRs.",
    pathwayFrom10th: ["10+2 Science (PCM)", "B.Tech in CSE or AI/Data Science", "Specialize in Deep Learning & Math"],
    pathwayFromDiploma: ["3-Year Polytechnic Diploma in CSE / IT", "Lateral Entry B.Tech", "Build ML GitHub portfolio"],
    pathwayFromBTech: ["Master Python & PyTorch", "Build real projects and open-source contributions"],
    recommendedRoadmapId: "roadmap_tech_careers"
  }
];
const ROADMAPS_DATABASE = {
  roadmap_upsc_cse: {
    id: "roadmap_upsc_cse",
    goalId: "upsc_cse",
    title: "UPSC Civil Services (IAS / IPS) Master Pathway",
    description: "A 5-phase structured roadmap: from NCERT basic foundations and standard reference texts, to answer writing, CSAT, and test series revision.",
    totalWeeks: 48,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: NCERT Foundation & Core Polity",
        durationWeeks: 10,
        objective: "Build unbreakable conceptual clarity in Indian Constitution, Polity, and Modern Indian History.",
        topics: [
          {
            id: "upsc-topic-1",
            title: "Constitutional Framework & Fundamental Rights",
            estimatedHours: 28,
            description: "Preamble, Fundamental Rights (Articles 12-35), Directive Principles (DPSP), and Fundamental Duties.",
            coreConcepts: ["Basic Structure Doctrine (Kesavananda Bharati)", "Judicial Review vs Judicial Activism", "Article 21 Expansions"],
            freeResourceLink: "https://ncert.nic.in/textbook.php",
            pyqCount: 45,
            completed: true
          },
          {
            id: "upsc-topic-2",
            title: "Parliament, Federal Structure & Judiciary",
            estimatedHours: 26,
            description: "Lok Sabha, Rajya Sabha legislative procedures, Supreme Court jurisdiction, Center-State relations, Emergency provisions.",
            coreConcepts: ["Money Bill vs Financial Bill", "Writ Jurisdictions (Art 32 vs 226)", "Panchayati Raj 73rd/74th Amendments"],
            freeResourceLink: "https://swayam.gov.in",
            pyqCount: 52,
            completed: true
          },
          {
            id: "upsc-topic-3",
            title: "Modern Indian History & Freedom Struggle (1857-1947)",
            estimatedHours: 32,
            description: "Revolt of 1857, Indian National Congress phases, Gandhian movements, Subhas Chandra Bose, and Constitutional evolution.",
            coreConcepts: ["Non-Cooperation to Civil Disobedience", "Government of India Acts (1919 & 1935)", "Partition Politics"],
            freeResourceLink: "https://egyankosh.ac.in",
            pyqCount: 60,
            completed: false
          }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: Indian Economy, Geography & Environment",
        durationWeeks: 12,
        objective: "Master macroeconomic indicators, physical/Indian geography, biodiversity, and climate agreements.",
        topics: [
          {
            id: "upsc-topic-4",
            title: "Macroeconomics, Fiscal & Monetary Policies",
            estimatedHours: 30,
            description: "GDP, Inflation (CPI/WPI), RBI monetary policy tools (Repo, Reverse Repo, CRR), Union Budget, and Taxation.",
            coreConcepts: ["Monetary Policy Transmission", "Current Account Deficit (CAD)", "Direct Taxes & GST Council"],
            freeResourceLink: "https://ncert.nic.in/textbook.php",
            pyqCount: 48,
            completed: false
          },
          {
            id: "upsc-topic-5",
            title: "Ecology, Biodiversity & International Climate Treaties",
            estimatedHours: 26,
            description: "Ecosystem trophic levels, national parks, Wildlife Protection Act, UNFCCC COP summits, Paris Agreement, Renewable goals.",
            coreConcepts: ["Biomagnification vs Bioaccumulation", "IUCN Red List Categories", "Ramsar Wetlands of India"],
            freeResourceLink: "https://swayam.gov.in",
            pyqCount: 44,
            completed: false
          },
          {
            id: "upsc-topic-6",
            title: "Physical & Human Geography of India",
            estimatedHours: 28,
            description: "Monsoon mechanisms, Himalayan and Peninsular river systems, soil classification, mineral resources, and demographic trends.",
            coreConcepts: ["El Nino, La Nina and Indian Ocean Dipole", "Plate Tectonics & Earthquakes", "Urbanization Patterns"],
            freeResourceLink: "https://ncert.nic.in/textbook.php",
            pyqCount: 38,
            completed: false
          }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: Ethics, Society & CSAT Paper-II",
        durationWeeks: 8,
        objective: "Score 120+ in GS Paper-4 (Ethics) and guarantee safe qualification (>45%) in CSAT Aptitude.",
        topics: [
          {
            id: "upsc-topic-7",
            title: "CSAT Paper-II: Reading Comprehension & Logical Reasoning",
            estimatedHours: 24,
            description: "Passage inferences, assumption testing, syllogisms, linear/circular arrangements, and direction puzzles.",
            coreConcepts: ["Critical Inferences vs Author Opinions", "Elimination of Extreme Options", "Time Management Strategy"],
            freeResourceLink: "https://swayam.gov.in",
            pyqCount: 50,
            completed: false
          },
          {
            id: "upsc-topic-8",
            title: "Ethics, Integrity & Case Studies (GS-4)",
            estimatedHours: 30,
            description: "Moral philosophers, public service values, emotional intelligence, anti-corruption mechanisms, and ethical dilemma case studies.",
            coreConcepts: ["Utilitarianism vs Deontology", "Conflict of Interest Resolution", "Probity in Governance"],
            freeResourceLink: "https://egyankosh.ac.in",
            pyqCount: 35,
            completed: false
          }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4: Mains Answer Writing & Current Affairs Synthesis",
        durationWeeks: 10,
        objective: "Develop high-speed 3-hour answer writing capability with diagrams, committee references, and balanced conclusions.",
        topics: [
          {
            id: "upsc-topic-9",
            title: "Mains Structured Answer Formulation",
            estimatedHours: 40,
            description: "Introduction framing, multi-dimensional body (PESTLE approach), relevant committee recommendations, and visionary conclusions.",
            coreConcepts: ["Direct, Crisp Introductions", "Flowcharts and Maps Integration", "Balanced Constitutional Stand"],
            freeResourceLink: "https://swayam.gov.in",
            pyqCount: 120,
            completed: false
          }
        ]
      },
      {
        phaseNumber: 5,
        phaseName: "Phase 5: Prelims Mock Simulations & Rapid Revision",
        durationWeeks: 8,
        objective: "Take 30+ full length Prelims test series, calibrate educated guesswork, and eliminate silly errors.",
        topics: [
          {
            id: "upsc-topic-10",
            title: "Full-Length 100-Question Prelims Drills",
            estimatedHours: 50,
            description: "Solve papers under strict 9:30 AM to 11:30 AM test conditions with negative marking calibration.",
            coreConcepts: ["Optimum Attempt Count (80-88 Qs)", "Educated Elimination Technique", "OMR Bubble Discipline"],
            freeResourceLink: "https://upsc.gov.in",
            pyqCount: 200,
            completed: false
          }
        ]
      }
    ]
  },
  roadmap_ssc_cgl: {
    id: "roadmap_ssc_cgl",
    goalId: "ssc_cgl",
    title: "SSC CGL Master Preparation Roadmap",
    description: "A focused 4-phase pathway designed for speed, accuracy, arithmetic mastery, grammar fluency, and high-scoring Tier-I & Tier-II performance.",
    totalWeeks: 32,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: Arithmetic & Speed Calculation",
        durationWeeks: 8,
        objective: "Master Vedic calculation methods, percentages, ratios, profit & loss, and time-work algorithms.",
        topics: [
          { id: "ssc-1", title: "Speed Math, Percentages & Ratio Proportions", estimatedHours: 24, description: "Fraction-to-percentage tables, successive discounts, allegations and mixtures.", coreConcepts: ["Base 100 Method", "Unitary Multipliers", "Cross-Multiplication"], pyqCount: 65, completed: true },
          { id: "ssc-2", title: "Time, Speed & Distance and Time & Work", estimatedHours: 26, description: "Relative speed, trains, boats and streams, circular tracks, pipes and cisterns.", coreConcepts: ["LCM Efficiency Method", "Average Speed Formulas", "Meeting Point Relative Motion"], pyqCount: 70, completed: false }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: Advanced Mathematics & Geometry",
        durationWeeks: 8,
        objective: "Excel in Geometry, Trigonometry, Algebra, and Coordinate Geometry.",
        topics: [
          { id: "ssc-3", title: "Geometry, Circles & Triangle Properties", estimatedHours: 30, description: "Congruence, similarity, incircle, circumcircle, chords and tangents theorems.", coreConcepts: ["Apollonius Theorem", "Incenter Coordinate Formulas", "Direct Common Tangents"], pyqCount: 80, completed: false },
          { id: "ssc-4", title: "Trigonometry & Heights and Distances", estimatedHours: 22, description: "Trigonometric identities, maxima and minima, angle of elevation/depression.", coreConcepts: ["Value Substitution Method", "Standard Triplets", "Pythagorean Bounds"], pyqCount: 55, completed: false }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: English Fluency & Reasoning Puzzles",
        durationWeeks: 8,
        objective: "Secure 100% accuracy in grammar rules, active/passive voice, direct/indirect speech, and non-verbal reasoning.",
        topics: [
          { id: "ssc-5", title: "120 Rules of English Grammar & Error Spotting", estimatedHours: 24, description: "Subject-verb agreement, modifiers, prepositions, idioms & one-word substitutions.", coreConcepts: ["Rule of Parallelism", "Inversion with Negative Adverbs", "Conditional Sentences"], pyqCount: 90, completed: false },
          { id: "ssc-6", title: "General Intelligence, Syllogisms & Coding-Decoding", estimatedHours: 20, description: "Alphabetical series, matrix puzzles, blood relations, and mirror images.", coreConcepts: ["Venn Syllogisms", "Rank and Position Shifting", "Paper Folding Symmetries"], pyqCount: 75, completed: false }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4: Full-Length Speed Mocks & Tier-II Drills",
        durationWeeks: 8,
        objective: "Simulate 60-minute Tier-I and 2h15m Tier-II CBT interfaces under strict negative marking.",
        topics: [
          { id: "ssc-7", title: "Daily 100-Question Timed Mocks", estimatedHours: 45, description: "Solve Tier-1 papers with aim of scoring >155/200 marks consistently.", coreConcepts: ["Question Skipping Intuition", "Section Order Optimization", "Typing Speed Practice"], pyqCount: 300, completed: false }
        ]
      }
    ]
  },
  roadmap_banking_po: {
    id: "roadmap_banking_po",
    goalId: "ibps_po",
    title: "Banking & Finance (IBPS / SBI PO) Master Pathway",
    description: "Precision training for high-speed Data Interpretation, complex reasoning puzzles, and modern banking awareness.",
    totalWeeks: 28,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: High-Speed Quant & Number Series",
        durationWeeks: 6,
        objective: "Solve simplification, approximation, quadratic equations, and missing/wrong number series in under 45 seconds.",
        topics: [
          { id: "bank-1", title: "Speed Arithmetic & Quadratic Comparisons", estimatedHours: 20, description: "Roots sign method, tables up to 30, squares/cubes, percentage fractions.", coreConcepts: ["Root Factorization Tricks", "Approximation Elimination", "BODMAS Speed Rules"], pyqCount: 85, completed: true }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: Complex Puzzles & Seating Arrangements",
        durationWeeks: 8,
        objective: "Tackle multi-variable floor puzzles, circular facing-in/out, and blood relation seating puzzles.",
        topics: [
          { id: "bank-2", title: "Advanced Seating & Multi-Category Puzzles", estimatedHours: 32, description: "Parallel row arrangements, concentric circles, month-day scheduling puzzles.", coreConcepts: ["Multi-Case Possibility Elimination", "Definite Clues First", "Negative Clue Tracking"], pyqCount: 110, completed: false }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: High-Level Data Interpretation (DI) & Caselets",
        durationWeeks: 8,
        objective: "Master radar graphs, missing DIs, arithmetic-based DIs, and paragraph caselets.",
        topics: [
          { id: "bank-3", title: "Mains-Level Arithmetic DI & Paragraph Caselets", estimatedHours: 30, description: "Profit-loss DIs, time-work graphs, probability caselets, and dual-axis charts.", coreConcepts: ["Data Extraction Speed", "Ratio Balancing", "Percentage Change Shortcuts"], pyqCount: 95, completed: false }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4: Banking Awareness & Mains Test Series",
        durationWeeks: 6,
        objective: "Master RBI circulars, financial terms, descriptive letter/essay writing, and full mocks.",
        topics: [
          { id: "bank-4", title: "Banking Operations, Monetary Policy & Full Mocks", estimatedHours: 28, description: "Monetary policy instruments, PSL norms, Basel III, and 20+ full-length computer mocks.", coreConcepts: ["Sectional Time Balancing", "Descriptive Keyboard Typing", "Cutoff Optimization"], pyqCount: 150, completed: false }
        ]
      }
    ]
  },
  roadmap_cat_mba: {
    id: "roadmap_cat_mba",
    goalId: "cat_exam",
    title: "CAT & Management Entrance (IIM MBA) Pathway",
    description: "Comprehensive 4-phase preparation for VARC (Reading Comprehension), DILR logic puzzles, and Quantitative Aptitude.",
    totalWeeks: 36,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: VARC Daily Habit & Reading Stamina",
        durationWeeks: 8,
        objective: "Read 3 dense philosophical, scientific, and economic articles daily and master inference extraction.",
        topics: [
          { id: "cat-1", title: "Philosophy, Sociology & Science Reading Comprehension", estimatedHours: 26, description: "Critical reasoning, tone detection, main idea extraction, and eliminating trap options.", coreConcepts: ["Author Perspective vs Fact", "Inference Validation", "Para Jumbles Cohesion"], pyqCount: 60, completed: true }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: DILR Problem Solving & Grid Games",
        durationWeeks: 10,
        objective: "Solve 200+ non-standard DILR sets: tournaments, arrangements, truth-liar puzzles, and set theory Venns.",
        topics: [
          { id: "cat-2", title: "Tournament Logic, Matrix Grids & Set Theory", estimatedHours: 35, description: "Round-robin rankings, scheduling matrices, 4-set Venn diagrams with maxima/minima.", coreConcepts: ["Variable Constraint Propagation", "Case Splitting Discipline", "Set Selection Filter"], pyqCount: 90, completed: false }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: QA Core (Arithmetic, Algebra & Geometry)",
        durationWeeks: 10,
        objective: "Master high-weightage arithmetic and modern algebra (functions, inequalities, quadratics, logs).",
        topics: [
          { id: "cat-3", title: "Functions, Progressions, Logarithms & Mensuration", estimatedHours: 32, description: "AM-GM inequality, AP/GP sums, logarithmic properties, coordinate geometry geometry theorems.", coreConcepts: ["Maxima/Minima Optimization", "Substitution Method", "Graph Transformations"], pyqCount: 85, completed: false }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4: Sectional Strategy & Percentile Calibration",
        durationWeeks: 8,
        objective: "Solve 25+ proctored full-length mocks under 40-minute strict sectional limits.",
        topics: [
          { id: "cat-4", title: "Full-Length 3-Section Proctored Mocks", estimatedHours: 40, description: "Perfect question selection (choosing the right 3-4 DILR sets, right 12-14 QA questions).", coreConcepts: ["Question Selection Discipline", "Never Get Stuck on One Puzzle", "Accuracy Over Volume"], pyqCount: 180, completed: false }
        ]
      }
    ]
  },
  roadmap_general_govt: {
    id: "roadmap_general_govt",
    goalId: "general_competitive",
    title: "Universal Competitive Exams (General Studies & Aptitude)",
    description: "An all-round foundation suitable for State PSCs, SSC, Railways (RRB), Defence, and Banking preliminary examinations.",
    totalWeeks: 24,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: General Mental Ability & Reasoning",
        durationWeeks: 6,
        objective: "Build fast analytical thinking across analogies, series, puzzles, and non-verbal logic.",
        topics: [
          { id: "gen-1", title: "Logical Deductions, Syllogisms & Directions", estimatedHours: 20, description: "Core reasoning patterns applicable across all national and state examinations.", coreConcepts: ["Deductive Logic", "Venn Diagram Modeling", "Spatial Rotation"], pyqCount: 50, completed: true }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: Quantitative Aptitude & Numerical Ability",
        durationWeeks: 6,
        objective: "Master percentages, averages, time-distance, simple/compound interest, and data charts.",
        topics: [
          { id: "gen-2", title: "Commercial Math & Numerical Interpretation", estimatedHours: 24, description: "Essential arithmetic and data analysis techniques.", coreConcepts: ["Shortcut Ratios", "Average Deviations", "Chart Reading"], pyqCount: 60, completed: false }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: Indian Constitution, Polity & History",
        durationWeeks: 6,
        objective: "Core constitutional rights, parliamentary functions, and modern Indian historical milestones.",
        topics: [
          { id: "gen-3", title: "Indian Constitution & Freedom Struggle", estimatedHours: 26, description: "Key articles, fundamental rights, judiciary, and national movements.", coreConcepts: ["Preamble & Articles", "Landmark Historical Events", "Governance System"], pyqCount: 55, completed: false }
        ]
      },
      {
        phaseNumber: 4,
        phaseName: "Phase 4: General Science, Economy & Practice Drills",
        durationWeeks: 6,
        objective: "Everyday physics/chemistry/biology, macroeconomic terminology, and full-length diagnostic tests.",
        topics: [
          { id: "gen-4", title: "General Science & National Economy Overview", estimatedHours: 24, description: "Fundamental scientific principles and basic economic parameters.", coreConcepts: ["Scientific Concepts", "Fiscal Policy Basics", "Current National Schemes"], pyqCount: 70, completed: false }
        ]
      }
    ]
  },
  roadmap_tech_careers: {
    id: "roadmap_tech_careers",
    goalId: "ai_ml_engineer",
    title: "Applied Technology & Software Engineering Pathway",
    description: "From programming fundamentals and algorithmic problem solving to software architectures and cloud deployments.",
    totalWeeks: 30,
    phases: [
      {
        phaseNumber: 1,
        phaseName: "Phase 1: Programming & Algorithmic Thinking",
        durationWeeks: 8,
        objective: "Master data structures, algorithms, and clean software development principles.",
        topics: [
          { id: "tech-1", title: "Data Structures & Algorithmic Problem Solving", estimatedHours: 30, description: "Arrays, linked lists, trees, graphs, sorting, and dynamic programming.", coreConcepts: ["Time & Space Complexity", "Recursion & Memoization", "Graph Traversals"], pyqCount: 40, completed: true }
        ]
      },
      {
        phaseNumber: 2,
        phaseName: "Phase 2: Database Systems & Web Architectures",
        durationWeeks: 10,
        objective: "Build production APIs, relational database schemas, and responsive client applications.",
        topics: [
          { id: "tech-2", title: "Relational Databases (SQL), APIs & Cloud Fundamentals", estimatedHours: 35, description: "Schema normalization, REST/GraphQL endpoints, containerization with Docker.", coreConcepts: ["ACID Transactions", "Indexing & Query Optimization", "Microservices"], pyqCount: 30, completed: false }
        ]
      },
      {
        phaseNumber: 3,
        phaseName: "Phase 3: Machine Learning & Cloud Deployment",
        durationWeeks: 12,
        objective: "Train models, implement vector search pipelines, and deploy production web systems.",
        topics: [
          { id: "tech-3", title: "Applied Machine Learning & Production Capstone", estimatedHours: 40, description: "Predictive modeling, neural networks, vector databases, and CI/CD pipelines.", coreConcepts: ["Model Evaluation", "Embeddings & RAG", "Production Monitoring"], pyqCount: 25, completed: false }
        ]
      }
    ]
  }
};
const FREE_RESOURCES_DATABASE = [
  {
    id: "res-ncert-polity",
    title: "NCERT Official Portal: Indian Constitution at Work (Class 11 & 12)",
    platform: "Government Portal",
    instructorOrEntity: "National Council of Educational Research and Training (NCERT)",
    subject: "Indian Polity & Constitution",
    topic: "Fundamental Rights, Parliament, Judiciary, Federalism",
    format: "Comprehensive Notes",
    language: "Bilingual",
    syllabusRelevancePercent: 100,
    rating: 4.9,
    linkUrl: "https://ncert.nic.in/textbook.php",
    verifiedDate: "August 2026",
    stepCategory: "Learn",
    description: "Mandatory foundational text for UPSC Civil Services, State PSC, and SSC exams explaining the philosophy of the Indian Constitution."
  },
  {
    id: "res-swayam-history",
    title: "Swayam / IGNOU: Modern Indian History & National Movement",
    platform: "NPTEL / Swayam",
    instructorOrEntity: "National Swayam Portal & UGC Faculty",
    subject: "Modern Indian History",
    topic: "Revolt of 1857, Freedom Struggle, Constitutional Reforms",
    format: "Video Playlist",
    language: "English",
    syllabusRelevancePercent: 96,
    rating: 4.9,
    linkUrl: "https://swayam.gov.in",
    verifiedDate: "September 2026",
    stepCategory: "Understand",
    description: "Authoritative national university curriculum tracing socioeconomic transitions and constitutional milestones from 1857 to 1947."
  },
  {
    id: "res-khan-quant",
    title: "Khan Academy: Comprehensive Quantitative Aptitude & Algebra",
    platform: "Interactive Simulator",
    instructorOrEntity: "Sal Khan & Academic Team",
    subject: "Quantitative Aptitude & Mathematics",
    topic: "Arithmetic, Percentages, Geometry, Ratios & Statistics",
    format: "Interactive Simulator",
    language: "English",
    syllabusRelevancePercent: 98,
    rating: 5,
    linkUrl: "https://www.khanacademy.org",
    verifiedDate: "August 2026",
    stepCategory: "Practice",
    description: "Masterclass in foundational arithmetic, geometric visualization, and algebraic techniques with step-by-step interactive problem sets."
  },
  {
    id: "res-pib-current",
    title: "Press Information Bureau (PIB) & Sansad TV Debates Archive",
    platform: "Government Portal",
    instructorOrEntity: "Government of India Official Press Bureau",
    subject: "Current Affairs & Governance",
    topic: "Government Schemes, Economic Policies, International Summits",
    format: "Comprehensive Notes",
    language: "Bilingual",
    syllabusRelevancePercent: 99,
    rating: 4.9,
    linkUrl: "https://pib.gov.in",
    verifiedDate: "September 2026",
    stepCategory: "Learn",
    description: "Direct authentic source for national policy announcements, cabinet decisions, indices, and economic surveys for all competitive exams."
  },
  {
    id: "res-ssc-reasoning",
    title: "Open Aptitude & Logical Reasoning Master Repository",
    platform: "YouTube Open Lecture",
    instructorOrEntity: "Verified Open Educators",
    subject: "Logical Reasoning & Intelligence",
    topic: "Syllogisms, Puzzles, Series, Coding-Decoding, Non-Verbal Logic",
    format: "Video Playlist",
    language: "Hindi",
    syllabusRelevancePercent: 95,
    rating: 4.8,
    linkUrl: "https://www.youtube.com",
    verifiedDate: "August 2026",
    stepCategory: "Practice",
    description: "High-speed shortcut techniques for seating arrangements, syllogisms, blood relations, and reasoning tricks for SSC and Banking exams."
  },
  {
    id: "res-nptel-cs",
    title: "NPTEL: Foundational Algorithms & Discrete Mathematics",
    platform: "NPTEL / Swayam",
    instructorOrEntity: "IIT Faculty Coordination Committee",
    subject: "Applied Mathematics & Computing",
    topic: "Logic, Graph Theory, Combinatorics & Algorithms",
    format: "Video Playlist",
    language: "English",
    syllabusRelevancePercent: 94,
    rating: 4.9,
    linkUrl: "https://nptel.ac.in",
    verifiedDate: "September 2026",
    stepCategory: "Understand",
    description: "Rigorous analytical treatment of discrete structures, probability, and algorithmic logic from premier Indian Institutes of Technology."
  }
];
const PYQ_BANK = [
  {
    id: "pyq-upsc-polity-1",
    exam: "UPSC CSE",
    year: 2024,
    subject: "Indian Polity & Constitution",
    topic: "Constitutional Articles & Fundamental Rights",
    difficulty: "Medium",
    question: "Under the Constitution of India, which one of the following is correct regarding the Writ of Habeas Corpus?",
    options: [
      "It can be issued against both public authorities and private individuals.",
      "It can be issued only against governmental law enforcement bodies.",
      "It cannot be invoked during a financial emergency under Article 360.",
      "It is available exclusively under Article 32 to the Supreme Court and not to High Courts."
    ],
    correctAnswerIndex: 0,
    explanation: 'The Writ of Habeas Corpus (meaning "to have the body of") can be issued by both the Supreme Court (Article 32) and High Courts (Article 226) against public authorities as well as private individuals who have unlawfully detained any citizen.',
    keyConcept: "Writs Jurisdiction under Article 32 and 226",
    frequencyRating: 5,
    recommendedLectureTopic: "Fundamental Rights & Constitutional Remedies"
  },
  {
    id: "pyq-ssc-quant-1",
    exam: "SSC CGL",
    year: 2023,
    subject: "Quantitative Aptitude & Mathematics",
    topic: "Percentages & Successive Discounts",
    difficulty: "Easy",
    question: "An article with a marked price of \u20B92,500 is sold after two successive discounts of 20% and 10%. What is the final selling price?",
    options: [
      "\u20B91,800",
      "\u20B91,750",
      "\u20B91,850",
      "\u20B91,900"
    ],
    correctAnswerIndex: 0,
    explanation: "First discount of 20% on \u20B92,500 reduces the price to \u20B92,500 - \u20B9500 = \u20B92,000. Second discount of 10% on \u20B92,000 reduces the price by \u20B9200. Final selling price = \u20B92,000 - \u20B9200 = \u20B91,800.",
    keyConcept: "Successive Discount Multipliers: SP = MP * (1 - d1) * (1 - d2)",
    frequencyRating: 5,
    recommendedLectureTopic: "Commercial Mathematics & Discounts"
  },
  {
    id: "pyq-bank-di-1",
    exam: "IBPS / SBI PO",
    year: 2024,
    subject: "Data Interpretation & Reasoning",
    topic: "Data Interpretation & Percentage Growth",
    difficulty: "Medium",
    question: "In a college, the ratio of boys to girls is 5 : 4. If 20% of the boys and 25% of the girls are scholarship holders, what percentage of the total students do NOT hold any scholarship?",
    options: [
      "77.78%",
      "75.00%",
      "80.25%",
      "72.50%"
    ],
    correctAnswerIndex: 0,
    explanation: "Assume 500 boys and 400 girls (total 900 students). Boys without scholarship = 80% of 500 = 400. Girls without scholarship = 75% of 400 = 300. Total students without scholarship = 400 + 300 = 700. Percentage = (700 / 900) * 100 = 77.78%.",
    keyConcept: "Base 100 Assumption in Ratio & Percentage Calculations",
    frequencyRating: 5,
    recommendedLectureTopic: "Data Interpretation & Percentage Modeling"
  },
  {
    id: "pyq-upsc-history-1",
    exam: "UPSC CSE",
    year: 2023,
    subject: "Modern Indian History",
    topic: "Constitutional Reforms & Acts",
    difficulty: "Medium",
    question: "With reference to the Government of India Act 1919, which of the following statements is/are correct?\n1. It introduced Dyarchy in the provinces.\n2. It established bicameralism at the Centre for the first time.\nSelect the correct answer using the codes given below:",
    options: [
      "Both 1 and 2",
      "1 only",
      "2 only",
      "Neither 1 nor 2"
    ],
    correctAnswerIndex: 0,
    explanation: "The Government of India Act 1919 (Montagu-Chelmsford Reforms) introduced Dyarchy in the provincial executive by dividing subjects into Transferred and Reserved. It also introduced bicameralism (Council of State and Legislative Assembly) at the Centre for the first time.",
    keyConcept: "Montagu-Chelmsford Reforms (1919) & Provincial Dyarchy",
    frequencyRating: 5,
    recommendedLectureTopic: "Constitutional Evolution during British Rule"
  },
  {
    id: "pyq-ssc-reasoning-1",
    exam: "SSC CGL",
    year: 2024,
    subject: "Logical Reasoning & Intelligence",
    topic: "Syllogism & Deductive Logic",
    difficulty: "Medium",
    question: "Statements:\n1. All officers are leaders.\n2. Some leaders are visionaries.\nConclusions:\nI. Some officers are visionaries.\nII. Some visionaries are leaders.\nWhich conclusion logically follows?",
    options: [
      "Only Conclusion II follows",
      "Only Conclusion I follows",
      "Both I and II follow",
      "Neither I nor II follows"
    ],
    correctAnswerIndex: 0,
    explanation: 'Statement 2 says "Some leaders are visionaries", which directly converts to "Some visionaries are leaders" (Conclusion II is valid). However, officers are a subset of leaders, and the overlap between leaders and visionaries might not include officers; therefore Conclusion I does not necessarily follow.',
    keyConcept: "Particular Affirmative Conversion & Euler Circles",
    frequencyRating: 5,
    recommendedLectureTopic: "Deductive Syllogisms & Logic Puzzles"
  },
  {
    id: "pyq-cat-qa-1",
    exam: "CAT (IIM Entrance)",
    year: 2023,
    subject: "Quantitative Aptitude & Mathematics",
    topic: "Algebra & Progression Series",
    difficulty: "Hard",
    question: "If log_2(x) + log_4(x) + log_16(x) = 21/4, what is the value of x?",
    options: [
      "8",
      "16",
      "32",
      "64"
    ],
    correctAnswerIndex: 0,
    explanation: "Convert all logarithms to base 2 using log_b(a) = log_c(a) / log_c(b): log_4(x) = log_2(x) / 2 and log_16(x) = log_2(x) / 4. So: log_2(x) + (1/2)log_2(x) + (1/4)log_2(x) = (7/4)log_2(x). Equating: (7/4)log_2(x) = 21/4 => log_2(x) = 3 => x = 2^3 = 8.",
    keyConcept: "Base Change Theorem of Logarithms",
    frequencyRating: 4,
    recommendedLectureTopic: "Logarithms & Indices in Aptitude"
  }
];
const MOCK_TESTS = [
  {
    id: "mock-all-india-prelims",
    title: "All-India Competitive Exam General Studies & CSAT Diagnostic",
    exam: "National Competitive Exams (UPSC / State PSC / SSC)",
    durationMinutes: 20,
    totalMarks: 12,
    negativeMarkRatio: 0.33,
    questions: PYQ_BANK.slice(0, 5)
  },
  {
    id: "mock-speed-aptitude-reasoning",
    title: "Speed, Quant & Logical Reasoning Assessment Drill",
    exam: "SSC CGL / Banking PO / CAT",
    durationMinutes: 15,
    totalMarks: 12,
    negativeMarkRatio: 0.25,
    questions: [
      PYQ_BANK[1],
      // Quant
      PYQ_BANK[2],
      // DI
      PYQ_BANK[4],
      // Reasoning
      PYQ_BANK[5]
      // Algebra
    ]
  },
  {
    id: "mock-civil-services-polity-history",
    title: "Constitution, Governance & Modern History Sectional",
    exam: "UPSC CSE / State PSC",
    durationMinutes: 20,
    totalMarks: 10,
    negativeMarkRatio: 0.33,
    questions: [
      PYQ_BANK[0],
      // Polity
      PYQ_BANK[3],
      // History
      PYQ_BANK[4]
      // Syllogisms
    ]
  }
];
const MULTILINGUAL_DICTIONARY = {
  en: {
    tagline: "Your Intelligent Path to the Future",
    nav_dashboard: "Dashboard",
    nav_careers: "Career Discovery",
    nav_exams: "Exams & Eligibility",
    nav_roadmap: "Personalized Roadmap",
    nav_resources: "Free Learning Resources",
    nav_planner: "Daily Study Planner",
    nav_practice: "Adaptive Practice & PYQs",
    nav_mocks: "Mock Tests",
    nav_mentor: "Pragya AI Mentor",
    nav_library: "My Library",
    streak: "Day Streak",
    study_time: "Study Time",
    accuracy: "Accuracy",
    weak_areas: "Identified Weak Areas",
    strong_areas: "Strong Foundations",
    next_action: "Recommended Next Action",
    today_plan: "Today's Study Plan"
  },
  hi: {
    tagline: "\u092D\u0935\u093F\u0937\u094D\u092F \u0915\u0940 \u0913\u0930 \u0906\u092A\u0915\u093E \u092A\u094D\u0930\u091C\u094D\u091E\u093E \u092A\u0925",
    nav_dashboard: "\u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921",
    nav_careers: "\u0915\u0930\u093F\u092F\u0930 \u0916\u094B\u091C",
    nav_exams: "\u092A\u0930\u0940\u0915\u094D\u0937\u093E \u090F\u0935\u0902 \u092A\u093E\u0924\u094D\u0930\u0924\u093E",
    nav_roadmap: "\u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0930\u094B\u0921\u092E\u0948\u092A",
    nav_resources: "\u092E\u0941\u092B\u093C\u094D\u0924 \u0936\u093F\u0915\u094D\u0937\u0923 \u0938\u0902\u0938\u093E\u0927\u0928",
    nav_planner: "\u0926\u0948\u0928\u093F\u0915 \u0905\u0927\u094D\u092F\u092F\u0928 \u092F\u094B\u091C\u0928\u093E",
    nav_practice: "\u0905\u0928\u0941\u0915\u0942\u0932\u0940 \u0905\u092D\u094D\u092F\u093E\u0938 \u0935 PYQ",
    nav_mocks: "\u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F",
    nav_mentor: "\u092A\u094D\u0930\u091C\u094D\u091E\u093E AI \u092E\u0947\u0902\u091F\u0930",
    nav_library: "\u092E\u0947\u0930\u0940 \u0932\u093E\u0907\u092C\u094D\u0930\u0947\u0930\u0940",
    streak: "\u0926\u093F\u0928\u094B\u0902 \u0915\u093E \u0938\u094D\u091F\u094D\u0930\u0940\u0915",
    study_time: "\u0905\u0927\u094D\u092F\u092F\u0928 \u0938\u092E\u092F",
    accuracy: "\u0938\u091F\u0940\u0915\u0924\u093E",
    weak_areas: "\u0915\u092E\u091C\u094B\u0930 \u0935\u093F\u0937\u092F",
    strong_areas: "\u092E\u091C\u092C\u0942\u0924 \u0935\u093F\u0937\u092F",
    next_action: "\u0905\u0928\u0941\u0936\u0902\u0938\u093F\u0924 \u0905\u0917\u0932\u093E \u0915\u0926\u092E",
    today_plan: "\u0906\u091C \u0915\u0940 \u0905\u0927\u094D\u092F\u092F\u0928 \u092F\u094B\u091C\u0928\u093E"
  },
  mr: {
    tagline: "\u092D\u0935\u093F\u0937\u094D\u092F\u093E\u0915\u0921\u0947 \u0928\u0947\u0923\u093E\u0930\u093E \u0924\u0941\u092E\u091A\u093E \u092A\u094D\u0930\u091C\u094D\u091E\u093E \u092E\u093E\u0930\u094D\u0917",
    nav_dashboard: "\u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921",
    nav_careers: "\u0915\u0930\u093F\u0905\u0930 \u0936\u094B\u0927",
    nav_exams: "\u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0935 \u092A\u093E\u0924\u094D\u0930\u0924\u093E",
    nav_roadmap: "\u0935\u0948\u092F\u0915\u094D\u0924\u093F\u0915 \u0930\u094B\u0921\u092E\u0945\u092A",
    nav_resources: "\u092E\u094B\u092B\u0924 \u0905\u092D\u094D\u092F\u093E\u0938 \u0938\u0902\u0938\u093E\u0927\u0928\u0947",
    nav_planner: "\u0926\u0948\u0928\u093F\u0915 \u0905\u092D\u094D\u092F\u093E\u0938 \u0928\u093F\u092F\u094B\u091C\u0928",
    nav_practice: "\u0938\u0930\u093E\u0935 \u0935 \u092E\u093E\u0917\u0940\u0932 \u0935\u0930\u094D\u0937\u093E\u0902\u091A\u0947 \u092A\u094D\u0930\u0936\u094D\u0928 (PYQ)",
    nav_mocks: "\u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F",
    nav_mentor: "\u092A\u094D\u0930\u091C\u094D\u091E\u093E AI \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0915",
    nav_library: "\u092E\u093E\u091D\u0940 \u0932\u093E\u092F\u092C\u094D\u0930\u0930\u0940",
    streak: "\u0938\u093E\u0924\u0924\u094D\u092F (\u0926\u093F\u0935\u0938)",
    study_time: "\u0905\u092D\u094D\u092F\u093E\u0938\u093E\u091A\u0940 \u0935\u0947\u0933",
    accuracy: "\u0905\u091A\u0942\u0915\u0924\u093E",
    weak_areas: "\u0938\u0941\u0927\u093E\u0930\u0923\u0947\u091A\u0940 \u0917\u0930\u091C \u0905\u0938\u0932\u0947\u0932\u0947 \u0935\u093F\u0937\u092F",
    strong_areas: "\u092A\u0915\u094D\u0915\u0947 \u091D\u093E\u0932\u0947\u0932\u0947 \u0935\u093F\u0937\u092F",
    next_action: "\u092A\u0941\u0922\u0940\u0932 \u0936\u093F\u092B\u093E\u0930\u0938 \u0915\u0947\u0932\u0947\u0932\u0947 \u092A\u093E\u090A\u0932",
    today_plan: "\u0906\u091C\u091A\u0947 \u0905\u092D\u094D\u092F\u093E\u0938 \u0935\u0947\u0933\u093E\u092A\u0924\u094D\u0930\u0915"
  }
};
export {
  CAREERS_DATABASE,
  EXAMS_DATABASE,
  FREE_RESOURCES_DATABASE,
  INITIAL_USER_PROFILE,
  MOCK_TESTS,
  MULTILINGUAL_DICTIONARY,
  PYQ_BANK,
  ROADMAPS_DATABASE
};
