import fs from "fs";

async function updateLatest(id: string) {
  let latest = JSON.parse(fs.readFileSync("latest.json", "utf-8"));
  latest["latest"] = id;
  fs.writeFileSync("latest.json", JSON.stringify(latest));
}

export default updateLatest;
