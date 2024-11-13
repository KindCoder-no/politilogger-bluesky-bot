"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function fetchPoliceUpdateById(id) {
    let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://politiloggen-vis-frontend.bks-prod.politiet.no/api/messagethread/getbyid?id=" +
            id,
        headers: {},
    };
    let response = await (0, axios_1.default)(config);
    return response.data;
}
exports.default = fetchPoliceUpdateById;
