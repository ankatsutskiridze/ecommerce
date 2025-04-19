import express from "express";
import {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  buyProduct,
  getCategoryStats,
  deleteProductArchive,
  getPriceRangeStats,
} from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter.route("/").get(getProducts).post(createProduct);
productsRouter.route("/:id").put(editProduct);
productsRouter.route("/delete/:id").delete(deleteProduct);
productsRouter.route("/delete/:id").delete(deleteProductArchive);
productsRouter.route("/buy/:id").post(buyProduct);
productsRouter.route("/stats").get(getCategoryStats);
productsRouter.route("/range/stats").get(getPriceRangeStats);

export default productsRouter;
