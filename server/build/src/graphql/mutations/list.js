"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Project_1 = require("../../models/Project");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const editList = async (parent, obj) => {
    const project = await Project_1.ProjectModel.findOne({ id: obj.projId });
    if (project) {
        const list = project.lists.find((l) => {
            return l.id === obj.listId;
        });
        list.name = obj.newList.name || list.name;
        list.taskIds = obj.newList.taskIds || list.taskIds;
        const newProj = await project.save();
        const pure = newProj.toObject();
        if (pure) {
            return {
                project: pure,
                list: newProj.lists.find((l) => l.id === obj.listId)
            };
        }
    }
    throw new Error('proj not found');
};
const deleteList = async (parent, obj) => {
    const project = await Project_1.ProjectModel.findOne({ id: obj.projId });
    if (project && project.lists.length > 1) {
        project.lists.find((l) => l.id === obj.id).remove();
        await project.save();
        return { id: obj.id };
    }
    else {
        throw new Error('cant delete last list!');
    }
};
const createList = async (parent, obj) => {
    const newId = uuid_1.default();
    const project = await Project_1.ProjectModel.findOne({ id: obj.projId });
    if (project) {
        project.lists.push({
            id: newId,
            name: obj.name || 'new list',
            taskIds: []
        });
        const newProj = await project.save();
        const pure = newProj.toObject();
        if (pure) {
            return {
                project: pure,
                list: newProj.lists.find((l) => l.id === newId).toObject()
            };
        }
    }
    throw new Error('proj not found');
};
exports.listMutations = {
    editList,
    deleteList,
    createList
};
//# sourceMappingURL=list.js.map