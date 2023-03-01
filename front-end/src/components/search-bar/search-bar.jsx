import React from "react";

import "./search-bar.css";

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={this.props.searchQuery}
          onChange={this.props.handleSearchChange}
          onKeyDown={this.props.handleKeyDown}
        />
      </div>
    );
  }
}

export default SearchBar;
