import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress, SiUnrealengine, SiBlender, SiTypescript } from 'react-icons/si';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    color: '#6366f1',
    skills: [
      { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" size={28} />, level: 95 },
      { name: 'CSS3', icon: <FaCss3Alt className="text-blue-400" size={28} />, level: 90 },
      { name: 'JavaScript', icon: <SiJavascript className="text-yellow-400" size={28} />, level: 92 },
      { name: 'React', icon: <FaReact className="text-cyan-400" size={28} />, level: 90 },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" size={28} />, level: 75 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-teal-400" size={28} />, level: 92 },
    ],
  },
  {
    title: 'Backend',
    color: '#8b5cf6',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs className="text-green-500" size={28} />, level: 82 },
      { name: 'Express.js', icon: <SiExpress className="text-gray-300" size={28} />, level: 80 },
    ],
  },
  {
    title: 'Game Dev',
    color: '#f59e0b',
    skills: [
      { name: 'Unreal Engine', icon: <SiUnrealengine className="text-gray-200" size={28} />, level: 65 },
      { name: 'Blender', icon: <SiBlender className="text-orange-400" size={28} />, level: 60 },
    ],
  },
  {
    title: 'Tools & More',
    color: '#10b981',
    skills: [
      { name: 'Git', icon: <FaGitAlt className="text-red-400" size={28} />, level: 88 },
      { name: 'REST APIs', icon: <span className="text-indigo-400 font-bold text-sm">API</span>, level: 90 },
      { name: 'Responsive', icon: <span className="text-teal-400 font-bold text-sm">RWD</span>, level: 95 },
    ],
  },
];

const SkillCard = ({ skill, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-4 rounded-xl text-center transition-all duration-300 cursor-default"
      style={{
        background: hovered ? 'rgba(30,41,59,0.9)' : 'rgba(15,23,42,0.6)',
        border: `1px solid ${hovered ? color + '50' : 'rgba(99,136,255,0.1)'}`,
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? `0 8px 30px ${color}20` : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex justify-center mb-3">{skill.icon}</div>
      <p className="text-xs font-semibold mb-2" style={{ color: '#94a3b8' }}>{skill.name}</p>
      <div className="skill-bar">
        <motion.div
          className="skill-bar-fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
        />
      </div>
      <p className="text-xs mt-1" style={{ color: '#475569' }}>{skill.level}%</p>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section
      id="skills"
      className="relative py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #030712 0%, #050D1A 100%)' }}
    >
      {/* Background wallpaper with heavy overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/images/wallpaper1.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
        }}
      />

      {/* Glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
          right: '-100px',
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
          className="text-center mb-12"
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#6366f1' }}>
            What I Know
          </span>
          <h2 className="section-title text-4xl sm:text-5xl">Technical Skills</h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveCategory(i)}
              className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
              style={{
                background: activeCategory === i ? `${cat.color}20` : 'rgba(15,23,42,0.6)',
                border: `1px solid ${activeCategory === i ? cat.color + '50' : 'rgba(99,136,255,0.12)'}`,
                color: activeCategory === i ? cat.color : '#64748b',
                boxShadow: activeCategory === i ? `0 0 20px ${cat.color}20` : 'none',
              }}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto"
        >
          {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} color={SKILL_CATEGORIES[activeCategory].color} />
          ))}
        </motion.div>

        {/* All skills summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-6 text-center">Proficiency Overview</h3>
            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.title} className="flex items-center gap-4">
                  <span className="text-sm font-medium w-24 flex-shrink-0" style={{ color: cat.color }}>
                    {cat.title}
                  </span>
                  <div className="flex-1 skill-bar">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}aa)` }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right" style={{ color: '#475569' }}>
                    {Math.round(cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;