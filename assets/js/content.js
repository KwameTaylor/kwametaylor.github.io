/* Everything you are likely to edit lives in this file.
   README.md explains how to add a service, a project, a design piece or an organization. */
window.SITE = {

  /* Portrait. Put the image in assets/img and write its path here, for example "assets/img/portrait.jpg".
     Leave it empty to show the drawn placeholder. */
  portrait: "",

  /* Contact form endpoint from your form service, for example "https://formspree.io/f/abcdwxyz".
     Leave it empty until the form is set up. */
  formEndpoint: "",

  /* The phrase that rotates after "I build" on the home page. */
  phrases: ["data models.", "payment systems.", "tools.", "identities."],

  services: [
    { name: "Spreadsheet cleanup", line: "Your file, tidied and made consistent.",
      includes: ["One file, any size", "A note on what changed", "One round of fixes"] },
    { name: "Data put in order", line: "Scattered data brought into one place you can use.",
      includes: ["Sources combined", "Clear column names", "A short summary"] },
    { name: "Business cards with charts", line: "A card that shows your numbers.",
      includes: ["Front and back design", "Charts from your own data", "Print-ready files"] },
    { name: "Logos and identity", line: "A mark, colours and type that go together.",
      includes: ["A few directions to choose from", "Colour and type choices", "Files for web and print"] }
  ],

  /* status, year and stack are optional. link is optional; without one the page says a link is coming.
     image is optional: a screenshot path such as "assets/img/queue-tip.png". */
  projects: [
    { name: "Queue Tip", status: "My own tool",
      text: "A tool I built for my own use. A fuller description and a link will go here.", link: "", image: "" },
    { name: "Duel Magician", status: "In progress", stack: "Python, scikit-learn",
      text: "A deckbuilding companion for Yu-Gi-Oh! Duel Links. Not ready to show yet.", link: "", image: "" },
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
    { title: "Identity system, placeholder", type: "Identity", shape: "wide", glyph: "Kk", tone: "" },
    { title: "Flyer, placeholder", type: "Print", shape: "square", glyph: "!", tone: "k" }
  ],


  /* What the Terminal on the home page can answer. keys are words or short phrases a visitor might type;
     the answer with the most matching keys wins. The terminal speaks about Kwame, as his computer. */
  facts: [
    { keys: ["who", "summary", "background", "introduce", "bio"],
      a: "Kwame is a PMP-certified technical program manager in Los Angeles with a data science background and 8+ years leading social impact programs. He builds the systems he runs." },
    { keys: ["current", "now", "nlacrc", "regional center", "job", "role"],
      a: "Since May 2025 he's the Change Management Project Manager and Business Transformation Lead at NLACRC, a regional center in Los Angeles serving 40,000+ people with developmental disabilities. He leads organization-wide process redesign and data-driven change." },
    { keys: ["nlacrc accomplish", "nlacrc achieve", "nlacrc impact", "transfer", "cycle time", "faster"],
      a: "At NLACRC he designed, coded and shipped a smart form and validation checklist that cut median inter-office case transfer time from 13 to 8 business days." },
    { keys: ["sop", "process", "standard", "training", "rollout", "staff"],
      a: "He leads process redesigns end to end: staff interviews, participatory design workgroups, process mapping, pilots, the agency's first SOPs, and a train-the-trainer rollout to 800+ case management staff across 3 offices." },
    { keys: ["metrics", "kpi", "strategic plan", "governance", "measure"],
      a: "He built NLACRC's first end-to-end metrics framework for its 2027 to 2029 Strategic Plan, with baselines and success metrics for each change initiative." },
    { keys: ["performance", "evaluation", "review", "moscow"],
      a: "He led the agency's directors and executive team through a redesign of its performance evaluation system: benchmarked 10 peer organizations, taught MoSCoW prioritization, and delivered a model built on self-assessment and growth plans, now rolled out agency-wide." },
    { keys: ["product", "prd", "ocr", "computer vision", "automation"],
      a: "He proposed and product-owned an automated OCR and computer-vision pre-check that flags unsigned forms before they reach records staff, wrote the PRD, and planned a phased build with IT." },
    { keys: ["campaign", "communications", "languages", "translation", "community"],
      a: "He led a multichannel awareness campaign in all 5 of the agency's threshold languages: email, text, social media, mailed flyers, and a landing page with an infographic." },
    { keys: ["ai", "prompt", "claude", "llm"],
      a: "He built a reusable AI prompt library for change management deliverables: about 95 source files, house style rules, 12 tested prompts, and a blind test that led to 6 prompt fixes." },
    { keys: ["givedirectly", "give directly", "previous", "before"],
      a: "From 2021 to 2023 he was a Technical Program Manager at GiveDirectly, building the data models and payment systems behind a $60M+ cash transfer portfolio across 8 countries." },
    { keys: ["payments", "fintech", "mobile money", "fraud", "payment"],
      a: "At GiveDirectly he ran mobile-money distributions of $300K to $500K per payment cycle, with multi-stage automated QC audits to catch fraud, delivered to a zero-error standard." },
    { keys: ["salesforce", "architecture", "systems", "field", "offline", "taroworks"],
      a: "He built program architecture on Salesforce, Python, Apex and TaroWorks so hundreds of field officers could register recipients and track payments offline in low-connectivity regions." },
    { keys: ["million", "households", "deduplication", "dedupe", "milestone"],
      a: "He wrote the rule-based deduplication that isolated unique households across a 15-year, 8M+ record dataset, delivering GiveDirectly's 1 million households milestone and the data model behind its public visualization." },
    { keys: ["data engineering", "legacy", "pandas", "schema", "dataset"],
      a: "He re-engineered an 8M+ record legacy dataset in Python and pandas: reconciling name variants, ages, birthdates, multi-format locations and currencies into one clean model." },
    { keys: ["morocco", "usaid", "liberia", "international", "countries"],
      a: "His GiveDirectly work included a $12M USAID drought relief program in Morocco and a county-wide pilot in Maryland County, Liberia, built to lay groundwork for national rollout." },
    { keys: ["buildher", "nairobi", "kenya", "cash plus", "women"],
      a: "In Nairobi he ran a cash-plus program pairing cash transfers with BuildHer's construction training for women entering the trade, from program design through payments." },
    { keys: ["inclusive", "accessibility", "disabled", "disability"],
      a: "He designed delivery options so disabled and remote recipients weren't left out: home visits, a fraud-resistant proxy pickup system, and budgeted phones for people without mobile money." },
    { keys: ["election", "crisis", "risk", "contingency"],
      a: "During Kenya's 2022 election he designed contingency plans that accelerated timelines to keep cash flowing while reducing physical safety risk." },
    { keys: ["fierce", "audre lorde", "nonprofit", "organizing", "2012"],
      a: "From 2012 to 2016 he was Program Manager at FIERCE! and the Audre Lorde Project in New York, running education programs, Know Your Rights trainings, and campaigns that won a mobile HIV testing unit for the Christopher Street community." },
    { keys: ["fundraising", "raised", "money"],
      a: "At FIERCE! he raised $32K net on a $0 budget using donated space, products and services." },
    { keys: ["design", "designer", "graphic", "logo", "branding", "print"],
      a: "He's been a graphic designer since 2011: visual identities, logos, business cards, web graphics, and production-ready print files. See open design." },
    { keys: ["services", "hire", "freelance", "available", "work with"],
      a: "He takes on freelance data and design work: spreadsheet cleanup, data put in order, business cards with charts, logos and identity. Type open services, or open contact to ask." },
    { keys: ["skills", "stack", "languages", "python", "code", "programming", "technical"],
      a: "Python (pandas, NumPy, scikit-learn, NLTK), SQL, Apex, JavaScript, HTML, CSS, Git. Plus machine learning, NLP, ETL, data modeling and dashboards." },
    { keys: ["methods", "agile", "scrum", "change management", "adkar", "kotter"],
      a: "Agile, Scrum, Kanban and waterfall delivery; Prosci ADKAR and Kotter for change management; RAID logs, Gantt charts, RACI, root cause analysis, and pilot design." },
    { keys: ["tools", "jira", "tableau", "platforms"],
      a: "Salesforce, Jira, Confluence, Tableau, Asana, Notion, Microsoft 365, SharePoint, Miro, Lucidchart, and Adobe Illustrator, InDesign and Photoshop." },
    { keys: ["pmp", "certification", "certified"],
      a: "He earned his PMP in 2024, scoring Above Target in all three exam domains." },
    { keys: ["education", "school", "codeup", "nyu", "study", "studied"],
      a: "Data Science Certification from Codeup (2020 to 2021, 670+ hours). Before that he studied at NYU Gallatin in New York and Accra, concentrating in Digital Media for Social Justice." },
    { keys: ["projects", "portfolio", "spotiscry", "bachelorette", "zillow", "classifier"],
      a: "Data projects include SpotiScry (predicting Spotify popularity), a Bachelorette contestant predictor that halved baseline error, a GitHub language classifier, and a Zillow Zestimate error analysis. Type open projects." },
    { keys: ["duel magician", "duel links", "yugioh", "yu-gi-oh", "games", "hobby"],
      a: "He's building Duel Magician, a deckbuilding companion for Yu-Gi-Oh! Duel Links with a hand-verified card database and a model that suggests tags for new cards. He also makes ROM hacks and games in RPG Maker and Unity." },
    { keys: ["contact", "email", "reach", "hello", "hi"],
      a: "The best way to reach him is the contact form. Type open contact." },
    { keys: ["where", "location", "based", "los angeles"],
      a: "He's based in Los Angeles, California." }
  ],


  /* Hidden terminal commands. Not listed in help; people find them. */
  cards: [
    "KWAME, PMP · Level 8 · Effect: once per program, turn chaos into a Gantt chart.",
    "Data Wrangler · Level 4 · Effect: deduplicate 8 million records. Your opponent's spreadsheet is cleaned.",
    "Zero-Error Payout · Spell · Effect: send $500K to the right people, on time.",
    "Change Management · Trap · Effect: when your opponent says \"we've always done it this way\", negate it.",
    "Typesetter · Level 3 · Effect: kerning cannot be destroyed by battle.",
    "Say Hello · Spell · Effect: open the contact form. Kwame replies."
  ],

  /* The seven figures from the back of Kwame's business card. */
  figures: [
    ["Worldwide Google searches for \"rickroll\": peaked April 2008", "Google Trends, monthly, peak month = 100"],
    ["Bitcoin price, every quarter: $0.06 → $68,215", "Coin Metrics community data, Sept. 2010 to March 2026"],
    ["Films passing the Bechdel test: 52% → 66%", "BechdelTest.com (user-submitted), 7,000+ films"],
    ["Solar panel price per watt: $106 → $0.38", "Lafond et al. & IRENA, via Our World in Data"],
    ["Exoplanets discovered each year: 5,397 since 1995", "Open Exoplanet Catalogue"],
    ["Mobile money accounts in Sub-Saharan Africa: 48M → 396M", "GSMA (2019), via Our World in Data"],
    ["Developers on GitHub in the U.S.: 9.8M → 32.4M", "GitHub Innovation Graph, quarterly"]
  ],

  afrofuturism: {
    intro: "Afrofuturism: Black futures imagined through art, music, fiction and technology. It shapes how Kwame thinks about design. Try: sun ra, octavia.",
    sunra: "Space is the place. · Sun Ra",
    octavia: "All that you touch you change. · Octavia E. Butler, Parable of the Sower"
  },

  champions: [
    { name: "Black Trans Media", url: "https://www.blacktransmedia.org/" },
    { name: "For the Gworls", url: "https://www.forthegworls.com/" }
  ]
};
