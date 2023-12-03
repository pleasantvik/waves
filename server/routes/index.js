const express = require("express");
const authRoute = require("./authRoute");
const usersRoute = require("./usersRoute");
const router = express.Router();

// router.use("/auth", () => {});

const routesIndex = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
