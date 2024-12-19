import React from 'react';
import Onboarding from '../components/Onboarding';

function Cusine({ handleTagClick, selectedTags, activeTag }) {
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
    <Onboarding
      title="What type of cuisine do you prefer?"
      options={options}
      selectedTags={selectedTags}
      handleTagClick={handleTagClick}
      activeTag={activeTag}
      progress={66.67}
      nextPage="/"
    />
  );
}
export default Cusine;
