"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ItemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    expDate: Date,
    price: {
        type: Number,
        required: true,
    },
    barCode: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const ItemModel = (0, mongoose_1.model)("products", ItemSchema);
exports.default = ItemModel;
