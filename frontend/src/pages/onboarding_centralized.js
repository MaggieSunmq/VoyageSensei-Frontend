import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styling/onboarding.module.css";
import axios from 'axios';

const OnboardingCentral = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTags, setSelectedTags] = useState([]);

  // Onboarding step data
  const steps = [
    {
      id: 1,
      title: "Which of these activities looks most exciting for a day trip in Ontario?",
      options: [{ id: 1, name: "Sightseeing", emoji: "🗼", image: "/images/sightseeing.jpg" },
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
                ],
      progress: 0,
    },
    {
      id: 2,
      title: "Which of Dietary Restrictions Apply To You?",
      options: [
        { id: 23, name: "Vegan", emoji: "🥗", image: "/images/vegan.jpg" },
        { id: 24, name: "No Seafood", emoji: "🐟", image: "/images/no_seafood.png" },
        { id: 25, name: "Dairy Free", emoji: "🥛", image: "/images/dairy_free.webp" },
        { id: 26, name: "Gluten Free", emoji: "🌾", image: "/images/gluten_free.jpg" },
        { id: 27, name: "Nut Free", emoji: "🌰", image: "/images/nut_free.jpg" },
        { id: 28, name: "Vegetarian", emoji: "🥦", image: "/images/vegetarian.jpg" },
        { id: 29, name: "Low Carb", emoji: "🥩", image: "/images/low_carb.webp" },
        { id: 30, name: "Halal", emoji: "🕌", image: "/images/halal.jpg" },
      ],
      progress: 33.33,
    },
    {
      id: 3,
      title: "What type of cuisine do you prefer?",
      options: [
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
      ],
      progress: 66.67,
    },
  ];

  // Handle tag selection
  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.some((selectedTag) => selectedTag.id === tag.id)
        ? prev.filter((selectedTag) => selectedTag.id !== tag.id) // Remove tag
        : [...prev, tag] // Add tag
    );
  };

  // Handle navigation
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };
  // Submit selected tags to the backend
  const handleSubmit = async () => {
    const tagNames = selectedTags.map((tag) => tag.name);
    const tags = { tags: tagNames };
    try {
        console.log(tags);
        //const response = await axios.post("http://127.0.0.1:5000/query", tags);
        //console.log("Data sent successfully:", response.data);
        navigate("/");
    } catch (error) {
        console.error("Error sending data:", error);
    }
  };

  // Render helper function
  const renderStep = (step) => (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <h2>{step.title}</h2>
        <p>Select multiple tags of the following.</p>
        <div className={styles.tagContainer}>
          {step.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleTagClick(option)}
              className={`${styles.tagButton} ${
                selectedTags.some((tag) => tag.id === option.id) ? styles.selected : ""
              }`}
            >
              {option.emoji} {option.name}
            </button>
          ))}
        </div>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progress} style={{ width: `${step.progress}%` }}></div>
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleBack} className={styles.backButton}>
              Back
            </button>
            <button onClick={handleNext} className={styles.nextButton}>
              {currentStep === steps.length ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}>
        <img
          src="/images/default.jpg"
          alt="Default"
          className={styles.image}
        />
      </div>
    </div>
  );

  return renderStep(steps[currentStep - 1]);
};

export default OnboardingCentral;
