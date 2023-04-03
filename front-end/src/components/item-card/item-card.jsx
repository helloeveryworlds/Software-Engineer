import React from "react";

import "./item-card.css";

const ItemCard = ({ item }) => {
  const { name, imageUrl } = item;

  return (
    <div className="item-card">
      <img className="item-card__image" src={imageUrl} alt={name} />
      <h6 className="item-card__name">{name}</h6>
      <button className="item-card__button">Add to Cart</button>
    </div>
  );
};

export default ItemCard;
