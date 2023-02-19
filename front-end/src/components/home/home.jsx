import React from "react";
// import axios from "axios";

import "./home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: "" };
  }

  handleSearchChange = (e) => {
    this.setState({ query: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.query.trim() === "") {
      return;
    }
    //     axios
    //       .post("/search", { query: this.state.query })
    //       .then((response) => {
    //         this.props.history.push("/shopping", { result: response.data });
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit(e);
    }
  };

  render() {
    return (
      <div className="home-container">
        <div className="home-right">
          <form onSubmit={this.handleSearchSubmit}>
            <div className="search-container">
              <input
                className="search-input"
                type="text"
                placeholder="Search"
                value={this.state.query}
                onChange={this.handleSearchChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
          </form>
          <p className="home-slogan">The right store with the right price</p>
        </div>
      </div>
    );
  }
}

export default Home;
