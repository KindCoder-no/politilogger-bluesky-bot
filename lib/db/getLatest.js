"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getLatest;
const fs_1 = __importDefault(require("fs"));
async function getLatest() {
    let latest = JSON.parse(fs_1.default.readFileSync("latest.json", "utf-8"));
    return latest["latest"];
}
