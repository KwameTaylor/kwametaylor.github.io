/* Everything you are likely to edit lives in this file.
   README.md explains how to add a service, a project, a design piece or an organization. */
window.SITE = {

  /* Portrait. Put the image in assets/img and write its path here, for example "assets/img/portrait.jpg".
     Leave it empty to show the drawn placeholder. */
  portrait: "assets/img/portrait.jpg",

  /* Contact form endpoint from your form service, for example "https://formspree.io/f/abcdwxyz".
     Leave it empty until the form is set up. */
  formEndpoint: "https://formspree.io/f/xppddnyl",

  /* The phrase that rotates after "I build" on the home page. */
  phrases: [
  "programs.",
  "data models.",
  "processes.",
  "payment systems.",
  "identities.",
  "roadmaps.",
  "tools.",
  "dashboards.",
  "prompt libraries.",
  "metrics frameworks.",
  "machine learning models.",
  "strategic plans.",
  "infographics.",
  "training programs.",
  "web apps.",
  "surveys.",
  "logos."
],

  services: [
  { 
    name: "Spreadsheet cleanup", 
    line: "Your file, tidied and made consistent.",
    includes: [
      "One file, any size", 
      "A change log", 
      "One round of cleaning"
    ] 
  },
  { 
    name: "Data consolidation", 
    line: "Scattered data brought into one place you can easily use.",
    includes: [
      "Sources combined", 
      "Clear column names", 
      "Aggregate fields"
    ] 
  },
  { 
    name: "Business cards with data viz", 
    line: "A card that shows your quantified success.",
    includes: [
      "Front and back design", 
      "Charts and graphs from your own data", 
      "Print-ready files or full-service print management"
    ] 
  },
  { 
    name: "Graphic design and visual identity", 
    line: "A cohesive set of logo, color palette, and typography.",
    includes: [
      "A variety of directions to choose from", 
      "Informed color and font choices", 
      "Files for web and print"
    ] 
  },
  { 
    name: "Automation tools and workflows", 
    line: "Repetitive tasks handled in the background so you don't have to.",
    includes: [
      "Custom connections between your existing apps", 
      "Automated data entry, alerts, and handoffs", 
      "Documentation and walkthrough for your team"
    ] 
  },
  { 
    name: "Custom AI prompt libraries", 
    line: "Tailored AI workspaces trained on your organization's voice and templates.",
    includes: [
      "Audit of your existing documents and style rules", 
      "Tested, reusable prompts for recurring deliverables", 
      "Setup and team training guide"
    ] 
  },
  { 
    name: "Record deduplication and matching", 
    line: "Years of duplicate, mismatched entries reconciled into one reliable list.",
    includes: [
      "Custom matching rules for names, dates, and locations", 
      "Standardized formatting across legacy exports", 
      "Change log and clean, import-ready files"
    ] 
  },
  { 
    name: "Process mapping and SOPs", 
    line: "Messy daily operations turned into clear, repeatable playbooks.",
    includes: [
      "Current- and future-state workflow diagrams", 
      "Plain-English Standard Operating Procedures", 
      "Bottleneck and risk audit"
    ] 
  }
],

  /* status, year and stack are optional. link is optional; without one the page says a link is coming.
     linkLabel is optional: the button text for the link. Without it the button names the site, e.g. "View on GitHub".
     image is optional: a screenshot path such as "assets/img/queue-tip.png". */
  projects: [
    { name: "Queue Tip", status: "Python, Spotify API, Streamlit, Postgres",
      text: "Queue Tip is a personal web application I built to help me clear the 10,000 podcast episode backlog I have saved in my Spotify library. By automating this, I avoid decision fatigue and save time. I tell it what time of day it is, how much time I have, how I’m feeling, and what’s on my mind. It picks episodes that fit those preferences and generates a playlist automatically pushed to my Spotify for my morning and night listening routines. It prioritizes episodes I’ve had saved the longest or shows I’ve neglected, in addition to prioritizing new episodes for categories such as News or Stocks. A free local embedded model matches my plain-language requests to episode descriptions. Built in Python with Streamlit, the Spotify Web API, and Postgres with pgvector.", link: "https://queue-tip.streamlit.app/", linkLabel: "View on Streamlit", image: "" },
    { name: "Duel Magician", status: "In progress", stack: "Python, scikit-learn",
      text: "A deckbuilding companion for Yu-Gi-Oh! Duel Links.", link: "", image: "" },
    { name: "One million households", status: "GiveDirectly", year: "2021",
      text: "GiveDirectly sent a cash transfer to its one millionth household in 2021. A note on my part in this will go here.",
      link: "https://www.givedirectly.org/1-million-households", image: "" },
    { name: "SpotiScry", status: "Data science capstone", year: "2021",
      text: "My capstone project. A short description will go here.",
      link: "https://github.com/SpotiScryers/SpotiScry", image: "" },
    { name: "Bachelorette Predictor", year: "2020",
      text: "A machine learning model that predicts how many weeks a contestant will last on The Bachelorette.",
      link: "https://github.com/KwameTaylor/bachelorette-predictor", image: "" },
    { name: "GitHub Language Classifier", year: "2020",
      text: "A short description will go here.", link: "", image: "" },
    { name: "Zillow Zestimate Error Analysis", year: "2020",
      text: "Uses clustering to find what drives error in Zestimates of single-unit Zillow properties.",
      link: "https://github.com/KwameTaylor/kwames-zillow-zestimates-error-control", image: "" }
  ],

  /* Design gallery. type is the filter it appears under. shape is "square", "wide" or "tall".
     Add image: "assets/img/your-file.jpg" to show real work; until then the glyph is shown as a placeholder.
     tone is "", "k" (dark) or "y" (highlight) and only affects placeholders. */
  design: [
    { title: "Logo, placeholder", type: "Logos", shape: "square", glyph: "Aa", tone: "" },
    { title: "Identity system, placeholder", type: "Identity", shape: "wide", glyph: "K & T", tone: "k" },
    { title: "Poster, placeholder", type: "Print", shape: "tall", glyph: "¶", tone: "y" },
    { title: "Logo, placeholder", type: "Logos", shape: "square", glyph: "&", tone: "k" },
    { title: "Business card, placeholder", type: "Print", shape: "wide", glyph: "№ 1", tone: "" },
    { title: "Logo, placeholder", type: "Logos", shape: "square", glyph: "§", tone: "y" },
    { title: "Identity system, placeholder", type: "Identity", shape: "wide", glyph: "Vv", tone: "" },
    { title: "Flyer, placeholder", type: "Print", shape: "square", glyph: "!", tone: "k" }
  ],


  /* What the Terminal on the home page can answer. keys are words or short phrases a visitor might type;
     the answer with the most matching keys wins. The terminal speaks about Kwame, as their computer. */
  facts: [
    { keys: ["who", "summary", "background", "introduce", "bio", "does", "about"],
      a: "Kwame is a PMP-certified technical program manager in Los Angeles with a data science background and 8+ years leading social impact programs." },
    { keys: ["current", "now", "nlacrc", "regional center", "job", "role", "position"],
      a: "Since May 2025, Kwame has been the Change Management Project Manager and Business Transformation Lead at NLACRC, a regional center in Los Angeles serving 40,000+ people with developmental disabilities. Kwame leads organization-wide process redesign and data-informed change." },
    { keys: ["nlacrc accomplish", "nlacrc achieve", "nlacrc impact", "transfer", "cycle time", "faster"],
      a: "At NLACRC Kwame designed, coded and shipped a smart form and validation checklist that cut median inter-office case transfer time from 13 to 8 business days." },
    { keys: ["sop", "process", "standard", "training", "rollout", "staff"],
      a: "Kwame leads process redesigns end to end: staff interviews, participatory design workgroups, process mapping, pilots, the agency's first SOPs, and a train-the-trainer rollout to 800+ case management staff across 3 offices." },
    { keys: ["metrics", "kpi", "strategic plan", "governance", "measure"],
      a: "Kwame built NLACRC's first end-to-end metrics framework for its 2027 to 2031 Strategic Plan, with baselines and success metrics for each objective." },
    { keys: ["performance", "evaluation", "review", "moscow", "benchmark"],
      a: "Kwame led the agency's directors and executive team through a redesign of its performance evaluation system: benchmarked 10 peer organizations, taught MoSCoW prioritization, and designed a model built on self-assessment and growth plans, now rolled out agency-wide." },
    { keys: ["product", "prd", "ocr", "computer vision", "automation", "owned", "compliance", "engineer"],
      a: "Kwame proposed and product-owned an automated OCR and computer-vision pre-check that flags unsigned forms before they reach records staff, wrote the PRD, and planned a phased build with IT." },
    { keys: ["campaign", "communications", "languages", "translation", "community"],
      a: "Kwame led a multichannel awareness campaign in all 5 of the agency's threshold languages: email, text, social media, mailed flyers, and a landing page with an infographic." },
    { keys: ["ai", "prompt", "claude", "llm", "automation"],
      a: "Kwame built a reusable AI prompt library for change management deliverables: about 95 source files, house style rules, 12 tested prompts, and a blind test that led to 6 prompt fixes." },
    { keys: ["givedirectly", "give directly", "previous", "before", "technical program"],
      a: "From 2021 to 2023 Kwame was a Technical Program Manager at GiveDirectly, building the data models and payment systems behind a $60M+ cash transfer portfolio across 8 countries." },
    { keys: ["payments", "fintech", "mobile money", "fraud", "payment", "qc"],
      a: "At GiveDirectly Kwame ran mobile-money distributions of $300K to $500K per payment cycle, with multi-stage automated QC audits to catch fraud, delivered to a zero-error standard." },
    { keys: ["salesforce", "architecture", "systems", "field", "offline", "taroworks", "infrastructure"],
      a: "Kwame built program architecture on Salesforce, Python, Apex and TaroWorks so hundreds of field officers could register recipients and track payments offline in low-connectivity regions." },
    { keys: ["million", "households", "deduplication", "dedupe", "milestone", "data clean", "visualization"],
      a: "Kwame wrote the rule-based deduplication that isolated unique households across a 15-year, 8M+ record dataset, delivering GiveDirectly's 1 million households milestone and the data model behind its public visualization." },
    { keys: ["data engineering", "legacy", "pandas", "schema", "dataset", "reconcile", "python"],
      a: "Kwame re-engineered an 8M+ record legacy dataset in Python and pandas: reconciling name variants, ages, birthdates, multi-format locations and currencies into one clean model." },
    { keys: ["morocco", "usaid", "liberia", "international", "countries"],
      a: "Their GiveDirectly work included a $12M USAID drought relief program in Morocco and a county-wide pilot in Maryland County, Liberia, built to lay groundwork for national rollout." },
    { keys: ["buildher", "nairobi", "kenya", "cash plus", "women"],
      a: "In Nairobi Kwame ran a cash-plus program pairing cash transfers with BuildHer's construction training for women entering the trade, from program design through payments." },
    { keys: ["inclusive", "accessibility", "disabled", "disability"],
      a: "Kwame designed delivery options so disabled and remote recipients weren't left out: home visits, a fraud-resistant proxy pickup system, and budgeted phones for people without mobile money access." },
    { keys: ["election", "crisis", "risk", "contingency"],
      a: "During Kenya's 2022 election Kwame designed contingency plans that accelerated timelines to keep cash flowing while reducing physical safety risk." },
    { keys: ["fierce", "audre lorde", "nonprofit", "organizing", "2012"],
      a: "From 2012 to 2016 Kwame was Program Manager at FIERCE! and the Audre Lorde Project (sister orgs) in New York, running education programs, Know Your Rights trainings, and campaigns that won a mobile HIV testing unit for the Christopher Street community." },
    { keys: ["fundraising", "raised", "money"],
      a: "At FIERCE! Kwame raised $32K net on a $0 budget using donated space, products and services." },
    { keys: ["design", "designer", "graphic", "logo", "branding", "print"],
      a: "Kwame is a graphic designer: visual identities, logos, business cards, web graphics, and production-ready print files. See open design." },
    { keys: ["build", "builds", "built", "make", "makes", "create", "creates"],
      a: "Kwame builds programs, data models, payment systems, dashboards, web apps, prompt libraries, training programs, logos and more. Type open projects to see some." },
    { keys: ["services", "hire", "freelance", "available", "work with"],
      a: "Kwame takes on freelance data and design work: spreadsheet cleanup, data consolidation, business cards with data viz, graphic design and visual identity. Type open services, or open contact to ask." },
    { keys: ["skills", "stack", "languages", "python", "code", "programming", "technical", "git", "numpy", "html", "css", "nlp", "etl", "data model", "dashboard"],
      a: "Python (pandas, NumPy, scikit-learn, NLTK), SQL, Apex, JavaScript, HTML, CSS, Git. Plus machine learning, NLP, ETL, data modeling and dashboards." },
    { keys: ["methods", "agile", "scrum", "change management", "adkar", "kotter"],
      a: "Agile, Scrum, Kanban and waterfall delivery; Prosci ADKAR and Kotter for change management; RAID logs, Gantt charts, RACI, root cause analysis, and pilot design." },
    { keys: ["tools", "jira", "tableau", "platforms"],
      a: "Salesforce, Jira, Confluence, Tableau, Asana, Notion, Microsoft 365, SharePoint, Miro, Lucidchart, and Adobe Illustrator, InDesign and Photoshop." },
    { keys: ["pmp", "certification", "certified", "pmi", "project management", "exam"],
      a: "Kwame earned their PMP in 2024, scoring Above Target in all three exam domains." },
    { keys: ["education", "school", "codeup", "nyu", "study", "studied"],
      a: "Data Science Certification from Codeup (2020 to 2021, 670+ hours). Before that Kwame studied at NYU Gallatin in New York and Accra, concentrating in Digital Media for Social Justice." },
    { keys: ["projects", "portfolio", "spotiscry", "bachelorette", "zillow", "classifier"],
      a: "Data projects include Queue Tip (scheduled and on-request Spotify playlist automation), SpotiScry (predicting Spotify popularity), a Bachelorette contestant predictor that halved baseline error, a GitHub language classifier, and a Zillow Zestimate error analysis. Type open projects." },
    { keys: ["duel magician", "duel links", "yugioh", "yu-gi-oh", "games", "hobby", "video game", "rom", "game dev"],
      a: "They're building Duel Magician, a deckbuilding companion for Yu-Gi-Oh! Duel Links with a hand-verified card database and a model that suggests tags for new cards. Kwame also makes ROM hacks and games in RPG Maker and Unity." },
    { keys: ["contact", "email", "reach", "hello", "hi"],
      a: "The best way to reach them is the contact form. Type open contact." },
    { keys: ["where", "location", "based", "los angeles"],
      a: "They're based in Los Angeles, California." }
  ],


  /* One of these is shown in the terminal's welcome line, a different one each visit. */
  tips: [
    "Try: draw",
    "Try: fig",
    "Some old cheat codes still work here.",
    "Ask me about Trogdor.",
    "Try: save",
    "Try: kern",
    "Try: it's time to duel",
    "Try: xyzzy",
    "Real programmers try ls -a.",
    "Hint: Never gonna give you up."
  ],

  /* What "cat .secrets" prints. A few commands, never all of them. */
  secrets: ["draw", "fig", "save", "kern", "rickroll", "comic sans", "trogdor", "coffee"],

  /* Hidden terminal commands. Not listed in help; people find them. */
  cards: [
    "Kwame, PMP · Level 8 · Effect: once per program, turn chaos into a Gantt chart.",
    "Data Wrangler · Level 4 · Effect: deduplicate 8 million records. Your opponent's spreadsheet is cleaned.",
    "Zero-Error Payout · Spell · Effect: send $500K to the right people, on time.",
    "Change Management · Trap · Effect: when your opponent says \"we've always done it this way\", negate it.",
    "Typesetter · Level 3 · Effect: kerning cannot be destroyed by battle.",
    "Say Hello · Spell · Effect: open the contact form. Kwame replies."
  ],

  /* The seven figures from the back of Kwame's business card. */
  figures: [
    ["Worldwide Google searches for \"rickroll\": peaked April 2008", "Google Trends, monthly, peak month = 100"],
    ["Bitcoin price, every quarter: $0.06 →︎ $68,215", "Coin Metrics community data, Sept. 2010 to March 2026"],
    ["Films passing the Bechdel test: 52% →︎ 66%", "BechdelTest.com (user-submitted), 7,000+ films"],
    ["Solar panel price per watt: $106 →︎ $0.38", "Lafond et al. & IRENA, via Our World in Data"],
    ["Exoplanets discovered each year: 5,397 since 1995", "Open Exoplanet Catalogue"],
    ["Mobile money accounts in Sub-Saharan Africa: 48M →︎ 396M", "GSMA (2019), via Our World in Data"],
    ["Developers on GitHub in the U.S.: 9.8M →︎ 32.4M", "GitHub Innovation Graph, quarterly"]
  ],

  /* Homestar Runner references */
  homestar: {
    homestar: "Everybody! Everybody! Homestar Runner says hi, and says you should hire Kwame. He's not sure for what.",
    homsar: "DaAaAaAaAa! Welcome to the website, which is also a desktop, which is also a website.",
    trogdor: "TROGDOR! Burninating the countryside. Burninating the peasants. Burninating all the windows on this desktop.",
    consummate: "Consummate V's. Kwame keeps one in their name.",
    sbemail: "From: a visitor\nSubject: this desktop\n\"Dear Strong Bad, how do I get in touch with the person who made this?\"\n\nStrong Bad: Ugh. Use the contact form, it's right there. Type open contact.\n\n{{DELETED}}",
    fhqwhgads: "Come on, fhqwhgads. Everybody, to the limit.",
    cheat: "The Cheat is not dead! The Cheat is, however, unavailable for freelance work."
  },

  afrofuturism: {
    intro: "Afrofuturism: Black futures imagined through art, music, fiction and technology. It shapes how Kwame thinks about design. Try: sun ra, octavia.",
    sunra: "Space is the place. · Sun Ra",
    octavia: "All that you touch / You Change. / All that you Change / Changes you. · Octavia E. Butler, Parable of the Sower"
  },

  champions: [
    { name: "Black Trans Media", url: "https://www.blacktransmedia.org/" },
    { name: "For the Gworls", url: "https://www.forthegworls.com/" }
  ]
};
