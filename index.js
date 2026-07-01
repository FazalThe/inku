import dotenv from "dotenv";
import { App } from "@slack/bolt";
import { OpenRouter } from "@openrouter/sdk";

import { askAI } from "./ai/ask.js";

dotenv.config();

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

// Slack

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
})

app.command("/inku-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/inku - Ask questions
/who-is - Get a brief Intro of the person
/find-thread - Finds appropriate thread(s) for the query`
  });
});

/* app.command("/inku",async({ command, ack, respond })=>{
  await ack();

  const prompt = command.text;
  const aiResponse = await askAI(prompt);

  await respond({
    text: aiResponse.choices[0].message.content
  });

  
}); */

app.event("app_mention", async({ event, client }) => {
  console.log("mentioned");

  const replies = await client.conversations.replies({
    channel: event.channel,
    ts: event.thread_ts || event.ts 
  })

  await console.log(replies);

  const conversations = replies.messages
    .map(msg => `${msg.user}: ${msg.text}`)
    .join("\n");

  await console.log(conversations);

  const prompt = event.text
    .replace(/<@[^>]+>/, "")
    .trim();
  
  const answer = await askAI(prompt, conversations);

  await client.chat.postMessage({
    channel: event.channel,
    thread_ts: event.ts,
    text: answer.choices[0].message.content
  });
  console.log("send");
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();