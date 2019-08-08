"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = require("../../models/Project");
const User_1 = require("../../models/User");
exports.queries = {
    projects: async (obj, args, context, info) => {
        const projects = await Project_1.ProjectModel.find({
            _id: {
                $in: args.ids
            }
        });
        return projects.map((proj) => proj.toObject()) || [];
    },
    projectById: async (obj, args, context, info) => {
        const proj = await Project_1.ProjectModel.findOne({ id: args.id });
        if (proj) {
            return proj.toObject();
        }
        throw new Error('proj not found');
    },
    user: async (obj, args, context) => {
        const user = await User_1.UserModel.findOne({ id: args.id });
        if (user) {
            const userWithProjects = await user.populate('projects').execPopulate();
            const newProjects = userWithProjects.projects.map((proj) => proj.toObject());
            const returning = Object.assign({}, user.toObject(), { projects: newProjects });
            return returning;
        }
        throw new Error('proj not found');
    }
};
//# sourceMappingURL=queries.js.map