const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const brandsController = require("../controllers/brandController");

router.post("/brand", auth("createAny", "brand"), brandsController.addBrand);
router.get("/all", brandsController.getAllBrand);

router
  .route("/brand/:id")
  .get(brandsController.getBrand)
  .delete(auth("deleteAny", "brand"), brandsController.deleteBrand);
module.exports = router;
