"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userValidator_1 = require("../validators/userValidator");
const router = (0, express_1.Router)();
router.post('/register', userValidator_1.registerValidation, userController_1.registerUser);
router.post('/login', userValidator_1.loginValidation, userController_1.loginUser);
exports.default = router;
