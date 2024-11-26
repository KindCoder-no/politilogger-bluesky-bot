"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
const fs_1 = __importDefault(require("fs"));
const loginClient_1 = __importDefault(require("./loginClient"));
async function newReply(replyText, bluesky_uri, bluesky_cid) {
    // Create agent
    const agent = new api_1.AtpAgent({
        service: "https://bsky.social",
    });
    // Get session data from the agent
    let sessionData = fs_1.default.readFileSync("session.json", "utf-8");
    // If the session data is not available, throw an error
    if (!sessionData) {
        await (0, loginClient_1.default)();
        sessionData = fs_1.default.readFileSync("session.json", "utf-8");
    }
    // Restore the session data
    await agent.resumeSession(JSON.parse(sessionData));
    const replyData = await agent.post({
        text: replyText,
        reply: {
            parent: {
                uri: bluesky_uri,
                cid: bluesky_cid,
            },
            root: {
                uri: bluesky_uri,
                cid: bluesky_cid,
            },
        },
    });
    return replyData;
}
exports.default = newReply;
