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

  champions: [
    { name: "Black Trans Media", url: "https://www.blacktransmedia.org/" },
    { name: "For the Gworls", url: "https://www.forthegworls.com/" }
  ]
};
