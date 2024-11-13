"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
async function updateRecheckLatestMessage(police_id, last_message_id) {
    let rechecks = JSON.parse(fs_1.default.readFileSync("rechecks.json", "utf-8"));
    // Find the recheck with the given message ID and update the last message ID
    rechecks = rechecks.map((recheck) => {
        if (recheck.police_id === police_id) {
            recheck.last_message_id = last_message_id;
        }
        return recheck;
    });
    fs_1.default.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}
exports.default = updateRecheckLatestMessage;
