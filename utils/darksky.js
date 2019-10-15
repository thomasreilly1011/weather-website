const request = require('request')

const weather = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/b769f5c028eee3035b3bab5f6632d0fd/' + lat + ',' + long

    request({url: url, json: true }, (error, response) => {
            if (error) {
                callback('Unable to connect to weather service!')
            } else if (response.body.error) {
                callback('Unable to find location')
            } else {
                const currTemp = (toCelcius(response.body.currently.temperature.toCelcius))
                const currRain = (response.body.currently.precipProbability)
                callback(undefined, 'It is currently ' + currTemp + ' degrees out. There is a ' + currRain + '% chance of precipitaion')
            }
        })   
}

const toCelcius = (faren) => {
    return (faren - 32)*(5/9)
}

module.exports = weather