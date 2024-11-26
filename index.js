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
const dotenv = __importStar(require("dotenv"));
const loginClient_1 = __importDefault(require("./lib/bsky/loginClient"));
const database_check_1 = __importDefault(require("./lib/checks/database-check"));
const messageRecheck_1 = __importDefault(require("./lib/checks/messageRecheck"));
const newMessageCheck_1 = __importDefault(require("./lib/checks/newMessageCheck"));
const console_1 = require("./lib/console");
dotenv.config();
async function main() {
    await (0, database_check_1.default)();
    (0, console_1.log_success)("Database check done!");
    (0, console_1.log_success)("Running");
    // Create agent
    await (0, loginClient_1.default)();
    setInterval(async () => {
        await (0, newMessageCheck_1.default)();
        await (0, messageRecheck_1.default)();
    }, 10 * 1000);
}
main();
