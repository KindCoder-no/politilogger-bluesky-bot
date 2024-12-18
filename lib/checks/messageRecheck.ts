import newReply from "../bsky/newReply";
import { log_success, log_warning } from "../console";
import getRechecks from "../db/getRechecks";
import removeRecheckByPoliceId from "../db/removeRecheckByPoliceId";
import updateRecheckLatestMessage from "../db/updateRecheckLatestMessage";
import fetchPoliceUpdateById from "../police-api/fetchPoliceUpdateById";

async function messageRecheck() {
  // Get messages to recheck
  const rechecks = await getRechecks();

  for (let check of rechecks) {
    const police_check = await fetchPoliceUpdateById(check.police_id);

    const policeMessages = police_check.messages;

    if (check.last_message_id != policeMessages[policeMessages.length - 1].id) {
      log_success("New message found");

      const currentLastMessageId = Number(check.last_message_id.split("-")[1]);

      const newMessageData = policeMessages[currentLastMessageId + 1];

      let message_text = "";

      if (!newMessageData) {
        log_warning("Message not found, removing recheck");
        await removeRecheckByPoliceId(check.police_id);
        return;
      }

      // Limit the message to max 280 characters
      if (newMessageData.text.length > 280) {
        message_text = newMessageData.text.slice(0, 295) + "...";
      } else {
        message_text = newMessageData.text;
      }

      // Send the new post to Bluesky
      const reply = await newReply(
        message_text,
        check.bluesky_uri,
        check.bluesky_cid
      );

      if (reply) {
        log_success("Reply sent");
        await updateRecheckLatestMessage(check.police_id, newMessageData.id);

        if (police_check.isActive == false) {
          log_warning("Message is no longer active, removing recheck");
          await removeRecheckByPoliceId(check.police_id);
        }
      }
    } else if (police_check.isActive == false) {
      log_warning("Message is no longer active, removing recheck");
      await removeRecheckByPoliceId(check.police_id);
    }
  }

  return;
}

export default messageRecheck;
