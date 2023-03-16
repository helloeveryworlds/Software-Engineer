import React from "react";
import { useSearchParams } from "react-router-dom";

function WithRouter(Child) {
  return (props) => {
    const [getSearchParams] = useSearchParams();
    const query = getSearchParams.getAll("query");
    // const navigate = useNavigate();

    return <Child {...props} query={query} />;
  };
}

export default WithRouter;
