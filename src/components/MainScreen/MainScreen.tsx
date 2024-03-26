import style from "./MainScreen.module.sass"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {WeatherScreen} from "../WeatherScreen/WeatherScreen.tsx";
import {SearchingPage} from "../../pages/SearchingPage.tsx";


export const MainScreen = () => {
    return(
        <main className={style.mainScreen}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<SearchingPage/>}/>
                    <Route path="/weather/:lat/:lon" element={<WeatherScreen/>}/>
                </Routes>
            </BrowserRouter>
        </main>
    )
}