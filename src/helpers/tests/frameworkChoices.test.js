import { retrieveFrameworkChoices } from "../frameworkChoices";
var assert = require("assert");

describe("test framework choices", () => {
  it("checks retrieved framework choices", () => {
    assert.ok(retrieveFrameworkChoices(), [
      { id: 1, name: "HTML-CSS-JS", value: "Html-CSS-JS" },
      { id: 2, name: "ReactJs", value: "React" },
      { id: 3, name: "NodeJs", value: "NodeJS" },
      { id: 4, name: "Flask", value: "Flask" },
      { id: 5, name: "Django", value: "Django" },
      { id: 6, name: "Laravel", value: "Laravel" },
      { id: 7, name: "Laravel-custom", value: "Laravel-custom" },
    ]);
  });
});
