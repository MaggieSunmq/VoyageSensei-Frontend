import React, { useState, useEffect } from 'react';
import { BrowserRouter, useNavigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Activities from './pages/ActivitiesPage';
import Dietary from './pages/Dietary';
import Cusine from './pages/Cuisine';
import Step2 from './pages/initial_query';
import TripA from './pages/Trip';
import TripB from './pages/Trip_B';
import OnboardingCentral from './pages/onboarding_centralized'
import './App.css';

function App() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  // Reset selectedTags on initial load
  useEffect(() => {
    console.log("Clearing storage on initial load.");
    sessionStorage.clear();
    localStorage.clear();
    setSelectedTags([]); // Reset selectedTags on initial load
    setActiveTag([]);
  }, []); // Ensure this runs only once on initial app load

  const handleTagClick = (option) => {
    const isAlreadySelected = selectedTags.some((tag) => tag.id === option.id);
    const newTags = isAlreadySelected
        ? selectedTags.filter((tag) => tag.id !== option.id)
        : [...selectedTags, option];
    setSelectedTags(newTags);
    setActiveTag(isAlreadySelected ? null : option);
    console.log("Updated selectedTags:", newTags);
  };

  // Nested AppRoutes component
  const AppRoutes = () => useRoutes([
    {path: "/", element: <HomePage handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag}/>},
    {path: "/onboarding/*", element: <OnboardingCentral/>},
    //{ path: "/onboarding/Activities", element: <Activities handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag}  /> },
    //{ path: "/onboarding/poi", element: <Dietary handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag}  /> },
    //{ path: "/onboarding/dietary", element: <Dietary handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag}  /> },
    //{ path: "/onboarding/cuisine", element: <Cusine handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag}  /> },
    {path: "/understand_user", element: <Step2 handleTagClick={handleTagClick}/>},
    {path: "/planner", element: <TripA selectedTags={selectedTags}/>},
    {path: "/plannerB", element: <TripB selectedTags={selectedTags}/>},
  ]);

  return (
      <div className="app-container">
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </div>
  );
}
export default App;

// function AppRoutes({ handleTagClick, selectedTags, activeTag, page, setPage }) {
//   const navigate = useNavigate();

//   const handleNext = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     if (nextPage === 4) navigate("/planner"); // Navigate to the final page
//     else navigate(`/o${nextPage}`);
//   };

//   const handleBack = () => {
//     const prevPage = page - 1;
//     if (prevPage > 0) {
//       setPage(prevPage);
//       navigate(`/o${prevPage}`);
//     }
//   };

//   return useRoutes([
//     { path: "/", element: <OnboardingPage1 handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag} setSelectedTags={setSelectedTags} onNext={handleNext} onBack={handleBack} page={page} /> },
//     { path: "/o2", element: <OnboardingPage2 handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag} setSelectedTags={setSelectedTags} onNext={handleNext} onBack={handleBack} page={page} /> },
//     { path: "/o3", element: <OnboardingPage3 handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag} setSelectedTags={setSelectedTags} onNext={handleNext} onBack={handleBack} page={page} /> },
//     { path: "/o4", element: <OnboardingPage4 handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag} setSelectedTags={setSelectedTags} onNext={handleNext} onBack={handleBack} page={page} /> },
//     { path: "/planner", element: <FinalPage selectedTags={selectedTags} /> },
//   ]);
// }

// function App() {
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [activeTag, setActiveTag] = useState(null);
//   const [page, setPage] = useState(1);

//   // Reset selectedTags on component mount
//   useEffect(() => {
//     setSelectedTags([]);
//   }, [])

//   const handleTagClick = (option) => {
//     const isAlreadySelected = selectedTags.some((tag) => tag.id === option.id);
//     const newTags = isAlreadySelected
//       ? selectedTags.filter((tag) => tag.id !== option.id)
//       : [...selectedTags, option];

//     setSelectedTags(newTags);
//     setActiveTag(isAlreadySelected ? null : option);
//   };

//   return (
//     <BrowserRouter>
//       <AppRoutes handleTagClick={handleTagClick} selectedTags={selectedTags} activeTag={activeTag} page={page} setPage={setPage} />
//     </BrowserRouter>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import { BrowserRouter, useRoutes } from 'react-router-dom';
// import OnboardingPage1 from './pages/Onboarding1';
// import OnboardingPage2 from './pages/Onboarding2';
// import OnboardingPage3 from './pages/Onboarding3';
// import FinalPage from './pages/Trip';
// import './App.css';

// function AppRoutes() {
//   const [selectedTags, setSelectedTags] = useState([]);

//   // Define handleTagClick as a function that updates selectedTags
//   const handleTagClick = (option) => {
//     setSelectedTags((prevTags) => {
//       if (prevTags.find(tag => tag.id === option.id)) {
//         return prevTags.filter(tag => tag.id !== option.id);
//       } else {
//         return [...prevTags, option];
//       }
//     });
//   };

//   return useRoutes([
//     { path: "/", element: <OnboardingPage1 handleTagClick={handleTagClick} selectedTags={selectedTags} /> },
//     { path: "/o2", element: <OnboardingPage2 handleTagClick={handleTagClick} selectedTags={selectedTags} /> },
//     { path: "/o3", element: <OnboardingPage3 handleTagClick={handleTagClick} selectedTags={selectedTags} /> },
//     { path: "/planner", element: <FinalPage /> },
//   ]);
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;
// import React from 'react';
// import { BrowserRouter, useRoutes } from 'react-router-dom';
// import OnboardingPage1 from './pages/Onboarding1';
// import OnboardingPage2 from './pages/Onboarding2';
// import OnboardingPage3 from './pages/Onboarding3';
// import FinalPage from './pages/Trip';

// function AppRoutes() {
//   return useRoutes([
//     { path: "/", element: <OnboardingPage1 /> },
//     { path: "/o2", element: <OnboardingPage2 /> },
//     { path: "/o3", element: <OnboardingPage3 /> },
//     { path: "/planner", element: <FinalPage /> },
//   ]);
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }

// export default App;

// function App() {
  // const navigate = useNavigate();
  // const [selectedTags, setSelectedTags] = useState([]);
  // const [activeTag, setActiveTag] = useState(null);

  // const handleNext = (nextPage) => {
  //   navigate(nextPage);
  // };

  // const handleBack = (previousPage) => {
  //   navigate(previousPage);
  // };

  // const handleTagClick = (option) => {
  //   const isAlreadySelected = selectedTags.find(tag => tag.id === option.id);

  //   if (isAlreadySelected) {
  //     const newSelectedTags = selectedTags.filter(tag => tag.id !== option.id);
  //     setSelectedTags(newSelectedTags);
  //     setActiveTag(newSelectedTags.length > 0 ? newSelectedTags[newSelectedTags.length - 1] : null);
  //   } else {
  //     setSelectedTags([...selectedTags, option]);
  //     setActiveTag(option);
  //   }
  // };


  
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<OnboardingPage1 handleNext={() => handleNext("/page2")} handleTagClick={handleTagClick} selectedTags={selectedTags} />} />
  //       <Route path="/page2" element={<OnboardingPage2 handleNext={() => handleNext("/page3")} handleBack={() => handleBack("/")} handleTagClick={handleTagClick} selectedTags={selectedTags} />} />
  //       <Route path="/page3" element={<OnboardingPage3 handleNext={() => handleNext("/final")} handleBack={() => handleBack("/page2")} handleTagClick={handleTagClick} selectedTags={selectedTags} />} />
  //       <Route path="/planner" element={<FinalPage />} />  {/* Add the route for the final page */}
  //     </Routes>
  //   </Router>
  // );

// // App.js
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Trip from './pages/Trip';
// import OnboardingStep1 from './pages/Onboarding1';
// import OnboardingStep2 from './pages/Onboarding2';
// import OnboardingStep3 from './pages/Onboarding3';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<OnboardingStep1 />} />
//         <Route path="/onboarding/step2" element={<OnboardingStep2 />} />
//         <Route path="/onboarding/step3" element={<OnboardingStep3 />} />
//         <Route path="/tripplanner" element={<Trip />} />
//       </Routes>
//     </Router>
//   );
// }

//export default App;
// import React from 'react';
// import ChatBox from './components/ChatBox';
// import Itinerary from './components/Itinerary';
// import Map from './components/Map';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Toronto Trip Planner</h1>
//       <div className="content">
//         <div className="left-panel">
//           <ChatBox />
//           <Itinerary />
//         </div>
//         <div className="right-panel">
//           <Map />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
