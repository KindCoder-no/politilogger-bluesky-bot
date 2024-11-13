"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function removeRecheckByPoliceId(police_id) {
    let rechecks = JSON.parse(fs_1.default.readFileSync("rechecks.json", "utf-8"));
    // Remove the recheck with the given message ID
    rechecks = rechecks.filter((recheck) => recheck.police_id !== police_id);
    fs_1.default.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}
exports.default = removeRecheckByPoliceId;
