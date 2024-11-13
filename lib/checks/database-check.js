"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = databaseCheck;
const fs_1 = __importDefault(require("fs"));
const console_1 = require("../console");
async function databaseCheck() {
    // Check if latest.json exists
    await latestDatabaseCheck();
    await rechecksDatabaseCheck();
    return;
}
async function latestDatabaseCheck() {
    // Check if latest.json exists
    if (!fs_1.default.existsSync("latest.json")) {
        (0, console_1.log_warning)("latest.json does not exist, creating file");
        fs_1.default.writeFileSync("latest.json", JSON.stringify({ latest: "" }));
        return;
    }
    else {
        return;
    }
}
async function rechecksDatabaseCheck() {
    // Check if rechecks.json exists
    if (!fs_1.default.existsSync("rechecks.json")) {
        (0, console_1.log_warning)("rechecks.json does not exist, creating file");
        fs_1.default.writeFileSync("rechecks.json", JSON.stringify([]));
        return;
    }
    else {
        return;
    }
}
