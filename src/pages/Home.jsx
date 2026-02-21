import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Code2, Server, Database } from 'lucide-react';

const Home = () => {
  const techStack = [
    { name: 'React', icon: Code2, color: 'text-blue-400' },
    { name: 'Spring Boot', icon: Server, color: 'text-green-400' },
    { name: 'PostgreSQL', icon: Database, color: 'text-yellow-400' },
    { name: 'Tailwind CSS', icon: Code2, color: 'text-cyan-400' },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React and Spring Boot',
      tech: ['React', 'Spring Boot', 'MySQL'],
      github: 'https://github.com/Binimemsh/spring-boot/tree/master/e-commerce',
      live: 'https://demo.com',
    },
    {
      id: 2,
      title: 'Real time Chat App',
      description: 'Collaborative chat application with real-time updates',
      tech: ['React', 'Spring Boot', 'MySQL'],
      github: 'https://github.com/Binimemsh/Spring-Chat-App/tree/main/chat-backend',
      live: 'https://demo.com',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Biniam Emshaw
        </h1>
        <h2 className="text-2xl md:text-3xl text-blue-400 mb-6">
          Backend Developer
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Building beautiful and scalable web applications with modern technologies.
          Passionate about creating exceptional user experiences.
        </p>
      </motion.div>

      {/* Tech Stack Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="text-2xl font-bold text-white mb-8 text-center">
          Tech Stack
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-200 p-6 rounded-lg text-center hover:bg-dark-300 transition-colors"
            >
              <tech.icon className={`w-12 h-12 mx-auto mb-3 ${tech.color}`} />
              <span className="text-gray-300">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Featured Projects</h3>
          <Link to="/projects" className="text-blue-400 hover:text-blue-300">
            View All →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-200 rounded-lg p-6 hover:bg-dark-300 transition-colors"
            >
              <h4 className="text-xl font-semibold text-white mb-2">
                {project.title}
              </h4>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-dark-400 text-sm text-gray-300 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <Github size={20} className="mr-1" />
                  Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-white transition-colors"
                >
                  <ExternalLink size={20} className="mr-1" />
                  Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Home;