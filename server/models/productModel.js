const mongoose = require("mongoose");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const productSchema = new mongoose.Schema(
  {
    model: {
      required: [true, "You need a guitar model"],
      type: String,
      unique: 1,
      maxLength: 250,
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
      required: true,
    },
    frets: {
      required: [true, "You need fret number"],

      type: Number,
    },
    woodtype: {
      type: String,
      required: [true, "You need a guitar woodtype"],
    },
    description: {
      required: [true, "You need a description"],
      type: String,
      maxLength: 1000,
    },
    price: {
      type: Number,
      required: [true, "You need to input the price"],
      maxLength: 255,
    },
    available: {
      type: Number,
      required: [true, "How many of this model we own"],
      maxLength: 2000,
      default: 0,
    },
    itemSold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Boolean,
      required: [true, "Specify if this product has free shipping"],
      default: false,
    },
    images: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(aggregatePaginate);

productSchema.statics.modelExist = async function (model) {
  const product = await this.findOne({ model });

  return !!product;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
