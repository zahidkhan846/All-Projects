const { expect } = require("chai");
const sinon = require("sinon");
const User = require("../models/user");
const AuthController = require("../controllers/auth");
const Post = require("../models/post");
const FeedContoller = require("../controllers/feed");
const { connect, disconnect } = require("mongoose");
// require("dotenv").config();

// describe("Auth Controller - Login", function () {
//   it("should throw an error with code 500 is acessing database fails!", function (done) {
//     sinon.stub(User, "findOne");
//     User.findOne.throws();
//     const req = {
//       body: {
//         email: "email@domain.com",
//         password: "somepassword",
//       },
//     };
//     AuthController.login(req, {}, () => {}).then((result) => {
//       expect(result).to.be.an("error");
//       expect(result).to.have.property("statusCode", 500);
//       done();
//     });
//     User.findOne.restore();
//   });
// });

describe("FEED CONTROLLER", function () {
  before(function (done) {
    connect(
      "mongodb+srv://zake:Mu0QRhZn4yV5CJwN@cluster0.ecnox.mongodb.net/test"
    )
      .then((response) => {
        const user = new User({
          email: "test@test.com",
          password: "tester",
          name: "Test Tee",
          posts: [],
          _id: "6001e0f73d341500042458bb",
        });
        return user.save();
      })
      .then(() => done());
  });
  it("should create post on current user object!", function (done) {
    const req = {
      body: {
        title: "Test Post",
        content: "Test content!",
        file: {
          path: "testpath",
        },
        userId: "6001e0f73d341500042458bb",
      },
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };
    FeedContoller.addPost(req, res, () => {}).then((result) => {
      expect(savedUser).to.have.prperty("posts");
      expect(savedUser).to.have.length(1);
      done();
    });

    User.findOne.restore();

    after(function (done) {
      User.deleteMany({})
        .then(() => disconnect())
        .then(() => done());
    });
  });
});
