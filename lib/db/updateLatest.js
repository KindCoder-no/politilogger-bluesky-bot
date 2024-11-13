"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function updateLatest(id) {
    let latest = JSON.parse(fs_1.default.readFileSync("latest.json", "utf-8"));
    latest["latest"] = id;
    fs_1.default.writeFileSync("latest.json", JSON.stringify(latest));
}
exports.default = updateLatest;
