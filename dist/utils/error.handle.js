"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportError = exports.getErrorMessage = void 0;
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
const reportError = ({ message }) => {
    return ({ error: message });
};
exports.reportError = reportError;
