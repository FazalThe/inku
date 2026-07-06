import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

export default client;