import * as dotenv from "dotenv";
import databaseCheck from "./lib/checks/database-check";
import messageRecheck from "./lib/checks/messageRecheck";
import newMessagesCheck from "./lib/checks/newMessageCheck";

dotenv.config();

async function main() {
  await databaseCheck();
  console.log("Database check done!");

  console.log("Starting new messages check...");

  setInterval(async () => {
    await newMessagesCheck();

    await messageRecheck();
  }, 10 * 1000);
}

main();
