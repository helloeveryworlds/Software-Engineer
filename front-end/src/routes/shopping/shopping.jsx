import React, { Component } from "react";
import "./shopping.css";

class Shopping extends React.Component {
  render() {
    return (
      <div id="shopping-container">
        <div className="shopping-search-container">
          <div className="shopping-search-bar">
            <form
              onSubmit={this.handleSearchSubmit}
              className="shopping-search-form"
            >
              <input
                className="shopping-search-input"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
        </div>
        <div className="shopping-categories">
          <div className="category-heading">
            <h4 id="category-heading-name">Categories</h4>
            <hr></hr>
          </div>
          <div className="categories">
            <ul className="item-list">
              <li className="item" id="dairy"></li>
              <li className="item" id="fruits"></li>
              <li className="item" id="grains"></li>
              <li className="item" id="meat"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Shopping;
