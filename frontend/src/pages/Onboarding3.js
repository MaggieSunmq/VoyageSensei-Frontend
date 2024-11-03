import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function OnboardingPage3({ handleTagClick, selectedTags, activeTag,setSelectedTags }) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setSelectedTags([]); // Resetting tags on page load, if desired
  // }, []);

  const options = [
    { id: 23, name: "Vegan", emoji: "🥗", image: "/images/vegan.jpg" },
    { id: 24, name: "No Seafood", emoji: "🐟", image: "/images/no_seafood.png" },
    { id: 25, name: "Dairy Free", emoji: "🥛", image: "/images/dairy_free.webp" },
    { id: 26, name: "Gluten Free", emoji: "🌾", image: "/images/gluten_free.jpg" },
    { id: 27, name: "Nut Free", emoji: "🌰", image: "/images/nut_free.jpg" },
    { id: 28, name: "Vegetarian", emoji: "🍆", image: "/images/vegetarian.jpg" },
    { id: 29, name: "Low Carb", emoji: "🥩", image: "/images/low_carb.webp" },
    { id: 30, name: "Halal", emoji: "🕌", image: "/images/halal.jpg" },
  ];

  return (
    <div className="container">
      <div className="left-section">
        <h2>What are your dietary preferences?</h2>
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

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: "75%" }}></div>
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/o2")} className="back-button">back</button>
            <button onClick={() => navigate("/o4")} className="next-button">Next</button>
          </div>
        </div>
      </div>

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

export default OnboardingPage3;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// function Onboarding3({ handleTagClick, selectedTags })  {
//   const navigate = useNavigate();

//   // Function to navigate to the next page
//   const handleNext = () => {
//     navigate("/planner");
//   };

//   // Function to navigate to the previous page
//   const handleBack = () => {
//     navigate("/o2");
//   };
//   const options = [
//     { id: 1, name: "Italian", emoji: "🍝", image: "/images/italian.jpg" },
//     { id: 2, name: "Chinese", emoji: "🥡", image: "/images/chinese.jpg" },
//     { id: 3, name: "Mexican", emoji: "🌮", image: "/images/mexican.jpg" },
//     { id: 4, name: "Indian", emoji: "🍛", image: "/images/indian.jpg" },
//   ];

//   return (
//     <div className="container">
//       <div className="leftSection">
//         <h2>What type of cuisine do you prefer?</h2>
//         <p>Select any of the following:</p>
//         <div className="tagContainer">
//           {options.map((option) => (
//             <button
//               key={option.id}
//               onClick={() => handleTagClick(option)}
//               className="tagButton"
//               style={{
//                 borderColor: selectedTags.find(tag => tag.id === option.id) ? "black" : "#ccc",
//                 backgroundColor: selectedTags.find(tag => tag.id === option.id) ? "#eaeaea" : "white",
//               }}
//             >
//               {option.emoji} {option.name}
//             </button>
//           ))}
//         </div>
//         <div className="buttonContainer">
//           <button onClick={handleBack} className="backButton">Back</button>
//           <button onClick={handleNext} className="nextButton">Finish</button>
//         </div>
//       </div>
//       <div className="rightSection">
//         <img src="/images/default.jpg" alt="Default" className="image" />
//       </div>
//     </div>
//   );
// }

// export default Onboarding3;

// // src/pages/OnboardingStep3.js
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Onboarding3() {
//   return (
//     <div>
//         <h2>Onboarding Step 3</h2>
//       <p>This is the final step of the onboarding process.</p>
//       <Link to="/tripplanner">Next</Link>
//     </div>
//   );
// }

// export default Onboarding3;
