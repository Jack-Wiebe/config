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
const vscode_2 = require("vscode");
const constants_1 = require("../models/constants");
const constants_2 = require("../models/constants");
const constants_3 = require("../models/constants");
const output_source_1 = require("../models/output-source");
const root_node_1 = require("./root-node");
const file_node_1 = require("./file-node");
const task_node_1 = require("./task-node");
class Explorer {
    constructor(gulp, files, commands, logger) {
        this.gulp = gulp;
        this.files = files;
        this.commands = commands;
        this.logger = logger;
        this.root = new root_node_1.RootNode();
        this._onDidChangeTreeData = new vscode_1.EventEmitter();
        // Register handlers for the commands
        this.commands.registerCommand(constants_3.ActionCommand.Select, this.handleSelect, this);
        this.commands.registerCommand(constants_3.ActionCommand.Execute, this.executeTask, this);
        this.commands.registerCommand(constants_3.ActionCommand.Terminate, this.terminateTask, this);
        this.commands.registerCommand(constants_3.ActionCommand.Restart, this.restartTask, this);
        this.commands.registerCommand(constants_3.ActionCommand.Refresh, this.load, this);
    }
    get onDidChangeTreeData() {
        return this._onDidChangeTreeData.event;
    }
    getTreeItem(node) {
        return node;
    }
    getChildren(node) {
        return node ? node.children() : this.root.children();
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.output.log('Loading gulp tasks...');
            try {
                // Dispose before rebuilding to ensure node resources are released
                this.dispose();
                // Build the tree
                this.root = yield this.loadFiles();
                this.update(this.selected);
                if (this.root.empty) {
                    this.logger.output.log('> No gulp files found');
                }
                else {
                    this.logger.output.log(`Let's get gulping...`);
                }
            }
            catch (ex) {
                this.logger.error(ex.message || ex);
            }
        });
    }
    dispose() {
        // Clear the selection
        this.selected = undefined;
        // Dispose of the tree from the root down and reset
        if (this.root) {
            this.root.dispose();
            this.root = new root_node_1.RootNode();
        }
    }
    loadFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = [];
            const files = yield this.files.discoverGulpFiles();
            // Load the tasks for each discovered file
            for (const file of files) {
                const id = file.relativePath.replace(/\\/g, '-');
                const tasks = yield this.loadTasks(id, file);
                const node = new file_node_1.FileNode(id, file, tasks);
                const taskNames = tasks.map(task => task.name);
                this.logger.output.log(`> ${file.relativePath} [${taskNames}]`);
                nodes.push(node);
            }
            return new root_node_1.RootNode(nodes);
        });
    }
    loadTasks(fileId, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const nodes = [];
            const tasks = yield this.gulp.getFileTasks(file);
            for (const task of tasks) {
                const id = `${fileId}:${task}`;
                const node = new task_node_1.TaskNode(id, task, file);
                nodes.push(node);
            }
            return nodes;
        });
    }
    handleSelect(node) {
        // Check if a timestamp is active and a node has already been selected
        if (this.timestamp && this.selected === node) {
            // If so activiate the task execution
            // This is a hack in place of proper double click functionality in vscode
            this.executeTask();
            this.timestamp = undefined;
        }
        else {
            // Otherwise simply select the node
            this.selectTask(node);
        }
    }
    selectTask(node) {
        // Track the node if it is has a task type
        this.selected = node.type === constants_2.ExplorerNodeType.Task
            ? node
            : undefined;
        this.update(this.selected);
        // Set the select timestamp to enable double click capabilities
        this.timestamp = Date.now();
        // Use an interval to manage the timestamp lifetime (max 500ms interval)
        setInterval(() => {
            if (this.timestamp) {
                const now = Date.now();
                const interval = now - this.timestamp;
                if (interval >= 500) {
                    this.timestamp = undefined;
                }
            }
        }, 500);
    }
    executeTask() {
        // Track the selected node at point of execution in case it changes during execution
        const node = this.selected;
        if (node && !node.task) {
            this.logger.output.log(`> ${node.name}: STARTED`, output_source_1.OutputSource.Start);
            // Create a task process and handle any output
            // Also update the tree to switch icons and state
            node.task = this.gulp.createTask(node.name, node.file, output => {
                this.logger.output.log(`> ${node.name}: ${output}`, output_source_1.OutputSource.Progress);
            });
            this.update(node);
            // Then execute the task and reset the tree upon completion
            node.task
                .execute()
                .then(() => {
                node.task = undefined;
                this.update(node);
                this.logger.output.log(`> ${node.name}: COMPLETED`, output_source_1.OutputSource.Complete);
                if (this.showNotification(notifications => notifications.executed)) {
                    this.logger.alert.info(`The task '${node.name}' has completed successfully.`);
                }
            })
                .catch(() => {
                node.task = undefined;
                this.update(node);
                this.logger.output.log(`> ${node.name}: FAILED`, output_source_1.OutputSource.Error);
                this.logger.alert.error(`The task '${node.name}' has failed.`);
            });
        }
    }
    terminateTask() {
        // Track the selected node at point of execution in case it changes during execution
        const node = this.selected;
        if (node && node.task) {
            // Kill the task process and update the tree
            node.task
                .terminate()
                .then(() => {
                node.task = undefined;
                this.update(node);
                this.logger.output.log(`> ${node.name}: TERMINATED`);
                if (this.showNotification(notifications => notifications.terminated)) {
                    this.logger.alert.info(`The task '${node.name}' has been terminated.`);
                }
            });
        }
    }
    restartTask() {
        // Track the selected node at point of execution in case it changes during execution
        const node = this.selected;
        if (node && node.task) {
            // Terminate the task and when completed execute again
            this.logger.output.log(`> ${node.name}: RESTARTING`);
            node.task
                .terminate()
                .then(() => {
                node.task = undefined;
                this.executeTask();
                if (this.showNotification(notifications => notifications.restarted)) {
                    this.logger.alert.info(`The task '${node.name}' has been restarted.`);
                }
            });
        }
    }
    showNotification(callback) {
        const config = vscode_2.workspace.getConfiguration();
        const settings = config.get(constants_1.EXTENSION_ID);
        return callback(settings.notifications);
    }
    update(node) {
        // Need to resolve the selected task and hide/show the action icons
        let canExecute = false;
        let canTerminate = false;
        let canRestart = false;
        if (node) {
            canExecute = !node.task;
            canTerminate = !!node.task;
            canRestart = !!node.task;
        }
        this.commands.setContext(constants_3.ContextCommand.CanExecute, canExecute);
        this.commands.setContext(constants_3.ContextCommand.CanTerminate, canTerminate);
        this.commands.setContext(constants_3.ContextCommand.CanRestart, canRestart);
        this._onDidChangeTreeData.fire(node);
    }
}
exports.Explorer = Explorer;
//# sourceMappingURL=explorer.js.map