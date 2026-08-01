import app from "./app.js";
import { askAI } from "../ai/ask.js";

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
  //console.log(answer.choices[0].message)
  
  await client.chat.postMessage({
    channel: event.channel,
    thread_ts: event.ts,
    text: answer.choices[0].message.content
  });
  console.log("send");

  
});