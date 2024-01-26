const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      required: [true, "Brand name is required"],
      type: String,
      unique: 1,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

brandSchema.statics.brandNameTaken = async function (name) {
  const brandName = await this.findOne({ name });

  return !!brandName;
};
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
// User.createIndexes({
//   email: 1,
//   unique: true,
// });
