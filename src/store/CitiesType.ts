export type City = {
    id: string,
    name: string,
    country: string,
    lat: number,
    lon: number
}

export type CitiesStore = {
    cities: City[],
    addCities: (city: City) => void,
    clearCities: () => void
}