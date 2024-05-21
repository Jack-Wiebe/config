"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXTENSION_ID = 'gulptasks';
exports.EXPLORER_ID = 'gulptasks:explorer';
exports.EXTENSION_NAME = 'Gulp Tasks';
var ExplorerNodeType;
(function (ExplorerNodeType) {
    ExplorerNodeType["Empty"] = "empty";
    ExplorerNodeType["Root"] = "root";
    ExplorerNodeType["File"] = "file";
    ExplorerNodeType["Task"] = "task";
})(ExplorerNodeType = exports.ExplorerNodeType || (exports.ExplorerNodeType = {}));
var ContextCommand;
(function (ContextCommand) {
    ContextCommand["Enabled"] = "gulptasks:enabled";
    ContextCommand["CanExecute"] = "gulptasks:canExecute";
    ContextCommand["CanTerminate"] = "gulptasks:canTerminate";
    ContextCommand["CanRestart"] = "gulptasks:canRestart";
})(ContextCommand = exports.ContextCommand || (exports.ContextCommand = {}));
var ActionCommand;
(function (ActionCommand) {
    ActionCommand["Select"] = "gulptasks:select";
    ActionCommand["Execute"] = "gulptasks:execute";
    ActionCommand["Terminate"] = "gulptasks:terminate";
    ActionCommand["Restart"] = "gulptasks:restart";
    ActionCommand["Refresh"] = "gulptasks:refresh";
})(ActionCommand = exports.ActionCommand || (exports.ActionCommand = {}));
//# sourceMappingURL=constants.js.map