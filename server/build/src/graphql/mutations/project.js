"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_core_1 = require("apollo-server-core");
const User_1 = require("./../../models/User");
const Project_1 = require("../../models/Project");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const createProject = async (parent, args, context) => {
    const creatingId = uuid_1.default();
    const colId = uuid_1.default();
    const user = await User_1.UserModel.findOne({ id: context.userId.id });
    if (user) {
        user.projects.push(creatingId);
        const [created] = await Promise.all([
            Project_1.ProjectModel.create({
                id: creatingId,
                name: args.name,
                ownerId: user.id,
                users: [user.id],
                lists: [
                    {
                        id: colId,
                        name: 'Generic',
                        taskIds: []
                    }
                ],
                tasks: [],
                enrolledUsers: [],
                columnOrder: [colId],
                isPrivate: false
            }),
            user.save()
        ]);
        if (created) {
            return created.toObject();
        }
    }
    throw new apollo_server_core_1.AuthenticationError('user id not provided in token');
};
const editProject = async (parent, args) => {
    if (args.id) {
        const project = await Project_1.ProjectModel.findOne({ id: args.id });
        if (project) {
            project.name = args.newProj.name ? args.newProj.name : project.name;
            const newProj = await project.save();
            if (newProj) {
                return newProj.toObject();
            }
        }
    }
    return null;
};
const deleteProject = async (parent, obj) => {
    const deleted = await Project_1.ProjectModel.findByIdAndDelete(obj.id);
    if (deleted) {
        return {
            id: deleted._id
        };
    }
    throw new Error('proj not found');
};
const joinProject = async () => {
    throw new Error('proj not found');
};
const leaveProject = async () => {
    throw new Error('proj not found');
};
const removeMemberFromProject = async () => {
    throw new Error('proj not found');
};
exports.projectMutations = {
    createProject,
    editProject,
    deleteProject,
    joinProject,
    leaveProject,
    removeMemberFromProject
};
//# sourceMappingURL=project.js.map