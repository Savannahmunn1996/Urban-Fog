function getWeather() {
    let reqUrl="api.openweathermap.org/data/2.5/forecast?lat=52.52&lon=13.41&appid=5143d8e20964ed205db1c52c74ac73bb"

    fetch(reqUrl)
    .then(function(response){
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
}

getWeather()
