import React, { useContext, useState, useEffect, Fragment } from "react";
import axios from "axios";
import { CartContext } from "../../contexts/cart.context";
import { CartXFill } from "react-bootstrap-icons";
import Loader from "../../components/loader/loader";
import ComparePrice from "../../components/compare-price/compare-price";
import { UserContext } from "../../contexts/user.context";
import NoAuth from "../../components/no-auth/no-auth";

import "./shopping-cart.css";

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
  const { isLogIn, currentUser } = useContext(UserContext);
  useEffect(() => {
    fetchCartData();
  }, [cartItems, fetchCartData]);
  const [isComparePriceOpen, setIsComparePriceOpen] = useState(false);

  const handleAddItemToCart = (item) => {
    addItemToCart(item);
    setIsComparePriceOpen(false);
  };

  const handleRemoveItemFromCart = (item) => {
    item.quantity === 1 ? clearItemFromCart(item) : removeItemFromCart(item);
    setIsComparePriceOpen(false);
  };

  const handleClearItemFromCart = (item) => {
    clearItemFromCart(item);
    setIsComparePriceOpen(false);
  };

  const handleCheckoutFromCart = () => {
    checkoutFromCart();
    setIsComparePriceOpen(false);
  };

  const collectComparePriceData = (cartItems, zipCode) => {
    let data = [];

    let temp = {};
    temp["zipCode"] = zipCode;
    temp["itemsWithQuantity"] = {};
    cartItems.map(
      (ele) => (temp["itemsWithQuantity"][ele.name] = ele.quantity)
    );

    data.push(temp);
    postComparePriceData(data);
  };

  const postComparePriceData = async (data) => {
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
      setComparePriceData(response.data);
      setIsComparePriceOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart-heading">
        <h4>Shopping Cart</h4>
        <p onClick={() => handleCheckoutFromCart()}>Remove all</p>
      </div>
      <div className="shopping-cart-line">
        <hr />
      </div>
      <div className="shopping-cart-body">
        {!isLogIn ? (
          <NoAuth />
        ) : cartItems == null ? (
          <Loader />
        ) : cartItems.length === 0 ? (
          <div>
            Your Cart is Empty. Go <a href="/shopping">Shopping</a>{" "}
          </div>
        ) : isLoading ? (
          <Loader />
        ) : (
          <div className="shopping-cart-body">
            {cartItems.map((item) => {
              return (
                <Fragment key={item.id}>
                  <div className="shopping-cart-item" key={item.id}>
                    <div className="shopping-cart-image">
                      <img src={item.url} alt={item.name} />
                    </div>

                    <div className="shopping-cart-item-name">{item.name}</div>
                    <div className="shopping-cart-counter">
                      <div
                        className="btn"
                        onClick={() => handleAddItemToCart(item)}
                      >
                        +
                      </div>
                      <div>{item.quantity}</div>
                      <div
                        className="btn"
                        onClick={() => handleRemoveItemFromCart(item)}
                      >
                        -
                      </div>
                    </div>
                    <div
                      className="remove-item"
                      onClick={() => handleClearItemFromCart(item)}
                    >
                      <CartXFill size={30} />
                    </div>
                  </div>
                </Fragment>
              );
            })}

            <div
              className="shopping-cart-compare"
              onClick={() =>
                collectComparePriceData(cartItems, currentUser.zipCode)
              }
            >
              Compare Price
            </div>
          </div>
        )}
        {isLogIn && isComparePriceOpen && comparePriceData && (
          <ComparePrice comparePriceData={comparePriceData} />
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
