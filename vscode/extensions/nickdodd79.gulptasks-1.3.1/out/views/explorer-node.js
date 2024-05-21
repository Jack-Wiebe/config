"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const constants_1 = require("../models/constants");
const constants_2 = require("../models/constants");
class ExplorerNode extends vscode_1.TreeItem {
    constructor(id, type, label, collapsibleState) {
        super(label, collapsibleState);
        this.id = id;
        this.type = type;
        // Bind common setup for all explorer nodes
        this.contextValue = `${constants_1.EXTENSION_ID}:${this.type}`;
        this.command = {
            title: label,
            command: constants_2.ActionCommand.Select,
            arguments: [this]
        };
    }
    icon(name) {
        return path_1.join(__filename, '..', '..', '..', 'resources', 'icons', `${name}.svg`);
    }
    iconTheme(name) {
        return {
            dark: this.icon(`${name}-dark`),
            light: this.icon(`${name}-light`)
        };
    }
}
exports.ExplorerNode = ExplorerNode;
//# sourceMappingURL=explorer-node.js.map