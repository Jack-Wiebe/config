"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
const explorer_node_1 = require("./explorer-node");
class TaskNode extends explorer_node_1.ExplorerNode {
    constructor(id, name, file) {
        super(id, constants_1.ExplorerNodeType.Task, name, vscode_1.TreeItemCollapsibleState.None);
        this.name = name;
        this.file = file;
        // Initialize the icon
        this.update();
    }
    get task() {
        return this._task;
    }
    set task(value) {
        this._task = value;
        this.update();
    }
    children() {
        return [];
    }
    dispose() {
        if (this.task) {
            this.task.dispose();
        }
    }
    update() {
        this.iconPath = this.iconTheme(this.task ? 'execute' : 'idle');
    }
}
exports.TaskNode = TaskNode;
//# sourceMappingURL=task-node.js.map