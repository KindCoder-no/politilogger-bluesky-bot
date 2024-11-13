"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function getRechecks() {
    let rechecks = JSON.parse(fs_1.default.readFileSync("rechecks.json", "utf-8"));
    return rechecks;
}
exports.default = getRechecks;
