const a = {
    coord: { lon: 73.8553, lat: 18.5196 },
    weather: [
        {
            id: 804,
            main: 'Clouds',
            description: 'overcast clouds',
            icon: '04d'
        }
    ],
    base: 'stations',
    main: {
        temp: 23.98,
        feels_like: 24.86,
        temp_min: 23.98,
        temp_max: 23.98,
        pressure: 1002,
        humidity: 93,
        sea_level: 1002,
        grnd_level: 941
    },
    visibility: 3453,
    wind: { speed: 1.49, deg: 31, gust: 1.85 },
    clouds: { all: 100 },
    dt: 1662901434,
    sys: { country: 'IN', sunrise: 1662857505, sunset: 1662901877 },
    timezone: 19800,
    id: 1259229,
    name: 'Pune',
    cod: 200
}

console.log(a);