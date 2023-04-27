import React, { Fragment, useState } from "react";

import "./compare-price.css";

const ComparePrice = ({ comparePriceData }) => {
  const bestByCategory = comparePriceData.bestByCategory;
  const storeValue = comparePriceData.storeValue;
  const [showStoreData, setShowStoreData] = useState(null);

  const handleShowStoreDataToggle = (storeName) => {
    setShowStoreData(showStoreData === storeName ? null : storeName);
  };

  return (
    <div className="compare-price-container">
      <div className="best-category">
        <div className="best-category-heading">Best By Category</div>
        <p>{bestByCategory.lowestAvgStoreName}</p>
        <p>{bestByCategory.lowestUnitPriceStoreName}</p>
        <p>{bestByCategory.lowestTotalPriceStorePrice}</p>
        <p>{bestByCategory.lowestAvgTotalPrice}</p>
        <p>{bestByCategory.lowestUnitPriceStorePrice}</p>
        <p>{bestByCategory.lowestTotalPriceStoreName}</p>
      </div>

      {Object.keys(storeValue).map((storeName) => {
        const storeData = storeValue[storeName];
        return (
          <div className="store-buttons" key={storeName}>
            {showStoreData === storeName && (
              <div
                className="store-data-overlay"
                onClick={() => handleShowStoreDataToggle(storeName)}
              >
                <IndividualStoreData storeData={storeData} />
              </div>
            )}
            <button onClick={() => handleShowStoreDataToggle(storeName)}>
              {storeName}
            </button>
          </div>
        );
      })}
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
            <div className="store-data-header">{itemName}</div>
            <div className="store-data-body">
              <p>{itemData.lowestUnitItemImgUrl}</p>
              <p>{itemData.lowestItemName}</p>
              <p>{itemData.lowestUnit}</p>
              <p>{itemData.lowestItemImgUrl}</p>
              <p>{itemData.avgTotalPrice}</p>
              <p>{itemData.lowestUnitPriceTotal}</p>
              <p>{itemData.lowestPriceTotal}</p>
              <p>{itemData.lowestUnitItemName}</p>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ComparePrice;
