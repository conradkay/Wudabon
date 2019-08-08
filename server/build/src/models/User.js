"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    profileImg: String,
    projects: [String],
    id: { type: String, required: true }
});
exports.getUserByEmail = async (email) => {
    return await exports.UserModel.findOne({ email });
};
exports.getUserById = async (id) => {
    return await exports.UserModel.findOne({ id: id });
};
exports.comparePassword = async (candidatePassword, hash) => {
    return await bcryptjs_1.default.compare(candidatePassword, hash);
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema, 'Users');
//# sourceMappingURL=User.js.map