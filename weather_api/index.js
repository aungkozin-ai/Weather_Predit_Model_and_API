import express from 'express'
import weatherRouter from './router/weather.js'

const app = express();
app.use(weatherRouter);

let port = '3000';
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})