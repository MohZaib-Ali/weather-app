const weatherForm = document.querySelector('.weather-form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:8080/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.message
            }
        })
    })
})