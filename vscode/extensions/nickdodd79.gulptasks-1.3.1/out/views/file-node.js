"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
const explorer_node_1 = require("./explorer-node");
const empty_node_1 = require("./empty-node");
class FileNode extends explorer_node_1.ExplorerNode {
    constructor(id, file, tasks) {
        super(id, constants_1.ExplorerNodeType.File, file.relativePath, vscode_1.TreeItemCollapsibleState.Expanded);
        this.file = file;
        this.tasks = tasks || [];
        // Assign the gulp icon
        this.iconPath = this.icon('gulp');
    }
    get empty() {
        return this.tasks.length === 0;
    }
    children() {
        // Return either the tasks or an empty message node
        if (this.empty) {
            const child = new empty_node_1.EmptyNode(this.id, 'No gulp tasks');
            return [child];
        }
        return this.tasks;
    }
    dispose() {
        for (const task of this.tasks) {
            task.dispose();
        }
    }
}
exports.FileNode = FileNode;
//# sourceMappingURL=file-node.js.map