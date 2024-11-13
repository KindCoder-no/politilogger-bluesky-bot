import { AtpAgent } from "@atproto/api";

async function newPost(postText: string, hashtags: string[]) {
  // Create agent
  const agent = new AtpAgent({
    service: "https://bsky.social",
  });

  // Login to Bluesky
  await agent.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  // Create facets for each hashtag
  const facets = hashtags.map((hashtag) =>
    createHashtagFacet(postText, hashtag)
  );

  const postData = await agent.post({
    text: postText,
    facets,
  });

  return postData;
}

// Function to create a facet for a single hashtag
function createHashtagFacet(text: string, hashtag: string): any {
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
function getByteOffsets(
  text: string,
  substring: string
): { start: number; end: number } {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);
  const startIndex = text.indexOf(substring);

  if (startIndex === -1)
    throw new Error(`Substring "${substring}" not found in text`);

  const byteStart = encoder.encode(text.slice(0, startIndex)).length;
  const byteEnd = byteStart + encoder.encode(substring).length;

  return { start: byteStart, end: byteEnd };
}

export default newPost;
