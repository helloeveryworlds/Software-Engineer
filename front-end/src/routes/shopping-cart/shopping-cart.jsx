import React, { useContext, useState } from "react";
import axios from "axios";

import { CartContext } from "../../contexts/cart.context";

import "./shopping-cart.css";

const ShoppingCart = () => {
  const { cartItems, addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);
  const [comparePrice, setComparePrice] = useState([]);

  console.log(cartItems);

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
      console.log(response.data);
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
    <div className="cart-container">
      {cartItems.map((item) => {
        return (
          <div key={item.name}>
            <p>{item.name}</p>
            <p>{item.imageUrl}</p>
            <div className="counter">
              <p className="btn" onClick={() => addItemToCart(item)}>
                +
              </p>

              <p>{item.quantity}</p>
              <p className="btn" onClick={() => removeItemFromCart(item)}>
                -
              </p>
              <p onClick={() => clearItemFromCart(item)}>Remove</p>
            </div>
          </div>
        );
      })}
      <div
        className="cart-checkout"
        onClick={() => collectComparePriceData(cartItems, "02134")}
      >
        Compare Price
      </div>
    </div>
  );
};

export default ShoppingCart;
