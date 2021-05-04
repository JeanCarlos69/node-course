const file_system = require('fs');

// reading file 

file_system.readFile('./docs/text.txt', (err, data) =>{

    if (err) console.log(err);

    //console.log(data);
    console.log(data.toString()); //to see the data
});

// writing files

file_system.writeFile('./docs/text.txt','Here what we want to write', ( ()=>{
 console.log('Succeed');
}))

// if the file does not exits it'll be created
// file_system.writeFile('./docs/NotExist.txt','Here what we want to write', ( ()=>{
//     console.log('Succeed');
//    }))

//directories

if(!file_system.existsSync('./assets')){
    file_system.mkdir('./assets',(err) =>{
    
        if (err) console.log(err);
    
        console.log('it worked');
    })
} else{
    file_system.rmdir('./assets', (err) =>{
        if (err) console.log(err);

        console.log('folder deleted');
    });
}

//deleting files

if(file_system.existsSync('./docs/delete.txt')){
    file_system.unlink('./docs/delete.txt', err =>{
        if(err) console.log(err);

        console.log('File deleted');
    }) //unlink method to delete a file
}
