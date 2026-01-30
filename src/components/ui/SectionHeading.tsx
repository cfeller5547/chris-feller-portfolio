'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
  isInView?: boolean;
}

export function SectionHeading({
  label,
  title,
  titleAccent,
  description,
  align = 'center',
  isInView = true,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}
    >
      {label && (
        <span className="inline-block text-[var(--accent)] text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4">
          {label}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)]">
        {title}
        {titleAccent && (
          <span className="italic text-[var(--accent)]"> {titleAccent}</span>
        )}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-[var(--text-secondary)] text-sm sm:text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
