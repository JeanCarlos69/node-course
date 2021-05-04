const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res) =>{
    //set header content type 
    res.setHeader('Content-Type', 'text/html');

    // res.write('<h1>Jean Carlos</h1>');
    // res.end(); // always end it

    let path = './views/';

    switch (req.url) {
        case '/':
            path += 'index.html';
            res.statusCode= 200;
            break;

        case '/about':
                path += 'about.html';
                res.statusCode= 200;
                break;

        case '/about-me':
                    res.statusCode= 301;
                    res.setHeader('Location', '/about');
                    res.end();
                    break;
    
        default:
                path += '404.html';
                res.statusCode= 404;
            break;
    }


    //send an html file
    fs.readFile(path, (err,data) =>{
        if(err){
            console.log(err);
            res.end();  
        } else{
                //res.write(data); we're sending just one file so it's fine write it in the end()
                res.end(data);
        }
    })
});
//first argument is the port and second (opcional) is the name
server.listen(3069, ()=>{
    console.log('working fine');
});

/*
100 - informational response
200 - success codes
300 - codes for redirects
400 - user or client error codes
500 - server error codes
*/