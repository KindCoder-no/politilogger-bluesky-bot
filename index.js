"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { CronJob } from "cron";
const dotenv = __importStar(require("dotenv"));
const database_check_1 = __importDefault(require("./lib/checks/database-check"));
const messageRecheck_1 = __importDefault(require("./lib/checks/messageRecheck"));
const newMessageCheck_1 = __importDefault(require("./lib/checks/newMessageCheck"));
dotenv.config();
async function main() {
    await (0, database_check_1.default)();
    console.log("Database check done!");
    console.log("Starting new messages check...");
    setInterval(async () => {
        await (0, newMessageCheck_1.default)();
        await (0, messageRecheck_1.default)();
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
