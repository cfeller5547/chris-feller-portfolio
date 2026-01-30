'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Zap } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Avatar/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Avatar Placeholder */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-primary)] border border-[var(--border-subtle)] overflow-hidden group"
              >
                {/* Mint outline on hover */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[var(--accent)]/30 transition-all duration-300" />

                {/* Placeholder Avatar */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[var(--accent-muted)] flex items-center justify-center">
                    <span className="text-5xl md:text-6xl font-bold text-[var(--accent)]">
                      {personalInfo.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-[var(--accent)]" />
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-[var(--accent)]/50" />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 glass bg-[var(--bg-surface)] rounded-lg border border-[var(--border-subtle)] flex items-center gap-2"
              >
                <MapPin size={16} className="text-[var(--accent)]" />
                <span className="text-sm text-[var(--text-primary)]">{personalInfo.location}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SectionHeading
              label="About"
              title="Everything About"
              titleAccent="Me"
              align="left"
              isInView={isInView}
            />

            <p className="text-lg text-[var(--text-secondary)] mb-8 mt-6 leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* What I Optimize For */}
            <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Zap size={18} className="text-[var(--accent)]" />
                What I Optimize For
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {personalInfo.optimizesFor.map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
