import Fastify from "fastify";
import Environment from "./config";
import loadApp from "./server";

async function bootstrap(): Promise<void> {
  const app = Fastify({ logger: { level: Environment.loggerLevel } });
  app.register(loadApp);
  await app.listen({ port: 3000 }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  });
}

bootstrap();
