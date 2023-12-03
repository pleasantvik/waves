const httpStatus = require("http-status");
const { ApiError } = require("../middleware/ApiError");

const filteredObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `You can only update ${[...allowedFields]}`
      );
    }
  });

  return newObj;
};

module.exports = {
  filteredObj,
};
