import express from "express";
import productsRouter from "./routes/productsRouter.js";
import dotenv from "dotenv";
import swaggerUI from "swagger-ui-express";
import specs from "./middlewares/swagger.js";

dotenv.config({ path: "./config.env" });
const app = express();
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());

app.use("/products", productsRouter);

export default app;
