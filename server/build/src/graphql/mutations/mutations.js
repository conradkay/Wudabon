"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("./auth");
const list_1 = require("./list");
const task_1 = require("./task");
const project_1 = require("./project");
exports.mutations = Object.assign({}, list_1.listMutations, task_1.taskMutations, project_1.projectMutations, auth_1.authMutations);
//# sourceMappingURL=mutations.js.map