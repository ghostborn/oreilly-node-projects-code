import { writeFileSync } from "fs";

const content: string = "Test content999!";

try {
  writeFileSync("./test.txt", content);
  console.log("Success!");
} catch (err) {
  console.error(err);
}
