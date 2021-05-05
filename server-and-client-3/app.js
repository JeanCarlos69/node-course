const express = require('express');
const morgan = require('morgan'); // 3rd-party middleware

//creating an instance of an express app
const app = express();

//listen for request
app.listen(3036);

// middleware and static
app.use(express.static('public'));
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('new request made:');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
  });

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