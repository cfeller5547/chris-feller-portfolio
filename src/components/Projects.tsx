'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects, categories, type Project } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';
import { ArrowUpRight, Github, ExternalLink, X, Sparkles } from 'lucide-react';

// Bento Card Component - Featured Projects
function BentoCard({
  project,
  size = 'normal',
  onClick,
}: {
  project: Project;
  size?: 'large' | 'tall' | 'wide' | 'normal';
  onClick: () => void;
}) {
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    tall: 'md:row-span-2',
    wide: 'md:col-span-2',
    normal: '',
  };

  const aspectClasses = {
    large: 'aspect-[16/10]',
    tall: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    normal: 'aspect-video',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`group relative ${sizeClasses[size]}`}
    >
      <div
        onClick={onClick}
        className="relative h-full overflow-hidden cursor-pointer rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--accent)]/40 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),0_0_30px_var(--accent-glow)]"
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${aspectClasses[size]}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/80 to-transparent opacity-90" />

          {/* Featured badge for large cards */}
          {size === 'large' && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--accent)]/10 backdrop-blur-md border border-[var(--accent)]/20">
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-xs font-medium text-[var(--accent)]">Featured</span>
            </div>
          )}

          {/* Arrow icon */}
          <motion.div
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <div className="space-y-2 sm:space-y-3">
            <h3
              className={`font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)] ${
                size === 'large' ? 'text-xl sm:text-2xl lg:text-3xl' : size === 'tall' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
              }`}
            >
              {project.title}
            </h3>

            {project.impactMetric && (
              <p className="text-xs sm:text-sm text-[var(--accent)] font-medium line-clamp-1">
                {project.impactMetric}
              </p>
            )}

            {(size === 'large' || size === 'tall') && (
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2">
                {project.description}
              </p>
            )}

            {/* Tech badges */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1">
              {project.tags.slice(0, size === 'large' ? 4 : 3).map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)] bg-white/5 rounded-full border border-white/5"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > (size === 'large' ? 4 : 3) && (
                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-[var(--text-secondary)] bg-white/5 rounded-full border border-white/5">
                  +{project.tags.length - (size === 'large' ? 4 : 3)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-tr-2xl" />
      </div>
    </motion.div>
  );
}

// Project Card Component - All Projects Grid
function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    >
      <div
        onClick={onClick}
        className="group relative overflow-hidden cursor-pointer h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] transition-all duration-300 hover:border-[var(--accent)]/30 hover:translate-y-[-4px] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5),0_0_30px_var(--accent-glow)]"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-[var(--bg-surface)]/60 to-transparent" />

          {/* Arrow */}
          <motion.div
            className="absolute top-3 right-3 p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-[family-name:var(--font-display)] font-semibold text-[var(--text-primary)] text-base sm:text-lg mb-1 sm:mb-1.5 group-hover:text-[var(--accent)] transition-colors duration-300">
            {project.title}
          </h3>

          {project.impactMetric && (
            <p className="text-[11px] sm:text-xs text-[var(--accent)] font-medium mb-1.5 sm:mb-2 line-clamp-1">
              {project.impactMetric}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 mb-3 sm:mb-4">
            {project.description}
          </p>

          {/* Tech badges */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-[var(--text-secondary)] bg-white/5 rounded-full border border-white/5"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-[var(--text-secondary)] bg-white/5 rounded-full border border-white/5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent line on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
}

// Category Pills Component
function CategoryPills({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`
            relative px-4 sm:px-5 py-2.5 sm:py-2.5 rounded-full text-sm font-medium transition-all duration-300 active:scale-95
            ${
              activeCategory === category.id
                ? 'text-[var(--bg-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }
          `}
        >
          {/* Background pill */}
          {activeCategory === category.id && (
            <motion.div
              layoutId="activePill"
              className="absolute inset-0 bg-[var(--accent)] rounded-full"
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
            />
          )}

          {/* Inactive state background */}
          {activeCategory !== category.id && (
            <div className="absolute inset-0 bg-white/5 rounded-full border border-white/5 hover:border-white/10 transition-colors" />
          )}

          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}

// Project Modal Component
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-auto rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] mx-2 sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 sm:p-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-all duration-300"
          aria-label="Close modal"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[16/10] sm:aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-8 -mt-12 sm:-mt-16 relative">
          {/* Header */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-2 pr-8">
                {project.title}
              </h2>
              {project.impactMetric && (
                <p className="text-[var(--accent)] font-medium text-sm sm:text-base">{project.impactMetric}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-white/5 text-[var(--text-primary)] border border-white/10 hover:bg-white/10 transition-all active:scale-95"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-[var(--accent)] text-black hover:opacity-90 transition-all active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live
                </a>
              )}
            </div>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6 sm:mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-[var(--accent)] bg-[var(--accent)]/10 rounded-full border border-[var(--accent)]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-2 sm:mb-3">
              About This Project
            </h3>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Year */}
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/20">
            <span className="text-sm font-medium text-[var(--accent)]">
              Year: {project.year}
            </span>
          </div>
        </div>
      </motion.div>
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
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  // Assign bento sizes to featured projects
  const bentoSizes: ('large' | 'tall' | 'wide' | 'normal')[] = ['large', 'tall', 'wide'];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[var(--bg-primary)]" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <SectionHeading
          label="Portfolio"
          title="Featured"
          titleAccent="Work"
          description="Crafting digital experiences that make an impact"
          align="center"
          isInView={isInView}
        />

        {/* Featured Projects Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 auto-rows-fr">
            {featuredProjects.map((project, index) => (
              <BentoCard
                key={project.id}
                project={project}
                size={bentoSizes[index] || 'normal'}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="my-20 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
          <span className="text-[var(--text-secondary)] text-sm font-medium uppercase tracking-widest">
            All Projects
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[var(--border-subtle)] to-transparent" />
        </div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CategoryPills
            activeCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {allProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {allProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-[var(--text-secondary)]">No projects found in this category.</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
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
