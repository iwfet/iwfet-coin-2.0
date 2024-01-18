import { logger } from "./util/consoleWrapper";

const host = process.env.HOST || "localhost";
const port = process.env.PORT || process.env.HTTP_PORT || 3001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
peers = peers.map((peer) => {
  return { url: peer };
});
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 6;
const name = process.env.NAME || "1";

logger(name, logLevel);

console.info(`Starting node ${name}`);



