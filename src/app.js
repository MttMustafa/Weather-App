const express = require('express');
const hbs = require('hbs');
const path = require('path');
const getForecast = require('./utils/openWeatherApi');
const getGeoLoc = require('./utils/mapBoxApi');
const { response, request } = require('express');


const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);
app.use(express.static(publicDir));

const port = process.env.PORT || 3030;

app.get('', (req,res) => {
    res.render('index',{
        title: 'Forecast App'    
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help'
    });
});

app.get('/forecast', (req,res) => {
    if(!req.query.location) return res.send({"error": "Please provide a location!"});
    getGeoLoc(req.query.location, (error, locData) => {
        if(error) return res.send({ error });
        const lat = locData[1];
        const lon = locData[0];
        const unit = req.query.unit;
        getForecast({lat,lon,unit}, (error, forecastData ) => {
            if(error) return res.send({ error });
            res.send({ 
                forecast: `<div><img id="forecast-ico" src=http://openweathermap.org/img/wn/${forecastData.weather.icon}@2x.png></div>
                           <p id="forecast-desc">${forecastData.weather.main}</p>
                           <p id="temp">Temperature: ${forecastData.main.temp}</p>
                           <p id="felt-temp">Feels like: ${forecastData.main.feels_like}</p>
                           <p id="humidity">Humidity: ${forecastData.main.humidity}</p>`
             });
        });
    });
});

app.get('*', (req,res) => {
    res.render('error',{
        "errorMessage" : "404 NOT FOUND"   
    })
});

app.listen(port, () => {
    console.log(`Listening port ${port}...`);
})

