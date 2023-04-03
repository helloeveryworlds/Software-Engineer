import React from "react";
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
    if (!this.state.filter && e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
    if (this.props.filter) {
      this.props.onSearchQueryChange(e.target.value);
    }
  };

  handleSearchSubmit = (e) => {
    const queryString = this.state.searchQuery
      .replace(/\s/g, "-")
      .toLowerCase();
    this.setState({ searchQuery: queryString });
    this.setState({ finished: true });
  };

  render() {
    return (
      <div className="search-bar-container">
        {this.state.finished && (
          <Navigate to={`/search-result/${this.state.searchQuery}`} />
        )}
        <form onSubmit={this.handleSearchSubmit} className="search-form">
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
