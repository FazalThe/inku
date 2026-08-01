import { XMLParser } from "fast-xml-parser";

export async function getBlogsTitle() {
    const response = await fetch("https://news.hackclub.com/feed.xml");
    const xmlText = await response.text();

    const parser = new XMLParser();
    const xml = parser.parse(xmlText);

    const items = xml.rss.channel.item;
    const titles =[];

    for (const item of items) {
        titles.push = item.querySelector("title").textContent;
    }

    return titles;
}

export async function searchBlogs(titles) {
    const response = await fetch("https://news.hackclub.com/feed.xml");
    const xmlText = await response.text();

    const parser = new XMLParser();
    const xml = parser.parse(xmlText);

    const items = [...xml.rss.channel.item];

const blogs = {};

for (const title of titles) {
    blogs[title] = items.find(
        item => item.querySelector("title").textContent === currentTitle
    );
}

return blogs;

}

const toolMap = {
    getBlogsTitle,
    searchBlogs
};

export default toolMap;