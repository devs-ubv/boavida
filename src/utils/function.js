const path = require('path');
const fs = require('fs');

function connetFirstNameAndLastName(name){
    let word = name.split(' ');
    let first = word[0].charAt(0);
    let last = word[word.length - 1].charAt(0);
   return `${first + last}`
}

const deleteFileInDataBase = (fileName)=>{
    const filepath = path.resolve(__dirname, '..', '..', '..', 'public', 'img', 'news', fileName);
            fs.unlink(filepath, function (err) {
                if (err) {
                   return true;
                } else {
                   return false;
                }
            })
}
module.exports =  {
    connetFirstNameAndLastName,
    deleteFileInDataBase
}

