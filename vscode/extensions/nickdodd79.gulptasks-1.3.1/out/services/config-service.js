"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
class ConfigService {
    constructor() {
        const config = vscode_1.workspace.getConfiguration();
        this._settings = config.get(constants_1.EXTENSION_ID);
    }
    get settings() {
        return this._settings;
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=config-service.js.map