import fs from "fs";

export default async function getLatest() {
  let latest = JSON.parse(fs.readFileSync("latest.json", "utf-8"));
  return latest["latest"];
}
