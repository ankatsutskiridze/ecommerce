import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const DB_URL = process.env.DB_URL.replace(
  "<password>",
  process.env.DB_PASS
).replace("<userName>", process.env.DB_USER);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connect to the databasa");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log("🚀 server is running on port 3000");
});
