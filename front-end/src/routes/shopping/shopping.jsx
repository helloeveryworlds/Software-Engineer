import React, { useContext } from "react";

import SearchBar from "../../components/search-bar/search-bar";
import CategoryCard from "../../components/category-card/category-card";
import { ProductsContext } from "../../contexts/products.context";

import "./shopping.css";

const Shopping = () => {
  const { itemList } = useContext(ProductsContext);

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
          {/* you can finish "category-card.css" first, then come back and write some css to display these category cards nicely */}
          {itemList.map((category) => {
            return (
              <CategoryCard key={category.categoryName} category={category} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shopping;
