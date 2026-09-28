import Fastify from "fastify";
import amqp from "amqplib";

const app = Fastify();
const PORT = 3002;
let channel, connection;

await app.listen({ port: PORT });
console.log("Server running at http://localhost:" + PORT);

async function connect() {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();
    await channel.assertQueue("analytics");
  } catch (err) {
    console.error(err);
  }
}

await connect();

const drinkMap = { latte: 0, coffee: 0, cappuccino: 0 };

channel.consume("analytics", (data) => {
  if (!data) return;
  const { content } = data;
  const { order, customer } = JSON.parse(content.toString());
  if (drinkMap[order] !== undefined) {
    drinkMap[order]++;
  }
  console.log(`${order} being analyzed for ${customer}`);
  channel.ack(data);
});

function processDrinkAnalytics() {
  const FIVE_MINUTES_IN_MILLISECONDS = 5 * 60 * 1000;
  const TEN_SECONDS_IN_MILLISECONDS = 10000;

  // 每 10 秒打印一次当前窗口（自上次重置以来）的统计
  setInterval(() => {
    const drinkNames = Object.keys(drinkMap);
    const totalDrinkCount = drinkNames.reduce((total, drinkName) => {
      return total + drinkMap[drinkName];
    }, 0);

    if (totalDrinkCount === 0) {
      console.log("Drink orders: no orders in current window");
      return;
    }

    const drinkPercentages = drinkNames.map((drinkName) => {
      const percentage = Math.floor(
        (drinkMap[drinkName] / totalDrinkCount) * 100,
      );
      return ` ${drinkName}: ${percentage}%`;
    });

    console.log(`Drink orders: ${drinkPercentages}`);
  }, TEN_SECONDS_IN_MILLISECONDS);

  // 每 5 分钟重置一次计数（单独的定时器，避免多次安排重置）
  setInterval(() => {
    Object.keys(drinkMap).forEach((drinkName) => {
      drinkMap[drinkName] = 0;
    });
    console.log("Drink counts reset for new window");
  }, FIVE_MINUTES_IN_MILLISECONDS);
}

processDrinkAnalytics();
