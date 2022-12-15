import request from 'postman-request';

const geocode = (address, callback) => {
    // https://api.mapbox.com/geocoding/v5/mapbox.places/georgia.json?types=country&access_token=pk.eyJ1IjoiamFjazAwMDAiLCJhIjoiY2xiZzkwOXMzMDM1YTN3cWI1YzU1OXQxMCJ9.zq8v5ORWlccwYKLV4C9vPA
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?types=country&access_token=pk.eyJ1IjoiamFjazAwMDAiLCJhIjoiY2xiZzkwOXMzMDM1YTN3cWI1YzU1OXQxMCJ9.zq8v5ORWlccwYKLV4C9vPA&limit=1DAiLCJhIjoiY2xiZzkwOXMzMDM1YTN3cWI1YzU1OXQxMCJ9.zq8v5ORWlccwYKLV4C9vPA&limit=1'

    //here we type {body} instead of response because here we do object destructuring if we want perticuler property of any big object
    //then we can fetch the property of that object by simplay accessing property name in '{}'
    //                                      ^
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback(error, undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

export default geocode