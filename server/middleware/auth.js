const passport = require("passport");
const httpStatus = require("http-status");

const { ApiError } = require("./ApiError");

const { roles } = require("../middleware/roles");

const verify = (req, res, resolve, reject, rights) => async (err, user) => {
  if (err || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, "Sorry, unauthorized"));
  }

  req.user = user;

  if (rights.length) {
    const action = rights[0]; //? createAny, readAny etc
    const resource = rights[1]; //* This is the route we want the user to have access to

    // Check if user making the request has the permission to do what he wants, in the resource he is visting
    const permission = roles.can(req.user.roles)[action](resource);
    if (!permission.granted) {
      return reject(
        new ApiError(httpStatus.FORBIDDEN, "You do not have access right")
      );
    }

    res.locals.permission = permission;
  }

  resolve();
};
const auth =
  (...rights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verify(req, res, resolve, reject, rights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
