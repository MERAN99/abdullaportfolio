import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGlobe } from 'react-icons/fa';

const PROJECTS = [
    {
        id: 1,
        name: 'CarShow',
        description: 'An elegant car showcase platform with stunning visuals, vehicle details, and smooth browsing experience.',
        url: 'https://carshow-r.netlify.app/',
        tags: ['Showcase', 'JavaScript', 'CSS'],
        color: '#f59e0b',
        emoji: '🚗',
    },
    {
        id: 2,
        name: 'K M S F',
        description: 'A professional portfolio and web presence featuring clean design and modern development practices.',
        url: 'https://kmsf-ukk.netlify.app/',
        tags: ['Portfolio', 'React', 'Design'],
        color: '#8b5cf6',
        emoji: '🌐',
    },
    {
        id: 3,
        name: 'ForgeFit',
        description: 'A dynamic fitness web app helping users track workouts, set goals, and stay motivated with a bold UI.',
        url: 'https://forgifit.netlify.app/',
        tags: ['Fitness', 'React', 'Tailwind'],
        color: '#ef4444',
        emoji: '💪',
    },
    {
        id: 4,
        name: 'PulseX',
        description: 'A vibrant pulse and wellness app with real-time data visualization and smooth user interactions.',
        url: 'https://pulsexz.netlify.app/',
        tags: ['Wellness', 'React', 'Animation'],
        color: '#10b981',
        emoji: '💚',
    },
];

// Static star positions
const STARS = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: (i * 173.11) % 100,
    y: (i * 97.43) % 100,
    opacity: 0.2 + (i % 5) * 0.06,
    size: i % 5 === 0 ? 2 : 1,
}));

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.08 }}
        className="project-card group"
    >
        {/* Top accent bar */}
        <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
        />

        <div className="p-6 relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                        style={{
                            background: `${project.color}18`,
                            border: `1px solid ${project.color}35`,
                        }}
                    >
                        {project.emoji}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">{project.name}</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                                    style={{
                                        background: `${project.color}15`,
                                        color: project.color,
                                        border: `1px solid ${project.color}25`,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.2)',
                        color: '#94a3b8',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = `${project.color}20`;
                        e.currentTarget.style.borderColor = `${project.color}50`;
                        e.currentTarget.style.color = project.color;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(99,102,241,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)';
                        e.currentTarget.style.color = '#94a3b8';
                    }}
                >
                    <FaExternalLinkAlt size={13} />
                </a>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-5" style={{ color: '#64748b' }}>
                {project.description}
            </p>

            {/* Preview area */}
            <div
                className="relative overflow-hidden rounded-lg mb-4"
                style={{
                    height: '160px',
                    background: 'rgba(15,23,42,0.8)',
                    border: '1px solid rgba(99,136,255,0.1)',
                }}
            >
                <iframe
                    src={project.url}
                    title={project.name}
                    className="w-full h-full border-0"
                    style={{
                        transform: 'scale(0.6)',
                        transformOrigin: 'top left',
                        width: '167%',
                        height: '167%',
                        pointerEvents: 'none',
                    }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                />
                {/* Overlay to prevent iframe interaction */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(15,23,42,0.8) 100%)' }} />
            </div>

            {/* CTA */}
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
                style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                    color: project.color,
                }}
                onMouseEnter={e => {
                    e.currentTarget.style.background = `${project.color}25`;
                    e.currentTarget.style.borderColor = `${project.color}60`;
                }}
                onMouseLeave={e => {
                    e.currentTarget.style.background = `${project.color}15`;
                    e.currentTarget.style.borderColor = `${project.color}30`;
                }}
            >
                <FaGlobe size={13} />
                Visit Live Site
            </a>
        </div>
    </motion.div>
);

const Projects = () => (
    <section
        id="projects"
        className="relative py-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #030712 0%, #050D1A 50%, #030712 100%)' }}
    >
        {/* Static stars */}
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
                        opacity: star.opacity,
                    }}
                />
            ))}
        </div>

        {/* Ambient glow */}
        <div
            className="absolute pointer-events-none"
            style={{
                width: '600px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
                left: '50%',
                top: '30%',
                transform: 'translateX(-50%)',
                filter: 'blur(80px)',
                zIndex: 0,
            }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 1 }}>
            {/* Section header */}
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
                    My Work
                </span>
                <h2 className="section-title text-4xl sm:text-5xl">Featured Projects</h2>
                <p className="mt-4 max-w-xl mx-auto" style={{ color: '#64748b' }}>
                    A collection of live web applications I've built — click any card to explore.
                </p>
            </motion.div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    </section>
);

export default Projects;
