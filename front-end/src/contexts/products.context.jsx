import React, { createContext } from "react";

const data = {
  "Main Dishes,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276": [
    "Beef Steak,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Chicken Alfredo,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Lasagna,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Margherita Pizza,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Tacos,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Fried Rice,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Pad Thai,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
  ],
  "Vegetables,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276": [
    "Carrot,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Broccoli,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Cauliflower,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Cabbage,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Spinach,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Tomato,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Potato,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Sweet Potato,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Onion,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Garlic,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Bell Pepper,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Jalapeño,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Zucchini,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Eggplant,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Artichoke,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Asparagus,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Beetroot,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Brussel Sprouts,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Green Beans,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
    "Peas,https://images.albertsons-media.com/is/image/ABS/Meat-Seafood-Large-Tile-Combo2-552x276",
  ],
};

export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const value = { data };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
