import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { ProductsContext } from "../../contexts/products.context";

import "./search-result.css";

const SearchResult = () => {
  // get parameters from string query
  const { query } = useParams();

  // // products data
  const { itemList } = useContext(ProductsContext);
  return (
    <div>
      <h1>
        Search Result: {itemList["Vegetables"].items[0].name}
        {query}
      </h1>
    </div>
  );
};

export default SearchResult;
