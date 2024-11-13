import { AtpAgent } from "@atproto/api";

async function newReply(
  replyText: string,
  bluesky_uri: string,
  bluesky_cid: string
) {
  // Create agent
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  // Login to Bluesky
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
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

export default newReply;
