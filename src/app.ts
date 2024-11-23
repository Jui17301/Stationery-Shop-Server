import express from "express";
import productRouter from "./module/product/product.router";


const app = express();

app.use(express.json());
app.use("/api/products",productRouter)

export default app;