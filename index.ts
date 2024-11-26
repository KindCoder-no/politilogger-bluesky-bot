import * as dotenv from "dotenv";
import loginClient from "./lib/bsky/loginClient";
import databaseCheck from "./lib/checks/database-check";
import messageRecheck from "./lib/checks/messageRecheck";
import newMessagesCheck from "./lib/checks/newMessageCheck";
import { log_success } from "./lib/console";
dotenv.config();

async function main() {
  await databaseCheck();
  log_success("Database check done!");

  log_success("Running");

  // Create agent
  await loginClient();

  setInterval(async () => {
    await newMessagesCheck();

    await messageRecheck();
  }, 10 * 1000);
}

main();
