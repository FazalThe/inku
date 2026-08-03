import client from "./client.js";

import { tools } from "./tools.js";
import toolMap from "./functions.js";




export async function askAI(prompt, conversations) {

  const messages = [
    {
      role: "system",
      content: `
      You are Inku.
      You are an AI assistant for a Slack workspace called hackclub.
      Give response in such a way that It will work as intended in slack( not everymarkdonw stuff work here)
      hackclub is a global community of teen coders,hackers and builders.
      Answer using the provided Slack conversation or the available tools.
      In the conversation U0BDH4MTVDK is yourself.
      If the answer isn't in the conversation or tools, say you don't know.
      Do not invent information.
      But if it's a general question, you can answer.
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

  while (true) {
    const response = await client.chat.send({
      chatRequest: {
        model: "google/gemini-3.5-flash",
        messages,
        tools,
        stream: false,
      },
    });

    const answer = response.choices[0].message;
    messages.push(answer);

    //console.log(answer);
    //console.log(answer.toolCalls)

    if (!answer.toolCalls?.length) {
      return(response);
    }

    for (const toolCall of answer.toolCalls){
      const toolName = toolCall.function.name;
      const args = JSON.parse(toolCall.function.arguments);
      console.log(toolName);
      console.log(args);
      const toolResponse = await toolMap[toolName](args);
      
 
      messages.push({
        role: "tool",
        toolCallId: toolCall.id,
        content: JSON.stringify(toolResponse)
      })
      
    
    }
  }
}