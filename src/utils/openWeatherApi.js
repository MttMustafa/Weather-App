const request = require('postman-request');



function getForecast({lat, lon, unit = 'metric'},callback) {
    const weatherApiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=4e8707ce04b545cfb638cc2fe9039237`;
    request.get({url: weatherApiURL, json: true},(err,{body} = {}) =>{
        if(err) {
            callback(err = "Cannot reach the OpenWeatherMap api :(");
        } else {
            const main = body.main;
            const weather = body.weather[0];
            callback(undefined, {main, weather});
        }
    });
}

module.exports = getForecast;

