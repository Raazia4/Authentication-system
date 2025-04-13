import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Alert from '../components/Alert';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const { email, password } = formData;
  
  const { login, isAuthenticated, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }
    
    // Clear any existing errors
    setFormError('');
    clearErrors();
    
    // Call login function from context
    const success = await login({ email, password });
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Login</h1>
      
      {formError && <Alert message={formError} type="danger" onClose={() => setFormError('')} />}
      
      <form onSubmit={onSubmit}>
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
        
        <button type="submit" className="btn btn-block">
          Login
        </button>
      </form>
      
      <div className="form-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login; 