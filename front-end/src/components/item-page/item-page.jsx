import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../search-bar/search-bar";
import ItemCard from "../item-card/item-card";
import { ProductsContext } from "../../contexts/products.context";

import "./item-page.css";

const getCategoryItems = (categoryName, itemList) => {
  let items;

  itemList.map((ele) => {
    const categoryNameFromList = ele.categoryName
      .replace(/\s/g, "-")
      .toLowerCase();

    if (categoryNameFromList === categoryName) {
      items = ele;
    }
  });

  return items;
};

const ItemPage = () => {
  const { category } = useParams();
  const { itemList } = useContext(ProductsContext);

  const categoryItems = getCategoryItems(category, itemList);
  const { categoryName, items } = categoryItems;

  //   write HTML and css
  return (
    <div>
      <div className="item-page-search-container">
        <SearchBar />
      </div>
      <div>
        <h4>{categoryName}</h4>
        {items.map((item) => {
          return <ItemCard key={item.name} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ItemPage;
