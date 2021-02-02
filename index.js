const { response } = require('express');
const express = require('express');
const app = express()
const path = require('path');

const data = require('./data.json')

// Serving static files:
app.use(express.static(path.join(__dirname, 'static')))

// Including the template engine:
app.set('view engine', 'ejs');
// This replaces the standard use of proces.cwd() with the dirname 
// where this (index) file is located. This makes it so that the views 
// will be found regardless of which working directory the index.js file
// is run from. 
app.set('views', path.join(__dirname, '/views'));

// Basic routing:
app.get('/dogs', (req, res) => {
    res.send('<h1>MEEEEEOOWWWWWW</h1>')
})

// Rendering using the view engine ejs:
app.get('/', (req, res) => {
    res.render('home.ejs')
})

// Routing with a parameter in the URL, dynamic pages
app.get('/reddit/:subreddit', (req, res) => {
    let link = req.params.subreddit;
    res.send(`This is a subreddit! Variable: ${link}`)
})

// Routing to a POST request
app.post('/dogs', (req, res) => {
    res.send('This is now an example of a POST route')
})

// Accessing parameters in a GET request
app.get('/search', (req, res) => {
    const { q } = req.query;
    res.send(`These are the search results for: ${q}.`)
})

// Giving a template access to a variable
app.get('/random', (req, res) => {
    const random = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: random })
})

// Subreddit exmplame of templating
app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const newData = data[subreddit];
    console.log(newData)
    // By passing it in a spreaded (...) we are able to access
    // the content of the object directly
    res.render('subreddit', { ...newData })
    // alternatively res.render('subreddit', { subreddit: subreddit })
})

// Passing and looping over arrays
app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ]
    res.render('cats', { cats })
})

app.get('*', (req, res) => {
    res.send('Error 404: This route could not be found.')
})

// Assigning the port to operate on
app.listen(3000, () => {
    console.log('Server (re)started on port 3000!')
})
