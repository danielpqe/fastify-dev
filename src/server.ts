import { FastifyInstance, FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
// import Environment from "./config";
import clientModule from "./application/modules/clientModule";

// export const registerPlugins = fp(
//   async (app: FastifyInstance): Promise<void> => {
//     app.register(
//       fastifySwagger as any /* limitation from plugin */,
//       Environment.swagger
//     );
//   }
// );

export const registerModules = (modules: FastifyPluginAsync[]) =>
  fp(async (app: FastifyInstance): Promise<void> => {
    for (const moduleFn of modules) {
      await moduleFn(app, {});
    }
  });

const loadApp: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  // await fastify.register(registerPlugins);
  await fastify.register(registerModules([clientModule]));
  await fastify.get("/", (req, rep) => {
    rep.code(200).send({ hello: "World" });
  });
  console.log(fastify.printRoutes());
};

export default loadApp;
