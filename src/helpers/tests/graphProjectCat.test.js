import assert from "assert";
import {projectGraphCategories} from "../graphProjectCat";

describe("Test for the graph Categories", () => {
  it("should retrieve the different graph categories", () => {
    const whatsExpected = [
      {id: 1, name: "Number of Projects", value: "Projects"},
      {id: 2, name: "Project Types", value: "Project Types"},
    ];

    const retrieved = projectGraphCategories();
    assert.deepStrictEqual(whatsExpected , retrieved);
  });
});
