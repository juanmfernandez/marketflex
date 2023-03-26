"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const SECRET = process.env.SECRET || "S3CrEt";
const generateToken = (id) => {
    const token = (0, jsonwebtoken_1.sign)({ id }, SECRET, {
        expiresIn: "6h",
    });
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, SECRET);
};
exports.verifyToken = verifyToken;
