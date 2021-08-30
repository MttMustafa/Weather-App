const request = require('postman-request');


function getGeoLoc(location,callback) {

    const geolocURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibXR0c3BhcmsiLCJhIjoiY2tzOThuNHNqMG9idjJ1bHVjOGYxaTU1YiJ9.o2aBrFIT2a5TUp0d3DihlA&limit=1`;
    
    request.get({url: geolocURL, json: true}, (err, {body} = {}) => {
        if(err) callback(err = "Cannot reach the MapBox api :(");
        else callback(undefined,body.features[0].center);
    })
}

module.exports = getGeoLoc;

