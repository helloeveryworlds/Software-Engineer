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
        <div>
          <p>{bestByCategory.lowestUnitPriceStoreName}</p>
          <p>{bestByCategory.lowestUnitPriceStorePrice}</p>
        </div>
        <div>
          <p>{bestByCategory.lowestTotalPriceStoreName}</p>
          <p>{bestByCategory.lowestTotalPriceStorePrice}</p>
        </div>
        <div>
          <p>{bestByCategory.lowestAvgStoreName}</p>
          <p>{bestByCategory.lowestAvgTotalPrice}</p>
        </div>
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
            <div className="store-data-header">
              <div>
                {itemName} ({itemData.lowestUnit})
              </div>
              <div>{itemData.avgTotalPrice}</div>
            </div>
            <div className="store-data-body">
              <div>
                <p>{itemData.lowestUnitItemImgUrl}</p>
                <p>{itemData.lowestUnitItemName}</p>
                <p>{itemData.lowestUnitPriceTotal}</p>
              </div>
              <div>
                <p>{itemData.lowestItemImgUrl}</p>
                <p>{itemData.lowestItemName}</p>
                <p>{itemData.lowestPriceTotal}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

export default ComparePrice;
