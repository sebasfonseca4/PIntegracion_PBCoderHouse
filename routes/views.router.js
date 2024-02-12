const express = require('express');
const router = express.Router();
const Product = require("../dao/models/product.model");
const productsRouter = require("./products.router");

router.get("/", async (req, res) => {
    try {
        const products = await Product.find().lean();
        res.render("home", { products });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error obteniendo productos");
    }
});

router.use("/realtimeproducts", productsRouter);

module.exports = router;
