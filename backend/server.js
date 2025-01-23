import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDb } from "./config/db.js";

import productRoute from "./routes/product.route.js";

const app = express();
dotenv.config();
const port = process.env.port || 5000;

const __dirname = path.resolve();

app.use(express.json());


app.use("/api/products", productRoute);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

const start = async () => {
    await connectDb();
    app.listen(port, async () => {
        console.log("server started at http://localhost:5000")
    });
}

start();