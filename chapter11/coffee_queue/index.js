import Fastify from "fastify";
import formbody from "@fastify/formbody";

const app = Fastify({
  logger: true,
});
const PORT = 3000;

await app.register(formbody);

const coffeeQueue = [];

app.post("/slow-order", async (request, reply) => {
  const { drinkOrder } = request.body;
  for (let i = 0; i < 10000000000; i++) {}
  reply.send(`Drink order added to queue: ${drinkOrder}`);
});

app.post("/order", async (request, reply) => {
  const { drinkOrder } = request.body;
  coffeeQueue.push(drinkOrder);
  console.log(coffeeQueue.length);
  reply.send("Drink order added to queue");
});

app.get("/process-order", async (request, reply) => {
  const nextOrder = coffeeQueue.shift();
  if (nextOrder) {
    reply.send({order:nextOrder})
  } else {
    reply.send("No drink ")
  }
})

app.get("/order-count", async (request, reply) => {
  reply.send(`${coffeeQueue.length} drink orders in quene`);
});

app.setNotFoundHandler((request, reply) => {
  const { message, statusCode } = request.error || {};
  reply.status(statusCode || 500).send({ message });
});

try {
  await app.listen({ port: PORT });
  console.log(`Listening at http://localhost:${PORT}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
