import newReply from "../bsky/newReply";
import getRechecks from "../db/getRechecks";
import removeRecheckByPoliceId from "../db/removeRecheckByPoliceId";
import updateRecheckLatestMessage from "../db/updateRecheckLatestMessage";
import fetchPoliceUpdateById from "../police-api/fetchPoliceUpdateById";

async function messageRecheck() {
  // Get messages to recheck
  console.log("Checking for new messages to recheck");
  const rechecks = await getRechecks();

  for (let check of rechecks) {
    //console.log(check);
    const police_check = await fetchPoliceUpdateById(check.police_id);
    //console.log(police_check);

    const policeMessages = police_check.messages;

    if (check.last_message_id != policeMessages[policeMessages.length - 1].id) {
      console.log("New message found");

      const currentLastMessageId = Number(check.last_message_id.split("-")[1]);

      const newMessageData = policeMessages[currentLastMessageId + 1];

      // Send the new post to Bluesky
      const reply = await newReply(
        newMessageData.text,
        check.bluesky_uri,
        check.bluesky_cid
      );

      if (reply) {
        console.log("Reply sent");
        await updateRecheckLatestMessage(check.police_id, newMessageData.id);

        if (police_check.isActive == false) {
          console.log("Message is no longer active");
          await removeRecheckByPoliceId(check.police_id);
        }
      }
    } else if (police_check.isActive == false) {
      console.log("Message is no longer active");
      await removeRecheckByPoliceId(check.police_id);
    }
  }

  return;
}

export default messageRecheck;
