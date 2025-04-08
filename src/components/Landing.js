import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Landing.css';
import { FiArrowRight, FiChevronRight, FiMessageSquare, FiUsers, FiLock, FiFileText } from 'react-icons/fi';

const Landing = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Secure Campus Chat",
      description: "End-to-end encrypted conversations exclusively for your university community",
      icon: <FiLock size={32} />
    },
    {
      title: "Topic-Based Rooms",
      description: "Organized spaces for classes, clubs, and special interests",
      icon: <FiMessageSquare size={32} />
    },
    {
      title: "Real-Time Collaboration",
      description: "Share files, code snippets, and study materials instantly",
      icon: <FiUsers size={32} />
    }
  ];

  const testimonials = [
    {
      quote: "UniVibe transformed how our study group collaborates. The private rooms are perfect for our weekly sessions!",
      author: "Sarah K., Computer Science Major"
    },
    {
      quote: "Finally a secure platform just for university students. No more distractions from random internet users.",
      author: "Michael T., Engineering Department"
    }
  ];

  return (
    <div className="landing-container">
      {/* Animated background elements */}
      <div className="landing-background"></div>
      
      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="floating-particle"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            y: [0, -100],
            x: [0, Math.random() * 100 - 50]
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 5 + 2}px`,
            height: `${Math.random() * 5 + 2}px`,
          }}
        />
      ))}

      {/* Header */}
      <motion.header 
        className="landing-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
        >
          UniVibe
        </motion.div>
        <nav>
          <motion.button 
            onClick={() => navigate('/auth')}
            className={`signin-button ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isHovered ? (
              <>
                Get Started <FiArrowRight className="arrow" />
              </>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            The Future of <span className="gradient-text">University</span> Communication
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Connect with classmates, collaborate on projects, and build your network in a secure, university-exclusive environment.
          </motion.p>
          
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button 
              onClick={() => navigate('/auth')}
              className="primary-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Your Campus <FiChevronRight className="cta-arrow" />
            </motion.button>
            <motion.button 
              className="secondary-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See How It Works
            </motion.button>
          </motion.div>
        </div>

        {/* Animated mockup */}
        <motion.div 
          className="app-mockup"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="mockup-screen">
            {/* Animated chat messages */}
            <AnimatePresence>
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`chat-message ${i % 2 === 0 ? 'received' : 'sent'}`}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1 + i * 0.3 }}
                >
                  {i % 2 === 0 ? "Hey, did you finish the assignment?" : "Yes! Just submitted it!"}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span className="gradient-text">UniVibe</span>
        </motion.h2>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          What Students Are <span className="gradient-text">Saying</span>
        </motion.h2>
        
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="testimonial-card"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="testimonial-quote">"{testimonial.quote}"</div>
              <div className="testimonial-author">— {testimonial.author}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <motion.div 
          className="cta-content"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Transform Your Campus Communication?</h2>
          <motion.button 
            onClick={() => navigate('/auth')}
            className="primary-cta large"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started for Free <FiChevronRight className="cta-arrow" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="landing-footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="footer-content">
          <div className="footer-logo">UniVibe</div>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} UniVibe. All rights reserved.
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Landing;



