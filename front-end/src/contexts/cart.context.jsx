import React, { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext({
  cartItems: [],
  // cartCount: 0,
  isLoading: true,
  setIsLoading: () => true,
  fetchCartData: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  checkoutFromCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 57,
      name: "Broccoli",
      quantity: 1,
      url: "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg",
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  // const [cartCount, setCartCount] = useState(0);

  const fetchCartData = async () => {
    const response = await axios.get("/cart");
    setCartItems(response.data["orderItemList"]);
    setIsLoading(false);
  };

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce(
  //     (total, cartItem) => total + cartItem.quantity,
  //     0
  //   );
  //   setCartCount(newCartCount);
  // }, [cartItems]);

  const addItemToCart = async (itemToAdd) => {
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
    // cartCount,
    isLoading,
    fetchCartData,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    checkoutFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
