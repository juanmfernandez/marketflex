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
exports.createNewUser = exports.loginUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_handle_1 = require("../utils/bcrypt.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const createNewUser = (authUser) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_1.default.findOne({ email: authUser.email });
    if (exist)
        throw new Error(`${authUser.email} already exist in database.`);
    authUser.password = yield (0, bcrypt_handle_1.encrypt)(authUser.password);
    const registerNewUser = yield user_1.default.create(authUser);
    return registerNewUser;
});
exports.createNewUser = createNewUser;
const loginUser = (authData) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_1.default.findOne({ email: authData.email });
    if (!exist)
        throw new Error(`Invalid data`);
    const passwordHash = exist.password;
    const isCorrect = yield (0, bcrypt_handle_1.verifyPassword)(authData.password, passwordHash);
    if (!isCorrect)
        throw new Error(`Invalid password`);
    const token = (0, jwt_handle_1.generateToken)(exist.id);
    return token;
});
exports.loginUser = loginUser;
