const nodes = [
  // Primary nodes — large glowing spheres with full content
  {
    id: "bachelors",
    type: "primary",
    label: "Bachelor's",
    tagline: "Where it all began",
    year: "2023",
    icon: "fa-graduation-cap",
    blurb:
      "B.Tech in Information Technology from Indus Institute. Built my first web apps and discovered the joy of building things that work.",
    pos: [-4.2, 0, 0],
  },
  {
    id: "masters",
    type: "primary",
    label: "Master's",
    tagline: "Leveling up in CS",
    year: "2025",
    icon: "fa-university",
    blurb:
      "M.S. in Computer Science at UNC Charlotte. Dove deep into AI/ML, software engineering research, and advanced systems.",
    pos: [-0.5, 0, 0.5],
  },
  {
    id: "llm-research",
    type: "primary",
    label: "LLM Research",
    tagline: "CS meets AI, hands-on",
    year: "2025",
    icon: "fa-flask",
    blurb:
      "Published at ASE 2025: Polyglot \u2014 an extensible framework for benchmarking code translation with LLMs.",
    pos: [3.2, 1.5, -0.5],
  },
  {
    id: "ai-strategy",
    type: "primary",
    label: "AI Strategy",
    tagline: "Building the future",
    year: "2026",
    icon: "fa-robot",
    blurb:
      "Senior Associate \u2014 AI Strategy & Automation at The Exit Group. Applying AI to real business problems and driving strategy with data.",
    pos: [4.5, -1.8, 0.8],
  },

  // Secondary nodes — small glowing dots
  {
    id: "web-dev",
    type: "secondary",
    label: "Web Dev",
    pos: [-3.0, 1.8, 1],
  },
  {
    id: "swe",
    type: "secondary",
    label: "Software Eng.",
    pos: [-3.0, -1.5, -1],
  },
  {
    id: "ai-ml",
    type: "secondary",
    label: "AI / ML",
    pos: [1.5, 2.2, 0.5],
  },
  {
    id: "teaching",
    type: "secondary",
    label: "Teaching",
    pos: [1.5, -2, -1],
  },
];

const edges = [
  { from: "bachelors", to: "web-dev" },
  { from: "web-dev", to: "masters" },
  { from: "bachelors", to: "swe" },
  { from: "swe", to: "masters" },
  { from: "masters", to: "ai-ml" },
  { from: "ai-ml", to: "llm-research" },
  { from: "masters", to: "teaching" },
  { from: "llm-research", to: "ai-strategy" },
  { from: "masters", to: "ai-strategy" },
  { from: "swe", to: "llm-research" },
  { from: "ai-ml", to: "ai-strategy" },
];

export default { nodes, edges };
