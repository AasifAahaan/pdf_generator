"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJWT = exports.verifyJWT = exports.signJWT = void 0;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const signJWT = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "24h",
    });
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
exports.verifyJWT = verifyJWT;
const decodeJWT = (token) => {
    // console.log("Decoded token", jwt.decode(token))
    return jwt.decode(token);
};
exports.decodeJWT = decodeJWT;
