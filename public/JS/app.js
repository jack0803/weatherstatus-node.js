//if this file add in any html file then we indirectly link this file with server

console.log('Client side javascript file is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
//here we target if so we use #
const massage1 = document.querySelector('#forecast')
const massage2 = document.querySelector('#position')

massage1.textContent = 'weather report will appear here!'
massage2.textContent = 'coordinats will appear here!'

weatherForm.addEventListener('submit', (e) => {
    //prevent page from reload
    e.preventDefault()

    const location = search.value

    massage1.textContent = 'loading...'
    massage2.textContent = 'loading...' 
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                massage1.textContent = data.error
                massage2.textContent = data.error
            } else {
                massage1.textContent = data.forecast
                massage2.textContent = data.latitude + '° N' + ' ' +  data.longitude + '° E' 
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})