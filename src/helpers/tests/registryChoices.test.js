import { retrieveRegistryChoices } from "../registryChoices";
var assert = require("assert");

describe("test registry choices", () => {
  it("checks retrieved registries", () => {
    assert.ok(retrieveRegistryChoices(), [
      { id: 1, name: "Dockerhub", value: "Dockerhub" },
      { id: 2, name: "Harbor", value: "Harbor" },
    ]);
  });
});
