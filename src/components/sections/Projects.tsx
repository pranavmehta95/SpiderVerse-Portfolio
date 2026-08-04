"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Project {
  mission: string; // e.g. "01"
  category: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  accent: string; // preview gradient accent
}

// ─────────────────────────────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    mission: "01",
    category: "Full Stack · AI",
    title: "AI Study Companion",
    description:
      "AI-powered study platform that transforms PDFs into summaries, quizzes, flashcards and personalized learning experiences.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "Gemini API"],
    github: "https://github.com/pranavmehta95/AI-Smart-Study-Companion",
    demo: "https://ai-smart-study-companion.vercel.app/",
    accent: "from-violet-900/30 via-transparent to-transparent",
  },
  {
    mission: "02",
    category: "Frontend",
    title: "Spider-Verse Portfolio",
    description:
      "A cinematic developer portfolio inspired by Spider-Verse with immersive interactions and modern UI design.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "#",
    demo: "#",
    accent: "from-red-900/20 via-transparent to-transparent",
  },
  {
    mission: "03",
    category: "Full Stack",
    title: "Expense Tracker",
    description:
      "A secure expense management application with authentication, analytics and responsive dashboards.",
    tech: ["React", "Express", "MongoDB", "JWT"],
    github: "https://github.com/pranavmehta95/PETV-project",
    demo: "#",
    accent: "from-emerald-900/20 via-transparent to-transparent",
  },
  {
    mission: "04",
    category: "AI · Machine Learning",
    title: "Mental Health Detection System",
    description:
      "An AI-powered system that analyzes behavioral patterns to assist in early mental health prediction.",
    tech: ["Python", "TensorFlow", "Flask", "Scikit-learn"],
    github: "https://github.com/pranavmehta95/PREDICTIVE-ANALYTICS",
    demo: "#",
    accent: "from-blue-900/20 via-transparent to-transparent",
  },
];

// ─────────────────────────────────────────────────────────────
// TECH ICONS — inline SVG map (Simple Icons paths)
// ─────────────────────────────────────────────────────────────
const TECH_ICONS: Record<string, JSX.Element> = {
  "React": (
    <svg viewBox="0 0 24 24" fill="#61DAFB" width="13" height="13" aria-label="React">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.104-2.29zM9.873 7.497c.655.086 1.326.2 2.01.342-.19.475-.38.967-.555 1.475-.608-.317-1.21-.617-1.79-.897.104-.315.21-.622.335-.92zm4.132.805c.58.28 1.18.58 1.785.895-.174.507-.364.999-.554 1.474-.684-.14-1.356-.256-2.012-.34.188-.487.382-.978.556-1.477.076.016.15.03.225.048zM12 9.988c.437 0 .867.013 1.29.036-.244.672-.476 1.357-.685 2.054-.61.006-1.215.017-1.806.032-.21-.696-.442-1.382-.686-2.054.43-.023.86-.07 1.887-.068zm-2.674.423c-.65.083-1.32.195-2.005.334.165-.476.352-.966.556-1.474.582.278 1.183.578 1.79.897-.112.08-.228.16-.341.243zM4.87 11.03c.528-.088 1.074-.165 1.63-.227.29.782.592 1.553.907 2.295-.32.74-.62 1.51-.91 2.293-.56-.063-1.107-.14-1.635-.23-1.785-.36-2.86-.96-2.86-1.96 0-.995 1.075-1.594 2.868-1.97zM12.2 21.98c-1.015 0-2.507-.81-4.098-2.29.69-.72 1.375-1.54 2.034-2.446 1.1-.117 2.147-.298 3.107-.534.107.496.196.98.25 1.44.225 1.868-.065 3.322-.73 3.703a1.11 1.11 0 0 1-.563.127zm2.716-2.786c-.363.194-.732.376-1.1.548.175-.51.364-1.003.555-1.477.44.088.874.187 1.292.3-.243.222-.495.434-.747.629zm-5.887-.548c-.367-.172-.736-.355-1.1-.548-.252-.194-.503-.406-.746-.628.418-.114.85-.213 1.29-.3.19.473.38.966.556 1.476zm7.085-1.655c-.582-.135-1.182-.254-1.79-.35.173-.475.364-.967.555-1.476.652-.085 1.323-.2 2.008-.342-.165.476-.352.965-.557 1.474-.07.232-.144.46-.216.694zm-8.226-.35c-.607.095-1.207.214-1.788.35-.072-.234-.147-.462-.217-.694-.205-.51-.39-1-.557-1.474.685.143 1.356.257 2.008.342.19.508.382 1.001.554 1.476zm4.114.55c-.432.024-.862.035-1.29.035-1.028.002-1.86-.043-1.887-.047.244-.673.477-1.358.686-2.055.59.015 1.196.026 1.806.032.21.697.44 1.383.685 2.035zm2.673-.424c.113-.08.23-.16.343-.244.65-.084 1.32-.197 2.005-.335-.165.476-.352.966-.556 1.474-.58-.278-1.182-.578-1.79-.897z" />
    </svg>
  ),
  "Next.js": (
    <svg viewBox="0 0 24 24" fill="white" width="13" height="13" aria-label="Next.js">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0z" />
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 24 24" fill="#339933" width="13" height="13" aria-label="Node.js">
      <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082 c0.57,0.329,0.924,0.944,0.924,1.603v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z" />
    </svg>
  ),
  "MongoDB": (
    <svg viewBox="0 0 24 24" fill="#47A248" width="13" height="13" aria-label="MongoDB">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0 1 11.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 0 0 3.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
    </svg>
  ),
  "Gemini API": (
    <svg viewBox="0 0 24 24" fill="#8E75B2" width="13" height="13" aria-label="Gemini API">
      <path d="M12 24A14.304 14.304 0 000 12 14.304 14.304 0 0012 0a14.305 14.305 0 0012 12 14.305 14.305 0 00-12 12" />
    </svg>
  ),
  "TypeScript": (
    <svg viewBox="0 0 24 24" fill="#3178C6" width="13" height="13" aria-label="TypeScript">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 24 24" fill="#06B6D4" width="13" height="13" aria-label="Tailwind CSS">
      <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 24 24" fill="white" width="13" height="13" aria-label="Framer Motion">
      <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
    </svg>
  ),
  "Express": (
    <svg viewBox="0 0 24 24" fill="white" width="13" height="13" aria-label="Express">
      <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.707-.without" />
    </svg>
  ),
  "JWT": (
    <svg viewBox="0 0 24 24" fill="#d63aff" width="13" height="13" aria-label="JWT">
      <path d="M10.2 0v6.456L12 8.928l1.8-2.472V0zm3.6 6.456v3.072l2.937-1.Stakes 1.463-2.473zM6.864 8.061l-2.15 2.923 2.662 1.966 2.353-3.205zm10.272 0l-2.865 1.684 2.353 3.205 2.662-1.966zM12 9.936l-2.545 3.465.984 4.356 3.122-.001.983-4.357zm-7.396 3.288l-.985 4.357L6.74 18.79l.897-3.992zm14.792 0l-2.232 1.474.896 3.992 3.121-1.209zM6.228 18.252l-.94 2.148L7.2 22.344l1.524-2.268zm11.544 0l-2.496 1.824L16.8 22.344l1.912-1.944zM9.6 20.544L7.2 24h4.8zm4.8 0V24l2.4-3.456z" />
    </svg>
  ),
  "Python": (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-label="Python">
      <defs>
        <linearGradient id="pyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3776AB" />
          <stop offset="100%" stopColor="#FFD43B" />
        </linearGradient>
      </defs>
      <path fill="url(#pyGrad)" d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01.21.03zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z" />
    </svg>
  ),
  "TensorFlow": (
    <svg viewBox="0 0 24 24" fill="#FF6F00" width="13" height="13" aria-label="TensorFlow">
      <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-6.168-3.564v14.019L12.46 24V0l10.262 5.856v5.311z" />
    </svg>
  ),
  "Flask": (
    <svg viewBox="0 0 24 24" fill="white" width="13" height="13" aria-label="Flask">
      <path d="M7.634 0C6.44.001 5.7.81 5.7 1.74c0 .44.165.832.44 1.126a2.25 2.25 0 01.538 1.47c0 .69-.3 1.312-.78 1.755L3.34 7.86A9.958 9.958 0 002 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-1.613-.383-3.136-1.06-4.482L17.23 5.09a2.498 2.498 0 01-.78-1.755c0-.56.196-1.07.538-1.47.275-.294.44-.686.44-1.126C17.428.81 16.69.001 15.496 0zm4.355 5.5h.02c.552 0 1.003-.455 1.003-1.016 0-.56-.451-1.016-1.003-1.016h-.02c-.552 0-1.003.455-1.003 1.016 0 .561.451 1.016 1.003 1.016zM12 8a4 4 0 110 8 4 4 0 010-8z" />
    </svg>
  ),
  "Scikit-learn": (
    <svg viewBox="0 0 24 24" fill="#F7931E" width="13" height="13" aria-label="Scikit-learn">
      <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 3a7 7 0 100 14A7 7 0 0012 5zm0 2a5 5 0 110 10A5 5 0 0112 7zm0 2a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  ),
};

function TechIcon({ name }: { name: string }) {
  const icon = TECH_ICONS[name];
  if (!icon) return null;
  return <span className="shrink-0 opacity-80">{icon}</span>;
}

// ─────────────────────────────────────────────────────────────
// ICONS — inline SVG to avoid deps
// ─────────────────────────────────────────────────────────────
function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function ExternalLinkIcon({ size = 13 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}


// ─────────────────────────────────────────────────────────────
// FADE UP — reusable entrance wrapper
// ─────────────────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.article
        className="relative group flex flex-col h-full overflow-hidden rounded-[3px]"
        style={{
          backgroundColor: "#0a0a0a",
          border: "1px solid #1a1a1a",
          cursor: "default",
        }}
        whileHover={{
          y: -6,
          scale: 1.018,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Dual-edge glow on hover — CSS via box-shadow */}
        <motion.div
          className="absolute inset-0 rounded-[3px] pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            boxShadow:
              "-2px 0 24px rgba(30, 144, 255, 0.15), 2px 0 24px rgba(225, 29, 72, 0.12), 0 0 0 1px rgba(255,255,255,0.06)",
          }}
        />

        {/* Preview area — subtle gradient placeholder */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "160px", backgroundColor: "#0e0e0e" }}
        >
          {/* Gradient overlay matching project accent */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.accent}`}
          />
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Mission number watermark */}
          <div className="absolute bottom-4 right-5">
            <span
              className="font-heading font-bold select-none"
              style={{
                fontSize: "4.5rem",
                lineHeight: 1,
                color: "rgba(255,255,255,0.04)",
                letterSpacing: "-0.04em",
              }}
            >
              {project.mission}
            </span>
          </div>
          {/* Mission label — top-left */}
          <div className="absolute top-4 left-5 flex items-center gap-2">
            <div className="w-3 h-px bg-[#E11D48]" />
            <span
              className="font-sans text-[9px] tracking-[0.3em] uppercase"
              style={{ color: "#E11D48" }}
            >
              Mission {project.mission}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="flex flex-col flex-1 p-6 gap-4">
          {/* Category */}
          <span
            className="font-sans text-[10px] tracking-[0.22em] uppercase"
            style={{ color: "#444" }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h3
            className="font-heading font-semibold leading-snug"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
              color: "#E8E8E8",
              letterSpacing: "-0.015em",
              transition: "color 0.2s",
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p
            className="font-sans leading-[1.75] flex-1"
            style={{
              fontSize: "0.855rem",
              color: "#585858",
              transition: "color 0.2s",
            }}
          >
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 font-sans text-[10px] px-2.5 py-1 rounded-sm"
                style={{
                  border: "1px solid #222",
                  color: "#555",
                  backgroundColor: "#0d0d0d",
                  letterSpacing: "0.03em",
                  transition: "border-color 0.2s, color 0.2s",
                }}
              >
                <TechIcon name={t} />
                {t}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/[0.05] mt-1" />

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-1">
            {/* GitHub — outline */}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-[12px] px-4 py-2 rounded-sm"
              style={{
                border: "1px solid #222",
                color: "#666",
                backgroundColor: "transparent",
                letterSpacing: "0.04em",
                transition: "border-color 0.2s, color 0.2s",
              }}
              whileHover={{
                borderColor: "rgba(255,255,255,0.2)",
                color: "#ccc",
                transition: { duration: 0.2 },
              }}
              aria-label={`View ${project.title} on GitHub`}
            >
              <GithubIcon size={13} />
              GitHub
            </motion.a>

            {/* Live Demo — filled */}
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-sans text-[12px] px-4 py-2 rounded-sm"
              style={{
                backgroundColor: "#fff",
                color: "#0a0a0a",
                border: "1px solid #fff",
                fontWeight: 500,
                letterSpacing: "0.04em",
              }}
              whileHover={{
                backgroundColor: "#e8e8e8",
                transition: { duration: 0.2 },
              }}
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo
              <ExternalLinkIcon size={12} />
            </motion.a>
          </div>
        </div>

        {/* Left-edge accent bar — only on hover */}
        <motion.div
          className="absolute left-0 top-8 bottom-8 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(30,144,255,0.5), transparent)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          whileHover={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Right-edge accent bar — only on hover */}
        <motion.div
          className="absolute right-0 top-8 bottom-8 w-[2px] rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(225,29,72,0.4), transparent)",
          }}
          initial={{ opacity: 0, scaleY: 0 }}
          whileHover={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
        />
      </motion.article>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────
// CORNER WEB — bottom-left, barely visible
// ─────────────────────────────────────────────────────────────
function CornerWebBL() {
  return (
    <svg
      className="absolute bottom-0 left-0 opacity-[0.05] pointer-events-none"
      width="180"
      height="180"
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {[0, 15, 30, 45, 60, 75, 90].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const len = 160;
        return (
          <line
            key={i}
            x1="0"
            y1="180"
            x2={Math.cos(rad) * len}
            y2={180 - Math.sin(rad) * len}
            stroke="white"
            strokeWidth="0.5"
          />
        );
      })}
      {[35, 70, 110, 150].map((r, i) => (
        <path
          key={i}
          d={`M ${r} 180 A ${r} ${r} 0 0 1 0 ${180 - r}`}
          stroke="white"
          strokeWidth="0.5"
          fill="none"
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Corner web */}
      <CornerWebBL />

      {/* Top border */}
      <div className="w-full h-px bg-white/[0.06]" />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-28 md:py-40">

        {/* ── SECTION HEADER ── */}
        <div className="text-center mb-20 md:mb-28">
          <FadeUp delay={0}>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
              <span
                className="font-sans text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "#E11D48" }}
              >
                Selected Work
              </span>
              <div className="w-5 h-px" style={{ backgroundColor: "#E11D48" }} />
            </div>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2
              className="font-heading font-bold leading-[1.05]"
              style={{
                fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
                color: "#F0F0F0",
                letterSpacing: "-0.03em",
              }}
            >
              Featured Projects
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            {/* Thin red accent line below title */}
            <div className="flex justify-center mt-5 mb-7">
              <div
                className="w-12 h-[1.5px] rounded-full"
                style={{ backgroundColor: "#E11D48" }}
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.18}>
            <p
              className="font-sans max-w-[480px] mx-auto leading-[1.8]"
              style={{ fontSize: "0.925rem", color: "#555" }}
            >
              A selection of products, experiments and creative experiences
              I&apos;ve built.
            </p>
          </FadeUp>
        </div>

        {/* ── CARD GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.mission} project={project} index={i} />
          ))}
        </div>

        {/* ── BOTTOM CTA ── */}
        <FadeUp delay={0.2} className="mt-16 flex justify-center">
          <motion.a
            href="https://github.com/pranavmehta95?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 font-sans text-[12px] tracking-[0.1em] uppercase px-6 py-3 rounded-sm"
            style={{
              border: "1px solid #222",
              color: "#555",
              backgroundColor: "transparent",
            }}
            whileHover={{
              borderColor: "rgba(255,255,255,0.18)",
              color: "#ccc",
              transition: { duration: 0.2 },
            }}
          >
            <GithubIcon size={13} />
            View all on GitHub
          </motion.a>
        </FadeUp>
      </div>

      {/* Bottom border */}
      <div className="w-full h-px bg-white/[0.06]" />
    </section>
  );
}
