import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import style from "./WeatherScreen.module.sass"
import sunrise from "/src/assets/sunrise-svgrepo-com.svg"
import sunset from "/src/assets/sunset-svgrepo-com.svg"

export const WeatherScreen = () =>{
    const {lat, lon} = useParams();

    const [weatherInfo, setWeatherInfo] = useState(
        {
            cityName: '',
            temperatureF: 0,
            weatherDesc: '',
            weather: '',
            feelsLikeTemperature: 0,
            pressure: 0,
            humidity:0,
            windSpeed: 0,
            windDeg: 0,
            windGust: 0,
            clouds: 0,
            icon: '',
            sunrise: 0,
            sunset: 0
        });

    const calculateWindDirection = (degree: number): string | undefined =>{
        switch (true) {
            case  (degree === 90): return 'N';
            case  (degree === 0): return 'E';
            case  (degree === 180): return 'W';
            case  (degree === 270): return 'S';
            case  (0<degree && degree<90): return 'NE';
            case  (90<degree && degree<180): return 'NW';
            case  (180<degree && degree<270): return 'SW';
            case  (270<degree && degree<= 359): return 'SE';
        }
    }

    const calculateTime = (utcTimestamp: number): string =>{
        const dateObj = new Date(utcTimestamp * 1000);
        const utcString = dateObj.toUTCString();

        return utcString.slice(-11, -7);
    }

    const SearchCityweather = async () =>{
        const options = {
            method: 'GET',
            url: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                lat: lat,
                lon: lon,
                appid: "3301a7ea48f27b4938ad11a2658413cd",
                units: 'metric'
            }
        };

        try {
            await axios.request(options)
                .then((response)=> response.data).then(data => {
            setWeatherInfo(
                {
                    cityName: data.name,
                    temperatureF: data.main.temp,
                    weatherDesc: data.weather[0].description,
                    weather: data.weather[0].main,
                    feelsLikeTemperature: data.main.feels_like,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    windDeg: data.wind.deg,
                    windGust: data.wind.gust,
                    clouds: data.clouds.all,
                    icon: data.weather[0].icon,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset
                })
        })}

        catch (error) {
            console.error(error);
        }
    }

    useEffect(() =>{
        SearchCityweather()
        console.log(weatherInfo.icon);
    }, [])

    return(
        <div className={style.weatherContainer}>
            <div className={style.topContainer}>
                <h3 className={style.city}>{weatherInfo.cityName}</h3>
                <div className={style.temperatureInfo}>
                    <div className={style.temperatureInfo__left}>
                        <div className={style.temperatureContainer}>
                            <h1 className={style.temperature}>{Math.round(weatherInfo.temperatureF)}</h1>
                            <span className={style.celcium}>° </span>
                        </div>

                        <span className={style.weatherDescription}>{weatherInfo.weatherDesc}</span>
                    </div>
                    <div className={style.temperatureInfo__right}>
                        <img src={`/src/assets/${weatherInfo.icon}.png`} alt="weather_icon" className={style.weatherImage}/>
                        <div className={style.cloudiness}>Cloudiness:{weatherInfo.clouds}%</div>
                    </div>
                </div>
            </div>

            <div className={style.bottomContainer}>
                <h3 className={style.bottomTitle}>Weather Details</h3>
                <div className={style.bottomContainerInsides}>
                    <ul className={style.bottomLeftList}>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Feels like</h3>
                            <span className="itemMeaning">{Math.round(weatherInfo.feelsLikeTemperature)}°</span>
                        </li>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Humidity</h3>
                            <span className="itemMeaning">{weatherInfo.humidity}%</span>
                        </li>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Pressure</h3>
                            <span className="itemMeaning">{weatherInfo.pressure} hPa</span>
                        </li>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Wind speed</h3>
                            <span className="itemMeaning">{weatherInfo.windSpeed} mi/h</span>
                        </li>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Wind degree</h3>
                            <span className="itemMeaning">{weatherInfo.windDeg} {calculateWindDirection(weatherInfo.windDeg)}</span>
                        </li>
                        <li className={style.listItem}>
                            <h3 className={style.itemTitle}>Wind gust</h3>
                            <span className="itemMeaning">{weatherInfo.windGust} m/s</span>
                        </li>
                    </ul>
                    <div className={style.bottomRightContainer}>
                        <span className={style.durabilityTitle}>Day durability</span>
                        <div className={style.dayDurabilitySheme}>
                            <div className={style.sunrise}>
                                <img src={sunrise} alt="sunrise" className={style.shemeImage}/>
                                <span className={style.sunriseTime}>{calculateTime(weatherInfo.sunrise)} am </span>
                            </div>
                            <div className={style.sunrise}>
                                <img src={sunset} alt="sunset"  className={style.shemeImage}/>
                                <span className={style.sunriseTime}>{calculateTime(weatherInfo.sunset)} pm</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}