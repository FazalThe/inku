import { XMLParser } from "fast-xml-parser";

const FEED_URL = "https://news.hackclub.com/feed.xml";

async function getItems() {
    const response = await fetch(FEED_URL);

    if (!response.ok) {
        throw new Error(`Failed to fetch feed: ${response.status}`);
    }

    const xmlText = await response.text();

    const parser = new XMLParser({
        ignoreAttributes: false,
    });

    const xml = parser.parse(xmlText);


    const items = xml.rss.channel.item;
    return Array.isArray(items) ? items : [items];
}


export async function getBlogsTitle() {
    const items = await getItems();

    return items.map(item => item.title);
}

export async function searchBlogs(titles) {
    const items = await getItems();

    const blogs = {};

    for (const title of titles) {
        const blog = items.find(item => item.title === title);

        if (blog) {
            blogs[title] = blog;
        }
    }

    return blogs;
}

const toolMap = {
    getBlogsTitle,
    searchBlogs,
};

export default toolMap;