import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, User, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const API_URL = 'https://my-portfolio-backend-fll4.onrender.com/api';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/contact/messages`);
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl text-white">Please login as admin to view messages</h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8">Contact Messages</h1>
      
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
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
                        {msg.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-dark-300 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MessageSquare size={18} className="text-gray-400 mr-2 mt-1" />
                    <p className="text-gray-300">{msg.message}</p>
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