const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema(
  {
    address: {
      required: [true, "Site address is required"],
      type: String,
      maxLength: 100,
    },
    hours: {
      required: true,
      type: String,
      maxLength: 100,
    },
    phone: {
      required: true,

      type: String,
      maxLength: 100,
    },
    email: {
      required: [true, "Site email is required"],
      required: true,

      type: String,
      maxLength: 100,
    },
  },
  {
    timestamps: true,
  }
);

// brandSchema.statics.brandNameTaken = async function (name) {
//   const brandName = await this.findOne({ name });

//   return !!brandName;
// };
const Site = mongoose.model("Site", siteSchema);

module.exports = Site;
// User.createIndexes({
//   email: 1,
//   unique: true,
// });
