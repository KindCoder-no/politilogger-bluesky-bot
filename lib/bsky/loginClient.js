"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@atproto/api");
const fs_1 = __importDefault(require("fs"));
async function loginClient() {
    // Create agent
    const agent = new api_1.AtpAgent({
        service: "https://bsky.social",
        persistSession: (evt, sess) => {
            console.log("Session event:", evt);
            if (evt === "create") {
                console.log("Session data:", sess);
                // store the session-data for reuse
                // Example:
                fs_1.default.writeFileSync("session.json", JSON.stringify(sess));
            }
        },
    });
    // Login to Bluesky
    await agent.login({
        identifier: process.env.BLUESKY_USERNAME,
        password: process.env.BLUESKY_PASSWORD,
    });
    return agent;
}
exports.default = loginClient;
