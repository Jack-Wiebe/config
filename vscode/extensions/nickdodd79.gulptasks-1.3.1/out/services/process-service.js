"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const child_process_1 = require("child_process");
const process_1 = require("../models/process");
class ProcessService {
    constructor() {
        // Resolve the current platform and the config key to access env values
        if (process.platform === 'win32') {
            this.configKey = 'terminal.integrated.env.windows';
        }
        else if (process.platform === 'darwin') {
            this.configKey = 'terminal.integrated.env.osx';
        }
        else if (process.platform === 'linux') {
            this.configKey = 'terminal.integrated.env.linux';
        }
    }
    createProcess(root, args, callback) {
        let proc;
        return new process_1.Process(() => new Promise((resolve, reject) => {
            try {
                // Don't allow the process to be recreated
                if (proc) {
                    return Promise.resolve();
                }
                // Attempt to invoke the command
                const options = this.buildOptions(root);
                proc = child_process_1.exec(`gulp ${args.join(' ')}`, options, (err, stdout) => {
                    // Clear the proc variable as it has now completed
                    proc = undefined;
                    // Resolve or reject depending on how the process finishes
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(stdout);
                    }
                });
                // Track the process output in real time
                if (callback) {
                    proc.stdout.on('data', callback);
                    proc.stderr.on('data', callback);
                }
            }
            catch (err) {
                // Catch all reject handler
                reject(err);
            }
        }), () => {
            // Check a process is active
            if (!proc || proc.exitCode) {
                return Promise.resolve();
            }
            return new Promise(resolve => {
                // Kill the process to invoke the exit
                // Listen for the exit event to resolve the promise
                proc.on('exit', () => resolve());
                proc.kill();
            });
        });
    }
    buildOptions(root) {
        // Get the process env and configured env values
        const env = Object.assign({}, process.env);
        const config = vscode_1.workspace.getConfiguration(this.configKey);
        // Resolve the env and config path values
        const delimiter = process.platform === 'win32' ? ';' : ':';
        const envInfo = this.getPathInfo(env, delimiter);
        const configInfo = this.getPathInfo(config, delimiter);
        // Merge the process and config paths
        const paths = [...envInfo.paths, ...configInfo.paths];
        env[envInfo.key] = paths
            .filter(path => !!path)
            .join(delimiter);
        return {
            cwd: root,
            env: env
        };
    }
    getPathInfo(obj, delimiter) {
        // Find a case insensitive path key
        const config = {
            key: Object.keys(obj).find(key => key.toLowerCase() === 'path'),
            paths: []
        };
        if (config.key) {
            // Then get the value and split by the OS delimiter
            const value = obj[config.key];
            if (value) {
                config.paths = value.split(delimiter);
            }
        }
        return config;
    }
}
exports.ProcessService = ProcessService;
//# sourceMappingURL=process-service.js.map