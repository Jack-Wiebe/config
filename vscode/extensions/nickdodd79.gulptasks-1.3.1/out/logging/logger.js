"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const alert_logger_1 = require("./alert-logger");
const output_logger_1 = require("./output-logger");
class Logger {
    constructor() {
        this.alert = new alert_logger_1.AlertLogger();
        this.output = new output_logger_1.OutputLogger();
    }
    info(message) {
        this.alert.info(message);
        this.output.log(message);
    }
    warn(message) {
        this.alert.warn(message);
        if (message) {
            this.output.log(`WARNING: ${message}`);
        }
    }
    error(message) {
        this.alert.error(message);
        if (message) {
            this.output.log(`ERROR: ${message}`);
        }
    }
    dispose() {
        this.output.dispose();
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map