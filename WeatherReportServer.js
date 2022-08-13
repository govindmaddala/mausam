const express = require('express');
const http = require('https');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + '/weather.html');
});

app.use(express.static("public"));

app.post('/', function (req, res) {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a80e09962afb6bcde440998015cb5721&units=metric";
    http.get(url, function (response) {
        response.on("data", function (data) {
            const weather = JSON.parse(data);
            const temp = weather.main.temp;
            res.send('<h2 style="background: url(\'https://assets.cntraveller.in/photos/62a6e04725a409c7e0f2d254/16:9/w_1024%2Cc_limit/weather-story-june.jpg\'); background-size: 1536px 824px;">Temperature of ' + city + " is " + temp + "℃ </h2>");


            // res.send();
            
        })
    })
})

app.listen(process.env.PORT || 3000);
