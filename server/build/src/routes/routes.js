"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const User_1 = require("../models/User");
const router = express_1.default.Router();
const USER_ROUTE_PATH = '/user';
exports.getUser = async (req, res) => {
    const user = await User_1.UserModel.findOne({ id: req.body.id });
    const userWithProjects = await user.populate('projects').execPopulate();
    const newProjects = userWithProjects.projects;
    const returning = Object.assign({}, user.toObject(), { projects: newProjects });
    return returning;
};
const getUserHandler = async (req, res, next) => {
    try {
        const data = await exports.getUser(req, res);
        res.json({ data });
    }
    catch (err) {
        next(err);
    }
};
router.get(USER_ROUTE_PATH, getUserHandler);
exports.default = router;
//# sourceMappingURL=routes.js.map