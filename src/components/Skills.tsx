'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';
import {
  Layout,
  Server,
  Cloud,
  Brain,
  Wrench,
  Scan,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Frontend: Layout,
  Backend: Server,
  'Cloud & DevOps': Cloud,
  'Data & AI': Brain,
  'Tooling & Practices': Wrench,
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

function TechMarquee() {
  const allTechs = skillCategories.flatMap((cat) =>
    cat.skills.filter((s) => s.level === 'Core' || s.level === 'Strong').map((s) => s.name)
  );
  // Remove duplicates and create seamless loop array
  const uniqueTechs = [...new Set(allTechs)];
  const logos = [...uniqueTechs, ...uniqueTechs];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-16"
    >
      <div className="text-center mb-6">
        <span className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">
          Technologies I work with
        </span>
      </div>

      {/* Marquee container */}
      <div className="marquee-container relative overflow-hidden">
        <motion.div
          className="flex items-center gap-12 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {logos.map((logo, idx) => (
            <motion.span
              key={`${logo}-${idx}`}
              className="text-lg font-medium text-[var(--text-secondary)]/50 hover:text-[var(--accent)] transition-colors duration-300 cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              {logo}
            </motion.span>
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
          className="flex flex-wrap justify-center gap-6 mt-12 mb-10"
        >
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs rounded font-medium bg-[var(--accent)] text-[var(--bg-primary)]">
              Core
            </span>
            <span className="text-sm text-[var(--text-secondary)]">Daily driver</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs rounded font-medium bg-[var(--accent-muted)] text-[var(--accent)]">
              Strong
            </span>
            <span className="text-sm text-[var(--text-secondary)]">Production experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs rounded font-medium bg-[var(--border-subtle)] text-[var(--text-secondary)]">
              Familiar
            </span>
            <span className="text-sm text-[var(--text-secondary)]">Working knowledge</span>
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
