const express = require('express');
const morgan = require('morgan'); // 3rd-party middleware
const mongoose = require('mongoose');
const Blog = require('./models/blogs');

//creating an instance of an express app
const app = express();

// data base here
const dbURL = 'mongodb+srv://<user>:<password>@node-ninja.mhsls.mongodb.net/test?retryWrites=true&w=majority'

// {useNewUrlParser: true, useUnifiedTopology: true} to stop duplication warning
mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(result => app.listen(3036))
        .catch(err => console.log(err))


// middleware and static
app.use(express.static('public'));
app.use(morgan('dev'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req,res) => {
    const blog = new Blog({
        title: 'Jean Carlos',
        snippet: 'Prueba 3',
        body: 'Si esto sale es que funciona'
    });

    blog.save()
        .then(result =>{ res.send(result)})
        .catch(err => console.log(err));
})

app.get('/all-blogs', (req,res) => {
    
    Blog.find()
        .then(result =>{ res.send(result)})
        .catch(err => console.log(err));
});

app.get('/single-blog', (req,res) => {
    
    Blog.findById('6092f362683ddc50f432c238')
        .then(result =>{ 
            res.send(result)
        })
        .catch(err => console.log(err));
})



//register view engine
app.set('view engine', 'ejs');

app.get('/', (req,res) =>{

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

    //res.sendFile('./views/index.html', {root: __dirname});
    /*
    this takes to arguments first is the path and the second is from where this path come from 
    so in the next argument we specify from where because by default it looks for the root
    if our machine 
    */
   res.render('index', {title_page: 'Home', blogs}); //it can be blogs: blogs but we're using ES6 
});

app.get('/about', (req,res) =>{
    //res.sendFile('./views/about.html', {root: __dirname});

    res.render('about', {title_page: 'About'})
});

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