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
            res.send('<h2 style="background-image: url(\'https://i.vimeocdn.com/video/646359068-1ea045737948ff577834f38ff46ee2ae3abb172c489b6ec25930d8106f415f26-d?mw=1300&mh=732&q=70\'); background-size: 1536px 824px; text-align: center;">Temperature of '+city + " is "+ temp + "℃ </h2>");
        })
    })
})
app.listen(process.env.PORT || 3000);
