"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("../schemas/schema");
exports.default = {
    createSchedule: {
        handler: "src/functions/schedules/createSchedule.handler",
        events: [
            {
                http: {
                    method: "post",
                    path: "schedules",
                    request: {
                        schemas: {
                            "application/json": schema_1.scheduleSchema,
                        },
                    },
                },
            },
        ],
    },
    listSchedules: {
        handler: "src/functions/schedules/listSchedules.handler",
        events: [
            {
                http: {
                    method: "get",
                    path: "schedules",
                },
            },
        ],
    },
    getScheduleById: {
        handler: "src/functions/schedules/getSchedule.handler",
        events: [
            {
                http: {
                    method: "get",
                    path: "schedules/{id}",
                },
            },
        ],
    },
    updateScheduleById: {
        handler: "src/functions/schedules/updateSchedule.handler",
        events: [
            {
                http: {
                    method: "put",
                    path: "schedules/{id}",
                },
            },
        ],
    },
    deleteScheduleById: {
        handler: "src/functions/schedules/deleteSchedule.handler",
        events: [
            {
                http: {
                    method: "delete",
                    path: "schedules/{id}",
                },
            },
        ],
    },
};
//# sourceMappingURL=schedules.js.map