"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const error_handle_1 = require("../utils/error.handle");
const jwt_handle_1 = require("../utils/jwt.handle");
const checkJwt = (req, res, next) => {
    var _a;
    try {
        const jwt = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ").pop();
        if (!(0, jwt_handle_1.verifyToken)(`${jwt}`)) {
            throw new Error("Invalid session.");
        }
        next();
    }
    catch (error) {
        res.status(403).json((0, error_handle_1.reportError)({ message: (0, error_handle_1.getErrorMessage)(error) }));
    }
};
exports.checkJwt = checkJwt;
