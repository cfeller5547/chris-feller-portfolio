'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, categories, type Project } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';

// Seeded random number generator for consistent values between server and client
function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }

  return () => {
    hash = (hash * 1103515245 + 12345) & 0x7fffffff;
    return (hash % 1000) / 1000;
  };
}

// Unique visual styles per project
const visualStyles: Record<string, { primary: string; secondary: string; pattern: 'chart' | 'nodes' | 'grid' | 'terminal' | 'waves' | 'bars' }> = {
  'fintech-dashboard': { primary: '#00E676', secondary: '#00BFA5', pattern: 'chart' },
  'ai-content-platform': { primary: '#E040FB', secondary: '#7C4DFF', pattern: 'nodes' },
  'ecommerce-platform': { primary: '#FF6D00', secondary: '#FFD600', pattern: 'grid' },
  'developer-tools': { primary: '#00B0FF', secondary: '#0091EA', pattern: 'terminal' },
  'mobile-fitness': { primary: '#FF5252', secondary: '#FF1744', pattern: 'waves' },
  'analytics-dashboard': { primary: '#448AFF', secondary: '#2979FF', pattern: 'bars' },
};

// Unique Project Visual Component
function UniqueProjectVisual({ projectId, size = 'large' }: { projectId: string; size?: 'large' | 'medium' | 'small' }) {
  const style = visualStyles[projectId] || { primary: '#00E676', secondary: '#00BFA5', pattern: 'chart' };
  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  // Pre-compute random values using seeded random for consistency
  const randomValues = useMemo(() => {
    const rng = seededRandom(projectId + size);
    return {
      chart: [rng(), rng(), rng(), rng(), rng(), rng(), rng(), rng()],
      grid: Array.from({ length: 48 }, () => rng()),
      bars: Array.from({ length: 7 }, () => ({ height: rng(), opacity: rng() })),
    };
  }, [projectId, size]);

  const renderPattern = () => {
    switch (style.pattern) {
      case 'chart':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`grad-${projectId}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={style.primary} stopOpacity="0.6" />
                <stop offset="100%" stopColor={style.primary} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M0,80 Q30,${60 + randomValues.chart[0] * 20} 50,${50 + randomValues.chart[1] * 20} T100,${40 + randomValues.chart[2] * 20} T150,${30 + randomValues.chart[3] * 20} T200,20 V100 H0 Z`}
              fill={`url(#grad-${projectId})`}
            />
            <path
              d={`M0,80 Q30,${60 + randomValues.chart[4] * 20} 50,${50 + randomValues.chart[5] * 20} T100,${40 + randomValues.chart[6] * 20} T150,${30 + randomValues.chart[7] * 20} T200,20`}
              fill="none"
              stroke={style.primary}
              strokeWidth="2"
            />
            {[20, 50, 80, 110, 140, 170].map((x, i) => (
              <circle key={i} cx={x} cy={70 - i * 8} r="3" fill={style.primary} />
            ))}
          </svg>
        );

      case 'nodes':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {/* Connection lines */}
            <line x1="40" y1="30" x2="100" y2="50" stroke={style.primary} strokeWidth="1" opacity="0.4" />
            <line x1="100" y1="50" x2="160" y2="25" stroke={style.primary} strokeWidth="1" opacity="0.4" />
            <line x1="100" y1="50" x2="140" y2="75" stroke={style.primary} strokeWidth="1" opacity="0.4" />
            <line x1="40" y1="30" x2="60" y2="70" stroke={style.secondary} strokeWidth="1" opacity="0.4" />
            <line x1="60" y1="70" x2="100" y2="50" stroke={style.secondary} strokeWidth="1" opacity="0.4" />
            {/* Nodes */}
            <circle cx="40" cy="30" r="8" fill={style.primary} opacity="0.8" />
            <circle cx="100" cy="50" r="12" fill={style.primary} />
            <circle cx="160" cy="25" r="6" fill={style.secondary} opacity="0.8" />
            <circle cx="140" cy="75" r="7" fill={style.primary} opacity="0.6" />
            <circle cx="60" cy="70" r="5" fill={style.secondary} opacity="0.7" />
          </svg>
        );

      case 'grid':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {[0, 1, 2, 3, 4, 5].map((row) =>
              [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 25 + 5}
                  y={row * 16 + 4}
                  width="20"
                  height="12"
                  rx="2"
                  fill={(row + col) % 3 === 0 ? style.primary : style.secondary}
                  opacity={0.2 + randomValues.grid[row * 8 + col] * 0.6}
                />
              ))
            )}
          </svg>
        );

      case 'terminal':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <rect x="10" y="10" width="180" height="80" rx="4" fill="#0a0a0a" stroke={style.primary} strokeWidth="1" opacity="0.5" />
            <text x="20" y="30" fill={style.primary} fontSize="10" fontFamily="monospace">$ npm run build</text>
            <text x="20" y="45" fill={style.secondary} fontSize="10" fontFamily="monospace">✓ Compiled successfully</text>
            <text x="20" y="60" fill="#666" fontSize="10" fontFamily="monospace">→ Ready in 2.4s</text>
            <rect x="20" y="70" width="8" height="12" fill={style.primary} opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1s" repeatCount="indefinite" />
            </rect>
          </svg>
        );

      case 'waves':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M0,${50 + i * 15} Q50,${30 + i * 15} 100,${50 + i * 15} T200,${50 + i * 15}`}
                fill="none"
                stroke={i === 0 ? style.primary : style.secondary}
                strokeWidth={3 - i}
                opacity={0.8 - i * 0.2}
              />
            ))}
            <circle cx="50" cy="40" r="4" fill={style.primary} />
            <circle cx="150" cy="55" r="3" fill={style.secondary} />
          </svg>
        );

      case 'bars':
        return (
          <svg className="w-full h-full" viewBox="0 0 200 100">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
              const height = 30 + randomValues.bars[i].height * 50;
              return (
                <rect
                  key={i}
                  x={i * 28 + 10}
                  y={90 - height}
                  width="20"
                  height={height}
                  rx="2"
                  fill={i % 2 === 0 ? style.primary : style.secondary}
                  opacity={0.5 + randomValues.bars[i].opacity * 0.5}
                />
              );
            })}
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`
      relative overflow-hidden
      ${isLarge ? 'h-[55%]' : isMedium ? 'h-[50%]' : 'h-[45%]'}
    `}
    style={{
      background: `linear-gradient(135deg, ${style.primary}15 0%, ${style.primary}05 100%)`
    }}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-80">
        {renderPattern()}
      </div>
    </div>
  );
}

// Project Modal Component
function ProjectModal({
  project,
  onClose
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const style = visualStyles[project.id] || { primary: '#00E676', secondary: '#00BFA5', pattern: 'chart' };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#111111] rounded-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#111111]/95 backdrop-blur-sm border-b border-white/5">
          <h2 className="text-xl font-semibold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Visual */}
          <div className="aspect-video rounded-xl overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${style.primary}20 0%, ${style.primary}05 100%)` }}
          >
            <UniqueProjectVisual projectId={project.id} size="large" />
          </div>

          {/* Description */}
          <p className="text-white/70 leading-relaxed">
            {project.longDescription || project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full"
                style={{ color: style.primary, background: `${style.primary}20` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 pt-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 font-medium rounded-lg transition-colors"
                style={{ background: style.primary, color: '#000' }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white font-medium rounded-lg hover:bg-white/10 transition-colors border border-white/10"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Featured Bento Tile Component
function FeaturedTile({
  project,
  variant,
  onClick,
  isSpotlight,
}: {
  project: Project;
  variant: 'spotlight' | 'medium' | 'small';
  onClick: () => void;
  isSpotlight?: boolean;
}) {
  const isLarge = variant === 'spotlight';
  const isMedium = variant === 'medium';
  const style = visualStyles[project.id] || { primary: '#00E676', secondary: '#00BFA5', pattern: 'chart' };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`
        group relative cursor-pointer rounded-2xl overflow-hidden
        bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]
        border border-white/5 hover:border-white/20
        transition-all duration-300
        ${isLarge ? 'h-full min-h-[420px]' : isMedium ? 'h-[200px]' : 'h-[160px]'}
      `}
      style={{
        boxShadow: `0 0 0 1px ${style.primary}00, 0 0 30px ${style.primary}00`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${style.primary}40, 0 0 40px ${style.primary}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${style.primary}00, 0 0 30px ${style.primary}00`;
      }}
    >
      {/* Unique Visual */}
      <UniqueProjectVisual projectId={project.id} size={isLarge ? 'large' : isMedium ? 'medium' : 'small'} />

      {/* Featured badge */}
      {isSpotlight && (
        <div
          className="absolute top-4 left-4 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full"
          style={{ background: style.primary, color: '#000' }}
        >
          Featured
        </div>
      )}

      {/* Impact metric */}
      {project.impactMetric && (
        <div
          className={`
            absolute top-4 right-4 px-3 py-1.5 font-bold rounded-lg border backdrop-blur-sm
            ${isLarge ? 'text-sm' : 'text-xs'}
          `}
          style={{
            color: style.primary,
            background: `${style.primary}15`,
            borderColor: `${style.primary}50`,
          }}
        >
          {project.impactMetric}
        </div>
      )}

      {/* Content */}
      <div className={`p-4 ${isLarge ? 'p-6' : ''}`}>
        <h3 className={`font-semibold text-white mb-1 ${isLarge ? 'text-xl' : 'text-sm'}`}>
          {project.title}
        </h3>

        {(isLarge || isMedium) && (
          <p className={`text-white/50 mb-3 line-clamp-2 ${isLarge ? 'text-sm' : 'text-xs'}`}>
            {project.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, isLarge ? 4 : 2).map((tag) => (
            <span
              key={tag}
              className={`
                px-2 py-0.5 rounded-full
                ${isLarge ? 'text-xs' : 'text-[10px]'}
              `}
              style={{ color: `${style.primary}cc`, background: `${style.primary}15` }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg className="w-5 h-5" style={{ color: style.primary }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </motion.div>
  );
}

// Featured Bento Grid with Curated Stage
function FeaturedBentoGrid({
  projects,
  onProjectClick,
}: {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}) {
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate spotlight every 8 seconds
  useEffect(() => {
    if (isPaused || projects.length <= 1) return;

    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % projects.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isPaused, projects.length]);

  // Reorder projects so spotlight is first
  const reorderedProjects = [
    projects[spotlightIndex],
    ...projects.filter((_, i) => i !== spotlightIndex),
  ];

  const spotlight = reorderedProjects[0];
  const mediums = reorderedProjects.slice(1, 3);
  const smalls = reorderedProjects.slice(3, 6);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-3xl p-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Aurora glow background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,230,118,0.15) 0%, transparent 60%)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Bento Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Spotlight - large left tile */}
        <div className="lg:col-span-7 lg:row-span-2">
          <AnimatePresence mode="wait">
            <FeaturedTile
              key={spotlight.id}
              project={spotlight}
              variant="spotlight"
              onClick={() => onProjectClick(spotlight)}
              isSpotlight
            />
          </AnimatePresence>
        </div>

        {/* Medium tiles - right column */}
        <div className="lg:col-span-5 grid gap-4">
          {mediums.map((project) => (
            <FeaturedTile
              key={project.id}
              project={project}
              variant="medium"
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>

        {/* Small tiles - bottom row */}
        <div className="lg:col-span-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {smalls.map((project) => (
            <FeaturedTile
              key={project.id}
              project={project}
              variant="small"
              onClick={() => onProjectClick(project)}
            />
          ))}
        </div>
      </div>

      {/* Progress Dots */}
      <div className="relative z-10 flex justify-center gap-2 pt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setSpotlightIndex(index)}
            className={`
              h-2 rounded-full transition-all duration-300
              ${index === spotlightIndex
                ? 'bg-[#00E676] w-8'
                : 'bg-white/20 hover:bg-white/40 w-2'
              }
            `}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// All Projects List Item (Compact format)
function AllProjectsListItem({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-8 items-center py-5 px-5 bg-[#0a0a0a] rounded-xl border border-white/5 hover:border-white/15 transition-all"
    >
      {/* Left: Title + Description */}
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-medium text-white text-base group-hover:text-[#00E676] transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-white/30">{project.year}</span>
        </div>
        <p className="text-white/40 text-sm line-clamp-1">
          {project.description}
        </p>
      </div>

      {/* Right: Tags + Actions */}
      <div className="flex items-center gap-4">
        {/* Tags */}
        <div className="hidden sm:flex gap-2">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs text-white/50 bg-white/5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-white/40 hover:text-[#00E676] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-white/40 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          )}
          <svg className="w-4 h-4 text-white/20 group-hover:text-[#00E676] transition-colors ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

// Main Projects Section
export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featuredProjects = projects.filter((p) => p.featured);
  const allProjects = selectedCategory === 'all'
    ? projects.filter((p) => !p.featured)
    : projects.filter((p) => !p.featured && p.category === selectedCategory);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 px-6 bg-[#050505]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <SectionHeading
          label="Work"
          title="Featured"
          titleAccent="Projects"
          description="A collection of work spanning fintech, AI, e-commerce, and developer tools."
          align="left"
          isInView={isInView}
        />

        <div className="mb-16" />

        {/* Featured Projects - Curated Stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-lg font-semibold text-white/80 mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00E676]" />
            Featured
          </h3>
          <FeaturedBentoGrid
            projects={featuredProjects}
            onProjectClick={setSelectedProject}
          />
        </motion.div>

        {/* All Projects - Compact List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h3 className="text-lg font-semibold text-white/80">
              All Projects
            </h3>

            {/* Category Filter - Larger pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200
                    ${selectedCategory === cat.id
                      ? 'bg-[#00E676] text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project List */}
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {allProjects.map((project) => (
                <AllProjectsListItem
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </div>

          {allProjects.length === 0 && (
            <p className="text-center text-white/40 py-12">
              No projects found in this category.
            </p>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
