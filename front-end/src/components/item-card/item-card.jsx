import React from "react";

import "./item-card.css";

const ItemCard = ({ item }) => {
  const { name, imageUrl } = item;

  // write HTML and css
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default ItemCard;
