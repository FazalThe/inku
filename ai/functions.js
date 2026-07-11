

export async function getBlogsTitle() {
    const response = await fetch("https://news.hackclub.com/feed.xml");
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const items = xml.getElementsByTagName("items");
    const titles =[];

    for (const item of items) {
        titles.push = item.querySelector("title").textContent;
    }

    return titles;
}

export async function searchBlogs(titles) {
    const response = await fetch("https://news.hackclub.com/feed.xml");
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const items = [...xml.getElementsByTagName("items")];

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