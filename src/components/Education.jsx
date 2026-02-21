import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaPalette, FaMapMarkerAlt } from 'react-icons/fa';

const EDUCATION = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Sulaymaniyah',
    location: 'Kurdistan, Iraq',
    period: '2018 – 2022',
    grade: 'Good',
    color: '#6366f1',
    highlights: [
      'Graduated with honors in Computer Science',
      'Specialized in web development and software engineering',
      'Completed multiple full-stack projects during studies',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'React Developer Certification', issuer: 'Online Academy', color: '#06b6d4' },
  { name: 'Full Stack JavaScript', issuer: 'FreeCodeCamp', color: '#8b5cf6' },
  { name: 'Node.js Fundamentals', issuer: 'Udemy', color: '#10b981' },
];

// Static stars
const STARS = Array.from({ length: 45 }, (_, i) => ({
  id: i,
  x: (i * 131.17) % 100,
  y: (i * 71.53) % 100,
  opacity: 0.12 + (i % 5) * 0.05,
}));

const Education = () => (
  <section
    id="education"
    className="relative py-20 overflow-hidden"
    style={{
      background: 'linear-gradient(180deg, #020B18 0%, #030712 100%)',
    }}
  >
    {/* Background image with overlay */}
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'url("/images/astronout_Book.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.07,
      }}
    />

    {/* Stars */}
    <div className="star-field">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{ left: `${s.x}%`, top: `${s.y}%`, opacity: s.opacity }}
        />
      ))}
    </div>

    {/* Floating astronaut decoration */}
    <div
      className="absolute right-0 lg:right-12 top-1/2 -translate-y-1/2 pointer-events-none opacity-10 hidden lg:block"
      style={{
        animation: 'float 6s ease-in-out infinite',
        zIndex: 1,
      }}
    >
      <img
        src="/models/Astronout-GreyScale.png"
        alt=""
        style={{ width: '200px', height: 'auto', objectFit: 'contain' }}
      />
    </div>

    {/* Ambient glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
        right: '-100px',
        bottom: '10%',
        filter: 'blur(60px)',
        zIndex: 0,
      }}
    />

    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <span
          className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#6366f1' }}
        >
          Academic Background
        </span>
        <h2 className="section-title text-4xl sm:text-5xl">Education</h2>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Education cards */}
        {EDUCATION.map((edu, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card overflow-hidden"
          >
            {/* Top accent */}
            <div
              className="h-1"
              style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
            />

            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${edu.color}15`,
                    border: `1px solid ${edu.color}30`,
                  }}
                >
                  <FaGraduationCap size={24} style={{ color: edu.color }} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white leading-tight">{edu.degree}</h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <FaUniversity size={12} style={{ color: edu.color }} />
                        <span style={{ color: edu.color, fontWeight: 600 }}>{edu.institution}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 sm:text-right">
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium self-start sm:self-end"
                        style={{
                          background: 'rgba(99,136,255,0.08)',
                          border: '1px solid rgba(99,136,255,0.15)',
                          color: '#64748b',
                        }}
                      >
                        <FaCalendarAlt size={10} />
                        {edu.period}
                      </div>
                      <div className="flex items-center gap-1 text-xs sm:justify-end" style={{ color: '#475569' }}>
                        <FaMapMarkerAlt size={10} />
                        {edu.location}
                      </div>
                    </div>
                  </div>

                  {/* Grade badge */}
                  <div className="mb-4">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(16,185,129,0.12)',
                        border: '1px solid rgba(16,185,129,0.3)',
                        color: '#10b981',
                      }}
                    >
                      <FaPalette size={10} />
                      Grade: {edu.grade}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {edu.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ background: edu.color }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="glass-card glass-card-hover p-4 text-center"
                style={{ borderColor: `${cert.color}25` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: `${cert.color}15`,
                    border: `1px solid ${cert.color}30`,
                  }}
                >
                  <FaGraduationCap size={16} style={{ color: cert.color }} />
                </div>
                <h4 className="font-semibold text-sm text-white mb-1">{cert.name}</h4>
                <p className="text-xs" style={{ color: '#64748b' }}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Education;