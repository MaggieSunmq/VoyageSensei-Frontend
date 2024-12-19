import React from 'react';
import Onboarding from '../components/Onboarding';

function Dietary({ handleTagClick, selectedTags, activeTag }) {
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
    <Onboarding
      title="Which of Diatary Restrictions Apply To You?"
      options={options}
      selectedTags={selectedTags}
      handleTagClick={handleTagClick}
      activeTag={activeTag}
      progress={33.33}
      nextPage="/onboarding/cuisine"
    />
  );
}
export default Dietary;