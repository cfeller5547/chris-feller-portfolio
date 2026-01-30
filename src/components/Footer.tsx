'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-[var(--border-subtle)]">
      {/* Accent Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Branding */}
          <div className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
              <span className="text-[var(--accent)]">&lt;</span>
              <span className="text-[var(--text-primary)]">cf</span>
              <span className="text-[var(--accent)]">/&gt;</span>
            </span>
            <span className="text-sm text-[var(--text-secondary)]">
              &copy; {currentYear}
            </span>
          </div>

          {/* Center - Social Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors active:scale-95"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2.5 sm:p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors active:scale-95"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Right - Back to Top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
            Back to top
          </motion.button>
        </div>

        {/* Built with */}
        <p className="text-center text-xs text-[var(--text-secondary)] mt-8 opacity-60">
          Built with Next.js, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
