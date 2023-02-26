var reqUrl="api.openweathermap.org/data/2.5/forecast?lat=34.052235&lon=118.2437&appid=5143d8e20964ed205db1c52c74ac73bb"
fetch(reqUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
});

   



