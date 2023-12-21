import React from "react";
import { render } from "@testing-library/react";

import Pagination from "./";

describe("Pagination component", () => {
  it("should render correctly with the current page selected", () => {
    const total = 10;
    const current = 5;
    const onPageChange = jest.fn();

    const wrapper = render(
      <Pagination total={total} current={current} onPageChange={onPageChange} />
    );

    // Verify the number of page buttons rendered
    expect(wrapper.find(".paginationBox")).toHaveLength(7); // Assuming 7 pages are rendered

    // Verify the current page is selected
    expect(wrapper.find(".selectedPaginationBox")).toHaveLength(1);
    expect(wrapper.find(".selectedPaginationBox").prop("children")).toBe(
      current
    );

    // Simulate click on a page button
    const pageButton = wrapper.find(".paginationBox").at(0);
    pageButton.simulate("click");

    // Verify that the onPageChange function is called with the correct page number
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("should disable the navigation arrows correctly", () => {
    const total = 5;
    const current = 1;
    const onPageChange = jest.fn();

    const wrapper = render(
      <Pagination total={total} current={current} onPageChange={onPageChange} />
    );

    // Verify the "previous" navigation arrow is disabled
    expect(wrapper.find(".navArrow").at(0).prop("disabled")).toBe(true);

    // Simulate click on the "next" navigation arrow
    const nextArrow = wrapper.find(".navArrow").at(1);
    nextArrow.simulate("click");

    // Verify that the onPageChange function is called with the correct page number
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
