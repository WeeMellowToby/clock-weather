import Image from 'next/image'
import Clock from 'react-live-clock';
import { useState } from 'react';
import { GetWeatherHere, GetWeatherInBrighton, wunderground} from './api/weather';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Thermometer = dynamic(() => import('react-thermometer-ecotropy'), {
  ssr: false,
})
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Home() {
  const [weather,setWeather] = useState(null);
  const [realWeather,setRealWeather] = useState(null)
  useEffect(() => {
    var timer = setInterval(function(){
      GetWeatherInBrighton(setWeather);
      console.log(wunderground(`${process.env.NEXT_PUBLIC_WUNDERGROUND}`,"IBUNTI2",setRealWeather))
    }
    
    ,60000);
    GetWeatherInBrighton(setWeather);
    console.log(wunderground(`${process.env.NEXT_PUBLIC_WUNDERGROUND}`,"IBUNTI2",setRealWeather))
  }, [])

  function Capitalise(string) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return(words.join(" "));
  }
  var imageurl;
  if(weather != null) {
    var idnum = ("" + weather.weather[0].id)[0]
    if(idnum == 8) {
      imageurl = "" + weather.weather[0].id
    } else {
      imageurl = "" + idnum
    }

  }
  return (
    <div className=''>
      {weather != null ? <Image src={"/images/weatherPhotos/" + imageurl + ".jpeg"} layout="fill" className="opacity-75"/> : <Image src="/images/weatherPhotos/800.jpg" layout="fill" className="opacity-75"/>}
      
      <div className = 'center'>
      <div className='clock-div'><Clock format={'HH:mm:ss'} ticking={true}/></div>
          
          {weather != null ? <p> 
            <div className='widget thermometerwidget'>
            <Thermometer theme="dark" value={Math.round(weather.main.temp)} max="40" steps="" format="°C" size="large" height="275" tooltipValue={false} className="thermometer"/>
            <div className='temp-text'>{Math.round(weather.main.temp)}&deg;C</div>
            </div>
            <div className="speedometer widget">
             <CircularProgressbar value={(weather.wind.speed / 31) * 100} circleRatio={0.5} styles={buildStyles({rotation: 3 / 4, strokeLinecap: "round", trailColor: "rgba(36,36,38, 0.5)", pathColor: "#08E" })}/>
             <div className='speed-text'>{weather.wind.speed}mph</div>
            </div>
             <div className='widget weather-widget'>
             <Image src={"/images/weatherIcons/" + weather.weather[0].icon + ".png"} width="200px" height="200px" className='weathericon'/>
            <div className='weather-desc'>{Capitalise(weather.weather[0].description)}</div>
            </div>

             
             </p> : ' Loading'}
             {realWeather != null ? <p className='real'> 
            <div className='widget thermometerwidget'>
            <Thermometer theme="dark" value={Math.round(weather.main.temp)} max="40" steps="" format="°C" size="large" height="275" tooltipValue={false} className="thermometer"/>
            <div className='temp-text'>{Math.round(realWeather.metric.temp)}&deg;C</div>
            </div>
            <div className="speedometer widget">
             <div className='real-speed-text'>{realWeather.metric.windSpeed}kmh speed</div>
             <div className='gust'>{realWeather.metric.windGust}kmh gust</div>
             <div className='wind-dir'>Direction: {realWeather.winddir}°</div>
            </div>
             <div className='widget real-weather-widget'>
             
            <div className='real-weather-desc'>
            {realWeather.metric.precipTotal}mm total precip {realWeather.metric.precipRate}mm precip rate
            
            </div>
            </div>

             
             </p> : ' Loading'}
      </div>
      

      <div className='logo'>
          <Image src="/images/logo.png" alt="logo" width={270} height={60} />
      </div>

      </div>
  )
}
