const express = require('express');
const http = require('https');
const bodyParser = require('body-parser');
const { rmSync } = require('fs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/weather.html');
});

app.post('/', function (req, res) {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a80e09962afb6bcde440998015cb5721&units=metric";
    http.get(url, function (response) {
        response.on("data", function (data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            var sunrise = weather.sys.sunrise;
            sunrise = +sunrise;
            sunrise = sunrise / (1000 * 60 * 60 * 24);
            sunrise = sunrise - 12
            sunrise = sunrise.toFixed(2);

            var sunset = weather.sys.sunset;
            sunset = +sunset;
            sunset = sunset / (1000 * 60 * 60 * 24);
            sunset = sunset - 12
            sunset = sunset.toFixed(2)

            var date = new Date();
            var options = { weekday: "long", day: "numeric", month: "long" }
            var currentday = date.toLocaleDateString("en-US", options);
            res.write('<html>')
            res.write('<link type="text/css" href="css/style.css" rel="stylesheet">')
            res.write('<link type="text/css" href="css/bootstrap-5.2.0-dist/css/bootstrap.css" rel="stylesheet">');
            res.write('<link type="text/css" href="css/bootstrap-5.2.0-dist/css/bootstrap.css" rel="stylesheet">');
            res.write('<link rel="preconnect" href="https://fonts.googleapis.com">');
            res.write('<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
            res.write('<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">');
            res.write('<body style="background-color:black; font-family: "Libre Baskerville",Regular 400 Italic;>');
            res.write('<h2 class="op">Temperature of ' + city + " is " + temp + " Centigrade </h2>");
            res.write('<h2 class="op">'+currentday+"</h2>");
            res.write('<h2 class="misc"> Weather: '+weather.weather[0].main+"</h2>");
            res.write('<h2 class="misc"> Weather Description: '+weather.weather[0].description+"</h2>");
            res.write('<div class="row">')
            res.write('<div class="col-lg-6">feels_like: ' + weather.main.feels_like + " Centigrade </div>");
            res.write('<div class="col-lg-6">Humidity: ' + weather.main.humidity + " % </div>");
            res.write('<div class="col-lg-6">Min. Temp: ' + weather.main.temp_min + " Centigrade </div>");
            res.write('<div class="col-lg-6">Max. Temp:' + weather.main.temp_max + " Centigrade </div>");
            res.write('<br>');
            res.write('<div class="col-lg-6">Sun Rise: ' + sunrise + " A.M </div>");
            res.write('<div class="col-lg-6">Sun Set: ' + sunrise + " P.M </div>");
            res.write('</div>')
            res.write('</body>');
            res.write('</html>');
            res.send();
            res.end();
        })
    })
})
app.listen(process.env.PORT || 3000);
