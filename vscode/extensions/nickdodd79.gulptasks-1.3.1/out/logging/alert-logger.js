"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
class AlertLogger {
    info(message) {
        if (message) {
            vscode_1.window.showInformationMessage(`${constants_1.EXTENSION_NAME}: ${message}`);
        }
    }
    warn(message) {
        if (message) {
            vscode_1.window.showWarningMessage(`${constants_1.EXTENSION_NAME}: ${message}`);
        }
    }
    error(message) {
        if (message) {
            vscode_1.window.showErrorMessage(`${constants_1.EXTENSION_NAME}: ${message}`);
        }
    }
}
exports.AlertLogger = AlertLogger;
//# sourceMappingURL=alert-logger.js.map