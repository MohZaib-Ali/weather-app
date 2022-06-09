const request = require('postman-request');

const unit = "f", search = "lahore"
const forecast = (coords, unit, callback) => {
    const weatherURL = `http://api.weatherstack.com/current?access_key=a567ab5927fb649e1c980d400e36c343&query=${coords.latitude},${coords.longitude}&units=${unit}`;
    request.get(weatherURL, { json: true  }, (err, response) => {
        if (!err) {
            const { weather_descriptions: [desc], temperature, precip, pressure, wind_speed } = response.body?.current;
            callback(undefined, `${coords.location} - Weather Condition \n${desc}. It is currently ${temperature} degrees out. There is a ${precip}% chance of rain. \n Wind Speed: ${wind_speed}ms and Pressure: ${pressure} torr`)
        } else {
            callback('Error parsing response body: ' + response + '\n' + err);
        }
    });
}

const geocode = (location, callback) => {
    const geoCodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoibXVoYW1tYWRzaGFoemFpYiIsImEiOiJjbDQ1NXhmM201NG5qM2ZwbnFlMHc4ZW8yIn0.Nkbw2tBx4hBS15jgNMgAIA&limit=1`;
    request.get(geoCodeURL, { json: true }, (err, response) => {
        if (!err && !response.body.message) {
            if (response.body?.features?.length > 0) {
                const [{ place_name, geometry: { coordinates } }] = response.body?.features;
                const coords = coordinates.reverse().map(c => parseFloat(c));
                callback(undefined, { latitude: coords[0], longitude: coords[1], location: place_name });
            } else {
                callback('Unable to find location, Try another location.')
            }
        } else {
            callback('Unable to connect to location services: ' + response.body.message);
        }
    });
};

const GetLocationWeather = (search, callback) => {
    geocode(search, (err, response = {}) => {
        if (!err) {
            forecast(response, unit, (err, weather = {}) => {
                if (!err) {
                    callback(undefined, weather);
                } else {
                    callback(err)
                }
            })
        } else {
            callback(err)
        }
    });
}

const getArgs = () => {
    const argsObj = {};
    process.argv.slice(2).forEach((arg) => {
        if (arg.startsWith('--')) {
            const keyVal = arg.slice(2).split('=');
            const key = keyVal[0];
            const value = keyVal[1].replace('"', '').replace("'", "");
            argsObj[key] = value;
        }
    });
    return argsObj
}

module.exports = {
    GetLocationWeather,
    geocode,
    forecast,
    getArgs
}