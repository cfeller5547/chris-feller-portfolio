'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // Subtle depth effect with canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const initParticles = () => {
      particles = [];
      const count = 60;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          z: Math.random() * 0.5 + 0.5,
          size: Math.random() * 2 + 1,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.03)';
      ctx.lineWidth = 1;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.globalAlpha = (1 - dist / 150) * 0.5 * particles[i].z;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        // Parallax based on mouse
        const offsetX = (mousePos.x - 0.5) * 30 * p.z;
        const offsetY = (mousePos.y - 0.5) * 30 * p.z;

        ctx.globalAlpha = 0.4 * p.z;
        ctx.fillStyle = '#00E676';
        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.size * p.z, 0, Math.PI * 2);
        ctx.fill();

        // Subtle movement
        p.y -= p.speed;
        if (p.y < -10) {
          p.y = canvas.offsetHeight + 10;
          p.x = Math.random() * canvas.offsetWidth;
        }
      });

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    resize();
    initParticles();
    draw();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.6 }}
      />

      {/* Glass Orb Effect */}
      <div
        className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full pointer-events-none hidden lg:block"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(0, 230, 118, 0.08), transparent 60%)',
          boxShadow: 'inset 0 0 60px rgba(0, 230, 118, 0.05), 0 0 80px rgba(0, 230, 118, 0.03)',
          transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20 - 50}%)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Stats Chips */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                {Object.entries(personalInfo.stats).map(([key, value], index) => (
                  <motion.span
                    key={key}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="px-3 py-1 text-xs font-medium bg-[var(--accent-muted)] text-[var(--accent)] rounded-full"
                  >
                    {value} {key === 'yearsExperience' ? 'years' : key === 'projectsShipped' ? 'projects' : 'technologies'}
                  </motion.span>
                ))}
              </div>

              {/* Name & Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] mb-4 tracking-tight"
              >
                {personalInfo.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xl sm:text-2xl text-[var(--accent)] font-medium mb-4"
              >
                {personalInfo.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto lg:mx-0"
              >
                {personalInfo.tagline}
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-medium transition-all"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px var(--accent-glow)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Projects
                </motion.button>
                <motion.button
                  onClick={scrollToContact}
                  className="px-6 py-3 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg font-medium hover:border-[var(--border-hover)] hover:bg-[var(--border-subtle)] transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Contact
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex gap-4 mt-8 justify-center lg:justify-start"
              >
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - Visual Space (occupied by orb) */}
          <div className="hidden lg:block" />
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToProjects}
            className="flex flex-col items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-label="Scroll to projects"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ArrowDown size={20} />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
