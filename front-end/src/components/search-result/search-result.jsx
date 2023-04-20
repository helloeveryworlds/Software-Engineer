import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../search-bar/search-bar";
import ItemCard from "../item-card/item-card";
import { ProductsContext } from "../../contexts/products.context";

import "./search-result.css";

const getQueryResult = (queryArray, itemList) => {
  let items = [];
  queryArray.map((str) => {
    itemList.map((ele) => {
      ele.items.map((item) => {
        if (str === item.name.toLowerCase()) {
          items.push(item);
        }
      });
    });
  });
  return items;
};

const SearchResult = () => {
  const { query } = useParams();
  const queryArray = query.split("-");

  const { itemList } = useContext(ProductsContext);

  const queryResult = getQueryResult(queryArray, itemList);

  return (
    <div className="search-result-container">
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="search-result-body">
        <div className="search-result-heading">
          <h4>Search Result:</h4>
          <hr />
        </div>

        <div className="search-result">
          {queryResult.map((item) => {
            return <ItemCard key={item.name} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
