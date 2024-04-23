import {Field, Form, Formik} from "formik";
import style from "./SearchingBar.module.sass"
import axios from "axios"
import {useCitiesStore} from "../../store/CitiesStore.ts";
import {City} from "../../store/CitiesType.ts";

export const SearchingBar = () =>{

    const {addCities, clearCities} = useCitiesStore();

    type getCitiesResponseType = {
            id: string,
            city: string,
            country: string,
            latitude: number,
            longitude: number
    }

    const Search = async (value: string) => {

        const options = {
            method: 'GET',
            url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
            params: {
                namePrefix: value.toString(),
                limit: '8'
            },
            headers: {
                'X-RapidAPI-Key': '7695f6f8f1msh0a561525519f123p110426jsn3ff1def9a897',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            clearCities();
            response.data.data.map((city : getCitiesResponseType)=>
            addCities({
                id: city.id,
                name: city.city,
                country: city.country,
                lat: city.latitude,
                lon: city.longitude
            } as City) )
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className={style.formikContainer}>
            <Formik initialValues={{search: ''}}
                    onSubmit={(value ) =>{
                        Search(value.search);
                    }}>
                <Form className={style.form}>
                    <Field className={style.field} id="search" name="search" placeholder="Enter your city"/>
                    <button className={style.submitButton} type="submit">search</button>
                </Form>
            </Formik>
        </div>
    )
}