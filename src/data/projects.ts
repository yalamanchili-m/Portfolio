import type { Project } from "@/types/portfolio";

/**
 * PROJECTS: real repositories from github.com/yalamanchili-m, described
 * from their own READMEs. Every card links to its public repository.
 */
export const PROJECTS: Project[] = [
  {
    id: "recircle",
    title: "ReCircle",
    summary:
      "AI-powered circular economy intelligence platform for industrial waste management.",
    problem:
      "Industrial surplus and waste streams are hard to inventory, match, and reuse, so value leaks across fragmented supply chains.",
    solution:
      "A full-platform circular-economy application: publish structured material inventories, discover usable inputs through a marketplace, and evaluate supply–demand fit with deterministic, explainable matching.",
    highlights: [
      "Explainable material matching, industrial symbiosis discovery, and a circular path optimizer",
      "Carbon impact prediction, ESG dashboard, and trade-level reporting backed by PostgreSQL",
      "Retrieval-augmented sustainability assistant with a knowledge-graph sync layer",
    ],
    stack: ["Python", "FastAPI", "Next.js", "TypeScript", "PostgreSQL", "Neo4j", "RAG"],
    githubUrl: "https://github.com/yalamanchili-m/ReCircle",
    liveUrl: null,
    preview: "platform",
  },
  {
    id: "nutrilens",
    title: "NutriLens",
    summary: "AI-powered food recognition and calorie estimation from images.",
    problem:
      "Tracking what you eat is slow when nutrition has to be logged by hand from memory.",
    solution:
      "A computer-vision app that classifies food from photos across 101 categories, returns top-K predictions, and maps them to nutritional data through an interactive upload interface.",
    highlights: [
      "Trained Keras model on a 101-category food dataset",
      "Top-K predictions surfaced for every uploaded image",
      "Nutrition lookup from a structured dataset, with multi-image upload",
    ],
    stack: ["Python", "TensorFlow / Keras", "Flask", "Jupyter"],
    githubUrl: "https://github.com/yalamanchili-m/NutriLens",
    liveUrl: null,
  },
  {
    id: "veritas",
    title: "Veritas",
    summary:
      "Transformer-based news credibility classification and summarization engine.",
    problem:
      "Keyword and text-matching heuristics miss the linguistic patterns that separate credible reporting from fabricated news.",
    solution:
      "An NLP pipeline that classifies articles as real or fake with DistilBERT using contextual representations, then summarizes credible articles with BART inside a Streamlit dashboard.",
    highlights: [
      "Fine-tuned DistilBERT binary classifier with confidence scores",
      "Abstractive BART summarization for articles classified as real",
      "Interactive Streamlit analysis dashboard built with Hugging Face Transformers",
    ],
    stack: ["Python", "PyTorch", "Hugging Face", "DistilBERT", "BART", "Streamlit"],
    githubUrl: "https://github.com/yalamanchili-m/Veritas",
    liveUrl: null,
    preview: "transformer",
  },
  {
    id: "daywise",
    title: "DayWise",
    summary:
      "Full-stack AI meal planner that builds a personalized 30-day nutrition plan.",
    problem:
      "Building a month of calorie-appropriate meals and a matching grocery list is tedious and easy to abandon.",
    solution:
      "A FastAPI backend plus React frontend: calculate a TDEE-based calorie target, fetch calorie-matched recipes, generate a 30-day plan and an aisle-grouped grocery list, and persist it for later.",
    highlights: [
      "TDEE-based calorie targets from the user's profile and activity level",
      "30-day plan generation with Spoonacular recipe lookup and caching",
      "Grocery list grouped by aisle with quantity normalization and check-off",
    ],
    stack: ["React", "Python", "FastAPI", "SQLAlchemy", "Spoonacular API"],
    githubUrl: "https://github.com/yalamanchili-m/DayWise",
    liveUrl: null,
    preview: "planner",
  },
  {
    id: "flight-routes",
    title: "Optimal Flight Route Finder",
    summary:
      "Graph-based route optimization across cost, duration, and stop count.",
    problem:
      "Choosing a flight means trading off cost, travel time, and number of stops against real dataset constraints.",
    solution:
      "A Python graph engine that computes the optimal path between two airports for the chosen criterion, exposed through a clean Streamlit interface.",
    highlights: [
      "Shortest-path search over airport and flight datasets",
      "Switchable optimization target: cost, duration, or stops",
      "Separated backend logic and Streamlit UI for clean iteration",
    ],
    stack: ["Python", "Graph algorithms", "Streamlit", "CSV / JSON"],
    githubUrl: "https://github.com/yalamanchili-m/Optimal-Flight-Route-Finder",
    liveUrl: null,
  },
  {
    id: "movie-success",
    title: "Movie Success Predictor",
    summary:
      "Machine-learning app predicting box-office revenue and commercial success before release.",
    problem:
      "Pre-release metadata is messy and mixed-format, making box-office outcomes hard to estimate early.",
    solution:
      "An ML pipeline over the TMDB 5000 dataset with feature engineering, text analysis, and XGBoost models that estimate revenue and classify commercial success in a Streamlit app.",
    highlights: [
      "TF-IDF and Truncated SVD over movie overviews",
      "Multi-label genre encoding and automated preprocessing",
      "Regression for revenue plus classification for success likelihood",
    ],
    stack: ["Python", "XGBoost", "scikit-learn", "NLP", "Streamlit"],
    githubUrl: "https://github.com/yalamanchili-m/Movie-Success-Prediction",
    liveUrl: null,
  },
  {
    id: "winwin",
    title: "Student Management System",
    summary:
      "React student management system for records and day-to-day admin, with a deployed live demo.",
    problem:
      "Student data, attendance, and records need one simple interface instead of scattered spreadsheets.",
    solution:
      "A React single-page management app with structured forms, lists, and views, deployed on Vercel for direct use.",
    highlights: [
      "Component-driven React interface for student records",
      "Live deployment available for hands-on review",
    ],
    stack: ["React", "JavaScript", "CSS", "Vercel"],
    githubUrl: "https://github.com/yalamanchili-m/winwin",
    liveUrl: "https://student-management-system-blue-three.vercel.app",
  },
];
