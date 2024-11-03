// OnboardingPage1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Onboarding1({ handleTagClick, selectedTags, activeTag }) {
  const navigate = useNavigate();

  // Options for this page
  const options = [
    { id: 1, name: "Sightseeing", emoji: "🗼", image: "/images/sightseeing.jpg" },
    { id: 2, name: "Outdoor Adventure", emoji: "🏕️", image: "/images/outdoor_adventure.jpg" },
    { id: 3, name: "Historical Sites", emoji: "🏛️", image: "/images/historical_sites.jpg" },
    { id: 4, name: "Art & Museums", emoji: "🎨", image: "/images/museum.jpg" },
    { id: 5, name: "Shopping", emoji: "🛍️", image: "/images/shopping.webp" },
    { id: 6, name: "Relaxation & Wellness", emoji: "💆‍♂️", image: "/images/relaxation.jpg" },
    { id: 7, name: "Nature & Wildlife", emoji: "🌿", image: "/images/zoos_aquariums.jpg" },
    { id: 8, name: "Amusement Parks & Theme Parks", emoji: "🎢", image: "/images/theme_parks.jpg" },
    { id: 9, name: "Local Market", emoji: "🌍", image: "/images/local_markets.jpg" },
    { id: 10, name: "Guided Tours", emoji: "👨‍🏫", image: "/images/guided_tours.jpeg" },
    { id: 11, name: "Scenic Views", emoji: "🌊", image: "/images/niagara_falls.webp" },
  ];

  return (
    <div className="container">
      <div className="left-section">
        <h2>Which of these activities looks most exciting for a day trip in Ontario?</h2>
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
            <div className="progress" style={{ width: "25%" }}></div>
          </div>
          <div className="button-container">
            
            <button onClick={() => navigate("/o2")} className="next-button">Next</button>
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

export default Onboarding1;


// 
// import { useNavigate } from 'react-router-dom';
// //import './OnboardingStyles.css';

// function Onboarding1({ handleTagClick, selectedTags = [] }) {
//   const navigate = useNavigate();

//   const handleNext = () => {
//     navigate("/o2");
//   };

//   const options = [
//     { id: 1, name: "Sightseeing", emoji: "🗼", image: "/images/sightseeing.jpg" },
//     { id: 2, name: "Outdoor Adventure", emoji: "🏕️", image: "/images/outdoor_adventure.jpg" },
//     { id: 3, name: "Historical Sites", emoji: "🏛️", image: "/images/historical_sites.jpg" },
//     { id: 4, name: "Art & Museums", emoji: "🎨", image: "/images/museum.jpg" },
//     { id: 5, name: "Shopping", emoji: "🛍️", image: "/images/shopping.webp" },
//     { id: 6, name: "Relaxation & Wellness", emoji: "💆‍♂️", image: "/images/relaxation.jpg" },
//     { id: 7, name: "Nature & Wildlife", emoji: "🌿", image: "/images/zoos_aquariums.jpg" },
//     { id: 8, name: "Amusement Parks & Theme Parks", emoji: "🎢", image: "/images/theme_parks.jpg" },
//     { id: 9, name: "Local Market", emoji: "🌍", image: "/images/local_markets.jpg" },
//     { id: 10, name: "Guided Tours", emoji: "👨‍🏫", image: "/images/guided_tours.jpeg" },
//     { id: 11, name: "Scenic Views", emoji: "👨‍🏫", image: "/images/niagara_falls.webp" },
//   ];

//   return (
//     <div className="container">
//       <div className="leftSection">
//         <h2>Which of these activities looks most exciting for a day trip in Ontario??</h2>
//         <p>Select any of the following:</p>
//         <div className="tagContainer">
//           {options.map((option) => (
//             <button
//               key={option.id}
//               onClick={() => handleTagClick(option)}
//               className="tagButton"
//               style={{
//                 borderColor: selectedTags?.find(tag => tag.id === option.id) ? "black" : "#ccc",
//                 backgroundColor: selectedTags?.find(tag => tag.id === option.id) ? "#eaeaea" : "white",
//               }}
//             >
//               {option.emoji} {option.name}
//             </button>
//           ))}
//         </div>
//         <button onClick={handleNext} className="nextButton">Next</button>
//       </div>
//     </div>
//   );
// }

// export default Onboarding1;



// import React from 'react';
// import { Link } from 'react-router-dom';

// function Onboarding1() {
//   return (
//     <div>
//       <h2>Onboarding Step 1</h2>
//       <p>This is the first step of the onboarding process.</p>
//       <Link to="/onboarding/step2">Next</Link>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: "flex",
//     flexDirection: "row",
//     height: "100vh",
//   },
//   leftSection: {
//     flex: 1,
//     padding: "20px",
//     backgroundColor: "#f4f4f4",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     overflow: "auto",
//   },
//   tagContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     gap: "10px",
//     marginTop: "20px",
//     justifyContent: "center",
//   },
//   tagButton: {
//     padding: "10px 15px",
//     borderRadius: "20px",
//     border: "2px solid #ccc",
//     backgroundColor: "white",
//     cursor: "pointer",
//     fontSize: "16px",
//     display: "flex",
//     alignItems: "center",
//   },
//   addOwnButton: {
//     marginTop: "20px",
//     padding: "10px 20px",
//     borderRadius: "20px",
//     backgroundColor: "#f0f0f0",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   rightSection: {
//     flex: 1,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     overflow: "hidden",  // Prevents image overflow
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     objectFit: "cover", // Ensures the image covers the area without overflow
//     borderRadius: "8px",
//   },
//   placeholder: {
//     fontSize: "18px",
//     color: "#888",
//   },
//   progressContainer: {
//     width: "100%",
//     marginTop: "auto",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   progressBar: {
//     width: "80%",
//     height: "10px",
//     backgroundColor: "#e0e0e0",
//     borderRadius: "5px",
//     overflow: "hidden",
//     marginBottom: "10px",
//   },
//   progress: {
//     height: "100%",
//     backgroundColor: "#007BFF",
//     transition: "width 0.3s ease",
//   },
//   buttonContainer: {
//     display: "flex",
//     justifyContent: "space-between",
//     width: "80%",
//   },
//   backButton: {
//     padding: "10px 20px",
//     borderRadius: "20px",
//     backgroundColor: "#6c757d",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
//   nextButton: {
//     padding: "10px 20px",
//     borderRadius: "20px",
//     backgroundColor: "#007BFF",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "16px",
//   },
// };
// export default Onboarding1;
