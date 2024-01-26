const express = require("express");
const authRoute = require("./authRoute");
const usersRoute = require("./usersRoute");
const brandsRoute = require("./brandRoute");
const productRoute = require("./productRoute");
const siteRoute = require("./siteRoute");
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
  {
    path: "/brands",
    route: brandsRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/site",
    route: siteRoute,
  },
];

routesIndex.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
