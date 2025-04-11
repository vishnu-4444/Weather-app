console.log('Client side javascript loaded!')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=!').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() 
    const location = searchElement.value
    // console.log(location)
    if (!location) {
        // console.log('Enter a location')
        message1.textContent = 'Enter a location'
        message2.textContent = '' 
    } else {
        message1.textContent = 'Loading....'
        message2.textContent = '' 
        fetch('http://localhost:3000/weather?address='+location).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error)
                    message1.textContent = data.error
                } else {
                    message1.textContent = data.location
                    message2.textContent = data.forecast
                    // console.log(data.location)
                    // console.log(data.forecast)
                }
            })
        })
    }
})