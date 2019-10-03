console.log('Client side javascript file is loaded!')

const  weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherform.addEventListener('submit', (e) => {
    e.preventDefault() //stops the form from refreshing the page when submitting
    
    const location = search.value

    //fetch makes a requests data from a http
    fetch('http://localhost:3000/weather?address="' + location + '"').then((response) => {
    //.then() takes the response from the http and lets you do something with it in a function 
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})