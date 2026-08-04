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

export async function searchBlogs({title}) {
    console.log("func called")
    const titles = Array.isArray(title) ? title : [title];

    const items = await getItems();
    const blogs = {};

    for (const t of titles) {
        
        const blog = items.find(item => item.title === t);

        console.log("Looking for:", JSON.stringify(title));
        for (const item of items) {
            console.log("Item:", JSON.stringify(item.title));
        }

        console.log("blog: ",blog)

        if (blog) {
            blogs[t] = blog;

        }
    }

    return blogs;
    console.log(blogs)
}


const toolMap = {
    getBlogsTitle,
    searchBlogs,
};

export default toolMap;