

export async function getBlogsTitle() {
    const response = await fetch("https://news.hackclub.com/feed.xml");
    const xmlText = await response.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "application/xml");

    const items = xml.getElementsByTagName("items");
    const length = items.length
    const titles =[];

    for (const item of items) {
        titles.push = item.querySelector("title").textContent;
    }

    return titles;
}

export async function searchBlogs(title) {
    
}