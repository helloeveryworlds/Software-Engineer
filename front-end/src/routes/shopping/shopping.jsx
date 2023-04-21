import React, { useContext, useEffect } from "react";

import SearchBar from "../../components/search-bar/search-bar";
import CategoryCard from "../../components/category-card/category-card";
import Loader from "../../components/loader/loader";
import { ProductsContext } from "../../contexts/products.context";

import "./shopping.css";

const Shopping = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { itemList, isLoading, fetchData } = useContext(ProductsContext);

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div id="shopping-container">
      <div className="search-container">
        <SearchBar
          onSearchQueryChange={handleSearchQueryChange}
          filter={true}
        />
      </div>
      <div className="shopping-body">
        <div className="category-heading">
          <h4>Categories</h4>
          <hr />
        </div>
        <div className="categories">
          {isLoading ? (
            <Loader />
          ) : (
            itemList
              .filter((item) =>
                item.categoryName
                  .toLowerCase()
                  .startsWith(searchQuery.toLowerCase())
              )
              .map((category) => {
                return (
                  <CategoryCard
                    key={category.categoryName}
                    category={category}
                  />
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default Shopping;
