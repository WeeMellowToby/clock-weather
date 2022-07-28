import Image from 'next/image'
import Clock from 'react-live-clock';
import { useState } from 'react';
import { GetWeatherHere, GetWeatherInBrighton } from './api/weather';
import { useEffect } from 'react';
export default function Home() {
  const [weather,setWeather] = useState(null);
  useEffect(() => {
    var timer = setInterval(function(){
      GetWeatherInBrighton(setWeather);
    }
    ,60000);
    GetWeatherInBrighton(setWeather);
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
      <div className = 'clock'>
      <Clock
          format={'HH:mm:ss'}
          ticking={true}
          
          />
          {weather != null ? <p>{Math.round(weather.main.temp * 10) / 10}&#8451; <br/> {Capitalise(weather.weather[0].description)} <br/> Wind: {weather.wind.speed} km/h</p> : ' Loading'}
      </div>

      <div className=' absolute bottom-10 right-10'>
          <Image src="/images/logo.png" alt="logo" width={270} height={60} />
      </div>

      </div>
  )
}
