import mongoose from "mongoose";

const stockHistorySchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // პროდუქტის ID
    ref: "Product", // უკავშირებს Product კოლექციას
    required: true,
  },

  previousStock: {
    type: Number,
    required: true,
  },

  newStock: {
    type: Number, // განახლებული მარაგი
    required: true,
  },
  changedAt: {
    type: Date,
    default: Date.now, // ავტომატურად დებს ცვლილების დროს
  },
});

const StockHistory = mongoose.model("StockHistory", stockHistorySchema); ///შექმნა მოდელის.

export default StockHistory;
