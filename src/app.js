//Imports the npm modules.
const path = require('path')
//Express is an npm module that allows easy hosting of html, css, js and json on a webserver
const express = require('express')
const hbs = require('hbs')

//Imports the modules that do the requesting
const geocode = require('../utils/geocode')
const weather = require('../utils/darksky')

//__dirname is the path of the directory this file is located in
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Sets up the express server
const app = express()
const port = process.env.PORT || 3000

//Sets up handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Posts a file (html) to the webserver
app.use(express.static(publicDirectoryPath))

//Posts to the client
app.get('', (req, res) => {
    //Renders index.hbs to the screen when the server is accessed. Also provides a json object which can be acessed in the .hbs file.
    res.render('index', {
        title: 'Weather',
        name: 'Thomas Reilly'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Thomas Reilly'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Thomas Reilly'
    })
})

//Posts to a client called /weather. This is used to host the data recieved requests to geocode and darksky.
app.get('/weather', (req, res) => {
    if(!req.query.address) {//If the address field is empty
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, data) => {//calls geocode using the address provided in the url
            if (error) { //If an error occurs in the geocode request
                return res.send({ error });
            } else { //What to do when you have the location
                weather(data.lat, data.long, (error, forecastData) => {//calls weather using the lat and long from geocode
                    if (error) { //If an error occurs in the darksky request
                        return res.send({ error })
                    } else {
                        res.send({//sends the forecast data to the webpage in the form of a json object so that we can access it using a fetch() in the client side JS
                            forecast: forecastData,
                            location: data.location,
                            address: req.query.address
                        })
                    }
                })
            } 
        })
    }
    
    
    

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Reilly',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Thomas Reilly',
        errorMessage: 'Page not found.'
    })
})

//Posts the actions to localhost:3000
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
