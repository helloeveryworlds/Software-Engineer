import React from "react";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  render() {
    return (
      <div>
        <h1>Search Result: {this.state.searchQuery}</h1>
      </div>
    );
  }
}

export default SearchResult;
