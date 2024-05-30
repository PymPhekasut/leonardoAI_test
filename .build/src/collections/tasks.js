"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("src/schemas/schema");
exports.default = {
    createTask: {
        handler: "src/functions/tasks/createTask.handler",
        events: [
            {
                http: {
                    method: "post",
                    path: "tasks",
                    request: {
                        schemas: {
                            "application/json": schema_1.taskSchema,
                        },
                    },
                },
            },
        ],
    },
    listTasks: {
        handler: "src/functions/tasks/listTasks.handler",
        events: [
            {
                http: {
                    method: "get",
                    path: "tasks",
                },
            },
        ],
    },
    getTaskById: {
        handler: "src/functions/tasks/getTask.handler",
        events: [
            {
                http: {
                    method: "get",
                    path: "tasks/{id}",
                },
            },
        ],
    },
    updateTaskById: {
        handler: "src/functions/tasks/updateTask.handler",
        events: [
            {
                http: {
                    method: "put",
                    path: "tasks/{id}",
                }
            },
        ],
    },
    deleteTaskById: {
        handler: "src/functions/tasks/deleteTask.handler",
        events: [
            {
                http: {
                    method: "delete",
                    path: "tasks/{id}",
                },
            },
        ],
    },
};
//# sourceMappingURL=tasks.js.map