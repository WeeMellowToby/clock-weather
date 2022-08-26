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
    var url = `https://api.openweathermap.org/data/2.5/weather?lat=${51.40276657156215}&lon=${-0.031941734600035306}&appid=${key}&units=metric`
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