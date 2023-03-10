import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import "./search-bar.css";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "", finished: false };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    this.setState({ finished: true });
  };

  render() {
    return (
      <div className="search-container">
        {this.state.finished && (
          <Navigate
            to={`/search-result?query=${this.state.searchQuery}`}
            replace={true}
          />
        )}
        <form onSubmit={this.handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            onKeyDown={this.handleKeyDown}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
