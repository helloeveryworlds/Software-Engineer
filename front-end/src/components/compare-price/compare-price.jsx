import React, { Fragment, useState, useContext } from "react";

import "./compare-price.css";
import { CartContext } from "../../contexts/cart.context";

const ComparePrice = ({ comparePriceData }) => {
  const bestByCategory = comparePriceData.bestByCategory;
  const storeValue = comparePriceData.storeValue;
  const [showStoreData, setShowStoreData] = useState(null);
  const { checkoutFromCart } = useContext(CartContext);

  const handleShowStoreDataToggle = (storeName) => {
    setShowStoreData(showStoreData === storeName ? null : storeName);
  };

  return (
    <div className="compare-price-container">
      <div className="best-category">
        <div className="best-category-heading">Best By Categories</div>
        <div className="compare-price-body">
          <div className="compare-item">
            <p>
              Lowest Unit Price Store: {bestByCategory.lowestUnitPriceStoreName}
            </p>
            <p>Lowest Unit Price: {bestByCategory.lowestUnitPriceStorePrice}</p>
          </div>
          <div className="compare-item">
            <p>
              Lowest Total Price Store:
              {bestByCategory.lowestTotalPriceStoreName}
            </p>
            <p>
              Lowest Total Price: {bestByCategory.lowestTotalPriceStorePrice}
            </p>
          </div>
          <div className="compare-item">
            <p>Lowest Average Store: {bestByCategory.lowestAvgStoreName}</p>
            <p>
              Lowest Average Total Price: {bestByCategory.lowestAvgTotalPrice}
            </p>
          </div>
        </div>
      </div>
      <div className="compare-button-body">
        <div className="compare-button">
          {Object.keys(storeValue).map((storeName) => {
            const storeData = storeValue[storeName];
            return (
              <div key={storeName}>
                <div
                  className="store-button"
                  onClick={() => handleShowStoreDataToggle(storeName)}
                >
                  {storeName}
                </div>
                {showStoreData === storeName && (
                  <div className="store-popup">
                    <div className="store-popup-content">
                      <span
                        className="store-popup-close"
                        onClick={() => handleShowStoreDataToggle(storeName)}
                      >
                        &times;
                      </span>
                      <h1 className="popup-heading">{storeName}</h1>
                      <IndividualStoreData storeData={storeData} />
                      <div className="checkout-button">
                        <div
                          className="checkout-btn-primary"
                          onClick={() => checkoutFromCart(storeData)}
                        >
                          Checkout
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const IndividualStoreData = ({ storeData }) => {
  return (
    <Fragment>
      {Object.keys(storeData).map((itemName) => {
        const itemData = storeData[itemName];
        return (
          <div className="store-data" key={itemName}>
            <div className="store-data-header">
              <div>
                <p> {itemName}</p>
                <p> ({itemData.lowestUnit})</p>
              </div>
              <div>Average Total Price: {itemData.avgTotalPrice}</div>
            </div>
            <div className="store-data-body">
              <div className="store-item">
                <img src={itemData.lowestUnitItemImgUrl} alt={itemName} />
                <div className="store-row">
                  <p>Lowest Unit Item: {itemData.lowestUnitItemName}</p>
                  <p>
                    Lowest Unit Price Total: {itemData.lowestUnitPriceTotal}
                  </p>
                </div>
              </div>
              <div className="store-item">
                <img src={itemData.lowestItemImgUrl} alt={itemName} />
                <div className="store-row">
                  <p>Lowest Item Name: {itemData.lowestItemName}</p>
                  <p>Lowest Price Total: {itemData.lowestPriceTotal}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ComparePrice;
