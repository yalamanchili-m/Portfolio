import type { ExperienceEntry } from "@/types/portfolio";

/**
 * WORK HISTORY: three roles, newest first. CBIT Open Source Community has
 * moved to Beyond the Build, so it is no longer listed here.
 */
export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: "deloitte",
    organization: "Deloitte",
    role: "Technology Intern",
    location: "Hyderabad, India",
    period: "June 2026 — Present",
    shortPeriod: "Jun 2026 — Present",
    summary:
      "Agentic AI and browser automation on a cloud-native, full-stack AI product — from natural-language agent orchestration to normalized data pipelines.",
    highlights: [
      "Agentic AI & Browser Automation: Engineered an LLM-driven browser automation system using Browser Use and Playwright, enabling autonomous authentication, multi-step navigation, and information extraction across 8 different websites through dynamically configurable natural-language instructions.",
      "Natural-Language Agent Orchestration: Developed configurable agent workflows allowing non-technical users to define and modify browser navigation instructions in plain English without requiring website-specific scripts or developer intervention. Integrated scheduled execution and a centralized dashboard for task monitoring and workflow visibility.",
      "LLM-Driven Data Normalization: Developed AI-powered data processing workflows to normalize heterogeneous information from multiple web sources into predefined JSON schemas, using semantic field mapping to reconcile inconsistent naming conventions, standardize attributes, and preserve unmapped information in additional fields.",
      "Multimodal Document Intelligence: Integrated vision-language model-based document processing to extract information from stored documents and transform unstructured content into standardized JSON representations, enabling consolidation of document-derived and web-derived information.",
      "Data Engineering & Persistence: Designed and implemented structured data models and persistence workflows, storing normalized records in SQL databases and maintaining original documents in AWS S3 to support structured retrieval, data reuse, and downstream processing.",
      "Full-Stack AI Product Engineering: Developed and enhanced application interfaces using Next.js and React, implementing UI/UX improvements and integrating frontend components with Python backend services and AI-powered workflows.",
      "Cloud-Native Development & Deployment: Containerized application components using Docker and orchestrated multi-container environments through Docker Compose, supporting deployment of the application on AWS.",
    ],
    skills: ["Agentic AI", "Browser Use", "Playwright", "Next.js", "Python", "AWS", "Docker"],
  },
  {
    id: "cbit",
    organization: "Chaitanya Bharathi Institute of Technology (CBIT)",
    role: "Web Development Intern",
    location: "Under Prof. Shanmukhi Rama, CSE Department",
    period: "February 2026 — May 2026",
    shortPeriod: "Feb — May 2026",
    summary:
      "Computer-vision UI analysis and research into interface complexity, usability scoring, and UI effort estimation.",
    highlights: [
      "Computer Vision & UI Element Detection: Developed Python-based UI analysis workflows using YOLOv8, PyTorch, and OpenCV, involving Selenium-based website scraping, screenshot collection, UI dataset preparation, and object detection to identify and classify interface components through bounding-box localization and confidence scoring.",
      "OCR & Multimodal AI Integration: Integrated UI component detection with EasyOCR for text extraction and Meta-Llama-3-8B-Instruct through Hugging Face for contextual UX analysis, combining visual features, extracted text, and LLM-based reasoning to generate interface evaluation insights and improvement recommendations.",
      "Statistical Layout Analysis & UX Evaluation: Implemented baseline-driven UI validation using component coordinates, dimensions, and statistical positioning patterns to identify layout deviations, alignment inconsistencies, and sizing anomalies, contributing to quantitative UI quality assessment through usability scoring and rule-based evaluation.",
      "UI-COCOMO & Software Effort Estimation Research: Explored adapting the Constructive Cost Model (COCOMO) for UI development by extracting interface features, deriving equivalent UI Lines of Code (EqLOC_UI), applying pattern-based complexity weights (pattern_pcw), and developing an effort estimation framework to predict UI implementation hours from visual interface complexity.",
      "UI Pattern Recognition Research: Explored STYv12CNN (Spatio-Temporal YOLOv12 CNN), a proposed CNN-based architecture for enhanced UI pattern recognition and usability-oriented analysis, focusing on spatial relationships and structural characteristics of interface components.",
      "Frontend & Interactive Application Development: Developed and enhanced interactive interfaces using Streamlit, implementing screenshot uploads, UI element visualization, annotated detection outputs, statistical audit results, and AI-generated recommendations to translate computer vision and ML outputs into accessible user-facing insights.",
    ],
    skills: ["YOLOv8", "PyTorch", "OpenCV", "EasyOCR", "Llama 3", "Streamlit", "Research"],
  },
  {
    id: "red-dot",
    organization: "Red Dot Foundation (Safecity)",
    role: "Data Analyst Intern",
    location: "Remote",
    period: "August 2025 — November 2025",
    shortPeriod: "Aug — Nov 2025",
    summary:
      "Text analytics, business intelligence dashboards, and data automation for the Safecity programme.",
    highlights: [
      "Data Analytics & NLP: Developed Python-based exploratory text analytics workflows to process large volumes of open-ended, multilingual textual responses, generating word-cloud visualizations to surface recurring terms and utilizing FastText for language identification across multilingual datasets.",
      "Business Intelligence & KPI Analytics: Developed interactive dashboards using Google Looker Studio, implementing Pivot Tables, Treemaps, Line and Bar Charts, Scatter Plots, Waterfall Charts, and calculated KPI metrics to enable multidimensional data analysis, performance monitoring, and stakeholder reporting.",
      "Dashboard Design & Product Prototyping: Created dashboard wireframes using Figma, structuring information architecture and visualization layouts, and translated analytical requirements into functional dashboard implementations using Looker Studio.",
      "Data Automation & Process Optimization: Developed JavaScript-based Google Apps Script automations within Google Sheets to streamline repetitive data-cleaning and preprocessing workflows, reducing manual preprocessing time by 30–40%.",
      "Spreadsheet Analytics & Data Management: Leveraged advanced Microsoft Excel and Google Sheets for data organization, cleaning, transformation, formula-driven calculations, and analytical reporting.",
      "Data Quality & Validation: Utilized Google BigQuery and SQL-based validation workflows to inspect datasets, identify inconsistencies, and improve the reliability of processed information and analytical outputs.",
    ],
    skills: ["Python", "NLP", "Looker Studio", "BigQuery", "Apps Script", "Figma"],
  },
];
