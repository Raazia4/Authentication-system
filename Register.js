import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { name, email, password, confirmPassword } = formData;
  
  const { register, isAuthenticated, error, clearErrors, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Clear any authentication state when visiting register page
    if (isAuthenticated) {
      logout();
    }
  }, [isAuthenticated, logout]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Form validation
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }
    
    // Clear any existing errors
    setFormError('');
    clearErrors();
    
    // Call register function from context
    const success = await register({ name, email, password });
    if (success) {
      // Instead of keeping the user logged in, log them out and show success message
      logout();
      setSuccessMessage('Registration successful! You can now login.');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Register</h1>
      
      {formError && <Alert message={formError} type="danger" onClose={() => setFormError('')} />}
      {successMessage && <Alert message={successMessage} type="success" />}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChange}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="form-control"
            placeholder="Confirm your password"
          />
        </div>
        
        <button type="submit" className="btn btn-block">
          Register
        </button>
      </form>
      
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register; 