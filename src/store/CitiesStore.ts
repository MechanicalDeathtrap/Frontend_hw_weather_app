import {create} from "zustand";
import {City,CitiesStore} from "./CitiesType.ts";

export const useCitiesStore  = create<CitiesStore>((set) =>({
    cities: [],
    addCities: (city: City) => {
        set((state) => ({
            cities: [
                ...state.cities,
                city
            ]
        }))
    },
    clearCities: () => {
        set(() => ({
            cities: []
        }))
    }
}))