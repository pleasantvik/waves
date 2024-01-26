const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const siteController = require("../controllers/siteController");

router
  .route("/")
  .post(auth("createAny", "site"), siteController.postSiteArgs)
  .get(siteController.getSiteArgs)
  .patch(auth("updateAny", "site"), siteController.updateSiteArgs);
module.exports = router;
