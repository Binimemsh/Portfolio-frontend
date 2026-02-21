import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, User, Calendar, MessageSquare, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://my-portfolio-backend-fll4.onrender.com/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching from:', `${API_URL}/contact/messages`);
      const response = await axios.get(`${API_URL}/contact/messages`);
      console.log('Response data:', response.data);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl text-white">Please login as admin to view messages</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Contact Messages</h1>
        <button
          onClick={fetchMessages}
          className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          disabled={loading}
        >
          <RefreshCw size={18} className={`mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
          Error: {error}
        </div>
      )}
      
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-400 mt-4">Loading messages...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 bg-dark-200 rounded-lg">
              <Mail size={48} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400">No messages yet.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-200 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-600/20 p-3 rounded-full">
                      <User className="text-blue-400" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{msg.name}</h3>
                      <div className="flex items-center text-gray-400 text-sm mt-1">
                        <Mail size={14} className="mr-1" />
                        <a href={`mailto:${msg.email}`} className="hover:text-blue-400">
                          {msg.email}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : 'Date not available'}
                  </div>
                </div>
                
                <div className="bg-dark-300 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MessageSquare size={18} className="text-gray-400 mr-2 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;