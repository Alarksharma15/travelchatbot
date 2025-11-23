import express from 'express';
import axios from 'axios';

const router = express.Router();

// Geocoding function to get coordinates from city name
async function getCoordinates(city) {
    try {
        const response = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
            params: {
                name: city,
                count: 1,
                language: 'en',
                format: 'json'
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            const result = response.data.results[0];
            return {
                latitude: result.latitude,
                longitude: result.longitude,
                name: result.name,
                country: result.country
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Get weather data from Open-Meteo
router.get('/', async (req, res) => {
    try {
        const { city, latitude, longitude } = req.query;
        let coords;

        // If city is provided, geocode it
        if (city) {
            coords = await getCoordinates(city);
            if (!coords) {
                return res.status(404).json({ error: 'City not found' });
            }
        } else if (latitude && longitude) {
            coords = {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                name: 'Selected Location'
            };
        } else {
            return res.status(400).json({ error: 'Please provide either city name or coordinates' });
        }

        // Fetch weather data
        const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
            params: {
                latitude: coords.latitude,
                longitude: coords.longitude,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max',
                timezone: 'auto',
                forecast_days: 7
            }
        });

        const data = weatherResponse.data;

        // Format the response
        const formattedWeather = {
            location: {
                name: coords.name,
                country: coords.country || '',
                latitude: coords.latitude,
                longitude: coords.longitude
            },
            current: {
                temperature: data.current.temperature_2m,
                feelsLike: data.current.apparent_temperature,
                humidity: data.current.relative_humidity_2m,
                precipitation: data.current.precipitation,
                windSpeed: data.current.wind_speed_10m,
                weatherCode: data.current.weather_code,
                time: data.current.time
            },
            daily: data.daily.time.map((time, index) => ({
                date: time,
                weatherCode: data.daily.weather_code[index],
                tempMax: data.daily.temperature_2m_max[index],
                tempMin: data.daily.temperature_2m_min[index],
                precipitation: data.daily.precipitation_sum[index],
                precipitationProbability: data.daily.precipitation_probability_max[index]
            })),
            units: {
                temperature: data.current_units.temperature_2m,
                windSpeed: data.current_units.wind_speed_10m,
                precipitation: data.current_units.precipitation
            }
        };

        res.json(formattedWeather);

    } catch (error) {
        console.error('Weather API error:', error);
        res.status(500).json({
            error: 'Failed to fetch weather data',
            details: error.message
        });
    }
});

export default router;