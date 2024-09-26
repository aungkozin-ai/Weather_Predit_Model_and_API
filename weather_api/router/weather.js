import express from 'express';
import getWeatherData from '../get_predit_weather_data/getWeatherData.js';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const weatherURL = process.env.WEATHER_API_URL;
const apiKey = process.env.WEATHER_API_KEY;

if (!weatherURL || !apiKey) {
    throw new Error('Weather API URL or API key is not set');
}

router.get('/predit', async(req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Please provide latitude and longitude' });
    }

    try {
        const response = await axios.get(weatherURL, {
            params: {
                lat: lat,
                lon: lon,
                appid: apiKey,
                units: 'metric',
                exclude: 'hourly'
            }
        });

        const weatherData = response.data;
        // console.log(weatherData, "weatherData");

        try {
            const {
                temperature,
                windSpeed,
                windGust,
                pressure,
                humidity,
                rainVolume,
                cloudiness,
                rainPrediction,
                floodPrediction,
                stormPrediction
            } = getWeatherData(weatherData);

            res.json({
                location: { lat, lon },
                temperature,
                rainVolume,
                windSpeed,
                windGust,
                cloudiness,
                pressure,
                humidity,
                predictions: {
                    rain: rainPrediction ? "Likely to rain" : "No significant rain expected",
                    flood: floodPrediction ? "Flooding possible" : "No flooding expected",
                    storm: stormPrediction ? "Storm likely" : "No storm expected"
                }
            });
        } catch (error) {
            console.error('Error processing weather data:', error);
            res.status(500).json({ error: 'Error processing weather data' });
        }
    } catch (error) {
        console.error('Error retrieving weather data:', error);
        res.status(500).json({ error: 'Error retrieving weather data' });
    }
});

export default router;