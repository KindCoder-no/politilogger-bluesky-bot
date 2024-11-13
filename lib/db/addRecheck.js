"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function addRecheck(police_id, last_message_id, bluesky_uri, bluesky_cid) {
    let rechecks = JSON.parse(fs_1.default.readFileSync("rechecks.json", "utf-8"));
    rechecks.push({ police_id, last_message_id, bluesky_uri, bluesky_cid });
    fs_1.default.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}
exports.default = addRecheck;
