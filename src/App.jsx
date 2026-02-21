import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AdminMessages from './pages/AdminMessages';



function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-dark-100 text-gray-200">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;