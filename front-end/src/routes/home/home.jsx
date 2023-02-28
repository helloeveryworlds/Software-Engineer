import React from "react";
// import axios from "axios";

import SearchBar from "../../components/search-bar/search-bar";
import "./home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "", searchResults: [] };
  }

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();

    const queryStr = this.state.query.trim();
    if (queryStr === "") {
      return;
    }

    // try {
    //   const response = await fetch(`/search?query=${queryStr}`);
    //   const results = await response.json();
    //   this.setState({
    //     results,
    //   });
    //   this.props.history.push("/search-results");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit(e);
    }
  };

  render() {
    return (
      <div className="home-container">
        <div className="home-right">
          <form onSubmit={this.handleSearchSubmit}>
            <SearchBar
              searchQuery={this.state.searchQuery}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleKeyDown}
            />
          </form>
          <p className="home-slogan" data-testid="slogan">
            The right store with the right price
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
