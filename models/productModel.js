import mongoose from "mongoose";
import StockHistory from "../models/StockHistoryModels.js";

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    slug: { type: String },
    createdAt: { type: Date, default: Date.now },
    archived: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.methods.archive = function () {
  this.archived = true;
  return this.save();
};

productSchema.virtual("priceWithTax").get(function () {
  return this.price * 1.2;
});

productSchema.virtual("capacity").get(function () {
  return this.price * this.stock;
});

productSchema.statics.jemala = async function (filter) {
  return this.updateOne(filter, { archived: true });
};

productSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.stock) return next();

  const product = await this.model.findOne(this.getQuery());

  if (update.stock === product.stock) return next();

  await StockHistory.create({
    productId: product._id,
    previousStock: product.stock,
    newStock: update.stock,
  });
});

const Product = mongoose.model("Product", productSchema);

export default Product;
