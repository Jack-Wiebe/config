"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("./models/constants");
const constants_2 = require("./models/constants");
const logger_1 = require("./logging/logger");
const gulp_service_1 = require("./services/gulp-service");
const file_service_1 = require("./services/file-service");
const command_service_1 = require("./services/command-service");
const process_service_1 = require("./services/process-service");
const explorer_1 = require("./views/explorer");
function activate(context) {
    // Resolve a gulp service to be used (local or global)
    const logger = new logger_1.Logger();
    const commands = new command_service_1.CommandService();
    const processes = new process_service_1.ProcessService();
    context.subscriptions.push(logger);
    logger.output.log('Initializing gulp...');
    gulp_service_1.GulpService
        .resolveInstall(processes)
        .then((gulp) => __awaiter(this, void 0, void 0, function* () {
        const output = gulp.context.join('\r\n> ');
        logger.output.log(`> ${output}`);
        // Check and notify if legacy settings might need manually migrating
        const config = vscode_1.workspace.getConfiguration();
        const legacy = config.get(constants_1.EXTENSION_ID);
        if (legacy.file || legacy.discovery) {
            logger.alert.warn(`Some legacy settings have been detected that should be migrated.
          Only the 'gulptasks.pattern' and 'gulptasks.filters' settings should be used.`);
        }
        // Load the explorer tree
        const files = new file_service_1.FileService();
        const explorer = new explorer_1.Explorer(gulp, files, commands, logger);
        yield explorer.load();
        // Register the explorer as a tree provider for disposing
        const provider = vscode_1.window.registerTreeDataProvider(constants_1.EXPLORER_ID, explorer);
        context.subscriptions.push(explorer);
        context.subscriptions.push(provider);
        yield commands.setContext(constants_2.ContextCommand.Enabled, true);
    }))
        .catch((err) => __awaiter(this, void 0, void 0, function* () {
        const message = err ? err.message || err : `try running 'npm i -g gulp'`;
        const lines = message.split('\n');
        logger.output.log(`Unable to resolve gulp\n> ${lines.join('\n> ')}.`);
        yield commands.setContext(constants_2.ContextCommand.Enabled, false);
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map