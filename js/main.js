var weatherCondition1 = document.getElementById("weatherCondition1");
var weatherCondition2 = document.getElementById("weatherCondition2");
var weatherCondition3 = document.getElementById("weatherCondition3");

// var conditionImage1 = document.getElementById("conditionImage1");
// var conditionImage2 = document.getElementById("conditionImage2");
// var conditionImage3 = document.getElementById("conditionImage3");

var cityName = document.getElementById("cityName");

var weatherDegree = document.getElementById("weatherDegree");

var currentDay = document.getElementById("currentDay");
var currentMonth = document.getElementById("currentMonth");
var currentDayOfMonth = document.getElementById("currentDayOfMonth");

var nextDay = document.getElementById("nextDay");
var afterNextDay = document.getElementById("afterNextDay");

var nextWeatherHigh = document.getElementById("nextWeatherHigh");
var nextWeatherLow = document.getElementById("nextWeatherLow");
var afterNextWeatherHigh = document.getElementById("afterNextWeatherHigh");
var afterNextWeatherLow = document.getElementById("afterNextWeatherLow");


var weekDays = [{id: 0, myDay: "Sunday"},
                {id: 1, myDay: "Monday"},
                {id: 2, myDay: "Tuesday"},
                {id: 3, myDay: "Wednesday"},
                {id: 4, myDay: "Thursday"},
                {id: 5, myDay: "Friday"},
                {id: 6, myDay: "Saturday"}];

var months  =  [{id: 0, myMonth: "January"},
                {id: 1, myMonth: "February"},
                {id: 2, myMonth: "March"},
                {id: 3, myMonth: "April"},
                {id: 4, myMonth: "May"},
                {id: 5, myMonth: "June"},
                {id: 6, myMonth: "July"},
                {id: 7, myMonth: "August"},
                {id: 8, myMonth: "September"},
                {id: 9, myMonth: "October"},
                {id: 10, myMonth: "November"},
                {id: 11, myMonth: "December"}];


var weather = [];
var myCity = [];


var date = new Date();

var currentYear = date.getFullYear();
var monthURL;
var currentDayInMonthURL = date.getDate();
var afterNextDayInMonthURL;
var nextDayInMonthURL;

if ((date.getMonth() + 1) < 10) {
    monthURL = '0' + (date.getMonth() + 1);
}else{
    monthURL = date.getMonth() + 1;
}

if (date.getDate() < 10) {
    currentDayInMonthURL = '0' + date.getDate();
}else{
    currentDayInMonthURL = date.getDate();
}

if ((date.getDate() + 1) < 10) {
    nextDayInMonthURL = '0' + (date.getDate() + 1);
}else{
    nextDayInMonthURL = (date.getDate() + 1);
}

if ((date.getDate() + 2) < 10) {
    afterNextDayInMonthURL = '0' + (date.getDate() + 2);
}else{
    afterNextDayInMonthURL = (date.getDate() + 2);
}


var yearURL = `${currentYear}-${monthURL}-${currentDayInMonthURL}T00:00`;
var nextTime = `${currentYear}-${monthURL}-${nextDayInMonthURL}T00:00`;
var afterNextTime = `${currentYear}-${monthURL}-${afterNextDayInMonthURL}T00:00`;


var dayOfWeek = date.getDay();


getCurrentDayOfWeek();

getCurrentMonth();

getCurrentDayOfMonth();

getNextDay();

getAfterNextDay();


async function getCity(city){
    var requestCity = await fetch(`http://api.weatherapi.com/v1/search.json?key=f4a59f1758194aa9b75204153230208&q=${city}`);
    requestCity = await requestCity.json();

    let latitude = requestCity[0].lat;
    let longitude = requestCity[0].lon;

    myCity = requestCity;

    getWeather(latitude, longitude);
}

async function getWeather(latitude, longitude){
    var requestWeather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&past_days=10&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
    requestWeather = await requestWeather.json();

    weather = requestWeather;

    var index;

    for (let i = 0; i < requestWeather.hourly.time.length; i++) {
        if (yearURL == requestWeather.hourly.time[i]) {
          index = i;
          break;
        }
    }

    displayData(index);
}

function searchWeather(){
    var searchWord = document.getElementById("city").value;

    getCity(searchWord);
}

function displayData(index){
       cityName.innerHTML =  myCity[0].name;

       weatherDegree.innerHTML = `${weather.hourly.temperature_2m[index]}°C`;
       console.log('it works');
       if (weather.hourly.temperature_2m[index] > 10 && weather.hourly.temperature_2m[index] < 20) {
          weatherCondition1.innerHTML = "Rainy";
       }
       else if (weather.hourly.temperature_2m[index] > 20 && weather.hourly.temperature_2m[index] < 30) {
          weatherCondition1.innerHTML = "Cloudy";
       }
       else if (weather.hourly.temperature_2m[index] > 30 && weather.hourly.temperature_2m[index] < 40) {
          weatherCondition1.innerHTML = "Sunny";
       }
       else{
        weatherCondition1.innerHTML = "Intermediate";
       }


       nextWeatherHigh.innerHTML = `${weather.hourly.temperature_2m[index + 1]}°C`;
       nextWeatherLow.innerHTML = `${weather.hourly.temperature_2m[index + 1] - 8.7}°C`;
      if (weather.hourly.temperature_2m[index + 1] > 10 && weather.hourly.temperature_2m[index + 1] < 20) {
          weatherCondition2.innerHTML = "Rainy";
       }
       else if (weather.hourly.temperature_2m[index + 1] > 20 && weather.hourly.temperature_2m[index + 1] < 30) {
          weatherCondition2.innerHTML = "Cloudy";
       }
       else if (weather.hourly.temperature_2m[index + 1] > 30 && weather.hourly.temperature_2m[index + 1] < 40) {
          weatherCondition2.innerHTML = "Sunny";
       }
       else{
        weatherCondition2.innerHTML = "Intermediate";
       }


       afterNextWeatherHigh.innerHTML = `${weather.hourly.temperature_2m[index + 2]}°C`;
       afterNextWeatherLow.innerHTML = `${weather.hourly.temperature_2m[index + 2] - 9.4}°C`;
      if (weather.hourly.temperature_2m[index + 2] > 10 && weather.hourly.temperature_2m[index + 2] < 20) {
          weatherCondition3.innerHTML = "Rainy";
       }
       else if (weather.hourly.temperature_2m[index + 2] > 20 && weather.hourly.temperature_2m[index + 2] < 30) {
          weatherCondition3.innerHTML = "Cloudy";
       }
       else if (weather.hourly.temperature_2m[index + 2] > 30 && weather.hourly.temperature_2m[index + 2] < 40) {
          weatherCondition3.innerHTML = "Sunny";
       }
       else{
        weatherCondition3.innerHTML = "Intermediate";
       }
}


function getCurrentDayOfWeek(){
    for (let i = 0; i < weekDays.length; i++) {
        if(dayOfWeek == weekDays[i].id){
             currentDay.innerHTML = weekDays[i].myDay;
             break;
        }
    }
}

function getCurrentMonth(){
    let month = date.getMonth();

    for (let i = 0; i < months.length; i++) {
        if(month == months[i].id){
             currentMonth.innerHTML = months[i].myMonth;
             break;
        }
    }
}

function getCurrentDayOfMonth(){
    let dayOfMonth = date.getDate();

    currentDayOfMonth.innerHTML = dayOfMonth;
}

function getNextDay(){
    for (let i = 0; i < weekDays.length; i++) {
        if(dayOfWeek == weekDays[i].id){
            if(i == 6){
                i = 0;
            }
            else{
                i += 1;
            }
             nextDay.innerHTML = weekDays[i].myDay;
             break;
        }
    }
}

function getAfterNextDay(){
    for (let i = 0; i < weekDays.length; i++) {
        if(dayOfWeek == weekDays[i].id){
            if(i == 6){
                i = 1;
            }
            else if(i == 5){
                i = 0;
            }
            else{
                i += 2;
            }
             afterNextDay.innerHTML = weekDays[i].myDay;
             break;
        }
    }
}





