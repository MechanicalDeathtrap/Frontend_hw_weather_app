import {useCitiesStore} from "../../store/CitiesStore.ts";
import style from "./CityCard.module.sass"
import {Link} from "react-router-dom";

export const CityCard = () => {

    const {cities} = useCitiesStore();
    console.log(cities);
    return(
        <>
            {
                cities.length ?
                    ( cities.map(city => (
                        <Link to={`/weather/${city.lat}/${city.lon}`} key={city.id} className={style.listItem}>
                            <img src="src/assets/sun-svgrepo-com.svg" alt="sun" className={style.itemImage}/>
                            <h3 className={style.cityInfo}>{city.name}, {city.country}</h3>
                        </Link>
                        ))
                    ) :
                    <></>
            }
        </>
    )
}