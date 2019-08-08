"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ProjectSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    ownerId: String,
    lists: [
        {
            taskIds: [String],
            name: { type: String, required: true },
            id: { type: String, required: true }
        }
    ],
    tasks: [
        {
            progress: { type: Number, required: true },
            security: {
                public: Boolean,
                assignedUsers: [String]
            },
            id: { type: String, required: true },
            name: { type: String, required: true },
            points: { type: Number, required: true },
            timeWorkedOn: { type: Number, required: true },
            color: { type: String, required: true },
            dueDate: Date,
            startDate: Date,
            comments: [
                {
                    comment: { type: String, required: true },
                    dateAdded: { type: Date, required: true },
                    lastEdited: Date,
                    id: String
                }
            ],
            subTasks: [
                {
                    name: { type: String, required: true },
                    completed: { type: Boolean, required: true },
                    id: { type: String, required: true }
                }
            ],
            recurrance: {
                interval: Number,
                nextDue: Date
            }
        }
    ],
    users: [String],
    isPrivate: Boolean
});
exports.ProjectModel = mongoose_1.model('Project', exports.ProjectSchema, 'Projects');
//# sourceMappingURL=Project.js.map