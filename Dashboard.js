import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get user info with fallbacks
  const userName = user?.name || 'User';
  const userEmail = user?.email || 'N/A';
  const createdAt = formatDate(user?.createdAt);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>My Dashboard</h1>
        <p>Welcome back, <span className="user-name">{userName}</span></p>
      </div>
      
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <div className="card-content">
            <h3>Account Info</h3>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{userName}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{userEmail}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">{createdAt}</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon"></div>
          <div className="card-content">
            <h3>Security</h3>
            <p>Your account is protected with secure password hashing and JWT authentication.</p>
            <button className="btn btn-sm">Change Password</button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-icon"></div>
          <div className="card-content">
            <h3>Activity</h3>
            <p>Track your recent account activity here.</p>
            <div className="activity-log">
              <div className="activity-item">
                <span className="activity-icon"></span>
                <span className="activity-text">Last login: {new Date().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 