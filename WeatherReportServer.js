const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", 'ejs')

app.get("/", function (req, res) {
    res.render("HomePage")
});

app.get('/articles', (req, res) => {
    res.render("Articles")
})

app.get('/contacts', (req, res) => {
    res.render("Contacts")
})

app.post('/', function (req, res) {
    const city = req.body.cityName;
    if (city === "") {
        res.redirect('/');
    }
    else{
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a80e09962afb6bcde440998015cb5721&units=metric";
        http.get(url, function (response) {
            response.on("data", function (data) {
                const weather = JSON.parse(data);
                var date = new Date();
                var options = { weekday: "long", day: "numeric", month: "long" }
                var currentday = date.toLocaleDateString("en-US", options);
                if (weather.cod === 200) {
                    const temp = weather.main.temp;
                    res.render("WeatherResp", {
                        City: city,
                        todayTemp: temp,
                        todayDate: currentday,
                        weatherOverview: weather.weather[0].main,
                        weatherDescription: weather.weather[0].description,
                        feels_like: weather.main.feels_like,
                        humidity: weather.main.humidity,
                        temp_min: weather.main.temp_min,
                        temp_max: weather.main.temp_max
                    })
                }
                else if (weather.cod >= 400) {
                    res.render("ErrorPage")
                }
                else {
                    res.redirect('/');
                }
            })
        })

    }

})
app.listen(process.env.PORT || 3000);
