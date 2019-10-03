const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGhvbWFzcmVpbGx5IiwiYSI6ImNqeDlpcHY2bTB0dTMzcG90OWpuOGlzaWEifQ.3w4jAaowSJgCSCTfv-tobw'

    request({url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (response.body.features.length == 0) {
            callback('Unable to find location. Try another search!')
        } else {
            const lat = response.body.features[0].center[1]
            const long = response.body.features[0].center[0]
            callback(undefined, {
                lat: lat,
                long: long,
                location: response.body.features[0].place_name 
            })
        }
    })
}

module.exports = geocode