import Product from "../models/productModel.js";
import filterService from "../services/filterSevice.js";

const getProducts = async (req, res) => {
  const query = filterService(Product.find(), req.query);

  try {
    const product = await query;
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProduct = async (req, res) => {
  const updeteProduct = await Product.findOneAndUpdate(
    { id: parseInt(req.params.id) },
    req.body,
    { new: true }
  );
  if (!updeteProduct) {
    res.status(404).json({ message: "Product not fouund" });
  }
  res.json(updeteProduct);
};

const deleteProduct = async (req, res) => {
  console.log(Product.jemala);

  const deleteProduct = await Product.jemala({ id: parseInt(req.params.id) });

  if (!deleteProduct) {
    res.status(404).json({ message: "Product not fouund" });
  }
  res.json({ message: "Product delete" });
};

const buyProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);

    const product = await Product.findOne({ id: productId });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock <= 0) {
      return res.status(400).json({ message: "Product is  out of stock" });
    }
    product.stock -= 1;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createProduct = (req, res) => {
  const products = new Product({
    ...req.body,
    id: Date.now(),
  });
  products.save();

  res.status(201).json(products);
  console.log(products);
};

const getCategoryStats = async (req, res) => {
  const stats = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        numProducts: { $sum: 1 },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    { $sort: { numProducts: 1 } },
  ]);
  res.json(stats);
};

const deleteProductArchive = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndUpdate({ id: 2 });

    console.log(product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.archive(); // ← ← ← ← ← ← ← აქ გამოიყენე მეთოდი

    res.status(200).json({
      message: "Product archived successfully",
      product,
    });
  } catch (error) {
    console.error("Error archiving product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getPriceRangeStats = async (req, res) => {
  try {
    const stats = await Product.aggregate([
      {
        $bucket: {
          groupBy: "$price",
          boundaries: [0, 50, 100, 200, 10000],
          default: "Other",
          output: {
            count: { $sum: 1 },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
          },
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Aggregation failed", details: error.message });
  }
};

const findOneAndUpdate = async (req, res) => {};

export {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  buyProduct,
  getCategoryStats,
  deleteProductArchive,
  getPriceRangeStats,
  findOneAndUpdate,
};
