// const main = async () => {
//   const url = `https://www.bonappetit.com/feed/recipes-rss-feed/rss`;
//   const response = await fetch(url);
//   console.log(await response.text());
// };

// main();

import Parser from "rss-parser";
const parser = new Parser();

const url = `https://www.bonappetit.com/feed/recipes-rss-feed/rss`;

const main = async () => {
  const { title, items } = await parser.parseURL(url);
  console.clear(); // Clear console before each update
  console.log(title); // Print feed title

  const results = items.map(({ title, link }) => ({ title, link }));
  console.table(results);

  console.log("Last updated:", new Date().toUTCString());
};

setInterval(main, 2000);
