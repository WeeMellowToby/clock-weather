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
  }, [])

  function Capitalise(string) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return(words.join(" "));
  }
  return (
    <div className=''>
      <Image src="/images/background.jpg" layout="fill" className="opacity-25"/>
      <div className = 'center'>
      <Clock
          format={'HH:mm:ss'}
          ticking={true}
          
          />
          
          {weather != null ? <p> 
            <div>
            <Thermometer theme="dark" value={Math.round(weather.main.temp)} max="40" steps="" format="°C" size="large" height="300" tooltipValue={false} className="thermometer"/>
            <div className='temp-text'>{Math.round(weather.main.temp)}&deg;C</div>
            </div>
            <div className="speedometer">
             <CircularProgressbar value={(weather.wind.speed / 31) * 100} circleRatio={0.5} styles={buildStyles({rotation: 3 / 4, strokeLinecap: "round", trailColor: "rgba(238, 238, 255, 0.3)", pathColor: "#FFF" })}/>
             <div className='speed-text'>{weather.wind.speed} mph</div>
            </div>
             <div className='weather-desc'>{Capitalise(weather.weather[0].description)}</div>
             </p> : ' Loading'}
      </div>

      <div className=' absolute bottom-10 right-10'>
          <Image src="/images/logo.png" alt="logo" width={270} height={60} />
      </div>

      </div>
  )
}
