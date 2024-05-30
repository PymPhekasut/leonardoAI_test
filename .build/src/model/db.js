"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBClient = void 0;
var pg_1 = require("pg");
var dotenv = require("dotenv");
dotenv.config();
var createDBClient = function () {
    return new pg_1.Client({
        user: process.env.DB_USER_NAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT || "5432"),
    });
};
exports.createDBClient = createDBClient;
//# sourceMappingURL=db.js.map