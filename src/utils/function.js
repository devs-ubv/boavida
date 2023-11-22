function connetFirstNameAndLastName(name){
    let word = name.split(' ');
    let first = word[0].charAt(0);
    let last = word[word.length - 1].charAt(0);
   return `${first + last}`
}
module.exports =  {
    connetFirstNameAndLastName
}