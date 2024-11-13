import fs from "fs";

async function addRecheck(
  police_id,
  last_message_id,
  bluesky_uri,
  bluesky_cid
) {
  let rechecks = JSON.parse(fs.readFileSync("rechecks.json", "utf-8"));
  rechecks.push({ police_id, last_message_id, bluesky_uri, bluesky_cid });
  fs.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}

export default addRecheck;
