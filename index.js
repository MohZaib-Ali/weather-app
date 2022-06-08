const express = require('express');
const http = require('http');
const path = require('path');
const hbs = require('hbs');
const app = express();
const server = http.createServer(app);
const GetLocationWeather = require('./utils/index');

const dirPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');
const PORT =  process.env.PORT || 8080;

app.use(express.static(dirPath));
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        mainText: 'Current weather forecast',
        name: 'Muhammad Shahzaib'
    });
});

app.get('/weather', (req, res) => {
    GetLocationWeather(req.query.address, (err, weather) => {
        !err ? res.send({message: weather}) : res.send({error: err});
    });
});


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        aboutText: "It's all about the Express!",
        name: 'Muhammad Shahzaib'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Here To Help',
        helpText: 'Express is here to rescue you!!!',
        name: 'Muhammad Shahzaib'
    });
});

app.get('/help/*', (req, res) => {
    res.render('missing-help-article', {
        title: 'Article Not Found',
        articleName: req.url.split('/')[0],
        name: 'Muhammad Shahzaib'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - Not Found',
        errorMessage: `Resource at the requested URL (${req.url}) is not found.`,
        name: 'Muhammad Shahzaib'
    });
});

server.listen(PORT, () => {
    console.log('Server started on port:', PORT);
})