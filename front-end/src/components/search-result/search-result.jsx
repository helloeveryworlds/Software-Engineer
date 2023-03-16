import React from "react";
import WithRouter from "../with-router/with-router";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
    };
  }

  componentDidMount() {
    const query = this.props.query;
    this.setState({ searchQuery: query });
  }

  render() {
    return (
      <div>
        <h1>Search Result: 5{this.state.searchQuery}</h1>
      </div>
    );
  }
}

export default WithRouter(SearchResult);
