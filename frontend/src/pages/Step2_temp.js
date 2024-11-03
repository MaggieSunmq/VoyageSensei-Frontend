import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Step2_temp({ handleTagClick, selectedTags, activeTag,setSelectedTags }) {
  const navigate = useNavigate();
  
//   useEffect(() => {
//     setSelectedTags([]); // Resetting tags on page load, if desired
//   }, []);

  // Options for this page
  const options = [
  ];

  return (
    <div className="container">
      <div className="left-section">
        <h2>This is the place holder for understanding the user preference interaction</h2>
        <p>wait to be developed</p>

        {/* Progress Bar and Finish Button */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: "100%" }}></div>
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/planner")} className="next-button">Next</button>
          </div>
        </div>
      </div>

      {/* Display the selected image or default */}
    </div>
  );
}

export default Step2_temp;