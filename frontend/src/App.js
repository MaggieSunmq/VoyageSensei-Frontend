import React, { useState, useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PE from './pages/PreferenceElicitation';
import Trip from './pages/Trip';
import OnboardingCentral from './pages/OnboardingCentralized'
import './App.css';

function App() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);

  // Reset selectedTags on initial load
  useEffect(() => {
    console.log("Clearing storage on initial load.");
    sessionStorage.clear();
    localStorage.clear();
    setSelectedTags([]);
    setActiveTag([]);
  }, []);

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
    {path: "/user-preference", element: <PE handleTagClick={handleTagClick}/>},
    {path: "/trip-detail", element: <Trip selectedTags={selectedTags}/>},
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