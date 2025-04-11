const request = require('request')
require('dotenv').config()

const geocode = (address,callback) => {
    const geocodeApiKey = process.env.GEOCODE_API_KEY;
    const geocodeUrl = 'https://geocode.maps.co/search?q=' + encodeURIComponent(address) + '&api_key=' + geocodeApiKey


    request({ url: geocodeUrl, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.length === 0) {
            callback('Unable to fetch the coordinates, try an another search.')
        } else {
            callback(undefined, {
                latitude: body[0].lat,
                longitude: body[0].lon,
                location: body[0].display_name
            })
        }
    })
}

module.exports = geocode