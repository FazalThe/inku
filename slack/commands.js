import app from "./app.js";

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