const { expect } = require("chai");
const authMiddleware = require("../middleware/authentication");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

describe("AUTH MIDDLEWARE", function () {
  it("should throw an error when no authentication header is passsed!", function () {
    const req = {
      get: function () {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not Authenticated"
    );
  });

  it("should throw an error when only one string is passed in authentication header!", function () {
    const req = {
      get: function () {
        return "abc";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("should yield a userId after token verification!", function () {
    const req = {
      get: function () {
        return "Bearer abcdefghijklmnopqrstuvwxyz";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({
      userId: "abc",
    });
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;
    jwt.verify.restore();
  });
  it("should throw an error when no when tokent can't be verified!", function () {
    const req = {
      get: function () {
        return "Bearer abc";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
