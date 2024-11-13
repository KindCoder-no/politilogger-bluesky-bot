import * as dotenv from "dotenv";
import databaseCheck from "./lib/checks/database-check";
import messageRecheck from "./lib/checks/messageRecheck";
import newMessagesCheck from "./lib/checks/newMessageCheck";
import { log_success } from "./lib/console";

dotenv.config();

async function main() {
  await databaseCheck();
  log_success("Database check done!");

  log_success("Starting main loop");

  setInterval(async () => {
    await newMessagesCheck();

    await messageRecheck();
  }, 10 * 1000);
}

main();
