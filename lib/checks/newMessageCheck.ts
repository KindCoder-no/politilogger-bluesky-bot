import newPost from "../bsky/newPost";
import addRecheck from "../db/addRecheck";
import getLatest from "../db/getLatest";
import updateLatest from "../db/updateLatest";
import fetchLatestPoliceUpdate from "../police-api/fetchLatestPoliceUpdate";

async function newMessagesCheck() {
  // Fetch latest police updates
  const getPoliceUpdates = await fetchLatestPoliceUpdate();

  // Get the latest police update
  const latestPoliceUpdate = getPoliceUpdates.messageThreads[0];

  if (latestPoliceUpdate.id != (await getLatest())) {
    // Generate message text
    let message_text = "";
    let hashtags: string[] = [];

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
    } else {
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
    const postData = await newPost(message_text, hashtags);

    //console.log(postData);

    updateLatest(latestPoliceUpdate.id);

    if (latestPoliceUpdate.isActive) {
      addRecheck(
        latestPoliceUpdate.id,
        latestPoliceUpdate.messages[0].id,
        postData.uri,
        postData.cid
      );
    }

    console.log("New message posted");
    return;
  } else {
    console.log("No new messages");
    return;
  }
}

export default newMessagesCheck;
