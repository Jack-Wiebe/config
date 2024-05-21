"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
const explorer_node_1 = require("./explorer-node");
class EmptyNode extends explorer_node_1.ExplorerNode {
    constructor(id, message) {
        super(`${id}::empty`, constants_1.ExplorerNodeType.Empty, message, vscode_1.TreeItemCollapsibleState.None);
    }
    children() {
        return [];
    }
    dispose() { }
}
exports.EmptyNode = EmptyNode;
//# sourceMappingURL=empty-node.js.map