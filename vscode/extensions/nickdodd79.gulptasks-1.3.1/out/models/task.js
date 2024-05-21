"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(executor) {
        this.executor = executor;
    }
    execute() {
        // Resolve immediately if no executor is defined or the task is already running
        if (!this.executor || this.terminator) {
            return Promise.resolve();
        }
        return new Promise((resolve, reject) => {
            // Execute the task process and resolve the promise appropriately
            // Track the process instance to terminate later
            this.terminator = this.executor(err => err ? reject(err) : resolve());
        });
    }
    terminate() {
        // If no process then resolve immediately
        if (!this.terminator) {
            return Promise.resolve();
        }
        // Otherwise invoke the process termination
        const promise = this.terminator();
        return promise.then(() => this.terminator = undefined);
    }
    dispose() {
        this.terminate();
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map