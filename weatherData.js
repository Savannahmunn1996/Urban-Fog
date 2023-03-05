searchButton = document.getElementById("search");
restOfWeek = document.getElementById("restOfWeek");
cityTitle = document.getElementById("cityTitle");
dateToday = document.getElementById("date-today");
tempToday = document.getElementById("temp-today");
windToday = document.getElementById("wind-today");
humidToday = document.getElementById("humidity-today");
historyS = document.getElementById("history");

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  input = document.getElementById("cityInput").value;
  search(input);
  localStorage.setItem("lastSearch", `${input}`);
  historyS.innerText = localStorage.getItem("lastSearch");
});

function search(cityName) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=5143d8e20964ed205db1c52c74ac73bb`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityTitle.innerText = data.city.name;
      usefulData = parseArray(data.list);
      mapArr = usefulData.slice(1, usefulData.length);

      titleData = getData(usefulData[0]);
      cityTitle.innerText = data.city.name;
      dateToday.innerText = titleData.date;
      tempToday.innerText = `Temp: ${titleData.temp}`;
      windToday.innerText = `Wind: ${titleData.wind}`;
      humidToday.innerText = `Humidity: ${titleData.humid}`;

      const eleArr = mapArr.map((item) => {
        return `
        <div class="day-card">
        <img class="the-icon" src="images/hot.png">
        <div>
            <p>Date: ${getData(item).date}</p>
        </div>
        <div>
            <p>Temp: ${getData(item).temp}</p>
        </div>
        <div>
            <p>Wind: ${getData(item).wind}</p>
        </div>
        <div>
            <p>Humidity: ${getData(item).humid}</p>
        </div>
        </div>
        `;
      });

      restOfWeek.innerHTML = eleArr.join("");
      getData(data.list[0]);
    });
}

function getData(data) {
  date = formatDate(data.dt_txt);
  kelvin = data.main.temp;
  farenheit = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  temp = `${farenheit}\u00B0F`;
  wind = `${data.wind.speed} mph`;
  humid = `${data.main.humidity}%`;
  return { date, temp, wind, humid };
}

function formatDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  return `${month}/${day}/${year}`;
}

function parseArray(data) {
  let ans = [data[0]];
  let i = 0;
  while (ans.length < 6 || i < data.length) {
    if (
      data[i].dt_txt.slice(0, 10) !== ans[ans.length - 1].dt_txt.slice(0, 10) &&
      data[i].dt_txt.slice(11, data[i].dt_txt.length) == "12:00:00"
    ) {
      ans.push(data[i]);
    }
    i++;
  }
  return ans;
}

search("Los Angeles");
