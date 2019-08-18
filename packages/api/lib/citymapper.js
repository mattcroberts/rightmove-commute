const querystring = require("querystring");

module.exports = async (origin, destination) => {
  const qs = querystring.stringify({
    time: new Date().toISOString(),
    time_type: "arrival",
    key: CITYMAPPER_API_KEY
  });

  console.log(
    `https://developer.citymapper.com/api/1/traveltime/?startcoord=${
      origin.lat
    },${origin.long}&endcoord=${destination.lat},${destination.long}&` + qs
  );
  const response = await fetch(
    `https://developer.citymapper.com/api/1/traveltime/?startcoord=${
      origin.lat
    },${origin.long}&endcoord=${destination.lat},${destination.long}&` + qs
  );

  const { travel_time_minutes, error_message } = await response.json();

  if (error_message) {
    throw new Error(error_message);
  }

  return travel_time_minutes;
};
