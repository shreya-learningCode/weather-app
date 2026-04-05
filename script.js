//Index Page JavaScript

function searchWeather() {
    let cityInput = document.getElementById("cityInput");

    if (cityInput){
        let city = cityInput.value;
        if (city===""){
            alert("Please enter a city name");
            return;

        }

        localStorage.setItem("cityName", city);
        window.location.href = "result.html";
     }

}

//Result Page JavaScript

let city=localStorage.getItem("cityName");
if (city && document.getElementById("temp")){
    //day & date
    let now=new Date();
    let Days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    document.getElementById("day").innerText=Days[now.getDay()];
    document.getElementById("date").innerText=now.toLocaleDateString();

    //API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=90015922808eab4006c929584231da14&units=metric`)
    .then(response => response.json())
    .then(data => {
        document.getElementById("cityName").innerText=data.name;
        document.getElementById("temp").innerText=data.main.temp+"°C";
        document.getElementById("description").innerText=data.weather[0].description;

    //Image change
    let WeatherType=data.weather[0].main.toLowerCase();
    let img=document.getElementById("weatherImage");
    if (WeatherType.includes ==="Rain"){
        img.src="images/rainy.png";
    }else if (WeatherType.includes("Clouds")){
        img.src="images/cloudy.png";
    }else if (WeatherType.includes("Clear")){
        img.src="images/sunny.png";
    }

    //AQI

    let lat=data.coord.lat;
    let lon=data.coord.lon;
    fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=90015922808eab4006c929584231da14`)
    .then(response => response.json())
    .then(aqiData => {
        let aqi=aqiData.list[0].main.aqi;
        document.getElementById("aqi").innerText="AQI: "+aqi;
    });
});
}

//Back Button Functionality
function goBack() {
    window.location.href = "index.html";
}




