import Vital_Tech from "../assets/Vital_Tech.svg";
import Planet_Escape from "../assets/Planet_Escape.svg";
import Music_Web from "../assets/Music_Web1.svg";
import VentureOut from "../assets/Outdoor.svg";
import Quickbite from "../assets/Quickbite.svg";
import Quiz_Maker from "../assets/Quiz_Maker.svg";
import Weatherly from "../assets/Weatherly.svg";
import Temple from "../assets/Temple.svg";
import LLMChat from "../assets/LLMChat.svg";
import pdf from "../assets/pdf.svg";
import ClusterNews from "../assets/ClusterNews.png";
import Polyglot from "../assets/Polyglot.png";
import Testeval from "../assets/Testeval.png";
import Don_Peppe from "../assets/Don_Peppe.svg";

const mywork_data = [
  {
    w_no: 1,
    w_name: "Polyglot",
    w_img: Polyglot,
    w_desc:
      "Automated framework for benchmarking LLM-based C-to-Java/Python/Rust code translation with prompt strategies and test validation.",
    w_tags: [
      "Python",
      "Docker",
      "PyTest",
      "Ollama",
      "SQLite",
      "Prompt Engineering",
    ],
    w_link: "https://llm-code-translation-dashboard.vercel.app/",
  },
  {
    w_no: 2,
    w_name: "TestForge",
    w_img: Testeval,
    w_desc:
      "LLM-powered tool for automating and benchmarking Test-Driven Development workflows at scale, with modern architecture.",
    w_tags: [
      "FastAPI",
      "Next.js",
      "Docker",
      "LangChain",
      "PostgreSQL",
      "Typescript",
      "Celery",
      "Prompt Engineering",
    ],
    w_link: "https://testforge-dashboard.vercel.app/",
  },
  {
    w_no: 3,
    w_name: "ClusterNews",
    w_img: ClusterNews,
    w_desc:
      "AI-powered news app that scrapes, clusters, and summarizes trending headlines locally using vector embeddings and LLaMA 3.1.",
    w_tags: [
      "Python",
      "Flask",
      "Selenium",
      "Ollama",
      "sentence-transformers",
      "HDBSCAN",
    ],
    w_link: "https://github.com/priyam-02/ClusterNews",
  },
  {
    w_no: 2,
    w_name: "TalkToLLM",
    w_img: LLMChat,
    w_desc:
      "Chat locally with LLMs using Streamlit and FastAPI, featuring model selection, system prompts, and streaming UI.",
    w_tags: ["Ollama", "Fastapi", "Streamlit", "Llama", "Deepseek", "Qwen"],
    w_link: "https://github.com/priyam-02/TalkToLLM",
  },
  {
    w_no: 3,
    w_name: "DocSnap",
    w_img: pdf,
    w_desc:
      "A Streamlit app that summarizes uploaded PDFs using BART, with customizable length and tone controls.",
    w_tags: [
      "Python",
      "Streamlit",
      "Transformers",
      "PyTorch",
      "pdfplumber",
      "facebook/bart-large-cnn",
    ],
    w_link: "https://github.com/priyam-02/DocSnap",
  },
  {
    w_no: 4,
    w_name: "Quickbite",
    w_img: Quickbite,
    w_desc:
      "A food ordering app designed for seamless browsing, ordering, and managing meals.",
    w_tags: ["React", "CSS", "MongoDB", "Node"],
    w_link: "https://github.com/priyam-02/Quickbite",
  },
  {
    w_no: 2,
    w_name: "VentureOut",
    w_img: VentureOut,
    w_desc:
      "A web app connecting enthusiasts to discover, share, and join outdoor activities.",
    w_tags: ["HTML/CSS", "Node", "MongoDB", "Express"],
    w_link: "https://github.com/priyam-02/VentureOut",
  },
  {
    w_no: 3,
    w_name: "Vital Tech",
    w_img: Vital_Tech,
    w_desc:
      "ML-powered respiratory disease diagnostics like COVID-19, Tuberculosis, Pneumonia.",
    w_tags: ["React", "CSS", "Node", "MongoDB", "Express"],
    w_link: "https://github.com/priyam-02/VitalTech_Diagnostic_Web_Application",
  },
  {
    w_no: 4,
    w_name: "Don Peppe",
    w_img: Don_Peppe,
    w_desc:
      "Seamless pizza ordering system with simplified admin and client ordering features.",
    w_tags: ["HTML/JS/CSS", "Django (Python)", "MySQL"],
    w_link: "https://github.com/priyam-02/DonPeppe",
  },
  {
    w_no: 5,
    w_name: "Weatherly",
    w_img: Weatherly,
    w_desc: "Weather forecasting tool, with global weather at your fingertips.",
    w_tags: ["React", "CSS", "GeoDB / OpenWeather API"],
    w_link: "https://weatherly-ruby.vercel.app/",
  },
  {
    w_no: 6,
    w_name: "Planet Escape",
    w_img: Planet_Escape,
    w_desc:
      "A 2D survival game navigating challenges on a hostile alien planet.",
    w_tags: ["GameMaker", "GML"],
    w_link: "https://github.com/priyam-02/Planet_Escape",
    w_live: "https://gx.games/games/d4zbbl/planet-escape/",
  },
  {
    w_no: 7,
    w_name: "Temple of Vormir",
    w_img: Temple,
    w_desc:
      "A 2D multiplayer platformer of exploration, puzzles, and adventure.",
    w_tags: ["GameMaker", "GML"],
    w_link: "https://github.com/priyam-02/Temple_of_Vormir",
    w_live: "https://gx.games/games/5y9vbu/temple-of-vormir/",
  },
  {
    w_no: 8,
    w_name: "QuizMaker",
    w_img: Quiz_Maker,
    w_desc: "Create, attempt, and track quiz progress along with results.",
    w_tags: ["Flutter", "Dart", "Firebase"],
    w_link: "https://github.com/priyam-02/QuizMaker",
  },
  {
    w_no: 9,
    w_name: "MusicPulse",
    w_img: Music_Web,
    w_desc:
      "Web based app for listening, playlist creation, and music control.",
    w_tags: ["HTML/JS/CSS"],
    w_link: "https://github.com/priyam-02/MusicPulse",
  },
];

export default mywork_data;
