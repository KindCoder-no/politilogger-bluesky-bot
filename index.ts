//import { CronJob } from "cron";
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
  //await agent.login({ identifier: process.env.BLUESKY_USERNAME!, password: process.env.BLUESKY_PASSWORD!})
  /*const postData = await agent.post({
        text: "New test from api"
    });

    console.log(postData);
    console.log("Just posted!")*/

  /*const postData2 = await agent.getPosts({ uris: ["at://did:plc:tthp2kjhaq6itllpsuaq4pdo/app.bsky.feed.post/3laswksdhdf27"] });
    console.log(postData2.data);


    const reply = await agent.post({
        text: "Reply from api",
        reply: {
            parent: {
                uri: "at://did:plc:tthp2kjhaq6itllpsuaq4pdo/app.bsky.feed.post/3laswksdhdf27",
                cid: "bafyreic5gkgbv4ujmgwzbbwqk3rdysphbi5lkkyyk7szhuzqvpk77iaswm"
            },
            root: {
                uri: "at://did:plc:tthp2kjhaq6itllpsuaq4pdo/app.bsky.feed.post/3laswksdhdf27",
                cid: "bafyreidv26g444dcvgcx2dm4viyum2hh7thkbr2adugsl65hz7lfup36im"
            }
        }
    })

    console.log(reply);*/
}

main();

// Run this on a cron job
const scheduleExpressionMinute = "* * * * *"; // Run once every minute for testing
const scheduleExpression = "0 */3 * * *"; // Run once every three hours in prod

/*const newMessageCheckJob = new CronJob(
  scheduleExpressionMinute,
  newMessagesCheck
); // change to scheduleExpressionMinute for testing
const messageRecheckJob = new CronJob(scheduleExpressionMinute, messageRecheck);
newMessageCheckJob.start();
messageRecheckJob.start();*/
