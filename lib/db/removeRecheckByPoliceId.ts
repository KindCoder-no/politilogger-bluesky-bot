import fs from "fs";

async function removeRecheckByPoliceId(police_id: string) {
  let rechecks = JSON.parse(fs.readFileSync("rechecks.json", "utf-8"));
  // Remove the recheck with the given message ID
  rechecks = rechecks.filter((recheck) => recheck.police_id !== police_id);
  fs.writeFileSync("rechecks.json", JSON.stringify(rechecks));
}

export default removeRecheckByPoliceId;
