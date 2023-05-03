import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ComparePrice from "../compare-price/compare-price";
import Loader from "../loader/loader";
import axios from "axios";
import "./search-result.css";
import { UserContext } from "../../contexts/user.context";
const defaultZipCode = (isLogIn, currentUser, zipCode, setZipCode) => {
  if (isLogIn && zipCode !== currentUser.zipCode) {
    setZipCode(currentUser.zipCode);
  }
};

const SearchResult = () => {
  const { query } = useParams();
  const queryArray = query.split("-");
  const [comparePriceData, setComparePriceData] = useState(null);
  const [zipCode, setZipCode] = useState("02134");
  const { isLogIn, currentUser } = useContext(UserContext);
  defaultZipCode(isLogIn, currentUser, zipCode, setZipCode);
  const postComparePriceData = async (searchItem) => {
    try {
      const response = await axios.post(
        "http://localhost:8800/comparePrice",
        searchItem,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      setComparePriceData(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  let searchItem = [];
  let temp = {};
  temp["zipCode"] = zipCode;
  temp["itemsWithQuantity"] = {};
  temp["itemsWithQuantity"][
    queryArray[0].charAt(0).toUpperCase() + queryArray[0].slice(1)
  ] = 1;
  searchItem.push(temp);

  postComparePriceData(searchItem);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleComparePriceDataUpdate = () => {
    postComparePriceData(searchItem);
  };

  return (
    <div className="search-result-container">
      <div className="search-result-body">
        <div className="search-result-heading">
          <h4>Search Result:</h4>
          <hr />
        </div>
        <div className="zip-code-input-container">
          <label htmlFor="zip-code-input">Enter Zip Code:</label>
          <input
            id="zip-code-input"
            type="text"
            value={zipCode}
            onChange={handleZipCodeChange}
          />
          <button onClick={() => handleComparePriceDataUpdate()}>Update</button>
        </div>
        {comparePriceData === null ? (
          <Loader />
        ) : (
          <div className="search-result">
            <ComparePrice comparePriceData={comparePriceData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
