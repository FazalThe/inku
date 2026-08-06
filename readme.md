# Inku

A slack AI chatbot for hackclub slack. It has access to messages where bot has been added. It also have acces to blogs of hackclub in news.hackclub.com ( slacker news ).

This bot is currently running 24/7 on nest and is installed on hackclub workspace.

I made this so that there is a bot which has access to slack messages and hackclub blogs so that it can give better answer and assitance


---

## Tech Stack

- Node.js
- Slack Bolt
- Openrouter SDK

---

## How it works

The AI setup runs on the Openrouter SDK. On the App mention event, the message in which the app is mentioned is sent to the AI. If the message was sent inside a thread, the whole thread gets sent. 

The AI currently have access to 4 tools
- getBlogsTitle() : returns the titles of all the blogs in new.hackclub.com
- searchBlogs(title)   : returns the content of specific blog
- searchSlack(query)   : returns some messages from the slack search of the query passed
- getReplies(ts, channel) : returns the replies of a specific message

---

## Running locally

```bash
git clone https://github.com/FazalThe/inku
cd inku
node index.js
```
---
