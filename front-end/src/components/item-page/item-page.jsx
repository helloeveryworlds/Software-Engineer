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
  const [searchQuery, setSearchQuery] = React.useState("");
  const { category } = useParams();
  const { itemList } = useContext(ProductsContext);
  const categoryItems = getCategoryItems(category, itemList);
  const { categoryName, items } = categoryItems;

  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };

  //   write HTML and css
  return (
    <div className="item-container">
      <div className="item-page-search-container">
        <SearchBar onSearchQueryChange={handleSearchQueryChange}/>
      </div>
      <div>
        <h2 id = "item-page-heading">{categoryName}</h2><hr></hr>
        <div className="item-page-container">
        {items.filter(item => item.name.toLowerCase().startsWith(searchQuery.toLowerCase())).map((item) => {
          return <ItemCard key={item.name} item={item} />;
        })}
       </div>  
      </div>
    </div>
  );
};

export default ItemPage;
