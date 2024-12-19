import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styling/onboarding.module.css';

function Onboarding({
  title,
  options,
  selectedTags,
  dislikedTags, // New
  handleTagClick,
  handleDislikedTagClick, // New
  activeTag,
  progress,
  nextPage,
}) {
  const navigate = useNavigate(); // Initialize navigate
  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>{title}</h2>
        {dislikedTags ? (
          <>
            {/* Liked Section */}
            <div>
              <h3>Liked Cuisines</h3>
              <div className={styles.tagContainer}>
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleTagClick(option)}
                    className={`${styles.tagButton} ${
                      selectedTags.some((tag) => tag.id === option.id)
                        ? styles.selected
                        : ""
                    }`}
                  >
                    {option.emoji} {option.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Disliked Section */}
            <div>
              <h3>Disliked Cuisines</h3>
              <div className={styles.tagContainer}>
                {options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleDislikedTagClick(option)}
                    className={`${styles.tagButton} ${
                      dislikedTags.some((tag) => tag.id === option.id)
                        ? styles.selected
                        : ""
                    }`}
                  >
                    {option.emoji} {option.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Default Section */}
            <p>Select multiple tags of the following:</p>
            <div className={styles.tagContainer}>
              {options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleTagClick(option)}
                  className={`${styles.tagButton} ${
                    selectedTags.some((tag) => tag.id === option.id)
                      ? styles.selected
                      : ""
                  }`}
                >
                  {option.emoji} {option.name}
                </button>
              ))}
            </div>
          </>
        )}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
              Back
            </button>
            <button onClick={() => navigate(nextPage)} className={styles.nextButton}>
              Next
            </button>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        {activeTag ? (
          <img src={activeTag.image} alt={activeTag.name} className={styles.image} />
        ) : (
          <img src="/images/default.jpg" alt="Default" className={styles.image} />
        )}
      </div>
    </div>
  );
}

export default Onboarding;
