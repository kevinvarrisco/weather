// INGAT KALAU BISA ADA FITUR TOOGLE SATUAN CELCIUS KE FAHRENHEIT
// DAN MUNGKIN JUGA BISA UNTUK SATUAN LAINNYA

var domInput = document.querySelectorAll("#input")[0]
var domLoc = document.querySelectorAll(".loc")[0]
var domTemp = document.querySelectorAll(".temp span")[0]
var domWeather = document.querySelectorAll(".weather h1")[0]
var domFeels = document.querySelectorAll(".info-feels h1 span")[0]
var domWind = document.querySelectorAll(".info-wind h1 span")[0]
var domHumidity = document.querySelectorAll(".info-humidity h1 span")[0]
var domVisibility = document.querySelectorAll(".info-visibility h1 span")[0]
var domSunrise = document.querySelectorAll(".info-sunrise h1 span")[0]
var domSunset = document.querySelectorAll(".info-sunset h1 span")[0]

var key = "f348829749c2c46e7b9e8116cadf4ce6"

// var fetchApi = fetch(api).then(response => response.json()).then(data => {console.log(data)})

async function getData() {
    var inputValue = domInput.value.trim()
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`

    var response = await fetch(api)
    var result = await response.json()

    return result
}

async function showData(){

    var data = await getData()
    // console.log(data)
    
    var city = data.name
    var country = data.sys.country
    var temp = Math.round(data.main.temp)
    var weatherId = data.weather[0].id
    var weather = data.weather[0].main
    var weatherDesc = data.weather[0].description
    var feels = Math.round(data.main.feels_like)
    var wind = data.wind.speed
    var humidity = data.main.humidity
    var visibility = data.visibility
    var sunrise = data.sys.sunrise
    var sunset = data.sys.sunset

    // DOM. Memasukkan value ke teks HTML
    domLoc.textContent = city + ", " + country
    domTemp.textContent = temp
    domWeather.innerHTML = weather + '<br><span>' + weatherDesc + '</span>'
    domFeels.textContent = feels
    domWind.textContent = wind
    domHumidity.textContent = humidity
    domVisibility.textContent = visibility
    domSunrise.textContent = sunrise
    domSunset.textContent = sunset

    // var domInput = document.querySelectorAll("#input")[0]
    // var domLoc = document.querySelectorAll(".loc")[0]
    // var domTemp = document.querySelectorAll(".temp span")[0]
    // var domWeather = document.querySelectorAll(".weather")[0]
    // var domWeatherDesc = document.querySelectorAll(".weather span")[0]
    // var domFeels = document.querySelectorAll(".info-feels")[0]
    // var domWind = document.querySelectorAll(".info-wind")[0]
    // var domHumidity = document.querySelectorAll(".info-humidity")[0]
    // var domVisibility = document.querySelectorAll(".info-visibility")[0]
    // var domSunrise = document.querySelectorAll(".info-sunrise")[0]
    // var domSunset = document.querySelectorAll(".info-sunset")[0]

    // console.log(
    //     city + " " +
    //     country + " " +
    //     temp + " " +
    //     weatherId + " " +
    //     weather + " " +
    //     weatherDesc + " " +
    //     feels + " " +
    //     wind + " " +
    //     humidity + " " +
    //     visibility + " " +
    //     sunrise + " " +
    //     sunset
    // )
}

// button.onclick = showData
// showData()

domInput.addEventListener('keyup', function(e){
    if(e.code == 'Enter'){
        showData()
        input.value = ''
    }
})