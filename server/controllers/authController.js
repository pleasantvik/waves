const { authService, emailService } = require("../services");
const httpStatus = require("http-status");

const authController = {
  async register(req, res, next) {
    try {
      // const { email, password } = req.body;
      const user = await authService.createUser(req.body);
      const token = await authService.genAuthToken(user);

      await emailService.registerEmail(req.body.email, user);

      res
        .cookie("x-access-token", token)
        .status(httpStatus.CREATED)
        .json({ user, token });
    } catch (error) {
      next(error);
    }
  },
  async signin(req, res, next) {
    try {
      const { email, password } = req.body;
      // Check user email and password
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );

      const token = await authService.genAuthToken(user);
      res
        .cookie("x-access-token", token)
        .status(httpStatus.OK)
        .json({ user, token });
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res) {
    res.json(req.user);
  },

  async dog(req, res, next) {
    res.json({
      data: "yes",
    });
  },
};

module.exports = authController;
