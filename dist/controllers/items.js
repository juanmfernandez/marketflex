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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.postItem = exports.updateItem = exports.getItems = exports.getItem = void 0;
const item_service_1 = require("../services/item.service");
const error_handle_1 = require("../utils/error.handle");
const getItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, item_service_1.getProduct)(id);
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.getItem = getItem;
const getItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, item_service_1.getProducts)();
        res.status(200).json({ products });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.getItems = getItems;
const updateItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        const productUpdated = yield (0, item_service_1.updateProduct)(id, body);
        res.status(200).json({ productUpdated });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.updateItem = updateItem;
const postItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const responseNewProduct = yield (0, item_service_1.insertProduct)(body);
        res.status(200).json({ responseNewProduct });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.postItem = postItem;
const deleteItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield (0, item_service_1.deleteProduct)(id);
        res.status(200).json({ product });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.deleteItem = deleteItem;
