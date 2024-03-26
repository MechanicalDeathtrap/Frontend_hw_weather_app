import {SearchingBar} from "../components/SearchingBar/SearchingBar.tsx";
import style from "../components/MainScreen/MainScreen.module.sass";
import {CityCard} from "../components/CityCard/CityCard.tsx";
import {WelcomeComponent} from "../components/WelcomeComponent/WelcomeComponent.tsx";
import {useCitiesStore} from "../store/CitiesStore.ts";

export const SearchingPage = () =>{
    const {cities} = useCitiesStore();
    return(
        <>
            <SearchingBar/>
            {  cities.length ? (
                    <ul className={style.citiesList}>
                        <CityCard/>
                    </ul>
                )
                :
                <WelcomeComponent/>
            }
        </>
    )
}