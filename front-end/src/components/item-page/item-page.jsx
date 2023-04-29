import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import SearchBar from "../search-bar/search-bar";
import ItemCard from "../item-card/item-card";
import { ProductsContext } from "../../contexts/products.context";

const getCategoryItems = (categoryName, itemList) => {
  let items;

  itemList.map((ele) => {
    const categoryNameFromList = ele.categoryName
      .replace(/\s/g, "-")
      .toLowerCase();

    if (categoryNameFromList === categoryName) {
      items = ele;
    }

    return null;
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
          <h4>{categoryName}</h4>
          <hr />
        </div>
        <div className="categories">
          {items
            .filter((item) =>
              item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
            )
            .map((item) => {
              return <ItemCard key={item.name} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
