const fetch = require("node-fetch");
const querystring = require("querystring");

const fastify = require("fastify")({
  logger: true
});

fastify.register(require("fastify-cors"), {
  // put your options here
});

const CITYMAPPER_API_KEY = "";
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleMapsClient = require("@google/maps").createClient({
  key: GOOGLE_API_KEY,
  Promise: Promise
});

fastify.get("/travel-time", async (req, res) => {
  const origin = {
    lat: req.query.originLat,
    long: req.query.originLong
  };
  const destination = {
    lat: req.query.destinationLat,
    long: req.query.destinationLong
  };

  try {
    const result = await googleMapsClient
      .directions({
        origin: `${origin.lat},${origin.long}`,
        destination: `${destination.lat},${destination.long}`,
        mode: "transit",
        transit_routing_preference: "fewer_transfers"
      })
      .asPromise();

    const durationInSeconds = result.json.routes[0].legs[0].duration.value;

    return durationInSeconds / 60;
  } catch (e) {
    console.error(e);
    res.code(500);
    return { error: "error" };
  }
});

fastify.listen(process.env.PORT || 6000, "0.0.0.0", () => {
  console.log("listening");
});
