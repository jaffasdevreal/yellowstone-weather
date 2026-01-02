const express = require("express");
const axios = require("axios");

const app = express();

const LAT = 44.4280;
const LON = -110.5885;
const API_KEY = process.env.WEATHER_KEY;
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send("Yellowstone Weather API running");
});

app.get("/weather", async (req, res) => {
	try {
		const url =
			`https://api.openweathermap.org/data/2.5/weather` +
			`?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

		const r = await axios.get(url);

		res.json({
			condition: r.data.weather[0].main.toLowerCase(),
			temp: r.data.main.temp,
			wind: r.data.wind.speed,
			visibility: r.data.visibility
		});
	} catch (e) {
		res.status(500).json({ error: "Weather failed" });
	}
});

app.get("/forecast", async (req, res) => {
	try {
		const url =
			`https://api.openweathermap.org/data/2.5/forecast` +
			`?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

		const r = await axios.get(url);

		const current = {
			condition: r.data.list[0].weather[0].main.toLowerCase(),
			temp: r.data.list[0].main.temp,
			wind: r.data.list[0].wind.speed
		};

		const forecast = [];

		for (let i = 1; i <= 5; i++) {
			const entry = r.data.list[i];
			forecast.push({
				condition: entry.weather[0].main.toLowerCase(),
				temp: entry.main.temp,
				wind: entry.wind.speed
			});
		}

		res.json({
			current,
			forecast
		});
	} catch (e) {
		res.status(500).json({ error: "Forecast failed" });
	}
});

app.listen(PORT, () => {
	console.log("Server running on port", PORT);
});
