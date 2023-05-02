import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext({
  cartItems: [],
  isLoading: true,
  setIsLoading: () => true,
  fetchCartData: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  checkoutFromCart: () => {},
  setCartItems: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCartData = async () => {
    const response = await axios.get("/cart");
    setCartItems(response.data["orderItemList"]);
    setIsLoading(false);
  };

  const addItemToCart = async (itemToAdd) => {
    setIsLoading(true);
    await axios.post(
      "/order",
      {
        name: itemToAdd.name,
        quantity: 1,
        url: itemToAdd.url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const removeItemFromCart = async (cartItemToRemove) => {
    setIsLoading(true);
    await axios.post(
      "/order",
      {
        name: cartItemToRemove.name,
        quantity: -1,
        url: cartItemToRemove.url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };

  const clearItemFromCart = async (cartItemToClear) => {
    setIsLoading(true);
    await axios.post("/delete", {
      name: cartItemToClear.name,
      url: cartItemToClear.url,
    });
  };

  const checkoutFromCart = async () => {
    await axios.get("/checkout");
  };

  const value = {
    cartItems,
    isLoading,
    fetchCartData,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    checkoutFromCart,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
