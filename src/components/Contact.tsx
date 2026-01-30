'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, Copy, Check, Github, Linkedin } from 'lucide-react';
import { personalInfo } from '@/data/portfolio-data';
import { SectionHeading } from './ui/SectionHeading';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeading
          label="Contact"
          title="Get In"
          titleAccent="Touch"
          description="Have a project in mind or want to discuss opportunities? I'd love to hear from you."
          align="center"
          isInView={isInView}
        />

        <div className="mb-12" />

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Direct Email */}
            <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4 flex items-center gap-2">
                <Mail size={18} className="text-[var(--accent)]" />
                Direct Email
              </h3>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-sm sm:text-base text-[var(--accent)] hover:underline break-all"
              >
                {personalInfo.email}
              </a>
              <button
                onClick={handleCopyEmail}
                className="mt-3 sm:mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-[var(--border-subtle)] rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all active:scale-95"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-[var(--accent)]" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    Copy Email
                  </>
                )}
              </button>
            </div>

            {/* Social Links */}
            <div className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] mb-3 sm:mb-4">
                Connect With Me
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--border-subtle)] transition-all active:scale-[0.98]"
                >
                  <Github size={20} className="text-[var(--text-secondary)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-primary)]">GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--border-subtle)] transition-all active:scale-[0.98]"
                >
                  <Linkedin size={20} className="text-[var(--text-secondary)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-primary)]">LinkedIn</span>
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:bg-[var(--border-subtle)] transition-all active:scale-[0.98]"
                >
                  <Mail size={20} className="text-[var(--text-secondary)] flex-shrink-0" />
                  <span className="text-sm text-[var(--text-primary)]">Email</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)] p-4 sm:p-6"
            >
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 sm:mb-6 p-3 sm:p-4 bg-[var(--accent-muted)] rounded-lg text-[var(--accent)] text-sm"
                >
                  Thanks for reaching out! I&apos;ll get back to you soon.
                </motion.div>
              )}

              <div className="space-y-3 sm:space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all outline-none"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-primary)] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all outline-none resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.01, boxShadow: '0 0 20px var(--accent-glow)' }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg-primary)] rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
