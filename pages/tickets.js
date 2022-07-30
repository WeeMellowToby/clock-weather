import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import  Login  from "./components/login"
import { getJWT, getTickets } from '../tickets/ticketCount'
import Clock from 'react-live-clock';
import { GetWeatherInBrighton } from './api/weather';
import Image from 'next/image';
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
          <div className = 'clocktickets'>
          <Clock
              format={'HH:mm:ss'}
              ticking={true}
              
              />
              {weather != null ? <p>{Math.round(weather.main.temp * 10) / 10}&#8451; <br/> {Capitalise(weather.weather[0].description)} <br/> Wind: {weather.wind.speed} km/h <br/> {tickets != 0 ? tickets : 'Loading'} Tickets Scanned </p> : <p>Loading</p>}
              
          </div>
    
          <div className=' absolute bottom-10 right-10'>
              <Image src="/images/logo.png" alt="logo" width={270} height={60} />
          </div>
    
          </div>
      )
}
