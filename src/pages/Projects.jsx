import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Trash2, Plus, Shield } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = 'http://localhost:8080/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { isAuthenticated } = useAuth();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: '',
    liveDemoLink: ''
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
    
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('You must be logged in as admin to add projects');
      return;
    }

    try {
      const projectData = {
        ...newProject,
        techStack: newProject.techStack.split(',').map(tech => tech.trim())
      };
      
      const response = await axios.post(`${API_URL}/projects`, projectData);
      setProjects([...projects, response.data]);
      setShowAddForm(false);
      setNewProject({
        title: '',
        description: '',
        techStack: '',
        githubLink: '',
        liveDemoLink: ''
      });
      setError(null);
    } catch (err) {
      setError('Failed to add project. Please check your connection and try again.');
      console.error('Error adding project:', err);
    }
  };

  const handleDeleteProject = async (id) => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('You must be logged in as admin to delete projects');
      return;
    }

    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_URL}/projects/${id}`);
        setProjects(projects.filter(project => project.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete project');
        console.error('Error deleting project:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Projects</h1>
        
        {/* Show Add button only for authenticated users */}
        {isAuthenticated && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus size={20} className="mr-2" />
            {showAddForm ? 'Cancel' : 'Add Project'}
          </button>
        )}
      </div>

      {/* Admin status message */}
      {!isAuthenticated && (
        <div className="bg-blue-900/20 border border-blue-800 text-blue-300 px-4 py-3 rounded-lg mb-6 flex items-center">
          <Shield size={20} className="mr-2 flex-shrink-0" />
          <span className="text-sm">
            You are viewing as guest. Login as admin to add or delete projects.
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Add Project Form - Only visible to authenticated users */}
      {showAddForm && isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-200 rounded-lg p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-4">
            {/* Form fields - same as before */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                placeholder="e.g., E-Commerce Platform"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                placeholder="Describe your project..."
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                rows="3"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tech Stack * (comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Spring Boot, PostgreSQL"
                value={newProject.techStack}
                onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Separate technologies with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                GitHub Link *
              </label>
              <input
                type="url"
                placeholder="https://github.com/username/repo"
                value={newProject.githubLink}
                onChange={(e) => setNewProject({...newProject, githubLink: e.target.value})}
                className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Live Demo Link *
              </label>
              <input
                type="url"
                placeholder="https://your-demo.com"
                value={newProject.liveDemoLink}
                onChange={(e) => setNewProject({...newProject, liveDemoLink: e.target.value})}
                className="w-full px-4 py-2 bg-dark-300 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
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
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-200 rounded-lg p-6 hover:bg-dark-300 transition-colors relative group"
            >
              {/* Delete button - only visible to authenticated users */}
              {isAuthenticated && (
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  title="Delete project"
                >
                  <Trash2 size={20} />
                </button>
              )}
              
              <h3 className="text-xl font-semibold text-white mb-2 pr-8">{project.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {(Array.isArray(project.techStack) 
                  ? project.techStack 
                  : project.techStack?.split(',').map(t => t.trim()) || []
                ).map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-dark-400 text-sm text-gray-300 rounded-full"
                  >
                    {tech}
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
      ) : (
        <div className="text-center py-12 bg-dark-200 rounded-lg">
          <p className="text-gray-400 mb-4">No projects yet.</p>
          {isAuthenticated && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Add Your First Project
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;