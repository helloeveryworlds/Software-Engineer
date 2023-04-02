import React, { useState } from "react";
import { ProductsContext } from "../../contexts/products.context";
import SearchBar from "../../components/search-bar/search-bar";
import "./shopping.css";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';

const Shopping = () => {
  const { itemList } = useContext(ProductsContext);
 
  // itemList["Vegetables"].items[0].name : you will get "Carrot"



  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/item-cart/'+category);
  };

  return (
    <div id="shopping-container">
      <div className="shopping-search-container">
        <SearchBar />
      </div>
      <div className="shopping-categories">
        <div className="category-heading">
          <h4 id="category-heading-name">Categories</h4>
          <hr />
        </div>
        <div className="categories">
          <ul className="item-list">
            <li
              className="item"
              id="dairy"
              onClick={() => handleCategoryClick("Dairy, Eggs, and Cheese")}
            ></li>
            <li
              className="item"
              id="fruits"
              onClick={() => handleCategoryClick("Fruits and Vegetables")}
            ></li>
            <li
              className="item"
              id="grains"
              onClick={() => handleCategoryClick("Grains and Pasta")}
            ></li>
            <li
              className="item"
              id="meat"
              onClick={() => handleCategoryClick("Meat and Seafood")}
            ></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shopping;