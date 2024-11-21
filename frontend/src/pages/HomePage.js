// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/HomePage.module.css'; // Importing as a CSS module

function HomePage() {
  const navigate = useNavigate();
  const backgroundImageStyle = {
    backgroundColor: '#2d6a4f', // Fallback color
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.8, // Adjusted opacity for visibility
  };

  return (
    <div className={styles.page}>
      <div style={backgroundImageStyle}></div>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Voyage Sensei</h1>
          <div className={styles.line}></div>
          <p className={styles.proposition}>Your personal guide to effortless road trips.</p>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={() => navigate('/onboarding/Activities')} className={styles.actionButton}>
            Build Your Profile
          </button>
          <button onClick={() => navigate('/understand_user')} className={styles.actionButton}>
            Start Planning
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;


