require("dotenv").config();
const { App } = require("@slack/bolt");
const { OpenRouter } = require("@openrouter/sdk");



//AI
const client = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

async function askAI(prompt) {
  const response = await client.chat.send({
    chatRequest: {
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      stream: false,
    },
  });

  return response;
}
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

app.command("/inku",async({ command, ack, respond })=>{
  await ack();

  const prompt = command.text;
  const aiResponse = await askAI(prompt);

  await respond({
    text: aiResponse.choices[0].message.content
  });

  
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();