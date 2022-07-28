import Image from 'next/image'
import Clock from 'react-live-clock';
import { useState } from 'react';
import { GetWeatherHere } from './api/weather';
import { useEffect } from 'react';
export default function Home() {
  const [weather,setWeather] = useState(null);
  useEffect(() => {
    var timer = setInterval(function(){
      GetWeatherHere(setWeather);
    }
    ,60000);
    GetWeatherHere(setWeather);
  }, [])
  useEffect(() => {
    console.log(weather);
  }, [weather])

  return (
    <div>
      <div>
      <div className = 'clock'>
      <Clock
          format={'HH:mm:ss'}
          ticking={true}
          
          />
          {weather != null ? <p>{weather.main.temp}&#8451; {weather.weather[0].description}</p> : 'Loading'}
      </div>

      <div className=' absolute bottom-0 right-0'>
          <Image src="/images/logo.png" alt="logo" width={273} height={88}/>
      </div>
      </div>

      </div>
  )
}
