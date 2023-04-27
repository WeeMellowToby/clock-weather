


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
export async function GetWeatherInBrighton(_callback) {
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${51.59925896152268}&lon=${-2.203956600846051}&appid=${key}&units=metric`
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
      let data = await response.json()
      callback(data.observations[0])

}