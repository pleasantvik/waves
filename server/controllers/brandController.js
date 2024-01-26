const { brandService } = require("../services");
const httpStatus = require("http-status");

const brandsController = {
  async addBrand(req, res, next) {
    try {
      const brand = await brandService.addBrand(req.body);

      res.status(httpStatus.CREATED).json({
        status: "success",
        message: "Brand created successfully",
        brand,
      });
    } catch (error) {
      next(error);
    }
  },

  async getBrand(req, res, next) {
    try {
      const brand = await brandService.getBrandById(req.params.id);

      res.json({
        brand,
      });
    } catch (error) {
      next(error);
    }
  },
  async getAllBrand(req, res, next) {
    try {
      const brand = await brandService.getAllBrands(req.body);

      res.json({
        brand,
      });
    } catch (error) {
      next(error);
    }
  },
  async deleteBrand(req, res, next) {
    try {
      const brand = await brandService.deleteBrandById(req.params.id);

      res.json({
        brand,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = brandsController;
