"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middyfy = void 0;
var core_1 = require("@middy/core");
var http_json_body_parser_1 = require("@middy/http-json-body-parser");
var middyfy = function (handler) {
    return (0, core_1.default)(handler).use((0, http_json_body_parser_1.default)());
};
exports.middyfy = middyfy;
//# sourceMappingURL=lambda.js.map