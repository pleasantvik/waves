const Site = require("../models/siteModel");
const { ApiError } = require("../middleware/ApiError");
const httpStatus = require("http-status");
const mongoose = require("mongoose");

const postSiteArgs = async (req) => {
  try {
    // const site = new Site({ ...req.body });
    const site = await Site.create(req);

    return site;
  } catch (error) {
    throw error;
  }
};
const getSiteArgs = async () => {
  try {
    // const site = new Site({ ...req.body });
    const site = await Site.find();

    if (!site) {
      throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
    }

    return site;
  } catch (error) {
    throw error;
  }
};
const updateSiteArgs = async (req) => {
  try {
    const site = await Site.findByIdAndUpdate(req._id, req, {
      runValidators: true,
      new: true,
    });

    if (!site) {
      throw new ApiError(httpStatus.NOT_FOUND, "Site not found");
    }

    return site;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  postSiteArgs,
  getSiteArgs,
  updateSiteArgs,
};
