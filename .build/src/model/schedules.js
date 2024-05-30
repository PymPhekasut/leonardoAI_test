"use strict";
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
exports.ScheduleServices = void 0;
var uuid_1 = require("uuid");
var ScheduleServices = /** @class */ (function () {
    function ScheduleServices(client) {
        this.client = client;
    }
    ScheduleServices.prototype.insertSchedule = function (schedules) {
        return __awaiter(this, void 0, void 0, function () {
            var id, query, values, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = (0, uuid_1.v4)();
                        query = "\n    INSERT INTO schedules (\n      id, \n      account_id, \n      agent_id, \n      start_time, \n      end_time\n      ) \n    VALUES ($1, $2, $3, $4, $5);\n  ";
                        values = [
                            id,
                            schedules.account_id,
                            schedules.agent_id,
                            schedules.start_time,
                            schedules.end_time,
                        ];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.query(query, values)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, id];
                    case 3:
                        error_1 = _a.sent();
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleServices.prototype.listSchedules = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM schedules;";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.query(query)];
                    case 2:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                    case 3:
                        error_2 = _a.sent();
                        throw error_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleServices.prototype.getScheduleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, rows, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * FROM schedules WHERE id = $1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.query(query, [id])];
                    case 2:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows[0]];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleServices.prototype.deleteScheduleById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM schedules WHERE id = $1";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.query(query, [id])];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_4 = _a.sent();
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ScheduleServices.prototype.updateScheduleById = function (id, schedules) {
        return __awaiter(this, void 0, void 0, function () {
            var values, setClause, account_id, agent_id, start_time, end_time, query, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        values = [];
                        setClause = "";
                        account_id = schedules.account_id, agent_id = schedules.agent_id, start_time = schedules.start_time, end_time = schedules.end_time;
                        if (account_id !== undefined) {
                            setClause += "account_id = $1, ";
                            values.push(account_id);
                        }
                        if (agent_id !== undefined) {
                            setClause += "agent_id = $" + (values.length + 1) + ", ";
                            values.push(agent_id);
                        }
                        if (start_time !== undefined) {
                            setClause += "start_time = $" + (values.length + 1) + ", ";
                            values.push(start_time);
                        }
                        if (end_time !== undefined) {
                            setClause += "end_time = $" + (values.length + 1) + ", ";
                            values.push(end_time);
                        }
                        values.push(id);
                        query = "\n      UPDATE schedules\n      SET ".concat(setClause.slice(0, -2), " \n      WHERE id = $").concat(values.length, ";");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.client.query(query, values)];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_5 = _a.sent();
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ScheduleServices;
}());
exports.ScheduleServices = ScheduleServices;
//# sourceMappingURL=schedules.js.map