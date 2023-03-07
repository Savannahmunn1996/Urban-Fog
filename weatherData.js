searchButton = document.getElementById("search");
restOfWeek = document.getElementById("restOfWeek");
cityTitle = document.getElementById("cityTitle");
dateToday = document.getElementById("date-today");
tempToday = document.getElementById("temp-today");
windToday = document.getElementById("wind-today");
humidToday = document.getElementById("humidity-today");
historyS = document.getElementById("history");
iconData = document.getElementById("big");
// Here I am adding an event listen to seach so that when it is
// clicked our city input goes through and I also added a local storage feature to
// save the last search to the page
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  input = document.getElementById("cityInput").value;
  search(input);
  localStorage.setItem("lastSearch", `${input}`);
  historyS.innerText = localStorage.getItem("lastSearch");
});
// this is where I call the api
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

      // this is grabbing info from api and inserting into large section on top left
      titleData = getData(usefulData[0]);
      cityTitle.innerText = data.city.name;
      dateToday.innerText = titleData.date;
      tempToday.innerText = `Temp: ${titleData.temp}`;
      windToday.innerText = `Wind: ${titleData.wind}`;
      humidToday.innerText = `Humidity: ${titleData.humid}`;
      iconData.innerHTML = `<img src="https://openweathermap.org/img/wn/${titleData.icon}@2x.png">`;
      console.log(titleData.icon, "iconData");
      // this is what adds the cards to the page, using one structure and iterating
      // through it to create many.
      const eleArr = mapArr.map((item) => {
        return `
        <div class="day-card">
        <img class="the-icon" src= 'https://openweathermap.org/img/wn/${
          getData(item).icon
        }@2x.png'>
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

// A very important function because it grabs the data and converts to proper formats
function getData(data) {
  let date = formatDate(data.dt_txt);
  let kelvin = data.main.temp;
  let farenheit = Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  let temp = `${farenheit}\u00B0F`;
  let wind = `${data.wind.speed} mph`;
  let humid = `${data.main.humidity}%`;
  let icon = `${data.weather[0].icon}`;
  return { date, temp, wind, humid, icon };
  // can I make a switch case or if statement for my temperature icons?
}
// formatting the date. The .slice() method gives me the indexes that I need
function formatDate(date) {
  let year = date.slice(0, 4);
  let month = date.slice(5, 7);
  let day = date.slice(8, 10);
  return `${month}/${day}/${year}`;
}
// trying to figure out how to make the index land on current day
function parseArray(data) {
  let ans = [data[0]];

  let i = 0;
  while (i < data.length) {
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

//

search("Los Angeles");
