import app from "./app.js";

export async function getReplies({ ts, channel }) {
    const replies = await app.client.conversations.replies({
        token: process.env.SLACK_USER_TOKEN,
        channel,
        ts
    })

    return(replies);
}