import React from "react";
import { useNavigate } from "react-router-dom";

import "./category-card.css";

const CategoryCard = ({ category }) => {
  const { categoryName, imageUrl } = category;

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    console.log(categoryName);
    const categoryPath =
      "/shopping/" + categoryName.replace(/\s/g, "-").toLowerCase();
    navigate(categoryPath);
  };

  return (
    <div
      className="category-card"
      onClick={() => handleCategoryClick(categoryName)}
    >
      <img className="category-card__image" src={imageUrl} alt={categoryName} />
      <h1>{categoryName}</h1>
    </div>
  );
};

export default CategoryCard;
