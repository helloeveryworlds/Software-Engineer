import React from "react";
import { useNavigate } from "react-router-dom";

import "./category-card.css";

const CategoryCard = ({ category }) => {
  const { categoryName, imageUrl, items } = category;

  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    const categoryPath =
      "/shopping/" + categoryName.replace(/\s/g, "-").toLowerCase();
    navigate(categoryPath);
  };

  return (
    <div className="category-card">
      {/* write a category card template Here. h1 tag is just testing if you can get each category data */}
      <h1 onClick={() => handleCategoryClick(categoryName)}>{categoryName}</h1>
    </div>
  );
};

export default CategoryCard;
