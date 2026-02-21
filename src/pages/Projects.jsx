import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Add this

const API_URL = 'https://my-portfolio-backend-fll4.onrender.com/api';

const Projects = () => {
  const { isAuthenticated } = useAuth(); // Add this
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveDemoLink: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_URL}/projects`);
      setProjects(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch projects');
      setLoading(false);
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/projects`, newProject);
      setProjects([...projects, response.data]);
      setShowAddForm(false);
      setNewProject({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveDemoLink: '',
      });
    } catch (err) {
      setError('Failed to add project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        {/* Only show Add Project button when authenticated */}
        {isAuthenticated && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Add Project
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add Project Form - only shown when authenticated */}
      {showAddForm && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
            <textarea
              placeholder="Description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              rows="3"
              required
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated)"
              value={newProject.techStack}
              onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
              className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="url"
              placeholder="GitHub Link"
              value={newProject.githubLink}
              onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
              className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
            <input
              type="url"
              placeholder="Live Demo Link"
              value={newProject.liveDemoLink}
              onChange={(e) => setNewProject({...newProject, liveDemoLink: e.target.value})}
              className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
              required
            />
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Project
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-dark-200 rounded-lg p-6 hover:bg-dark-300 transition-colors relative group"
          >
            {/* Only show delete button when authenticated */}
            {isAuthenticated && (
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={20} />
              </button>
            )}
            
            <h3 className="text-xl font-semibold text-white mb-2 pr-8">{project.title}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.split(',').map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-dark-400 text-sm text-gray-300 rounded-full"
                >
                  {tech.trim()}
                </span>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-white transition-colors"
              >
                <Github size={20} className="mr-1" />
                Code
              </a>
              <a
                href={project.liveDemoLink}
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
    </div>
  );
};

export default Projects;