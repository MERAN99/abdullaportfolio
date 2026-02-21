import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const EXPERIENCES = [
  {
    company: 'DaarAI Ltd',
    location: 'England – London (Remote)',
    position: 'Full Stack Developer',
    period: '2024 – Present',
    current: true,
    color: '#6366f1',
    responsibilities: [
      'Building smart web applications integrated with AI APIs',
      'Developing frontend dashboards and backend services',
      'Collaborating with cross-functional teams to ship scalable systems',
    ],
  },
  {
    company: 'Redang Company',
    location: 'Kurdistan, Iraq',
    position: 'Full Stack Developer',
    period: '2022 – 2024 (~2 years)',
    current: false,
    color: '#8b5cf6',
    responsibilities: [
      'Built and maintained internal tools and business web applications',
      'Collaborated with design and backend teams to launch new product features',
      'Used React, Tailwind, and Node.js to deliver scalable solutions',
    ],
  },
  {
    company: 'MeatversPlus',
    location: 'United Arab Emirates – Dubai',
    position: 'Frontend Developer',
    period: '2021 – 2022 (1 year)',
    current: false,
    color: '#06b6d4',
    responsibilities: [
      'Developed dynamic user interfaces for web apps',
      'Improved performance and user experience significantly',
      'Implemented clean, modular code using modern frontend frameworks',
    ],
  },
];

// Static stars
const STARS = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: (i * 119.17) % 100,
  y: (i * 83.91) % 100,
  opacity: 0.15 + (i % 4) * 0.07,
}));

const Experience = () => (
  <section
    id="experience"
    className="relative py-20 overflow-hidden"
    style={{ background: 'linear-gradient(180deg, #050D1A 0%, #030712 100%)' }}
  >
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

    {/* Ambient glow */}
    <div
      className="absolute pointer-events-none"
      style={{
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
        left: '-100px',
        top: '20%',
        filter: 'blur(70px)',
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
        <span
          className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#6366f1' }}
        >
          Career Path
        </span>
        <h2 className="section-title text-4xl sm:text-5xl">Work Experience</h2>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 timeline-line"
          style={{ opacity: 0.4 }}
        />

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative flex gap-6 sm:gap-8"
            >
              {/* Timeline dot */}
              <div className="flex-shrink-0 relative" style={{ zIndex: 2 }}>
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${exp.color}15`,
                    border: `2px solid ${exp.color}40`,
                    boxShadow: exp.current ? `0 0 20px ${exp.color}30` : 'none',
                  }}
                >
                  <FaBriefcase size={18} style={{ color: exp.color }} />
                </div>
                {exp.current && (
                  <div
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,0.6)' }}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className="flex-1 glass-card p-6 mb-2"
                style={{
                  borderColor: `${exp.color}25`,
                }}
              >
                {/* Top: position + period */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: '#f1f5f9' }}
                    >
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <FaBuilding size={12} style={{ color: exp.color }} />
                      <span className="font-semibold text-sm" style={{ color: exp.color }}>
                        {exp.company}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium self-start sm:self-end"
                      style={{
                        background: exp.current ? 'rgba(16,185,129,0.1)' : 'rgba(99,136,255,0.08)',
                        border: `1px solid ${exp.current ? 'rgba(16,185,129,0.3)' : 'rgba(99,136,255,0.15)'}`,
                        color: exp.current ? '#10b981' : '#64748b',
                      }}
                    >
                      <FaCalendarAlt size={10} />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-1 justify-end text-xs" style={{ color: '#475569' }}>
                      <FaMapMarkerAlt size={10} />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: '#94a3b8' }}>
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: exp.color }}
                      />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Experience;