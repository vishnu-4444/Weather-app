const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { error } = require('console')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)

app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Vishnu Shaji'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

app.get('/help', (req, res) => {
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vishnu Shaji'
    })
})

app.get('/about', (req, res) => {
    // res.send('<h1>About page</h1>')
    res.render('about',{
        title: 'Weather App',
        name: 'Vishnu Shaji'
    })
})

// app.get('/products', (req,res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
    
//     // console.log(req.query.search)
//     res.send({
//         products: [],
//     })
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'Provide a location'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

})

app.get('/help/*', (req, res) => {
    // res.send('Help articel not found')
    res.render('404',{
        title: 'Weather App',
        name: 'Vishnu Shaji',
        error:'Help articel not found!'
    })  
})

app.get('*',(req, res) => {
    // res.send('My 404 page')
    res.render('404',{
        title: 'Weather App',
        name: 'Vishnu Shaji',
        error:'My 404 page'
    })
})

//WAAA-445

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});