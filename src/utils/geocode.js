request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib21hdXJ5IiwiYSI6ImNsNGdiNThmeTA1MG8zY285Y3djeTY3MW4ifQ.iQOMdP6RCpMvpe_U1PMrWg`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (!body.features.length) {
      callback("Unable to find location", undefined);
    } else {
      callback(error, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[00].place_name,
      });
    }
  });
};

module.exports = geocode;
