import { motion } from 'framer-motion';
import { Download, GraduationCap, Award, Code2, BookOpen } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Java', category: 'backend' },
    { name: 'Spring Boot', category: 'backend' },
    { name: 'Spring MVC', category: 'backend' },
    { name: 'JPA/Hibernate', category: 'backend' },
    { name: 'RESTful APIs', category: 'backend' },
    { name: 'WebSocket', category: 'backend' },
    { name: 'Python', category: 'language' },
    { name: 'Java', category: 'language' },
    { name: 'MySQL', category: 'database' },
    { name: 'Git', category: 'tools' },
    { name: 'Maven', category: 'tools' },
    { name: 'Postman', category: 'tools' },
  ];

  // Group skills by category
  const backendSkills = skills.filter(s => s.category === 'backend');
  const languageSkills = skills.filter(s => s.category === 'language');
  const databaseSkills = skills.filter(s => s.category === 'database');
  const toolsSkills = skills.filter(s => s.category === 'tools');

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Debre Berhan University',
      year: 'Expected Graduation: 2019 EC',
      description: 'Focus on backend development, system design, and software engineering principles',
    }
  ];

  const certifications = [
    {
      name: 'Fundamental of Programming',
      issuer: 'Ethiopian 5 million Coders initiative',
      year: '2023',
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Backend System',
      tech: ['Spring Boot', 'JPA', 'MySQL', 'REST API'],
      description: 'Developed RESTful APIs for product and category management. Implemented CRUD operations using JPA and MySQL with validation and structured error handling.'
    },
    {
      title: 'Real-Time Chat Application',
      tech: ['Spring Boot', 'WebSocket', 'JavaScript'],
      description: 'Built real-time bidirectional communication using WebSocket. Implemented multiple chat room support with message broadcasting and user presence tracking.'
    }
  ];

  const handleDownloadCV = () => {
    // Create a link to the PDF file in the public folder
    const link = document.createElement('a');
    link.href = '/Biniam Emshaw_cv.pdf'; // Path to your PDF in public folder
    link.download = 'Biniam_Emshaw_CV.pdf'; // Name for the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-white mb-8">About Me</h1>

        {/* Professional Summary */}
        <div className="bg-dark-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Professional Summary</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Computer Science student at Debre Berhan University with strong interest in backend development 
            using Spring Boot. Experienced in building RESTful APIs, database-driven applications, and real-time 
            systems. Passionate about writing clean, maintainable, and scalable code while continuously improving 
            problem-solving and system design skills.
          </p>
          
          {/* Download CV Button */}
          <button 
            onClick={handleDownloadCV}
            className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors group"
          >
            <Download size={20} className="mr-2 group-hover:animate-bounce" />
            Download CV
          </button>
        </div>

        {/* Technical Skills */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Code2 className="mr-2 text-blue-400" size={24} />
            Technical Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Backend Development */}
            <div className="bg-dark-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Backend Development</h3>
              <div className="flex flex-wrap gap-2">
                {backendSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Programming Languages */}
            <div className="bg-dark-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-400 mb-4">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {languageSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="bg-dark-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-4">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {databaseSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Tools & Technologies */}
            <div className="bg-dark-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-400 mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {toolsSkills.map((skill, index) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-3 py-1 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="mr-2 text-blue-400" size={24} />
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-200 rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-sm text-blue-400">
                      {tech}{i < project.tech.length - 1 ? ' • ' : ''}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Education */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <GraduationCap className="mr-2 text-blue-400" size={24} />
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-200 p-6 rounded-lg"
                >
                  <div className="flex items-start">
                    <GraduationCap className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                      <p className="text-gray-400">{edu.institution}</p>
                      <p className="text-sm text-gray-500 mt-1">{edu.year}</p>
                      <p className="text-sm text-gray-400 mt-2">{edu.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <BookOpen className="mr-2 text-blue-400" size={24} />
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-200 p-6 rounded-lg"
                >
                  <div className="flex items-start">
                    <Award className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white">{cert.name}</h3>
                      <p className="text-gray-400">{cert.issuer}</p>
                      <p className="text-sm text-gray-500 mt-1">{cert.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;