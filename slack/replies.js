import app from "./app.js";

export async function getReplies(ts, channel) {
    replies = await app.client.conversations.replies({
        token: process.env.SLACK_USER_TOKEN,
        channel,
        ts
    })
}