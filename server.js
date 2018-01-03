const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

//initialize express app
var app = express();

//set template engine directories
hbs.registerPartials(__dirname + '/views/partials');

//create template engine helpers
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//set template engine with express
app.set('view engine', 'hbs');


//custom middleware for logging
app.use((req, res, next) => {
    var log = new Date().toString() + ':' + req.method + ' ' + req.url;
    console.log(log);
    fs.appendFile('server.log', log + ' \n', (err) => {
        if (err)
            console.log('unable to write log ' + err.message);
    })
    next(); //continue the reques
});

//custom middleware for handling errors
// app.use((req,res,next)=>{
//     res.render('maintenance');

// });

//set middleware for static directory
app.use(express.static(__dirname + "/public"));


//requests and their respopnses
app.get('/', function (req, res) {

    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my stupid site'
    })
    // res.send({
    //     name:'nouman',
    //     likes:['reading','learning']
    // });

})

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About Page'

    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'sory boi, take your 404'
    });
})

//start listning on port
app.listen(port, () => { console.log(`server is lisning on port ${port}`); });