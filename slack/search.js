import app from "./app.js";

export async function searchSlack({query}) {

    const queries = Array.isArray(query)? query : [query];
    const resultList = {};

    for(const q of queries){

        const results = await app.client.search.messages({
            token: process.env.SLACK_USER_TOKEN,
            query: q
        })
        

        resultList[q] = results.messages.matches.map(result =>({
            channel_id: result.channel.id,
            channel_name: result.channel.name,
            ts: result.ts,
            text: result.text
        }));
    }

    return(resultList);
}