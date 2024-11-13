"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newReply_1 = __importDefault(require("../bsky/newReply"));
const console_1 = require("../console");
const getRechecks_1 = __importDefault(require("../db/getRechecks"));
const removeRecheckByPoliceId_1 = __importDefault(require("../db/removeRecheckByPoliceId"));
const updateRecheckLatestMessage_1 = __importDefault(require("../db/updateRecheckLatestMessage"));
const fetchPoliceUpdateById_1 = __importDefault(require("../police-api/fetchPoliceUpdateById"));
async function messageRecheck() {
    // Get messages to recheck
    const rechecks = await (0, getRechecks_1.default)();
    for (let check of rechecks) {
        const police_check = await (0, fetchPoliceUpdateById_1.default)(check.police_id);
        const policeMessages = police_check.messages;
        if (check.last_message_id != policeMessages[policeMessages.length - 1].id) {
            (0, console_1.log_success)("New message found");
            const currentLastMessageId = Number(check.last_message_id.split("-")[1]);
            const newMessageData = policeMessages[currentLastMessageId + 1];
            if (!newMessageData) {
                (0, console_1.log_warning)("Message not found, removing recheck");
                await (0, removeRecheckByPoliceId_1.default)(check.police_id);
                return;
            }
            // Send the new post to Bluesky
            const reply = await (0, newReply_1.default)(newMessageData.text, check.bluesky_uri, check.bluesky_cid);
            if (reply) {
                (0, console_1.log_success)("Reply sent");
                await (0, updateRecheckLatestMessage_1.default)(check.police_id, newMessageData.id);
                if (police_check.isActive == false) {
                    (0, console_1.log_warning)("Message is no longer active, removing recheck");
                    await (0, removeRecheckByPoliceId_1.default)(check.police_id);
                }
            }
        }
        else if (police_check.isActive == false) {
            (0, console_1.log_warning)("Message is no longer active, removing recheck");
            await (0, removeRecheckByPoliceId_1.default)(check.police_id);
        }
    }
    return;
}
exports.default = messageRecheck;
