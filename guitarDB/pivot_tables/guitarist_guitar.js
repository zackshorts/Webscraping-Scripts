const fs = require('fs');


const number_of_guitars = 48;
const number_of_guitarists = 58;

generateRandomNumber = (min, max) => {
    return (Math.ceil((Math.random() * (max - min))))
};

let pivot_array = [];

for(let j = 0; j < 5; j++) {
    for (let i = 1; i <= number_of_guitarists; i++) {
        pivot_array.push([i, generateRandomNumber(1, number_of_guitars+1)]);
    }
}


let json = JSON.stringify(pivot_array);
fs.writeFile('./output/pivot_table_insert.json', json, 'utf8', function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("guitarist_guitars pivot table saved!");
});
