import client from "./client.js";

import { tools } from "./tools.js"


const messages = [
  {
    role: "system",
    content: `
    You are Inku.
    You are an AI assistant for Slack.
    Answer using the provided Slack conversation.
    In the conversation U0A0LCKQH4J is yourself.
    If the answer isn't in the conversation, say you don't know.
    Do not invent information.
    But if its a general question, you can answer.
    `
    
  },
  {
    role: "user",
    content: `
    slack thread:
    ${conversations}
    
    Query:
    ${prompt}
    `
  }
];


export async function askAI(prompt, conversations) {
  console.log(prompt);
  const response = await client.chat.send({
    chatRequest: {
      model: "google/gemini-3.5-flash",
      messages,
      tools,
      stream: false,
    },
  });

  messages.push(response.choices[0].message);

  const role = response.choices[0].message.role;

  if (role === "user"){
    return response;
  }

  if (role === "assistant"){

  }
}