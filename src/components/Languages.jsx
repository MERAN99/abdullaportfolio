import { motion } from 'framer-motion';
import { FaLanguage, FaFacebook, FaEnvelope } from 'react-icons/fa';

const LANGUAGES = [
  { name: 'Kurdish', level: 'Native', proficiency: 100, color: '#6366f1' },
  { name: 'Arabic', level: 'Fluent', proficiency: 90, color: '#8b5cf6' },
  { name: 'English', level: 'Fluent', proficiency: 85, color: '#06b6d4' },
];

// Static stars — fixed positions, never random
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: (i * 161.8) % 100,
  y: (i * 103.3) % 100,
  opacity: 0.1 + (i % 6) * 0.05,
  size: i % 8 === 0 ? 2 : 1,
}));

const Languages = () => (
  <section
    id="languages"
    className="relative py-20 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #050D1A 0%, #030712 100%)' }}
  >
    {/* Stars */}
    <div className="star-field">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: s.opacity,
            width: `${s.size}px`,
            height: `${s.size}px`,
          }}
        />
      ))}
    </div>

    {/* Ambient glows */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
        left: '5%',
        top: '20%',
        filter: 'blur(70px)',
        zIndex: 0,
      }}
    />
    <div
      className="absolute pointer-events-none"
      style={{
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        right: '5%',
        bottom: '20%',
        filter: 'blur(60px)',
        zIndex: 0,
      }}
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#6366f1' }}>
          Communication
        </span>
        <h2 className="section-title text-4xl sm:text-5xl">Languages</h2>
      </motion.div>

      {/* Language cards */}
      <div className="max-w-2xl mx-auto space-y-5">
        {LANGUAGES.map((lang, index) => (
          <motion.div
            key={lang.name}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="glass-card p-6"
            style={{ borderColor: `${lang.color}25` }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${lang.color}15`,
                    border: `1px solid ${lang.color}30`,
                  }}
                >
                  <FaLanguage size={18} style={{ color: lang.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">{lang.name}</h3>
                </div>
              </div>
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  background: `${lang.color}15`,
                  border: `1px solid ${lang.color}30`,
                  color: lang.color,
                }}
              >
                {lang.level}
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 skill-bar h-2">
                <motion.div
                  className="skill-bar-fill"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.3 + index * 0.15, ease: 'easeOut' }}
                  style={{ background: `linear-gradient(90deg, ${lang.color}, ${lang.color}88)` }}
                />
              </div>
              <span className="text-sm font-semibold w-10 text-right" style={{ color: lang.color }}>
                {lang.proficiency}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Contact CTA */}
      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
      >
        <motion.a
          href="https://www.facebook.com/share/1BfeW4WCLL/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #1877f2, #0f5ebf)',
            boxShadow: '0 4px 20px rgba(24,119,242,0.3)',
          }}
          whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(24,119,242,0.4)' }}
          whileTap={{ scale: 0.98 }}
        >
          <FaFacebook size={20} />
          Facebook
        </motion.a>

        <motion.a
          href="mailto:abdulla.mhammad99@gmail.com"
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
          style={{
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.3)',
            color: '#a5b4fc',
          }}
          whileHover={{
            scale: 1.03,
            background: 'rgba(99,102,241,0.2)',
            boxShadow: '0 8px 30px rgba(99,102,241,0.2)',
          }}
          whileTap={{ scale: 0.98 }}
        >
          <FaEnvelope size={18} />
          Email Me
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default Languages;