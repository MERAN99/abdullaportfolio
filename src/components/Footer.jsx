import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const currentYear = new Date().getFullYear();

// Static star positions — never random
const STARS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: (i * 137.5) % 100,
  y: (i * 89.6) % 100,
  opacity: 0.1 + (i % 5) * 0.04,
}));

const Footer = () => (
  <footer
    className="relative overflow-hidden py-16"
    style={{ background: 'linear-gradient(180deg, #030712 0%, #020B18 100%)' }}
  >
    {/* Top border glow */}
    <div
      className="absolute top-0 left-0 right-0 h-px"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(139,92,246,0.5), transparent)',
      }}
    />

    {/* Static stars */}
    <div className="star-field">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
        />
      ))}
    </div>

    {/* Ambient glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: '400px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(60px)',
        zIndex: 0,
      }}
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Brand */}
        <div>
          <div className="text-2xl font-bold gradient-text mb-3" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Abdulla.dev
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: '#475569' }}>
            Full Stack Developer passionate about building beautiful, performant web experiences with modern technologies.
          </p>
          <div className="flex gap-3">
            {[
              { icon: FaGithub, href: 'https://github.com/', label: 'GitHub' },
              { icon: FaLinkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                style={{
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  color: '#94a3b8',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)';
                  e.currentTarget.style.color = '#a5b4fc';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                  e.currentTarget.style.color = '#94a3b8';
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <nav className="grid grid-cols-2 gap-2">
            {['about', 'skills', 'projects', 'experience', 'education', 'languages'].map((id) => (
              <button
                key={id}
                onClick={() => {
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm text-left capitalize transition-colors duration-200"
                style={{ color: '#475569' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}
              >
                {id}
              </button>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
          <div className="space-y-3">
            {[
              { icon: FaEnvelope, text: 'abdulla.mhammad99@gmail.com', href: 'mailto:abdulla.mhammad99@gmail.com' },
              { icon: FaPhone, text: '+964 770 749 1199', href: 'tel:+9647707401199' },
              { icon: FaMapMarkerAlt, text: 'Kurdistan, Iraq', href: null },
            ].map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-center gap-2.5 text-sm">
                <Icon size={12} style={{ color: '#6366f1', flexShrink: 0 }} />
                {href ? (
                  <a href={href} className="transition-colors duration-200" style={{ color: '#475569' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#a5b4fc'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#475569'; }}>
                    {text}
                  </a>
                ) : (
                  <span style={{ color: '#475569' }}>{text}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm"
        style={{ borderTop: '1px solid rgba(99,136,255,0.08)', color: '#334155' }}
      >
        <p>© {currentYear} Abdulla Mohammed Ahmed. All rights reserved.</p>
        <p className="flex items-center gap-1.5">
          Made with
          <motion.span
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FaHeart style={{ color: '#6366f1' }} size={12} />
          </motion.span>
          using React & Tailwind CSS
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;