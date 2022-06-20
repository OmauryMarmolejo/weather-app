const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/forecast?access_key=a8693b6623a17e984c3add66f84b0f56&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body, error: responseError }) => {
    if (error) {
      callback("unable to connect to weatherstack", undefined);
    } else if (responseError) {
      callback("unable to find location", undefined);
    } else {
      const { temperature } = body.current;
      callback(responseError, temperature);
    }
  });
};

module.exports = forecast;
