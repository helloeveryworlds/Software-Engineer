import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { ProductsContext } from "../../contexts/products.context";

import "./search-result.css";

const SearchResult = () => {
  const { query } = useParams();

  // // products data
  const { itemList } = useContext(ProductsContext);
  return (
    <div className="search-result-container">
      <h1>
        Search Result: {itemList[0]["categoryName"]}
        {query}
      </h1>
    </div>
  );
};

export default SearchResult;
