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
var listSchedules_1 = require("../listSchedules");
var db_1 = require("../../../model/db");
var schedules_1 = require("../../../model/schedules");
var response_1 = require("../../../libs/response");
jest.mock("../../../model/db");
jest.mock("../../../model/schedules");
jest.mock("../../../libs/response");
var mockSchedules = [
    {
        id: "02064d32-7109-487f-8aa0-97718eaef2aa",
        account_id: 101,
        agent_id: 44,
        start_time: "2024-06-01 09:00:00",
        end_time: "2024-06-01 17:00:00",
    },
];
describe("handler", function () {
    var mockClient;
    var mockScheduleServices;
    beforeEach(function () {
        // Mock createDBClient and its return as mockClient
        mockClient = {
            connect: jest.fn(),
            end: jest.fn(),
        };
        db_1.createDBClient.mockReturnValue(mockClient);
    });
    afterEach(function () {
        jest.clearAllMocks();
    });
    it("should return 404 if no schedules found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock the model and fn
                    mockScheduleServices = {
                        listSchedules: jest.fn().mockResolvedValue(jest.fn().mockResolvedValue([])),
                    };
                    schedules_1.ScheduleServices.mockImplementation(function () { return mockScheduleServices; });
                    // Mock its response what should be returned
                    response_1.response.mockReturnValue({
                        statusCode: 404,
                        body: JSON.stringify({ message: "Not found schedule." }),
                    });
                    return [4 /*yield*/, (0, listSchedules_1.handler)()];
                case 1:
                    result = _a.sent();
                    expect(mockClient.connect).toHaveBeenCalled();
                    expect(schedules_1.ScheduleServices).toHaveBeenCalledWith(mockClient);
                    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
                    expect(response_1.response).toHaveBeenCalledWith(404, { message: "Not found schedule." });
                    expect(result).toEqual({
                        statusCode: 404,
                        body: JSON.stringify({ message: "Not found schedule." }),
                    });
                    expect(mockClient.end).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 200 with list of schedules", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock the model and fn
                    mockScheduleServices = {
                        listSchedules: jest.fn().mockResolvedValue(mockSchedules),
                    };
                    schedules_1.ScheduleServices.mockImplementation(function () { return mockScheduleServices; });
                    // Mock its response what should be returned
                    response_1.response.mockReturnValue({
                        statusCode: 200,
                        body: JSON.stringify({ schedules: mockSchedules }),
                    });
                    return [4 /*yield*/, (0, listSchedules_1.handler)()];
                case 1:
                    result = _a.sent();
                    expect(mockClient.connect).toHaveBeenCalled();
                    expect(schedules_1.ScheduleServices).toHaveBeenCalledWith(mockClient);
                    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
                    expect(response_1.response).toHaveBeenCalledWith(200, { schedules: mockSchedules });
                    expect(result).toEqual({
                        statusCode: 200,
                        body: JSON.stringify({ schedules: mockSchedules }),
                    });
                    expect(mockClient.end).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should return 500 if error occurs", function () { return __awaiter(void 0, void 0, void 0, function () {
        var error, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    error = new Error("Database error");
                    // Mock the model and fn
                    mockScheduleServices = {
                        listSchedules: jest.fn().mockRejectedValue(error),
                    };
                    schedules_1.ScheduleServices.mockImplementation(function () { return mockScheduleServices; });
                    // Mock its response what should be returned
                    response_1.response.mockReturnValue({
                        statusCode: 500,
                        body: JSON.stringify({ error: error }),
                    });
                    return [4 /*yield*/, (0, listSchedules_1.handler)()];
                case 1:
                    result = _a.sent();
                    expect(mockClient.connect).toHaveBeenCalled();
                    expect(schedules_1.ScheduleServices).toHaveBeenCalledWith(mockClient);
                    expect(mockScheduleServices.listSchedules).toHaveBeenCalled();
                    expect(response_1.response).toHaveBeenCalledWith(500, error);
                    expect(result).toEqual({ statusCode: 500, body: JSON.stringify({ error: error }) });
                    expect(mockClient.end).toHaveBeenCalled();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=listSchedules.spec.js.map