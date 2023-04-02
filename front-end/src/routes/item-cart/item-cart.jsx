import React, { useContext } from "react";
import { ProductsContext } from "../../contexts/products.context";
import "./item-cart.css";
import { useParams } from "react-router-dom";
import SearchBar from "../../components/search-bar/search-bar";

const ItemCart = () => {
  const { category } = useParams();
  const { itemList } = useContext(ProductsContext);
  
  
  
  
  if (!itemList) {
    return <div>Loading...</div>;
  }
    const items = itemList["Vegetables"];
    console.log(items)


  return (

    <div id="item-cart-container">
    <div className="item-cart-search-container">
      <SearchBar />
    </div>
    <div className="item-cart-categories">
      <div className="item-cart-heading">
        <h4 id="item-cart-heading-name">{ category }</h4>
        <hr />
      </div>
      <div className="item-cart-categories">
        <ul className="item-cart-list">
        {items["items"].map((item) => (
          <li
            className="item-cart-item"
            id= "dairy"
            key = {item.name}

          ></li>
            ))}
        </ul>
      </div>
    </div>
   
  </div>


  );
};




export default ItemCart;





