'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { skillCategories } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';
import {
  Layout,
  Server,
  Cloud,
  Brain,
  Database,
  Scan,
} from 'lucide-react';

// Monochrome SVG icons for technologies (16-18px size, currentColor for easy styling)
const techIcons: Record<string, React.ReactNode> = {
  // AI Tools
  'Google AI Studio': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 4a8 8 0 110 16 8 8 0 010-16zm0 2a6 6 0 100 12 6 6 0 000-12z"/>
    </svg>
  ),
  'Claude': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.09 3.54L12 11.27 4.91 7.72 12 4.18zM4 16.54V9.27l7 3.5v7.27l-7-3.5zm9 3.5v-7.27l7-3.5v7.27l-7 3.5z"/>
    </svg>
  ),
  'ChatGPT': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  ),
  'Lovable': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
  'Gemini': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2 0V4.07c3.94.49 7 3.85 7 7.93s-3.06 7.44-7 7.93z"/>
    </svg>
  ),
  'Codex': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
    </svg>
  ),
  'Replit': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 1.5A1.5 1.5 0 0 1 3.5 0h6A1.5 1.5 0 0 1 11 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 7.5v-6zM2 15a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 11 15v7.5a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 2 22.5V15zm11-6a1.5 1.5 0 0 1 1.5-1.5h6A1.5 1.5 0 0 1 22 9v6a1.5 1.5 0 0 1-1.5 1.5h-6A1.5 1.5 0 0 1 13 15V9z"/>
    </svg>
  ),
  'MCP': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  // Frontend
  'React': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"/>
    </svg>
  ),
  'TypeScript': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
    </svg>
  ),
  'HTML': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"/>
    </svg>
  ),
  'CSS': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"/>
    </svg>
  ),
  'JavaScript': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
    </svg>
  ),
  'React Native': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278z"/>
    </svg>
  ),
  'MUI': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 2.475v10.39l3 1.733V7.67l6 3.465 6-3.465v3.465l-6 3.463v3.464l6 3.463 9-5.195V9.402l-3 1.733v3.463l-6 3.464-3-1.732 6-3.465V2.475L9 7.67 0 2.475zm24 0l-3 1.73V7.67l3-1.732V2.474z"/>
    </svg>
  ),
  'Flutter': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
    </svg>
  ),
  // Backend
  'Node.js': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.283.283 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.284.284 0 0 0-.139.241v10.15a.27.27 0 0 0 .139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787a.266.266 0 0 1 .264-.264h1.152a.266.266 0 0 1 .263.264v10.021c0 1.745-.951 2.746-2.604 2.746-.509 0-.909 0-2.026-.551L2.28 18.675a1.854 1.854 0 0 1-.921-1.603V6.921c0-.661.353-1.276.921-1.602L11.076.244a1.924 1.924 0 0 1 1.844 0l8.794 5.075c.569.326.92.94.92 1.602v10.15c0 .661-.351 1.274-.92 1.604l-8.794 5.078a1.855 1.855 0 0 1-.922.247z"/>
    </svg>
  ),
  'REST APIs': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 7H5a2 2 0 0 0-2 2v8h2v-4h2v4h2V9a2 2 0 0 0-2-2zm0 4H5V9h2zm7-4h-4v10h2v-4h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm0 4h-2V9h2zm6 6v-2h-4v-2h4v-2h-4V9h4V7h-6v10z"/>
    </svg>
  ),
  'Laravel': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.642 5.43a.364.364 0 01.014.1v5.149c0 .135-.073.26-.189.326l-4.323 2.49v4.934a.378.378 0 01-.188.326L9.93 23.949a.316.316 0 01-.066.027c-.008.002-.016.008-.024.01a.348.348 0 01-.192 0c-.011-.002-.02-.008-.03-.012-.02-.008-.042-.014-.062-.025L.533 18.755a.376.376 0 01-.189-.326V2.974a.377.377 0 01.014-.1c.003-.012.01-.02.014-.032a.343.343 0 01.023-.058c.004-.013.015-.022.023-.033.012-.016.021-.034.035-.049a.328.328 0 01.05-.043c.016-.012.028-.027.046-.037h.002L4.893.044a.378.378 0 01.377 0l4.343 2.578h.002c.015.01.027.023.042.035a.376.376 0 01.085.092c.008.011.019.02.025.033.009.018.018.037.025.057a.39.39 0 01.014.033c.006.027.014.055.014.083v9.63l3.76-2.164V5.527c0-.03.006-.058.013-.086a.391.391 0 01.038-.089c.008-.013.019-.022.028-.033.01-.016.023-.035.038-.052a.376.376 0 01.047-.04c.014-.01.026-.025.043-.036h.001l4.346-2.576a.378.378 0 01.378 0l4.343 2.576c.018.011.03.026.046.038a.284.284 0 01.048.041c.015.019.028.036.039.052.009.01.018.02.025.033.01.018.02.04.028.057a.373.373 0 01.013.034.388.388 0 01.014.086zM22.892 10.3V6.038l-1.58.909-2.182 1.255v4.264zm-4.514 7.772V13.8l-2.146 1.225-6.123 3.498v4.307zm-17.625-15.1v14.795l8.47 4.888v-4.309L4.77 15.392l-.002-.001-.001-.001c-.016-.01-.029-.024-.043-.036a.375.375 0 01-.047-.043c-.011-.012-.022-.025-.03-.039-.01-.016-.018-.032-.026-.05a.384.384 0 01-.021-.055c-.006-.017-.013-.033-.015-.052a.37.37 0 01-.013-.085V4.461L2.577 3.32z"/>
    </svg>
  ),
  'Python': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
    </svg>
  ),
  'GraphQL': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224 9.047-5.224V6.777zm0 1.601l7.66 4.422v8.845l-7.66 4.422-7.66-4.422V7.554z"/>
    </svg>
  ),
  'PHP': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.01 10.207h-.944l-.515 2.648h.838c.556 0 .97-.105 1.242-.314.272-.21.455-.559.55-1.049.092-.47.05-.802-.124-.995-.175-.193-.523-.29-1.047-.29zM12 5.688C5.373 5.688 0 8.514 0 12s5.373 6.313 12 6.313S24 15.486 24 12c0-3.486-5.373-6.312-12-6.312zm-3.26 7.451c-.261.25-.575.438-.917.551-.336.108-.765.164-1.285.164H5.357l-.327 1.681H3.652l1.23-6.326h2.65c.797 0 1.378.209 1.744.628.366.418.476 1.002.33 1.752a2.836 2.836 0 0 1-.305.847c-.143.255-.33.49-.561.703zm4.024.715l.543-2.799c.063-.318.039-.536-.068-.651-.107-.116-.336-.174-.687-.174H11.46l-.704 3.625H9.388l1.23-6.327h1.367l-.327 1.682h1.218c.767 0 1.295.134 1.586.401s.378.7.263 1.299l-.572 2.944h-1.389zm7.597-2.265a2.782 2.782 0 0 1-.305.847c-.143.255-.33.49-.561.703a2.44 2.44 0 0 1-.917.551c-.336.108-.765.164-1.286.164h-1.18l-.327 1.682h-1.378l1.23-6.326h2.649c.797 0 1.378.209 1.744.628.366.417.477 1.001.331 1.751zm-2.595-1.382h-.943l-.516 2.648h.838c.557 0 .971-.105 1.242-.314.272-.21.455-.559.551-1.049.092-.47.049-.802-.125-.995s-.524-.29-1.047-.29z"/>
    </svg>
  ),
  'ASP.NET': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 8.77h-2.468v7.565h-1.425V8.77h-2.462V7.53H24zm-6.852 7.565h-4.821V7.53h4.63v1.24h-3.205v2.494h2.953v1.234h-2.953v2.604h3.396zm-6.708 0H8.882L4.78 9.863a2.896 2.896 0 0 1-.258-.51h-.036c.032.189.048.592.048 1.21v5.772H3.157V7.53h1.659l3.965 6.32c.167.261.275.442.323.54h.024c-.04-.233-.06-.629-.06-1.185V7.529h1.372zm-8.703-.693a.868.829 0 0 1-.869.829.868.829 0 0 1-.868-.83.868.829 0 0 1 .868-.828.868.829 0 0 1 .869.829z"/>
    </svg>
  ),
  // Database
  'MySQL': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.18.214.273.054.107.1.214.154.32l.014-.015c.094-.066.14-.172.14-.333-.04-.047-.046-.094-.08-.14-.04-.067-.126-.1-.18-.153zM5.77 18.695h-.927a50.854 50.854 0 0 0-.27-4.41h-.008l-1.41 4.41H2.45l-1.4-4.41h-.01a72.892 72.892 0 0 0-.195 4.41H0c.055-1.966.192-3.81.41-5.53h1.15l1.335 4.064h.008l1.347-4.064h1.095c.242 2.015.384 3.86.428 5.53zm4.017-4.08c-.378 2.045-.876 3.533-1.492 4.46-.482.716-1.01 1.073-1.583 1.073-.153 0-.34-.046-.566-.138v-.494c.11.017.24.026.386.026.268 0 .483-.075.647-.222.197-.18.295-.382.295-.605 0-.155-.077-.47-.23-.944L6.23 14.615h.91l.727 2.36c.164.536.233.91.205 1.123.4-1.064.678-2.227.835-3.483zm12.325 4.08h-2.63v-5.53h.885v4.85h1.745zm-3.32.135l-1.016-.5c.09-.076.177-.158.255-.25.433-.506.648-1.258.648-2.253 0-1.83-.718-2.746-2.155-2.746-.704 0-1.254.232-1.65.697-.43.508-.646 1.256-.646 2.245 0 .972.19 1.686.574 2.14.35.41.822.615 1.42.615.26 0 .5-.04.723-.118l1.336.772.51-.602zm-2.98-1.27c-.195-.388-.293-.972-.293-1.748 0-1.342.457-2.013 1.37-2.013.457 0 .81.156 1.055.467.264.334.396.873.396 1.617 0 .788-.115 1.388-.346 1.797-.232.41-.558.615-.98.615-.39 0-.69-.245-.902-.735zM.493 8.12v-.514h3.12v.514H2.2v4.26h-.897V8.12zm20.172 4.778c.51-.082.76-.373.76-.877 0-.346-.123-.6-.37-.76-.213-.14-.548-.21-1.005-.21h-1.39v5.53h.89V14.91h.3l1.1 1.7h1.03l-1.19-1.786c.11-.035.19-.072.24-.11a.46.46 0 0 0 .17-.162c.035-.047.06-.11.08-.185l.045-.21c.02-.093.03-.163.03-.21.01-.08.01-.148.01-.2v-.125c-.02-.09-.04-.178-.07-.265a.94.94 0 0 0-.13-.23c-.06-.08-.135-.146-.23-.2-.102-.06-.217-.11-.348-.14-.05-.01-.11-.02-.182-.03-.074-.01-.172-.015-.296-.02h-.066c-.12 0-.22 0-.31.01-.07.01-.14.01-.2.02l-.12.03c-.04.01-.06.01-.08.02l-.16.04c-.13.03-.23.08-.31.15-.105.08-.19.175-.26.285-.06.11-.1.24-.12.39-.02.14-.03.31-.03.52v.05c0 .22.01.4.04.53.03.15.075.274.135.374z"/>
    </svg>
  ),
  'Supabase': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z"/>
    </svg>
  ),
  'MongoDB': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
    </svg>
  ),
  'Firebase': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.82-3.482a.542.542 0 00-.96 0L3.53 17.984z"/>
    </svg>
  ),
  // Cloud & DevOps
  'Vercel': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>
  ),
  'Azure': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.379 23.343a1.62 1.62 0 0 0 1.536-2.14L17.35 1.76A1.62 1.62 0 0 0 15.816.657H8.184A1.62 1.62 0 0 0 6.65 1.76L.086 21.204a1.62 1.62 0 0 0 1.536 2.139h4.768a1.62 1.62 0 0 0 1.535-1.103l.977-2.892 4.947 3.675c.278.206.616.32.965.32zm-5.293-4.056l-4.8-3.56 3.87-11.218h.007l4.94 14.778z"/>
    </svg>
  ),
  'Docker': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186h-2.119a.185.185 0 0 0-.186.185v1.888c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.185v1.888c0 .102.084.185.186.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288z"/>
    </svg>
  ),
  'CI/CD': (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
};

// Fallback icon for technologies without specific icons
const FallbackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

const iconMap: Record<string, React.ElementType> = {
  'AI Tools': Brain,
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  'Cloud & DevOps': Cloud,
};

const levelColors = {
  Core: 'bg-[var(--accent)] text-[var(--bg-primary)]',
  Strong: 'bg-[var(--accent-muted)] text-[var(--accent)]',
  Familiar: 'bg-[var(--border-subtle)] text-[var(--text-secondary)]',
};

function SkillCard({
  category,
  index,
  isInView,
}: {
  category: typeof skillCategories[number];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[category.name] || Layout;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div
        className="relative p-6 h-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] card-hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Scanner effect on first card */}
        {index === 0 && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[var(--accent)]/5 to-transparent pointer-events-none"
            animate={{
              y: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/20">
            <Icon className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <motion.div
            animate={{ rotate: isHovered ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Scan className="w-5 h-5 text-[var(--text-secondary)]" />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
          {category.name}
        </h3>

        {/* Tech items */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => (
            <motion.span
              key={skill.name}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)] cursor-default"
              whileHover={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
              }}
              transition={{ duration: 0.2 }}
            >
              {skill.name}
              <span className={`px-1.5 py-0.5 text-[10px] rounded ${levelColors[skill.level]}`}>
                {skill.level}
              </span>
            </motion.span>
          ))}
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[var(--accent)]/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

// Individual tech item component with hover/focus states
function TechItem({ name }: { name: string }) {
  const icon = techIcons[name] || <FallbackIcon />;

  return (
    <motion.button
      type="button"
      className="group flex items-center gap-2 sm:gap-2.5 px-1 py-1 rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] transition-colors duration-200"
      whileHover="hover"
      whileFocus="hover"
      tabIndex={0}
      aria-label={name}
    >
      {/* Icon with hover state */}
      <motion.span
        className="flex-shrink-0 text-[var(--text-secondary)] transition-all duration-200"
        style={{ opacity: 0.65 }}
        variants={{
          hover: {
            opacity: 1,
            color: 'var(--text-primary)',
          }
        }}
      >
        {icon}
      </motion.span>

      {/* Label with hover state and underline */}
      <motion.span
        className="relative text-sm sm:text-base font-medium transition-colors duration-200"
        style={{ color: 'rgba(161, 161, 170, 0.85)' }}
        variants={{
          hover: {
            color: 'var(--text-primary)',
          }
        }}
      >
        {name}
        {/* Mint underline on hover */}
        <motion.span
          className="absolute left-0 -bottom-0.5 w-full h-px bg-[var(--accent)]"
          initial={{ scaleX: 0, opacity: 0 }}
          variants={{
            hover: {
              scaleX: 1,
              opacity: 0.6,
              transition: { duration: 0.2 }
            }
          }}
          style={{ originX: 0 }}
        />
      </motion.span>
    </motion.button>
  );
}

function TechMarquee() {
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);

  const allTechs = skillCategories.flatMap((cat) =>
    cat.skills.filter((s) => s.level === 'Core' || s.level === 'Strong').map((s) => s.name)
  );
  // Remove duplicates and create seamless loop array
  const uniqueTechs = [...new Set(allTechs)];
  const techs = [...uniqueTechs, ...uniqueTechs];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle animation based on pause state and motion preference
  useEffect(() => {
    if (prefersReducedMotion) {
      controls.stop();
      return;
    }

    if (isPaused) {
      controls.stop();
    } else {
      controls.start({
        x: ['0%', '-50%'],
        transition: {
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }
      });
    }
  }, [isPaused, prefersReducedMotion, controls]);

  // Pause handlers with delay for smooth resume
  const handlePause = () => setIsPaused(true);
  const handleResume = () => {
    // Small delay before resuming for smoother transition
    setTimeout(() => setIsPaused(false), 150);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-12 sm:mt-16"
    >
      <div className="text-center mb-4 sm:mb-6">
        <span className="text-xs sm:text-sm text-[var(--text-secondary)] uppercase tracking-wider">
          Technologies I work with
        </span>
      </div>

      {/* Marquee container with gradient masks */}
      <div
        ref={containerRef}
        className="marquee-container relative overflow-hidden"
        onMouseEnter={handlePause}
        onMouseLeave={handleResume}
        onFocus={handlePause}
        onBlur={handleResume}
      >
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex items-center whitespace-nowrap py-2"
          animate={controls}
          style={{ gap: '2rem' }}
        >
          {techs.map((tech, idx) => (
            <div key={`${tech}-${idx}`} className="flex items-center" style={{ gap: '2rem' }}>
              <TechItem name={tech} />
              {/* Subtle separator between items */}
              {idx < techs.length - 1 && (
                <span className="text-[var(--border-subtle)] text-xs select-none" aria-hidden="true">•</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={sectionRef} className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <SectionHeading
          label="Skills"
          title="My Tech"
          titleAccent="Toolbox"
          description="The technologies and tools I use to bring ideas to life"
          align="center"
          isInView={isInView}
        />

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-8 sm:mt-12 mb-8 sm:mb-10 px-2"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded font-medium bg-[var(--accent)] text-[var(--bg-primary)]">
              Core
            </span>
            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">Daily driver</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded font-medium bg-[var(--accent-muted)] text-[var(--accent)]">
              Strong
            </span>
            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">Production exp</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2 py-0.5 text-[10px] sm:text-xs rounded font-medium bg-[var(--border-subtle)] text-[var(--text-secondary)]">
              Familiar
            </span>
            <span className="text-xs sm:text-sm text-[var(--text-secondary)]">Working knowledge</span>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.name}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Tech Marquee */}
        <TechMarquee />
      </div>
    </section>
  );
}
