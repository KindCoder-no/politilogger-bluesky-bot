import { AtpAgent, AtpSessionData, AtpSessionEvent } from "@atproto/api";
import fs from "fs";

async function loginClient() {
  // Create agent
  const agent = new AtpAgent({
    service: "https://bsky.social",
    persistSession: (evt: AtpSessionEvent, sess?: AtpSessionData) => {
      console.log("Session event:", evt);
      if (evt === "create") {
        console.log("Session data:", sess);
        // store the session-data for reuse

        // Example:
        fs.writeFileSync("session.json", JSON.stringify(sess));
      }
    },
  });

  // Login to Bluesky
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });
  return agent;
}

export default loginClient;
