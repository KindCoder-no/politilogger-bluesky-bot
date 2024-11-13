import fs from "fs";
import { log_warning } from "../console";

export default async function databaseCheck() {
  // Check if latest.json exists
  await latestDatabaseCheck();

  await rechecksDatabaseCheck();

  return;
}

async function latestDatabaseCheck() {
  // Check if latest.json exists
  if (!fs.existsSync("latest.json")) {
    log_warning("latest.json does not exist, creating file");
    fs.writeFileSync("latest.json", JSON.stringify({ latest: "" }));
    return;
  } else {
    return;
  }
}

async function rechecksDatabaseCheck() {
  // Check if rechecks.json exists
  if (!fs.existsSync("rechecks.json")) {
    log_warning("rechecks.json does not exist, creating file");
    fs.writeFileSync("rechecks.json", JSON.stringify([]));
    return;
  } else {
    return;
  }
}
