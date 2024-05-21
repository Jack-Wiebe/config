"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const constants_1 = require("../models/constants");
const explorer_node_1 = require("./explorer-node");
const empty_node_1 = require("./empty-node");
class RootNode extends explorer_node_1.ExplorerNode {
    get empty() {
        return this.files.length === 0;
    }
    constructor(files) {
        super('root', constants_1.ExplorerNodeType.Root, 'Files', vscode_1.TreeItemCollapsibleState.Expanded);
        this.files = files || [];
    }
    children() {
        // If there are no files, show a relevant message
        if (this.empty) {
            const child = new empty_node_1.EmptyNode(this.id, 'No gulp files found');
            return [child];
        }
        // Otherwise ensure the files are displayed alphabetically with root items at the top
        return this.files.sort((file1, file2) => {
            const split = file1.file.relativePath.split('\\');
            if (split.length === 1 || file1.file.relativePath < file2.file.relativePath) {
                return -1;
            }
            return file1.file.relativePath > file2.file.relativePath ? 1 : 0;
        });
    }
    dispose() {
        for (const file of this.files) {
            file.dispose();
        }
    }
}
exports.RootNode = RootNode;
//# sourceMappingURL=root-node.js.map