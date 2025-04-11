const { error } = require('console')
const request = require('request')
require('dotenv').config()

const forecast = (lat,lon,callback) => {
    const weatherApiKey = process.env.WEATHER_API_KEY;
    const url = 'http://api.weatherstack.com/current?access_key=' + weatherApiKey + '&query=' + lat + ',' + lon;


    request({ url, json: true}, (error, {body}) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions + ', It is currently '+body.current.temperature +' degrees out.') // There is a '+body.current.precip+'% chance of rain.'
        }
    })
}

module.exports = forecast