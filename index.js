import "./config/env.js";

import app from "./slack/app.js";
//import client from "./ai/client.js";

import "./slack/events.js";
import "./slack/commands.js";

import { askAI } from "./ai/ask.js";




(async () => {
  await app.start();
  console.log("bot is running!");
})();