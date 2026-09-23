import Parser from "rss-parser";
const parse = new Parser();

const urls = [
  "https://www.bonappetit.com/feed/recipes-rss-feed/rss",
  "https://www.budgetbytes.com/category/recipes/feed/",
];

const main = async () => {
  const feedItems = [];
  const awaitableRequests = urls.map((url) => parse.parseURL(url));
  const responses = await Promise.all(awaitableRequests);
  aggregate(responses, feedItems);
  print(feedItems);
};

const aggregate = (responses, feedItems) => {
  for (let { items } of responses) {
    for (let { title, link } of items) {
      if (title.toLowerCse().includes("veg")) {
        feedItems.push({ title, link });
      }
    }
  }
  return feedItems;
};

const print = (feedItems) => {
  console.clear();
  console.table(feedItems);
  console.log("Last updated ", new Date().toUTCString());
};

setInterval(main, 2000);
