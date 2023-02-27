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
<<<<<<< HEAD
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
=======
          onChange={this.props.handleSearchChange}
          onKeyDown={this.props.handleKeyDown}
>>>>>>> e5473cc829439f296ac432e66f86f2ecaa4b0b9d
        />
      </div>
    );
  }
}

export default SearchBar;
