import React from "react";
import { useNavigate } from "react-router-dom";

import "./category-card.css";

const CategoryCard = ({ category }) => {
  const { categoryName, url } = category;

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const categoryPath =
      "/shopping/" + categoryName.replace(/\s/g, "-").toLowerCase();
    navigate(categoryPath);
  };

  return (
    <div
      className="category-card"
      onClick={() => handleCategoryClick(categoryName)}
    >
      <img className="category-card__image" src={url} alt={categoryName} />
      <h1>{categoryName}</h1>
    </div>
  );
};

export default CategoryCard;
