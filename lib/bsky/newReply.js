"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
async function newReply(replyText, bluesky_uri, bluesky_cid) {
    // Create agent
    const agent = new api_1.AtpAgent({
        service: "https://bsky.social",
    });
    // Login to Bluesky
    await agent.login({
        identifier: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD,
    });
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
