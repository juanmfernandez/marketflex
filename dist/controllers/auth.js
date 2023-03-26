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
exports.login = exports.register = void 0;
const error_handle_1 = require("../utils/error.handle");
const auth_service_1 = require("../services/auth.service");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const responseUser = yield (0, auth_service_1.createNewUser)(body);
        res.status(200).json({ responseUser });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield (0, auth_service_1.loginUser)({ email, password });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(400).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
});
exports.login = login;
