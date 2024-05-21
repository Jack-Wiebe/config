"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
const output_show_1 = require("../models/output-show");
const output_source_1 = require("../models/output-source");
class OutputLogger {
    constructor() {
        this.resolvers = {
            [output_show_1.OutputShow.TaskProgress]: () => true,
            [output_show_1.OutputShow.TaskStarts]: source => source === output_source_1.OutputSource.Start,
            [output_show_1.OutputShow.TaskCompletes]: source => source === output_source_1.OutputSource.Complete || source === output_source_1.OutputSource.Error,
            [output_show_1.OutputShow.TaskErrors]: source => source === output_source_1.OutputSource.Error,
            [output_show_1.OutputShow.Never]: () => false
        };
        this.channel = vscode_1.window.createOutputChannel(constants_1.EXTENSION_NAME);
    }
    log(message, source) {
        if (message) {
            this.channel.appendLine(message);
            // Determine if the output window should be shown
            if (source) {
                const config = vscode_1.workspace.getConfiguration();
                const settings = config.get(constants_1.EXTENSION_ID);
                const resolver = this.resolvers[settings.output.show];
                if (resolver && resolver(source)) {
                    this.channel.show(true);
                }
            }
        }
    }
    dispose() {
        this.channel.dispose();
    }
}
exports.OutputLogger = OutputLogger;
//# sourceMappingURL=output-logger.js.map