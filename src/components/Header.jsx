import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaChevronDown, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ROLES = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Developer',
  'UI/UX Enthusiast',
];

// Static star positions — generated once, never on render
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: (i * 137.508) % 100,
  y: (i * 89.632) % 100,
  size: i % 3 === 0 ? 2 : i % 5 === 0 ? 1.5 : 1,
  delay: (i * 0.23) % 4,
  duration: 2 + (i % 4),
}));

const Header = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout;

    if (!isDeleting && displayedRole.length < currentRole.length) {
      timeout = setTimeout(() => {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }, 80);
    } else if (!isDeleting && displayedRole.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayedRole.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedRole(displayedRole.slice(0, -1));
      }, 45);
    } else if (isDeleting && displayedRole.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  const scrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-bg">
      {/* Static star field */}
      <div className="star-field">
        {STARS.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: 0.4 + (star.id % 6) * 0.1,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Ambient glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          left: '-100px',
          top: '50%',
          transform: 'translateY(-50%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          right: '-80px',
          top: '20%',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
          right: '20%',
          bottom: '10%',
          filter: 'blur(60px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Text content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-sm font-medium"
              style={{
                background: 'rgba(99,102,241,0.1)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: '#a5b4fc',
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
              />
              Available for opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
            >
              <span className="text-white">Hi, I'm </span>
              <span className="gradient-text">Abdulla</span>
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-2xl sm:text-3xl font-semibold mb-6 h-10"
              style={{ color: '#94a3b8' }}
            >
              <span style={{ color: '#c7d2fe' }}>{displayedRole}</span>
              <span className="cursor-blink ml-0.5" style={{ color: '#6366f1' }}>|</span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              style={{ color: '#94a3b8' }}
            >
              Passionate about building beautiful, performant web applications with modern technologies.
              Turning complex ideas into elegant digital experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10"
            >
              <button onClick={scrollToProjects} className="btn-primary w-full sm:w-auto justify-center">
                <FaExternalLinkAlt size={14} />
                View My Projects
              </button>
              <a
                href="mailto:abdulla.mhammad99@gmail.com"
                className="btn-outline w-full sm:w-auto justify-center"
              >
                <FaEnvelope size={14} />
                Get In Touch
              </a>
            </motion.div>

            {/* Contact info pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              {[
                { icon: FaEnvelope, text: 'abdulla.mhammad99@gmail.com', href: 'mailto:abdulla.mhammad99@gmail.com' },
                { icon: FaPhone, text: '+964 770 749 1199', href: 'tel:+9647707401199' },
                { icon: FaMapMarkerAlt, text: 'Kurdistan, Iraq', href: null },
              ].map(({ icon: Icon, text, href }) => (
                <div key={text} className="flex items-center gap-2" style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  <Icon size={12} style={{ color: '#6366f1' }} />
                  {href ? (
                    <a href={href} style={{ color: '#64748b' }} className="hover:text-indigo-400 transition-colors">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-shrink-0 w-full max-w-sm lg:max-w-xs"
          >
            <div className="glass-card p-8">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div
                  className="relative w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(139,92,246,0.3))',
                    border: '1px solid rgba(99,102,241,0.4)',
                    boxShadow: '0 0 40px rgba(99,102,241,0.25)',
                    color: '#c7d2fe',
                  }}
                >
                  A
                </div>
              </div>

              {/* Stats */}
              {[
                { label: 'Years Experience', value: '5+' },
                { label: 'Projects Completed', value: '20+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Happy Clients', value: '10+' },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-3"
                  style={{ borderBottom: '1px solid rgba(99,136,255,0.08)' }}
                >
                  <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{label}</span>
                  <span
                    className="font-bold text-lg gradient-text"
                  >
                    {value}
                  </span>
                </div>
              ))}

              {/* Social */}
              <div className="flex justify-center gap-3 mt-6">
                <a
                  href="https://www.facebook.com/share/1BfeW4WCLL/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  style={{
                    background: 'rgba(99,102,241,0.1)',
                    border: '1px solid rgba(99,102,241,0.2)',
                    color: '#a5b4fc',
                  }}
                >
                  <FaGithub size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ color: '#475569' }}
        whileHover={{ color: '#6366f1' }}
      >
        <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaChevronDown size={16} />
        </motion.div>
      </motion.button>
    </header>
  );
};

export default Header;