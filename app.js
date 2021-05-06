const express = require('express');
const morgan = require('morgan'); // 3rd-party middleware
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//creating an instance of an express app
const app = express();

// data base here
const dbURL = 'mongodb+srv://<user>:<password>@node-ninja.mhsls.mongodb.net/<>s?retryWrites=true&w=majority'

// {useNewUrlParser: true, useUnifiedTopology: true} to stop duplication warning
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => app.listen(3036))
        .catch(err => console.log(err))

        
//register view engine
app.set('view engine', 'ejs');

// middleware and static
app.use(express.static('public'));
app.use(morgan('dev'));



//routes 
app.get('/', (req,res) =>{
    res.redirect('/blogs')
});


app.get('/about', (req,res) =>{
    //res.sendFile('./views/about.html', {root: __dirname});

    res.render('about', {title_page: 'About'})
});
//blog routes 
app.get('/blogs', (req,res)=>{
    // -1 because it's from the newest to the oldest
    Blog.find().sort({createdAt: -1}) //find() all blogs 
        .then(result =>{
            res.render('index', { title_page: 'All blogs', blogs: result})
        })
})

app.get('/blogs/create', (req,res) =>{
    res.render('create', {title_page: 'Create blog'});
})


//404
app.use((req,res) => {
    res.status(404).render('404', {title_page: '404'});
})

/*
it must be at the end, because it won't match wit our previous routing, 
it fires every time the server is running.
it's like a catch in a promesi
*/