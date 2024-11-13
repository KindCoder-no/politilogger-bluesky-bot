import fs from "fs";

async function updateRecheckLatestMessage(
  police_id: string,
  last_message_id: string
) {
  let rechecks = JSON.parse(fs.readFileSync("rechecks.json", "utf-8"));
  // Find the recheck with the given message ID and update the last message ID
  rechecks = rechecks.map((recheck) => {
    if (recheck.police_id === police_id) {
      recheck.last_message_id = last_message_id;
    }
    return recheck;
  });
  fs.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}

export default updateRecheckLatestMessage;
