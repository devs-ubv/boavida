const path = require('path');
const fs = require('fs');

function connetFirstNameAndLastName(name){
    let word = name.split(' ');
    let first = word[0].charAt(0);
    let last = word[word.length - 1].charAt(0);
   return `${first + last}`
}

const deleteFileInDataBase = (folder, fileName)=>{
    const filepath = path.resolve(__dirname, '..', '..', 'public', 'img', folder, fileName);
    return new Promise(async function (resolve, reject) {
        fs.unlink(filepath, async function (err) {
            if (err) {
                console.log("error")
             reject(false);
              
            } 
              resolve(true);
        })
    });       
}
module.exports =  {
    connetFirstNameAndLastName,
    deleteFileInDataBase
}

