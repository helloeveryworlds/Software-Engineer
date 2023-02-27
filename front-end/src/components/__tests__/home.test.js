import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Home from "../../routes/home/home";

let getByTestId;

beforeEach(() => {
  const component = render(<Home />);
  getByTestId = component.getByTestId;
});

test("Test Home Page slogan", () => {
  const slogan = getByTestId("slogan");

  expect(slogan.textContent).toBe("The right store with the right price");
});
