
function qs(elem) {
    return document.querySelector(elem);
}

const locInput = qs('#loc-input');
const celciusSel = qs('#metric-sel');
const fahrenheitSel = qs('#imperial-sel');
const forecastForm = qs('#weather-form');
const forecastRes = qs('#forecast-res');



forecastForm.onsubmit = e => {
    e.preventDefault();
    forecastRes.innerHTML = "Loading...";
    let unit = "metric";
    if(fahrenheitSel.checked) unit = "imperial";
    let location = locInput.value;
    getWeatherData({location,unit}, response => {
        console.log(response);
    });
}


function getWeatherData({unit,location}, callback) {
    fetch(`/forecast?location=${location}&unit=${unit}`).then( response => {
        response.json().then( data => {
            if(data.error) callback(data.error);
            else callback(data);
        });
    })
}