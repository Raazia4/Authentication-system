import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to <span className="highlight">Auth System</span></h1>
        <p className="home-subtitle">
          A secure authentication solution with user registration, login, and dashboard access control.
          Built using the powerful MERN stack (MongoDB, Express, React, Node.js).
        </p>
        
        <div className="features">
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Secure Authentication</h3>
            <p>Password hashing with bcrypt and JWT for secure sessions</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Modern UI</h3>
            <p>Responsive design that works seamlessly across all devices</p>
          </div>
          
          <div className="feature-item">
            <div className="feature-icon"></div>
            <h3>Fast Performance</h3>
            <p>Built with React for a smooth and responsive user experience</p>
          </div>
        </div>
        
        {!isAuthenticated ? (
          <div className="home-buttons">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline">
              Register
            </Link>
          </div>
        ) : (
          <div className="home-buttons">
            <Link to="/dashboard" className="btn">
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; 