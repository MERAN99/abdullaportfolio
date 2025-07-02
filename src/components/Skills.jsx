import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGitAlt } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiExpress } from 'react-icons/si';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { isDarkMode } = useTheme();
  const skillCategories = [
    {
      title: "Frontend",
      gradient: "text-gradient-primary",
      skills: [
        { name: "HTML5", icon: <FaHtml5 className="text-orange-500" size={32} /> },
        { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" size={32} /> },
        { name: "JavaScript", icon: <SiJavascript className="text-yellow-500" size={32} /> },
        { name: "React", icon: <FaReact className="text-blue-400" size={32} /> },
        { name: "React Native", icon: <FaReact className="text-sky-500" size={32} /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" size={32} /> },
      ]
    },
    {
      title: "Backend",
      gradient: "text-gradient-secondary",
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="text-green-600" size={32} /> },
        { name: "Express.js", icon: <SiExpress className={isDarkMode ? "text-gray-400" : "text-gray-600"} size={32} /> },
      ]
    },
    {
      title: "Other Tools",
      gradient: "text-gradient-vibrant",
      skills: [
        { name: "Git", icon: <FaGitAlt className="text-red-500" size={32} /> },
        { name: "REST APIs", icon: <div className="text-gradient-primary text-2xl">API</div> },
        { name: "Responsive Design", icon: <div className="text-gradient-secondary text-2xl">RWD</div> },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="section-title text-center"
        >
          Skills
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`rounded-lg shadow-lg p-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h3 className={`text-xl font-semibold mb-4 bg-gradient-to-r ${
                index === 0 ? 'from-blue-600 via-indigo-500 to-purple-500' : 
                index === 1 ? 'from-purple-600 via-pink-500 to-red-500' : 
                'from-indigo-600 via-blue-500 to-cyan-500'
              } inline-block text-transparent bg-clip-text`}>{category.title}</h3>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                      isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill.icon}
                    <span className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 