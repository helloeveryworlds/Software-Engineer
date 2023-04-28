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
        <div className="best-category-heading">Best By Categories</div>
        <div className="compare-price-body">
        <div className="compare-item">
          <p>{bestByCategory.lowestUnitPriceStoreName}</p>
          <p>{bestByCategory.lowestUnitPriceStorePrice}</p>
        </div>
        <div className="compare-item">
          <p>{bestByCategory.lowestTotalPriceStoreName}</p>
          <p>{bestByCategory.lowestTotalPriceStorePrice}</p>
        </div>
        <div className="compare-item">
          <p>{bestByCategory.lowestAvgStoreName}</p>
          <p>{bestByCategory.lowestAvgTotalPrice}</p>
        </div>
      </div>
      </div>
      <div className="compare-button-body">
      <div className="compare-button">
      {Object.keys(storeValue).map((storeName) => {
        const storeData = storeValue[storeName];
        return (
          
          <div className="popuptext" id="myPopup" key={storeName}>
            {showStoreData === storeName && (
              <div
                className="store-data-overlay" id="myPopup"
                onClick={() => handleShowStoreDataToggle(storeName)}
              >
                <IndividualStoreData storeData={storeData} />
              </div>
            )}
            <div className="store-button" onClick={() => handleShowStoreDataToggle(storeName)}>
              {storeName}
            </div>
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
              <div >
                {itemName} ({itemData.lowestUnit})
              </div>
              <div>{itemData.avgTotalPrice}</div>
            </div>
            <div className="store-data-body">
              <div className="store-item">
                <img src = {itemData.lowestUnitItemImgUrl}/>
                <div className="store-row">
                <p>{itemData.lowestUnitItemName}</p>
                <p>{itemData.lowestUnitPriceTotal}</p>
                </div> 
              </div>
              <div className="store-item">
                <img src = {itemData.lowestItemImgUrl}/>
                <div className="store-row">
                <p>{itemData.lowestItemName}</p>
                <p>{itemData.lowestPriceTotal}</p>
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
