import fastify from "fastify";
import ejs from "ejs";
import fastifyView from "@fastify/view";
import fastifyStatic from "@fastify/static";

import { join } from "path";
const publicPath = join(process.cwd(), "public");

import menuItems from "./data/menuItems.js";
import operatingHours from "./data/operatingHours.js";

const app = fastify({
  logger: true,
});
const port = 3000;

app.register(fastifyStatic, {
  root: publicPath,
  prefix: "/public/",
});

app.register(fastifyView, {
  engine: {
    ejs: ejs,
  },
});

app.get("/", (request, reply) => {
  reply.view("views/index.ejs", { name: "What's Fare is fair" });
});

app.get("/menu", (request, reply) => {
  reply.view("views/menu.ejs", { menuItems });
});

app.get("/hours", (request, reply) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  reply.view("views/hours.ejs", { operatingHours, days });
});

const start = async () => {
  try {
    await app.listen({ port });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
