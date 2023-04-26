import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { CartContext } from "../../contexts/cart.context";
import { CartXFill } from "react-bootstrap-icons";
import Loader from "../../components/loader/loader";
import ComparePrice from "../../components/compare-price/compare-price";
import { UserContext } from "../../contexts/user.context";

import "./shopping-cart.css";

import response from "./comparePrice.json";

const ShoppingCart = () => {
  const {
    cartItems,
    isLoading,
    fetchCartData,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    checkoutFromCart,
  } = useContext(CartContext);
  const [comparePriceData, setComparePriceData] = useState(null);
  const { isLogIn } = useContext(UserContext);

  useEffect(() => {
    fetchCartData();
  }, [cartItems]);

  const collectComparePriceData = (cartItems, zipCode) => {
    let data = [];

    let temp = {};
    temp["zipCode"] = zipCode;
    temp["itemsWithQuantity"] = {};
    cartItems.map((ele) => {
      temp["itemsWithQuantity"][ele.name] = ele.quantity;
    });

    data.push(temp);
    postComparePriceData(data);
  };

  const postComparePriceData = async (data) => {
    try {
      // const response = await axios.post(
      //   "http://localhost:8800/comparePrice",
      //   data,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Accept: "*/*",
      //     },
      //   }
      // );
      setComparePriceData(response);
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
        <p onClick={() => checkoutFromCart()}>Remove all</p>
      </div>
      <div className="shopping-cart-line">
        <hr />
      </div>
      <div className="shopping-cart-body">
        {!isLogIn ? (
          <NoAuth />
        ) : cartItems.length === 0 ? (
          <div>
            Your Cart is Empty. Go <a href="/shopping">Shopping</a>{" "}
          </div>
        ) : isLoading ? (
          <Loader />
        ) : (
          cartItems.map((item) => {
            return (
              <div className="shopping-cart-body" key={item.id}>
                <div className="shopping-cart-item">
                  <div className="shopping-cart-image">
                    <img src={item.url} alt={item.name} />
                  </div>

                  <div className="shopping-cart-item-name">{item.name}</div>
                  <div className="shopping-cart-counter">
                    <div className="btn" onClick={() => addItemToCart(item)}>
                      +
                    </div>
                    <div>{item.quantity}</div>
                    <div
                      className="btn"
                      onClick={() =>
                        item.quantity === 1
                          ? clearItemFromCart(item)
                          : removeItemFromCart(item)
                      }
                    >
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
                <div
                  className="shopping-cart-checkout"
                  onClick={() => collectComparePriceData(cartItems, "02134")}
                >
                  Compare Price
                </div>
              </div>
            );
          })
        )}
        {comparePriceData && (
          <ComparePrice comparePriceData={comparePriceData[0]} />
        )}
      </div>
    </div>
  );
};

const NoAuth = () => {
  return (
    <div>
      You haven't logged in. Please <a href="/signin">LogIn</a> first.
    </div>
  );
};

export default ShoppingCart;
