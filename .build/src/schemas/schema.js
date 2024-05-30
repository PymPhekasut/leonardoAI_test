"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskSchema = exports.scheduleSchema = void 0;
exports.scheduleSchema = {
    type: "object",
    properties: {
        account_id: { type: "number" },
        agent_id: { type: "number" },
        start_time: { type: "string" },
        end_time: { type: "string" },
    },
    required: [],
};
exports.taskSchema = {
    type: "object",
    properties: {
        account_id: { type: "number" },
        schedule_id: { type: "string" },
        start_time: { type: "string" },
        duration: { type: "number" },
        type: { type: "string" },
    },
    required: [],
};
//# sourceMappingURL=schema.js.map