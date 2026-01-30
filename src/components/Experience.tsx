'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { experiences } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';

function ExperienceCard({
  experience,
  index,
  isLast,
}: {
  experience: typeof experiences[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 md:pl-12"
    >
      {/* Timeline Line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="absolute left-3 md:left-5 top-8 bottom-0 w-px bg-gradient-to-b from-[var(--accent)] to-[var(--border-subtle)] origin-top"
        />
      )}

      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: index * 0.1 + 0.1 }}
        className="absolute left-0 md:left-2 top-1 w-6 h-6 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent)] flex items-center justify-center"
      >
        <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
      </motion.div>

      {/* Content Card */}
      <div className="pb-10">
        <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-6 hover:border-[var(--accent)]/30 transition-all">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {experience.title}
              </h3>
              <p className="text-[var(--accent)] font-medium flex items-center gap-2">
                <Briefcase size={14} />
                {experience.company}
              </p>
            </div>
            <span className="px-3 py-1 text-sm bg-[var(--accent-muted)] text-[var(--accent)] rounded-full whitespace-nowrap">
              {experience.startDate} - {experience.endDate}
            </span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2 mb-4">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mt-1 flex-shrink-0">&#8226;</span>
                {highlight}
              </li>
            ))}
          </ul>

          {/* Technologies */}
          {experience.technologies && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--border-subtle)]">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs bg-[var(--border-subtle)] text-[var(--text-secondary)] rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="experience" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          label="Career"
          title="Work"
          titleAccent="Experience"
          description="A track record of delivering impact through technology at companies of all sizes."
          align="center"
          isInView={isInView}
        />

        <div className="mb-12" />

        {/* Timeline */}
        <div className="relative">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`${experience.company}-${experience.title}`}
              experience={experience}
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
