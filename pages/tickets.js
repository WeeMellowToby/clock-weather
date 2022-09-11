import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import  Login  from "./components/login"
import { getJWT, getTickets } from '../tickets/ticketCount'
import Clock from 'react-live-clock';
import { GetWeatherInBrighton } from './api/weather';
import Image from 'next/image';
import dynamic from 'next/dynamic';
const Thermometer = dynamic(() => import('react-thermometer-ecotropy'), {
  ssr: false,
})
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
export default function Tickets({hasReadPermission}) {
  const [tickets,SetTickets] = React.useState(0);
    const router = useRouter()
    const [weather,setWeather] = useState(null);
    let jwt;
    useEffect(() => {
      var timer = setInterval(function(){
        GetWeatherInBrighton(setWeather);
        if (hasReadPermission) {
          getTickets(jwt,SetTickets);
        }
      }
      
      ,180000);
      GetWeatherInBrighton(setWeather);
      if (hasReadPermission) {
        getJWT((token) => {
          getTickets(token,SetTickets);
          jwt = token;
        })
        
      }
    }, [])
    if (!hasReadPermission) {
        return <Login redirectPath={router.asPath} />
      }

    
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
              {weather != null ? <p> <div>
            <Thermometer theme="dark" value={Math.round(weather.main.temp)} max="40" steps="" format="°C" size="large" height="300" tooltipValue={false} className="thermometer"/>
            <div className='temp-text'>{Math.round(weather.main.temp)}&deg;C</div>
            </div>
            <div className="speedometer">
             <CircularProgressbar value={(weather.wind.speed / 31) * 100} circleRatio={0.5} styles={buildStyles({rotation: 3 / 4, strokeLinecap: "round", trailColor: "rgba(238, 238, 255, 0.3)", pathColor: "#FFF" })}/>
             <div className='speed-text'>{weather.wind.speed} mph</div>
            </div>
             <div className='weather-desc'>{Capitalise(weather.weather[0].description)}</div> <br/> <div className='scanned'>{tickets != 0 ? tickets : 'Loading'} Tickets Scanned</div> </p> : <p>Loading</p>}
              
          </div>
    
          <div className=' absolute bottom-10 right-10'>
              <Image src="/images/logo.png" alt="logo" width={270} height={60} />
          </div>
    
          </div>
      )
}
