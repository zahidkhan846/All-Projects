const { expect } = require("chai");

describe("OTHER HELPER FUNCTIONS", function () {
  it("should add these numbers correctly", function () {
    const num1 = 1;
    const num2 = 2;
    expect(num1 + num2).to.equal(3);
  });

  it("should not add these numbers correctly", function () {
    const num1 = 1;
    const num2 = 2;
    expect(num1 + num2).not.to.equal(4);
  });
});
