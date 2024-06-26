import Image from "next/image";
import Clock from "react-live-clock";
import { useState } from "react";
import { GetWeatherHere, GetWeather, wunderground } from "./api/weather";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const Thermometer = dynamic(() => import("react-thermometer-ecotropy"), {
  ssr: false,
});

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [realWeather, setRealWeather] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    var timer = setInterval(
      function () {
        GetWeather(
          process.env.NEXT_PUBLIC_LAT,
          process.env.NEXT_PUBLIC_LON,
          setWeather,
        );
        wunderground(
          `${process.env.NEXT_PUBLIC_WUNDERGROUND}`,
          `${process.env.NEXT_PUBLIC_STATIONID}`,
          setRealWeather,
        );
      },

      60000,
    );
    GetWeather(
      process.env.NEXT_PUBLIC_LAT,
      process.env.NEXT_PUBLIC_LON,
      setWeather,
    );
    wunderground(
      `${process.env.NEXT_PUBLIC_WUNDERGROUND}`,
      `${process.env.NEXT_PUBLIC_STATIONID}`,
      setRealWeather,
    );
  }, []);

  function Capitalise(string) {
    const words = string.split(" ");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
  }
  var imageurl;
  if (weather != null) {
    var idnum = ("" + weather.weather[0].id)[0];
    if (idnum == 8) {
      imageurl = "" + weather.weather[0].id;
    } else {
      imageurl = "" + idnum;
    }
  }

  return (
    <div>
      {weather != null ? (
        <Image
          src={"/images/weatherPhotos/" + imageurl + ".jpeg"}
          layout="fill"
          className="opacity-75"
        />
      ) : (
        <Image
          src="/images/weatherPhotos/800.jpg"
          layout="fill"
          className="opacity-75"
        />
      )}

      <div className="center">
        <div className="clock-div">
          <Clock format={"HH:mm:ss"} ticking={true} />
          <p className="legend">
            &larr; Predicted &nbsp;&nbsp;&nbsp;&nbsp; Actual &rarr;
          </p>
        </div>

        {weather != null ? (
          <p>
            <div className="widget thermometerwidget">
              <Thermometer
                theme="dark"
                value={Math.round(weather.main.temp)}
                max="40"
                steps=""
                format="°C"
                size="large"
                height={windowSize.height * 0.25}
                tooltipValue={false}
                className="thermometer"
              />
              <div className="temp-text">
                {Math.round(weather.main.temp)}&deg;C
              </div>
            </div>
            <div className="speedometer widget">
              <CircularProgressbar
                value={(weather.wind.speed / 31) * 100}
                circleRatio={0.5}
                styles={buildStyles({
                  rotation: 3 / 4,
                  strokeLinecap: "round",
                  trailColor: "rgba(36,36,38, 0.5)",
                  pathColor: "#08E",
                })}
              />
              <div className="speed-text">
                {Math.round(weather.wind.speed * 1.61 * 100) / 100}kmh
              </div>
            </div>
            <div className="widget weather-widget">
              <Image
                src={"/images/weatherIcons/" + weather.weather[0].icon + ".png"}
                width={`${windowSize.height * 0.18}px`}
                height={`${windowSize.height * 0.18}px`}
                className="weathericon"
              />
              <div className="weather-desc">
                {Capitalise(weather.weather[0].description)}
              </div>
            </div>
          </p>
        ) : (
          " Loading"
        )}
        {realWeather != null ? (
          <p className="real">
            <div className="widget thermometerwidget">
              <Thermometer
                theme="dark"
                value={Math.round(weather.main.temp)}
                max="40"
                steps=""
                format="°C"
                size="large"
                height={windowSize.height * 0.25}
                tooltipValue={false}
                className="thermometer"
              />
              <div className="temp-text">
                {Math.round(realWeather.metric.temp)}&deg;C
              </div>
            </div>
            <div className="speedometer widget">
              <div className="real-speed-text">
                <b>
                  <u>Wind</u>
                </b>{" "}
                <br /> {realWeather.metric.windSpeed}kmh Speed
              </div>
              <div className="gust">{realWeather.metric.windGust}kmh Gust</div>
              <div className="wind-dir">Heading: {realWeather.winddir}°</div>
            </div>
            <div className="widget real-weather-widget">
              <div className="real-weather-desc">
                <b>
                  <u>Precipitation</u>
                </b>{" "}
                <br />
                {realWeather.metric.precipTotal}mm Total <br />
                {realWeather.metric.precipRate}mm Rate <br />
                <br /> UV index: {realWeather.uv}
              </div>
            </div>
          </p>
        ) : (
          ""
        )}
      </div>

      {windowSize.width > 0 ? (
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="logo"
            className="logopng"
            height={windowSize.height * 0.05}
            width={windowSize.height * 0.25}
          />
        </div>
      ) : null}
    </div>
  );
}
