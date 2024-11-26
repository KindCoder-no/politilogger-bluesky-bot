"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
const fs_1 = __importDefault(require("fs"));
const loginClient_1 = __importDefault(require("./loginClient"));
async function newPost(postText, hashtags) {
    // Create agent
    const agent = new api_1.AtpAgent({
        service: "https://bsky.social",
    });
    // Login to Bluesky
    /*await agent.login({
      identifier: process.env.BLUESKY_USERNAME!,
      password: process.env.BLUESKY_PASSWORD!,
    });*/
    // Get session data from the agent
    let sessionData = fs_1.default.readFileSync("session.json", "utf-8");
    // If the session data is not available, throw an error
    if (!sessionData) {
        await (0, loginClient_1.default)();
        sessionData = fs_1.default.readFileSync("session.json", "utf-8");
    }
    // Restore the session data
    await agent.resumeSession(JSON.parse(sessionData));
    // Create facets for each hashtag
    const facets = hashtags.map((hashtag) => createHashtagFacet(postText, hashtag));
    const postData = await agent.post({
        text: postText,
        facets,
    });
    return postData;
}
// Function to create a facet for a single hashtag
function createHashtagFacet(text, hashtag) {
    const { start, end } = getByteOffsets(text, hashtag);
    return {
        index: {
            byteStart: start,
            byteEnd: end,
        },
        features: [
            {
                $type: "app.bsky.richtext.facet#tag",
                tag: hashtag.slice(1), // Remove '#' from the hashtag
            },
        ],
    };
}
// Function to calculate UTF-8 byte offsets for a substring
function getByteOffsets(text, substring) {
    const encoder = new TextEncoder();
    const encodedText = encoder.encode(text);
    const startIndex = text.indexOf(substring);
    if (startIndex === -1)
        throw new Error(`Substring "${substring}" not found in text`);
    const byteStart = encoder.encode(text.slice(0, startIndex)).length;
    const byteEnd = byteStart + encoder.encode(substring).length;
    return { start: byteStart, end: byteEnd };
}
exports.default = newPost;
