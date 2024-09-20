"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.check)('name', 'Name is required').notEmpty().withMessage('Name field is required'),
    (0, express_validator_1.check)('email', 'Please include a valid email')
        .isEmail()
        .withMessage('Email must be a valid format')
        .notEmpty()
        .withMessage('Email is required'),
    (0, express_validator_1.check)('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];
exports.loginValidation = [
    (0, express_validator_1.check)('email', 'Please include a valid email').isEmail().notEmpty(),
    (0, express_validator_1.check)('password', 'Password is required').notEmpty()
];
