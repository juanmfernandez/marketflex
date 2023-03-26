"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProduct = exports.getProducts = exports.insertProduct = void 0;
const items_1 = __importDefault(require("../models/items"));
const insertProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield items_1.default.create(product);
    return newProduct;
});
exports.insertProduct = insertProduct;
const getProduct = (barCode) => __awaiter(void 0, void 0, void 0, function* () {
    const responseProduct = yield items_1.default.findOne({ barCode });
    if (!responseProduct) {
        throw new Error(`Product ${barCode} not found`);
    }
    return responseProduct;
});
exports.getProduct = getProduct;
const getProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const responseProducts = yield items_1.default.find({});
    return responseProducts;
});
exports.getProducts = getProducts;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const responseProducts = yield items_1.default.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return responseProducts;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const responseProducts = yield items_1.default.deleteOne({ _id: id });
    if (!responseProducts.deletedCount) {
        throw new Error(`Product ${id} not found`);
    }
    return responseProducts;
});
exports.deleteProduct = deleteProduct;
