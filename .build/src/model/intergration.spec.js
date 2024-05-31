"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var schedules_1 = require("./schedules");
var tasks_1 = require("./tasks");
var scheduleBody = {
    account_id: 101,
    agent_id: 44,
    start_time: "2024-06-01 09:00:00",
    end_time: "2024-06-01 17:00:00",
};
var mockTaskBody = {
    account_id: 101,
    start_time: "2024-06-01 09:00:00",
    duration: 2,
    type: "work",
};
describe("ScheduleServices", function () {
    var client;
    var scheduleServices;
    var id = "";
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, db_1.createDBClient)();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    scheduleServices = new schedules_1.ScheduleServices(client);
                    return [4 /*yield*/, scheduleServices.insertSchedule(scheduleBody)];
                case 2:
                    // Insert schedule
                    id = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Delete schedule by id after test
                return [4 /*yield*/, client.query("DELETE FROM schedules")];
                case 1:
                    // Delete schedule by id after test
                    _a.sent();
                    return [4 /*yield*/, client.end()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("list schedules and it should include the new inserted schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
        var listSchedules;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scheduleServices.listSchedules()];
                case 1:
                    listSchedules = _a.sent();
                    expect(listSchedules).toContainEqual(__assign(__assign({}, scheduleBody), { id: id, start_time: formatDateTime(scheduleBody.start_time), end_time: formatDateTime(scheduleBody.end_time) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("get schedule by id if it was created successfully", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getSchedule;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, scheduleServices.getScheduleById(id)];
                case 1:
                    getSchedule = _a.sent();
                    expect(getSchedule).toEqual(__assign(__assign({}, scheduleBody), { id: id, start_time: formatDateTime(scheduleBody.start_time), end_time: formatDateTime(scheduleBody.end_time) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("update and get schedule by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateScheduleBody, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    updateScheduleBody = {
                        account_id: 202,
                        agent_id: 55,
                        start_time: "2024-06-01 10:00:00",
                        end_time: "2024-06-01 18:00:00",
                    };
                    return [4 /*yield*/, scheduleServices.updateScheduleById(id, updateScheduleBody)];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, scheduleServices.getScheduleById(id)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toEqual(__assign(__assign({}, updateScheduleBody), { id: id, start_time: formatDateTime("2024-06-01 10:00:00"), end_time: formatDateTime("2024-06-01 18:00:00") }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("delete schedule by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, scheduleServices.deleteScheduleById(id)];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, scheduleServices.getScheduleById(id)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("TaskServices", function () {
    var client;
    var scheduleServices;
    var taskServices;
    var schedule_id = "";
    var id = "";
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, db_1.createDBClient)();
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    scheduleServices = new schedules_1.ScheduleServices(client);
                    taskServices = new tasks_1.TaskServices(client);
                    return [4 /*yield*/, scheduleServices.insertSchedule(scheduleBody)];
                case 2:
                    // Insert schedule for assinging to task
                    schedule_id = _a.sent();
                    return [4 /*yield*/, taskServices.insertTask(__assign(__assign({}, mockTaskBody), { schedule_id: schedule_id }))];
                case 3:
                    id = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Delete schedule and task by id after test
                return [4 /*yield*/, client.query("DELETE FROM schedules")];
                case 1:
                    // Delete schedule and task by id after test
                    _a.sent();
                    return [4 /*yield*/, client.query("DELETE FROM tasks")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, client.end()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("list tasks and it should include the new inserted tasks", function () { return __awaiter(void 0, void 0, void 0, function () {
        var listTasks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, taskServices.listTasks()];
                case 1:
                    listTasks = _a.sent();
                    expect(listTasks).toContainEqual(__assign(__assign({}, mockTaskBody), { id: id, schedule_id: schedule_id, start_time: formatDateTime(mockTaskBody.start_time) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("get task by id if it was created successfully", function () { return __awaiter(void 0, void 0, void 0, function () {
        var getTask;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, taskServices.getTaskById(id)];
                case 1:
                    getTask = _a.sent();
                    expect(getTask).toEqual(__assign(__assign({}, mockTaskBody), { id: id, schedule_id: schedule_id, start_time: formatDateTime(mockTaskBody.start_time) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("update and get task by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateTaskBody, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    updateTaskBody = {
                        schedule_id: schedule_id,
                        account_id: 222,
                        start_time: "2024-06-01 11:00:00",
                        duration: 2,
                        type: "break",
                    };
                    return [4 /*yield*/, taskServices.updateTaskById(id, updateTaskBody)];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, taskServices.getTaskById(id)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toEqual(__assign(__assign({}, updateTaskBody), { id: id, start_time: formatDateTime(updateTaskBody.start_time) }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("delete taske by id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, taskServices.deleteTaskById(id)];
                case 1:
                    _b.sent();
                    _a = expect;
                    return [4 /*yield*/, taskServices.getTaskById(id)];
                case 2:
                    _a.apply(void 0, [_b.sent()]).toBe(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
});
// Format date-time strings
function formatDateTime(dateTimeString) {
    return new Date(dateTimeString.replace(" ", "T") + "Z");
}
//# sourceMappingURL=intergration.spec.js.map