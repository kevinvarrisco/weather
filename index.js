// INGAT KALAU BISA ADA FITUR TOOGLE SATUAN CELCIUS KE FAHRENHEIT
// DAN MUNGKIN JUGA BISA UNTUK SATUAN LAINNYA
// INGAT KALAU HP INPUT DI SUBMIT
// INGAT KALAU SIANG/MALAM BG DIUBAH

var domForm = document.querySelectorAll(".form")[0]
var domInput = document.querySelectorAll("#input")[0]
var domLoc = document.querySelectorAll(".loc")[0]
var domTemp = document.querySelectorAll(".temp span")[0]
var domWeatherIcon = document.querySelectorAll(".weather img")[0]
var domWeather = document.querySelectorAll(".weather h1")[0]
var domFeels = document.querySelectorAll(".info-feels h1 span")[0]
var domWind = document.querySelectorAll(".info-wind h1 span")[0]
var domHumidity = document.querySelectorAll(".info-humidity h1 span")[0]
var domVisibility = document.querySelectorAll(".info-visibility h1 span")[0]
var domSunrise = document.querySelectorAll(".info-sunrise h1 span")[0]
var domSunset = document.querySelectorAll(".info-sunset h1 span")[0]

var domBgOverlay = document.querySelectorAll(".bg-overlay")[0]

var key = "f348829749c2c46e7b9e8116cadf4ce6"

// var fetchApi = fetch(api).then(response => response.json()).then(data => {console.log(data)})

function clockFormat(value, offset){
    var timeStamp = Number(value) + Number(offset)
    var date = new Date(timeStamp * 1000)
    var hour = date.getUTCHours()
    var min = date.getUTCMinutes()
    var ext = "am"

    if(hour > 12){
        hour = hour - 12
        ext = "pm"
    }

    hour = "0" + String(hour)

    if(String(min).length == 1){
        min = "0" + String(min)
    }

    time = hour + ":" + min + " " + ext

    return time
}


function captEachWords(value){
    var words = value.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")

    return words
}


function findWeatherIcon(value, now, sunrise, sunset){
    if(value >= 200 && value <= 232){
        return "img/storm-icon.png"
    } else if (value >= 300 && value <= 321){
        return "img/light-rain-icon.png"
    } else if (value >= 500 && value <= 531){
        return "img/heavy-rain-icon.png"
    } else if (value >= 600 && value <= 622){
        return "img/winter-icon.png"
    } else if (value >= 701 && value <= 781){
        return "img/dry-icon.png"
    } else if (value == 800){

        if(now >= sunrise && now <= sunset){
            return "img/sun-icon.png"
        } else {
            return "img/new-moon-icon.png"
        }

    } else if (value >= 801 && value <= 804){
        return "img/cloud-icon.png"
    } else {
        return "img/cloud-icon.png"
    }
}


async function getData(value) {
    var inputValue = value.trim()
    var api = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${key}&units=metric`

    var response = await fetch(api)
    var result = await response.json()

    return result
}

async function showData(value){

    var data = await getData(value)
    // console.log(data)
    
    var city = data.name
    var country = data.sys.country
    var temp = Math.round(data.main.temp)
    var weatherId = data.weather[0].id
    var weather = data.weather[0].main
    var weatherDesc = captEachWords(data.weather[0].description)
    var feels = Math.round(data.main.feels_like)
    var wind = data.wind.speed
    var humidity = data.main.humidity
    var visibility = data.visibility
    var sunrise = data.sys.sunrise
    var sunset = data.sys.sunset
    var timezone = data.timezone
    var coordLon = data.coord.lon
    var coordLat = data.coord.lat

    var weatherIcon = findWeatherIcon(weatherId, Date.now()/1000, sunrise, sunset)

    // DOM. Perubahan siang malam background
    if(Date.now()/1000 >= sunrise && Date.now()/1000 <= sunset){
        domBgOverlay.style.background = "var(--bg-light)"
        domBgOverlay.style.opacity = "85%"
    } else {
        domBgOverlay.style.background = "var(--bg-dark)"
        domBgOverlay.style.opacity = "90%"
    }

    // Ubah Format Jam
    var sunrise = clockFormat(sunrise, timezone)
    var sunset = clockFormat(sunset, timezone)

    // DOM. Memasukkan value ke teks HTML
    domLoc.textContent = city + ", " + country
    domTemp.textContent = temp
    domWeatherIcon.src = weatherIcon
    domWeather.innerHTML = weather + '<br><span>' + weatherDesc + '</span>'
    domFeels.textContent = feels
    domWind.textContent = wind
    domHumidity.textContent = humidity
    domVisibility.textContent = visibility
    domSunrise.textContent = sunrise
    domSunset.textContent = sunset


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

showData("Bali")

domForm.addEventListener('submit', function(e){
    e.preventDefault()
    showData(domInput.value)
    input.value = ''
})