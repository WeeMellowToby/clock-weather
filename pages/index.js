import Image from 'next/image'
import Clock from 'react-live-clock';
import { useState } from 'react';
import { GetWeatherHere} from './api/weather';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const Thermometer = dynamic(() => import('react-thermometer-ecotropy'), {
  ssr: false,
})
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


export default function Home() {
  const [weather,setWeather] = useState(null);
  useEffect(() => {
    var timer = setInterval(function(){
      GetWeatherHere(setWeather);
    }
    ,60000);
    GetWeatherHere(setWeather);
    console.log(weather)
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
      {weather != null ? <Image src={"/images/weatherPhotos/" + imageurl + ".jpeg"} layout="fill" className="opacity-75"/> : <Image src="/images/weatherPhotos/clear sky.jpg" layout="fill" className="opacity-75"/>}
      
      <div className = 'center'>
      <Clock
          format={'HH:mm:ss'}
          ticking={true}
          />
          
          {weather != null ? <p> 
            <div className='widget thermometerwidget'>
            <Thermometer theme="dark" value={Math.round(weather.main.temp)} max="40" steps="" format="°C" size="large" height="275" tooltipValue={false} className="thermometer"/>
            <div className='temp-text'>{Math.round(weather.main.temp)}&deg;C</div>
            </div>
            <div className="speedometer widget">
             <CircularProgressbar value={(weather.wind.speed / 31) * 100} circleRatio={0.5} styles={buildStyles({rotation: 3 / 4, strokeLinecap: "round", trailColor: "rgba(36,36,38, 0.5)", pathColor: "#08E" })}/>
             <div className='speed-text'>{weather.wind.speed} mph</div>
            </div>
             <div className='widget weather-widget'>
             <Image src={"/images/weatherIcons/" + weather.weather[0].icon + ".png"} width="200px" height="200px" className='weathericon'/>
            <div className='weather-desc'>{Capitalise(weather.weather[0].description)}</div>
             </div>
             
             </p> : ' Loading'}
      </div>

      <div className=' absolute bottom-10 right-10'>
          <Image src="/images/logo.png" alt="logo" width={270} height={60} />
      </div>

      </div>
  )
}
