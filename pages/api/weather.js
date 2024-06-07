


const key = `${process.env.NEXT_PUBLIC_WEATHER_KEY}`
export async function GetWeatherHere(_callback) {
    if (navigator.geolocation) {
        const position = await getCurrentPosition()
        var url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`
        
        _callback(await getWeather(url));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
    
}
export async function GetWeatherIndexJS(_callback) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.NEXT_PUBLIC_LAT}&lon=${process.env.NEXT_PUBLIC_LON}&appid=${key}&units=metric`
    _callback(await getWeather(url));
}
async function getCurrentPosition() {
    return await new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        )
    })
}
async function getWeather(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
export async function wunderground(apiKey,stationID, callback) {
      let url= `https://api.weather.com/v2/pws/observations/current?stationId=${stationID}&format=json&units=m&apiKey=${apiKey}`
      let response = await fetch(url)
      console.log(response)
      let data = await response.json()
      //console.log(data)
      
      callback(data.observations[0])

}
export async function GetWeatherNUC1(_callback) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.NEXT_PUBLIC_LAT_NUC_1}&lon=${process.env.NEXT_PUBLIC_LON_NUC_1}&appid=${key}&units=metric`
    _callback(await getWeather(url));
}
export async function GetWeatherNUC2(_callback) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${process.env.NEXT_PUBLIC_LAT_NUC_2}&lon=${process.env.NEXT_PUBLIC_LON_NUC_2}&appid=${key}&units=metric`
    _callback(await getWeather(url));
}
