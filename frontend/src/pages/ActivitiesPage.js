// OnboardingPage1.js
// Onboarding1.js
import React from 'react';
import Onboarding from '../components/Onboarding';

function Activities({ handleTagClick, selectedTags, activeTag }) {
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
    <Onboarding
      title="Which of these activities looks most exciting for a day trip in Ontario?"
      options={options}
      selectedTags={selectedTags}
      handleTagClick={handleTagClick}
      activeTag={activeTag}
      progress={0}
      nextPage="/onboarding/dietary"
    />
  );
}

export default Activities;