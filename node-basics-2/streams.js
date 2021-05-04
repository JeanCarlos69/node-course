const fs = require('fs');

const readStream = fs.createReadStream('./docs/text2.txt', {encoding: 'utf8'}); 
//the second argument to avoid using chunk.toSttring()
const writeStream = fs.createWriteStream('./docs/text3.txt');

readStream.on('data',chunk =>{
    console.log('********** NEW CHUNK **********');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
} ) // like js with eventListener


//piping
//readStream.pipe(writeStream) same as above but shorter