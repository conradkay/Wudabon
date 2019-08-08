"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = require("./../../models/User");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const User_2 = require("../../models/User");
const Project_1 = require("../../models/Project");
const data_1 = require("../../data");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const apollo_server_core_1 = require("apollo-server-core");
const uuid_1 = tslib_1.__importDefault(require("uuid"));
const loginWithCookie = async (parent, obj, context) => {
    if (!context.userId) {
        throw new apollo_server_core_1.AuthenticationError('no token man');
    }
    const user = await User_2.UserModel.findOne({
        id: context.userId.id
    });
    if (!user) {
        throw new apollo_server_core_1.AuthenticationError('Token Corrupt!');
    }
    const projects = await Project_1.ProjectModel.find({ id: user.projects });
    return {
        user: Object.assign({}, user.toObject(), { projects: projects.map((proj) => proj.toObject()) })
    };
};
const login = async (parent, obj, context) => {
    const user = await User_2.UserModel.findOne({ email: obj.email });
    if (user) {
        const passwordMatch = await User_1.comparePassword(obj.password, user.password);
        if (passwordMatch) {
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.PRIVATE, {
                expiresIn: '1d'
            });
            context.res.cookie('auth-token', token, { httpOnly: true });
            const projects = await Project_1.ProjectModel.find({ id: user.projects });
            return {
                user: Object.assign({}, user.toObject(), { projects: projects.map((proj) => proj.toObject()) })
            };
        }
        throw new apollo_server_core_1.AuthenticationError('Incorrect Password');
    }
    throw new apollo_server_core_1.AuthenticationError('User with Email does not exist!');
};
const register = async (parent, obj, context) => {
    const salt = await bcryptjs_1.default.genSalt(10);
    const password = await bcryptjs_1.default.hash(obj.password, salt);
    const projectId = uuid_1.default();
    const userId = uuid_1.default();
    const ids = [];
    for (let i = 0; i < 16; i += 1) {
        ids.push(uuid_1.default());
    }
    await Project_1.ProjectModel.create(data_1.projectData(ids, data_1.taskObjects(ids), userId, projectId));
    let newUser = await User_2.UserModel.create({
        password,
        id: userId,
        email: obj.email,
        username: obj.username,
        projects: [projectId],
        profileImg: 'https://mb.cision.com/Public/12278/2797280/879bd164c711a736_800x800ar.png'
    });
    newUser = newUser.toObject();
    if (context.res) {
        const token = jsonwebtoken_1.default.sign({ id: newUser.id }, process.env.PRIVATE, {
            expiresIn: '1d'
        });
        context.res.cookie('auth-token', token, { httpOnly: true });
    }
    if (newUser) {
        let projects = await Project_1.ProjectModel.find({
            id: { $in: newUser.projects }
        });
        projects = projects.map((proje) => proje.toObject());
        return {
            user: Object.assign({}, newUser, { projects: projects })
        };
    }
    else {
        console.log('wtf the fuck');
        throw new Error('email already in use');
    }
};
const logout = async (parent, obj, context) => {
    context.res.clearCookie('auth-token');
    return { message: 'logged out' };
};
exports.authMutations = { login, register, logout, loginWithCookie };
//# sourceMappingURL=auth.js.map