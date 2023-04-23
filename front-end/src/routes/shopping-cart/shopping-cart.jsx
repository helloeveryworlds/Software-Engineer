import React, { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "../../contexts/cart.context";
import { CartXFill } from "react-bootstrap-icons";

import "./shopping-cart.css";

const ShoppingCart = () => {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const [comparePrice, setComparePrice] = useState([]);

  const collectComparePriceData = (cartItems, zipCode) => {
    let data = [];

    let temp = {};
    temp["zipCode"] = zipCode;
    temp["itemsWithQuantity"] = {};
    cartItems.map((ele) => {
      temp["itemsWithQuantity"][ele.name] = ele.quantity;
    });

    data.push(temp);
    postData(data);
  };

  const postData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/comparePrice",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // [
  //   {
  //     "zipCode": "string",
  //     "itemsWithQuantity": {
  //       "additionalProp1": 0,
  //       "additionalProp2": 0,
  //       "additionalProp3": 0
  //     }
  //   }
  // ]

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-heading">
        <h4>Shopping Cart</h4>
        <p>Remove all</p>
      </div>
      <div className="shopping-cart-line">
        <hr />
      </div>
      <div className="shopping-cart-body">
        {cartItems.map((item) => {
          return (
            <div className="shopping-cart-item" key={item.name}>
              <div className="shopping-cart-image">
                <img src={item.imageUrl} alt={item.name} />
              </div>

              <div className="shopping-cart-item-name">{item.name}</div>
              <div className="shopping-cart-counter">
                <div className="btn" onClick={() => addItemToCart(item)}>
                  +
                </div>
                <div>{item.quantity}</div>
                <div className="btn" onClick={() => removeItemFromCart(item)}>
                  -
                </div>
              </div>
              <div
                className="remove-item"
                onClick={() => clearItemFromCart(item)}
              >
                <CartXFill size={30} />
              </div>
            </div>
          );
        })}
        <div
          className="shopping-cart-checkout"
          onClick={() => collectComparePriceData(cartItems, "02134")}
        >
          Compare Price
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
