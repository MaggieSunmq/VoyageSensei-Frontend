import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Onboarding4({ handleTagClick, selectedTags, activeTag,setSelectedTags }) {
  const navigate = useNavigate();
  
//   useEffect(() => {
//     setSelectedTags([]); // Resetting tags on page load, if desired
//   }, []);

  // Options for this page
  const options = [
    { id: 31, name: "Italian", emoji: "🍝", image: "/images/italian.jpg" },
    { id: 32, name: "Japanese", emoji: "🍣", image: "/images/japanese.jpg" },
    { id: 33, name: "American", emoji: "🍔", image: "/images/american.jpg" },
    { id: 34, name: "Chinese", emoji: "🥡", image: "/images/chinese.webp" },
    { id: 35, name: "Mediterranean", emoji: "🥙", image: "/images/mediterranean.jpg" },
    { id: 36, name: "Mexican", emoji: "🌮", image: "/images/mexican.jpeg" },
    { id: 37, name: "Indian", emoji: "🍛", image: "/images/indian.jpg" },
    { id: 38, name: "Middle Eastern", emoji: "🥘", image: "/images/middle_eastern.jpg" },
    { id: 39, name: "Seafood", emoji: "🦞", image: "/images/seafood.webp" },
    { id: 40, name: "Local & Regional", emoji: "🏠", image: "/images/local_regional.webp" },
  ];

  return (
    <div className="container">
      <div className="left-section">
        <h2>What type of cuisine do you prefer?</h2>
        <p>Select any of the following.</p>

        <div className="tag-container">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleTagClick(option)}
              className={`tag-button ${selectedTags.some(tag => tag.id === option.id) ? "selected" : ""}`}
            >
              {option.emoji} {option.name}
            </button>
          ))}
        </div>

        {/* Progress Bar and Finish Button */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: "100%" }}></div>
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/o3")} className="back-button">back</button>
            <button onClick={() => navigate("/understand_user")} className="next-button">Finish</button>
          </div>
        </div>
      </div>

      {/* Display the selected image or default */}
      <div className="right-section">
        {activeTag ? (
          <img src={activeTag.image} alt={activeTag.name} className="image" />
        ) : (
          <img src="/images/default.jpg" alt="Default" className="image" />
        )}
      </div>
    </div>
  );
}

export default Onboarding4;
