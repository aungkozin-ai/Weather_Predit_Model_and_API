const getWeatherData = (weatherData) => {
    const temperature = weatherData.main.temp;
    const windSpeed = weatherData.wind.speed;
    const windGust = weatherData.wind.gust || windSpeed;
    const pressure = weatherData.main.pressure;
    const humidity = weatherData.main.humidity;
    const rainVolume = weatherData.rain ? weatherData.rain['1h'] || 0 : 0;
    const cloudiness = weatherData.clouds.all;

    let rainPrediction = rainVolume > 0;
    let floodPrediction = rainVolume > 20 && humidity > 80 && pressure < 1000;
    let stormPrediction = windSpeed > 15 || windGust > 20 || cloudiness > 90;

    return { temperature, windSpeed, windGust, pressure, humidity, rainVolume, cloudiness, rainPrediction, floodPrediction, stormPrediction }

}

export default getWeatherData