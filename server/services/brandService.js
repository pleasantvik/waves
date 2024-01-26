const Brand = require("../models/brandModel");
const { ApiError } = require("../middleware/ApiError");
const httpStatus = require("http-status");

const addBrand = async (req) => {
  try {
    //? Check if the brand name doesn't exist in DB
    if (await Brand.brandNameTaken(req.name)) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Sorry, brand already exist on DB"
      );
    }

    const brand = await Brand.create(req);

    return brand;
  } catch (error) {
    throw error;
  }
};

const getBrandById = async (id) => {
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand does not exist");
    }

    return brand;
  } catch (error) {
    throw error;
  }
};
const getAllBrands = async (arg) => {
  try {
    let order = arg.order ? arg.order : "desc";
    let limit = arg.limit ? arg.limit : 5;

    const brands = await Brand.find({})
      .sort({
        _id: order,
      })
      .limit(limit);
    if (!brands) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand does not found");
    }

    return brands;
  } catch (error) {
    throw error;
  }
};
const deleteBrandById = async (id) => {
  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      throw new ApiError(httpStatus.NOT_FOUND, "Brand does not exist");
    }

    return brand;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addBrand,
  getBrandById,
  deleteBrandById,
  getAllBrands,
};
