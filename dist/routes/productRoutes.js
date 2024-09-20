"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post("/product", middlewares_1.isUser, productController_1.addProductsAndGeneratePDF);
exports.default = router;
