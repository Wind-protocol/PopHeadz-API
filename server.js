/**
 * This is the main server script that provides the API endpoints
 *
 * Uses sqlite.js to connect to db
 */

const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

fastify.register(require("@fastify/formbody"));

const db = require("./sqlite.js");
const errorMessage =
  "Whoops! Error connecting to the database–please try again!";

// OnRoute hook to list endpoints
const routes = { endpoints: [] };
fastify.addHook("onRoute", routeOptions => {
  routes.endpoints.push(routeOptions.method + " " + routeOptions.path);
});

// Just send some info at the home route
fastify.get("/", (request, reply) => {
  const data = {
    title: "Welcome to the PopHeadz API",
    intro: "This is a read-only database-backed API with the following endpoints",
    routes: routes.endpoints
  };
  reply.status(200).send(data);
});

// Return all headz
fastify.get("/headz", async (request, reply) => {
  let data = {};
  data.results = await db.getHeadz();

  if(!data.results) data.error = errorMessage;
  const status = data.error ? 400 : 200;
  reply.status(status).send(data);
  
});

//Return one specific head by number
fastify.get("/head", async (request, reply) => {
  let data = {};
  
  if(!request.query || !request.query.number) {
    data.error = "Missing queryString param: number";
  } else {
    data.results = await db.getHead(request.query.number);
    if(!data.results) {
      data.error = errorMessage;
      data.success = false
    }
  }
    
  const status = data.error ? 400 : 200;
  reply.status(status).send(data);
  
});

/*

fastify.delete("/message", async (request, reply) => {

  
  
  const status = data.success ? 201 : auth ? 400 : 401;
  reply.status(status).send(data);
});

*/

// Helper function to authenticate the user key
/*
const authorized = key => {
  if (
    !key ||
    key < 1 ||
    !process.env.ADMIN_KEY ||
    key !== process.env.ADMIN_KEY
  )
    return false;
  else return true;
};
*/

// Run the server and report out to the logs
fastify.listen({port:process.env.PORT, host:'0.0.0.0'}, function(err, address) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});
