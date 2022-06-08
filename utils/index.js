const { getArgs, GetLocationWeather } = require("./utils");

const args =  getArgs();
if (!!args?.location) {
    GetLocationWeather(args.location, (err, weather) => {
        !err ? console.log(weather) : console.log(err);
    });
}

module.exports = GetLocationWeather;
