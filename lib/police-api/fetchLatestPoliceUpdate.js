"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function fetchLatestPoliceUpdate() {
    const data = JSON.stringify({
        category: [],
        skip: 0,
        //sortByEnum: "LastMessageOn",
        take: 1,
    });
    let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://politiloggen-vis-frontend.bks-prod.politiet.no/api/messagethread",
        headers: {
            "Content-Type": "application/json",
        },
        data: data,
    };
    let response = await (0, axios_1.default)(config);
    return response.data;
}
exports.default = fetchLatestPoliceUpdate;
