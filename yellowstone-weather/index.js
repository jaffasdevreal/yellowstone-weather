const express = require("express");
const axios = require("axios");

const app = express();

const LAT = 44.4280;
const LON = -110.5885;
const API_KEY = process.env.WEATHER_KEY;

app.get("/weather", async (req, res) => {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
        const r = await axios.get(url);

        res.json({
            condition: r.data.weather[0].main.toLowerCase(),
            temp: r.data.main.temp,
            wind: r.data.wind.speed,
            visibility: r.data.visibility
        });
    } catch (e) {
        res.status(500).json({ error: "Weather error" });
    }
});

app.listen(3000);
