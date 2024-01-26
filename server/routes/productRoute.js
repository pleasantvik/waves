const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");
const { addProductValidator } = require("../middleware/validation");

router.post(
  "/",
  auth("createAny", "product"),
  addProductValidator,
  productController.addProduct
);

router
  .route("/product/:id")
  .get(productController.getProduct)
  .patch(auth("updateAny", "product"), productController.updateProduct)
  .delete(auth("deleteAny", "product"), productController.deleteProduct);
router.get("/all", productController.allProducts);
router.get("/paginate/all", productController.paginateProducts);

// router
//   .route("/brand/:id")
//   .get(brandsController.getBrand)
//   .delete(auth("deleteAny", "brand"), brandsController.deleteBrand);
module.exports = router;
