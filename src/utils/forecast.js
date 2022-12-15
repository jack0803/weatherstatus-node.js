import request from 'postman-request';

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c10c64c6cf654db5d8cee29b8dcc839&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,"The weather Out there is " + response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " F.")
        }
    })
}

export default forecast ;