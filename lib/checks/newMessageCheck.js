"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newPost_1 = __importDefault(require("../bsky/newPost"));
const addRecheck_1 = __importDefault(require("../db/addRecheck"));
const getLatest_1 = __importDefault(require("../db/getLatest"));
const updateLatest_1 = __importDefault(require("../db/updateLatest"));
const fetchLatestPoliceUpdate_1 = __importDefault(require("../police-api/fetchLatestPoliceUpdate"));
async function newMessagesCheck() {
    // Fetch latest police updates
    const getPoliceUpdates = await (0, fetchLatestPoliceUpdate_1.default)();
    // Get the latest police update
    const latestPoliceUpdate = getPoliceUpdates.messageThreads[0];
    if (latestPoliceUpdate.id != (await (0, getLatest_1.default)())) {
        // Generate message text
        let message_text = "";
        let hashtags = [];
        if (latestPoliceUpdate.area) {
            message_text =
                "#" +
                    latestPoliceUpdate.municipality +
                    " #" +
                    latestPoliceUpdate.area +
                    " #" +
                    latestPoliceUpdate.category +
                    " " +
                    latestPoliceUpdate.messages[0].text;
            hashtags = [
                "#" + latestPoliceUpdate.municipality,
                "#" + latestPoliceUpdate.area,
                "#" + latestPoliceUpdate.category,
            ];
        }
        else {
            message_text =
                "#" +
                    latestPoliceUpdate.municipality +
                    " #" +
                    latestPoliceUpdate.category +
                    " " +
                    latestPoliceUpdate.messages[0].text;
            hashtags = [
                "#" + latestPoliceUpdate.municipality,
                "#" + latestPoliceUpdate.category,
            ];
        }
        // Limit the message to max 280 characters
        if (message_text.length > 280) {
            message_text = message_text.slice(0, 295) + "...";
        }
        // Send the new post to Bluesky
        const postData = await (0, newPost_1.default)(message_text, hashtags);
        //console.log(postData);
        (0, updateLatest_1.default)(latestPoliceUpdate.id);
        if (latestPoliceUpdate.isActive) {
            (0, addRecheck_1.default)(latestPoliceUpdate.id, latestPoliceUpdate.messages[0].id, postData.uri, postData.cid);
        }
        console.log("New message posted");
        return;
    }
    else {
        console.log("No new messages");
        return;
    }
}
exports.default = newMessagesCheck;
