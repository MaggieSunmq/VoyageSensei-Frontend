// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/HomePage.module.css'; // Importing as a CSS module

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>

      {/* Main content */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Voyage Sensei</h1>
          <div className={styles.line}></div>
          <p className={styles.proposition}>Your personal guide to effortless road trips.</p>
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={() => navigate('/onboarding/Activities') } className={styles.actionButton} disabled >
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


