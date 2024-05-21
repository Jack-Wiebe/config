"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const path_1 = require("path");
const constants_1 = require("../models/constants");
const task_1 = require("../models/task");
class GulpService {
    constructor(root, context, processes) {
        this.root = root;
        this.context = context;
        this.processes = processes;
    }
    createTask(name, file, logger) {
        return new task_1.Task(callback => {
            callback = callback || (() => { });
            // Create a process instance
            // Check if any custom args have been configured
            const args = this.buildArgs(file);
            const proc = this.processes.createProcess(this.root, [name, ...args], data => {
                // Convert the data to a set of lines
                const value = data.toString();
                const lines = GulpService.sanitizeResult(value);
                // With each line check if an error exists and whether it needs to be logged
                let err;
                for (const line of lines) {
                    // HACK: if 'errored after' is found, then assume a nested task has failed
                    //       therefore call the callback with an error description
                    const lower = line.toLowerCase();
                    if (lower.indexOf('errored after') > -1) {
                        err = new Error(`Task '${name}' in file '${file.relativePath}' failed.`);
                    }
                    // Feed each line to the logger function
                    if (logger) {
                        logger(line);
                    }
                }
                // If an err is found, return it
                if (err) {
                    callback(err);
                }
            });
            // Then execute and handle the result
            proc
                .execute()
                .then(() => callback())
                .catch(err => callback(err));
            // Return the terminate function for later termination
            return proc.terminate;
        });
    }
    getFileTasks(file) {
        return new Promise((resolve, reject) => {
            // Load and return the tasks for the provided file
            const args = this.buildArgs(file);
            this.processes
                .createProcess(this.root, ['--tasks-simple', ...args])
                .execute()
                .then(result => {
                const tasks = GulpService.sanitizeResult(result);
                resolve(tasks);
            })
                .catch(err => reject(err));
        });
    }
    static resolveInstall(processes) {
        return new Promise((resolve, reject) => {
            // First attempt to resolve a global installation
            processes
                .createProcess(vscode_1.workspace.rootPath, ['--version'])
                .execute()
                .then(result => this.processResult('Global', result, vscode_1.workspace.rootPath, processes, resolve))
                .catch(() => {
                // Then check if a local install is available (i.e. in node_modules)
                const local = path_1.join(vscode_1.workspace.rootPath, 'node_modules/.bin');
                processes
                    .createProcess(local, ['--version'])
                    .execute()
                    .then(result => this.processResult('Local', result, local, processes, resolve))
                    .catch(err => reject(err));
            });
        });
    }
    buildArgs(file) {
        const config = vscode_1.workspace.getConfiguration();
        const settings = config.get(constants_1.EXTENSION_ID);
        const args = settings.args || [];
        return [`--cwd "${this.root}"`, `--gulpfile "${file.absolutePath}"`, ...args];
    }
    static processResult(scope, result, root, processes, resolve) {
        const versions = this.sanitizeResult(result);
        const gulp = new GulpService(root, [`Scope: ${scope}`, ...versions], processes);
        resolve(gulp);
    }
    static sanitizeResult(lines) {
        return lines
            .split(/\r{0,1}\n/)
            .map(line => {
            if (line.substr(0, 1) === '[') {
                const end = line.indexOf(']');
                if (end > -1) {
                    line = line.substr(end + 1);
                }
            }
            return line.replace(/^\s+|\s+$/g, '');
        })
            .filter(line => line !== '');
    }
}
exports.GulpService = GulpService;
//# sourceMappingURL=gulp-service.js.map