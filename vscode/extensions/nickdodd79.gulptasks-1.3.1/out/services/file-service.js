"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const minimatch_1 = require("minimatch");
const constants_1 = require("../models/constants");
class FileService {
    discoverGulpFiles() {
        return new Promise((resolve, reject) => {
            // Use findFiles() in the workspace to get a list of potential files
            // Unfortunately, this is case sensitive so we need everything to filter manually
            vscode_1.workspace
                .findFiles('**/*')
                .then(uris => {
                // Load the settings used to discover the files
                const config = vscode_1.workspace.getConfiguration();
                this.settings = config.get(constants_1.EXTENSION_ID);
                // Convert and filter the results based on the filters setting
                const files = uris
                    .map(uri => {
                    return {
                        relativePath: vscode_1.workspace.asRelativePath(uri),
                        absolutePath: uri.fsPath
                    };
                })
                    .filter(file => this.shouldInclude(file));
                resolve(files);
            }, err => reject(err));
        });
    }
    isMatch(file, pattern) {
        // Match the file's relative path
        const result = minimatch_1.match([file.relativePath], pattern, {
            nocase: true,
            matchBase: true
        });
        // A non-empty result means a match has been found
        return result.length !== 0;
    }
    shouldInclude(file) {
        // First check the pattern is valid for the file
        if (!this.isMatch(file, this.settings.pattern)) {
            return false;
        }
        // Then check against the filters
        for (const filter of this.settings.filters) {
            if (!this.isMatch(file, filter)) {
                return false;
            }
        }
        return true;
    }
}
exports.FileService = FileService;
//# sourceMappingURL=file-service.js.map