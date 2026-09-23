import fastify from "fastify";
import menuItems from "./data/menuItems.js";
import operatingHours from "./data/operatingHours.js";

const app = fastify({
  logger: true,
});
const port = 3000;

app.get("/", async (request, reply) => {
  return "Welcome to  What's Fare is Fair!";
});

app.get("/menu", async (request, reply) => {
  // return "TODO: Menu Page";
  reply.send(menuItems);
});

app.get("/hours", async (request, reply) => {
  // return "TODO: Hours Page";
  reply.send(operatingHours);
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
