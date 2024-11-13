import fs from "fs";

async function getRechecks() {
  let rechecks = JSON.parse(fs.readFileSync("rechecks.json", "utf-8"));
  return rechecks;
}

export default getRechecks;
