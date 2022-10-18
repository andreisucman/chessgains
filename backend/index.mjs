import Fastify from "fastify";
import cors from "@fastify/cors";
import { move, status, moves, fetchAiLevel, saveScore } from "./lib/js-chess-engine.mjs";
import { pay, sendToTelegram, getGasPrice } from "./moralis.mjs";

const ROUTE_MAP = {
  "/moves": moves,
  "/status": status,
  "/move": move,
  "/aimove": fetchAiLevel,
  "/calculate": saveScore,
};

const server = Fastify({ logger: true });

server.register(cors, {
  origin: ["https://www.chessgains.com", "https://chessgains.com"],
  // origin: "*",
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Accept"],
  methods: ["GET", "POST", "OPTIONS"],
});

await server.register(import("@fastify/rate-limit"), {
  global: false,
  max: 1,
  timeWindow: 1250,
});

const PORT = process.env.PORT || 3001;

for (const route in ROUTE_MAP) {
  server.post(route, async (request, response) => {
    try {
      const result = await ROUTE_MAP[route](request.body, ...Object.values(request.query));
      response.send(await result);
    } catch (error) {
      response.code(404).send(error);
    }
  });
}

server.post("/pay", async (request, response) => {
  const key = "pay";
  try {
    const reply = await pay(request.body.receiver, key);
    response.send(reply);
  } catch (error) {
    response.code(404).send(error);
  }
});

server.post(
  "/dividends",
  {
    config: {
      rateLimit: {
        max: 1,
        timeWindow: "1 minute",
      },
    },
  },
  async (request, response) => {
    const key = "dividends";
    try {
      const reply = await pay(request.body.receiver, key);
      response.send(reply);
    } catch (error) {
      response.code(404).send(error);
    }
  }
);

server.post(
  "/reward",
  {
    config: {
      rateLimit: {
        max: 1,
        timeWindow: "1 minute",
      },
    },
  },
  async (request, response) => {
    const key = "reward";
    try {
      const reply = await pay(request.body.receiver, key);
      response.send(reply);
    } catch (error) {
      response.code(404).send(error);
    }
  }
);

server.get("/telegram", async (response) => {
  try {
    const reply = await sendToTelegram();
    response.send(reply);
  } catch (error) {
    response.code(404).send(error);
  }
});

server.get(
  "/gas",
  {
    config: {
      rateLimit: {
        max: 10,
        timeWindow: "1 minute",
      },
    },
  },
  async (response) => {
    try {
      const reply = await getGasPrice();
      response.send(reply);
    } catch (error) {
      response.code(404).send(error);
    }
  }
);

server.listen({ port: PORT, host: "0.0.0.0" });
