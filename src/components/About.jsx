import { motion } from 'framer-motion';
import { FaCode, FaBriefcase, FaUsers, FaCertificate } from 'react-icons/fa';
import StarsBackground from './StarsBackground';

const STATS = [
  { icon: FaBriefcase, label: 'Years Experience', value: '5+', color: '#6366f1' },
  { icon: FaCode, label: 'Projects Built', value: '20+', color: '#8b5cf6' },
  { icon: FaCertificate, label: 'Technologies', value: '15+', color: '#06b6d4' },
  { icon: FaUsers, label: 'Happy Clients', value: '10+', color: '#10b981' },
];

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen py-20 flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020B18 0%, #030712 100%)' }}
    >
      {/* Stars background */}
      <StarsBackground />

      {/* Floating astronaut decoration */}
      <div
        className="absolute right-0 sm:right-8 top-1/2 -translate-y-1/2 pointer-events-none opacity-10 sm:opacity-20 hidden sm:block"
        style={{ animation: 'float-slow 8s ease-in-out infinite', zIndex: 1 }}
      >
        <img
          src="/images/astronout.png"
          alt=""
          style={{ width: '320px', height: 'auto', objectFit: 'contain' }}
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          right: '10%',
          top: '30%',
          filter: 'blur(60px)',
          zIndex: 1,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
                style={{ color: '#6366f1' }}
              >
                Who I Am
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-white">Professional </span>
                <span className="gradient-text">Summary</span>
              </h2>

              <div className="space-y-5" style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                <p>
                  I'm a passionate <strong style={{ color: '#c7d2fe' }}>Full Stack Developer</strong> with
                  expertise in building modern web applications using cutting-edge technologies. My journey in
                  software development has equipped me with a diverse skill set spanning front-end and back-end
                  development.
                </p>
                <p>
                  With a strong foundation in <strong style={{ color: '#c7d2fe' }}>JavaScript and its frameworks</strong>,
                  I specialize in creating responsive, user-friendly interfaces that deliver exceptional user
                  experiences. I'm particularly interested in animation, interactive design, and performance
                  optimization.
                </p>
                <p>
                  I thrive in collaborative environments and enjoy tackling complex problems with elegant
                  solutions. My goal is to continue growing as a developer while contributing to projects that
                  make a positive impact.
                </p>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2 mt-8">
                {['React', 'Node.js', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'REST APIs', 'Git'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      background: 'rgba(99,102,241,0.1)',
                      border: '1px solid rgba(99,102,241,0.25)',
                      color: '#a5b4fc',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Stats cards */}
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card glass-card-hover p-6 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${stat.color}20`,
                    border: `1px solid ${stat.color}40`,
                  }}
                >
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div
                  className="text-4xl font-bold mb-2"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${stat.color}aa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: '#64748b' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;