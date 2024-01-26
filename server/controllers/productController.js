const { productService } = require("../services");
const httpStatus = require("http-status");

const productController = {
  async addProduct(req, res, next) {
    try {
      const product = await productService.addProduct(req.body);

      res.status(httpStatus.CREATED).json({
        status: "success",
        message: "product created successfully",
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProduct(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);

      res.status(httpStatus.OK).json({
        status: "success",
        product,
      });
    } catch (error) {
      next(error);
    }
  },
  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProductById(
        req.params.id,
        req.body
      );

      res.status(httpStatus.CREATED).json({
        status: "success",
        product,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteProduct(req, res, next) {
    try {
      const product = await productService.deleteProductById(req.params.id);

      res.status(httpStatus.CREATED).json({
        status: "success",
        product,
      });
    } catch (error) {
      next(error);
    }
  },

  async allProducts(req, res, next) {
    try {
      const products = await productService.allProducts(req);
      res.status(httpStatus.OK).json({
        total: products.length,
        status: "success",
        products,
      });
    } catch (error) {
      next(error);
    }
  },
  async paginateProducts(req, res, next) {
    try {
      const products = await productService.paginateProducts(req);
      res.status(httpStatus.OK).json({
        total: products.length,
        status: "success",
        products,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
