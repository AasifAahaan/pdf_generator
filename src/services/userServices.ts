const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

export const signJWT = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY as any, {
        expiresIn: "24h",
    });
};

export const verifyJWT = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY as any);
};

export const decodeJWT = (token: string) => {
    // console.log("Decoded token", jwt.decode(token))
    return jwt.decode(token);
};