import React, { createContext } from "react";
import { useState } from "react";
import axios from "axios";

const processing_data = (original_data) => {
  let data = [];

  Object.keys(original_data).forEach((ele) => {
    const arrays = ele.split(",");

    let temp = {};
    temp["categoryName"] = arrays[0];
    temp["url"] =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUhUsM8JuZ4MKDjlPNox4QuV81hnoccTW_A&usqp=CAU";
    temp["items"] = [];

    original_data[ele].forEach((ele) => {
      let firstCommaIndex = ele.indexOf(",");
      const item = [
        ele.substring(0, firstCommaIndex),
        ele.substring(firstCommaIndex + 1),
      ];
      // let item = ele.split(",");
      temp["items"].push({ name: item[0], url: item[1] });
    });
    data.push(temp);
  });
  return data;
};

export const ProductsContext = createContext({
  itemList: [],
  isLoading: true,
  setIsLoading: () => true,
  fetchData: () => {},
  setItemList: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [itemList, setItemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:8800/itemList",
      {
        headers: {
          accept: "application/json",
        },
      },
      { async: false }
    );
    setItemList(processing_data(response.data));
    setIsLoading(false);
  };

  const value = {
    itemList,
    fetchData,
    isLoading,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
