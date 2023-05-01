import React, { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import "./item-card.css";
import { notification } from "antd";

const handleAddToCart = (isLogIn, addItemToCart, item) => {
  if (!isLogIn) {
    notification.warning({
      message: "Please log in to add items to cart",
      style: {
        top: 65,
        right: 25,
        left: "auto",
        button: "auto",
        position: "fixed",
      },
      duration: 1,
    });
  } else {
    addItemToCart(item);
    notification.success({
      message: `${item.name} added to cart`,
      style: {
        top: 65,
        right: 25,
        left: "auto",
        button: "auto",
        position: "fixed",
      },
      duration: 1,
    });
  }
};

const ItemCard = ({ item }) => {
  const { name, url } = item;
  const { isLogIn } = useContext(UserContext);
  const { addItemToCart } = useContext(CartContext);

  return (
    <div className="item-card">
      <img className="item-card__image" src={url} alt={name} />
      <h6 className="item-card__name">{name}</h6>
      <button
        className="item-card__button"
        onClick={() => handleAddToCart(isLogIn, addItemToCart, item)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
