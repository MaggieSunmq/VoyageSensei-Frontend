import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Onboarding2({ handleTagClick, selectedTags, activeTag }) {
  const navigate = useNavigate();

  const options = [
    { id: 12, name: "CN Tower", emoji: "🗼", image: "/images/cn_tower.jpg" },
    { id: 13, name: "Algonquin Provincial Park", emoji: "🏕️", image: "/images/algonquin.jpg" },
    { id: 14, name: "Fort Henry", emoji: "🏛️", image: "/images/fort_henry.jpg" },
    { id: 15, name: "Art Gallery of Ontario", emoji: "🎨", image: "/images/ago.jpg" },
    { id: 16, name: "Yorkdale Shopping Centre", emoji: "🛍️", image: "/images/shopping.webp" },
    { id: 17, name: "Scandinave Spa", emoji: "💆‍♂️", image: "/images/scandinave_spa.jpg" },
    { id: 18, name: "Royal Botanical Gardens", emoji: "🌿", image: "/images/botanical_gardens.jpg" },
    { id: 19, name: "Wonderland", emoji: "🎢", image: "/images/default.jpg" },
    { id: 20, name: "Kensington Market", emoji: "🌍", image: "/images/kensington_market.jpg" },
    { id: 21, name: "Parliament Hill Tour", emoji: "👨‍🏫", image: "/images/parliament_hill.jpg" },
    { id: 22, name: "Niagara Falls", emoji: "🌊", image: "/images/niagara_falls.jepg" },
  ];

  useEffect(() => {
    // Optionally reset selectedTags or handle any other logic
    console.log("OnboardingPage2 mounted. Current selectedTags:", selectedTags);
    console.log("OnboardingPage2 mounted. Current activeTags:", activeTag);
  }, []); // Only runs when the component mounts

  return (
    <div className="container">
      <div className="left-section">
        <h2>Select a location to visit in Ontario</h2>
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

        {/* Progress Bar and Next Button */}
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress" style={{ width: "50%" }}></div>
          </div>
          <div className="button-container">
            <button onClick={() => navigate("/")} className="back-button">back</button>
            <button onClick={() => navigate("/o3")} className="next-button">Next</button>
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

export default Onboarding2;


// import React from 'react';
// import { useNavigate } from 'react-router-dom';


// function Onboarding2({ handleTagClick, selectedTags = [] })  {
//   const navigate = useNavigate();

//   // Function to navigate to the next page
//   const handleNext = () => {
//     navigate("/o3");
//   };

//   // Function to navigate to the previous page
//   const handleBack = () => {
//     navigate("/");
//   };
//   const options = [
//     { id: 1, name: "Vegan", emoji: "🥗", image: "/images/vegan.jpg" },
//     { id: 2, name: "Peanut Butter Free", emoji: "🥜", image: "/images/peanut_free.jpg" },
//     { id: 3, name: "No Seafood", emoji: "🐟", image: "/images/no_seafood.jpg" },
//     { id: 4, name: "Dairy Free", emoji: "🥛", image: "/images/dairy_free.jpg" },
//     { id: 5, name: "Gluten Free", emoji: "🌾", image: "/images/gluten_free.jpg" },
//     { id: 6, name: "Nut Free", emoji: "🌰", image: "/images/nut_free.jpg" },
//     { id: 7, name: "Vegetarian", emoji: "🍆", image: "/images/vegetarian.jpg" },
//     { id: 8, name: "Low Carb", emoji: "🥩", image: "/images/low_carb.jpg" },
//     { id: 9, name: "Halal", emoji: "🕌", image: "/images/halal.jpg" },
//   ];

//   return (
//     <div className="container">
//       <div className="leftSection">
//         <h2>What are your dietary preferences?</h2>
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
//           <button onClick={handleNext} className="nextButton">Next</button>
//         </div>
//       </div>
//       <div className="rightSection">
//         <img src="/images/default.jpg" alt="Default" className="image" />
//       </div>
//     </div>
//   );
// }

// export default Onboarding2;
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Onboarding2() {
//   return (
//     <div>
//       <h2>Onboarding Step 1</h2>
//       <p>This is the 2nd step of the onboarding process.</p>
//       <Link to="/onboarding/step3">Next</Link>
//     </div>
//   );
// }

// export default Onboarding2;
