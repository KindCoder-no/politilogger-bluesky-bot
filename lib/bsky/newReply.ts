import { AtpAgent } from "@atproto/api";
import fs from "fs";
import loginClient from "./loginClient";

async function newReply(
  replyText: string,
  bluesky_uri: string,
  bluesky_cid: string
) {
  // Create agent
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  // Get session data from the agent
  let sessionData = fs.readFileSync("session.json", "utf-8");

  // If the session data is not available, throw an error
  if (!sessionData) {
    await loginClient();
    sessionData = fs.readFileSync("session.json", "utf-8");
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

export default newReply;
