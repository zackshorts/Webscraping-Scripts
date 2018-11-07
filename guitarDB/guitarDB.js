const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

var object = {
    guitarists: []
};

request({
    method: 'GET',
    url: 'https://equipboard.com/role/guitarists'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let guitarists_name = $('h2').text();
    let guitarists = guitarists_name.split('\n');

    guitarists.forEach((guitarist) => {
        if(guitarist.replace(/^[ \t]+/g, '') !== '') object.guitarists.push(guitarist.replace(/^[ \t]+/g, ''));
    });

    let json = JSON.stringify(object);
    fs.writeFile('output/guitarists_name_output.json', json, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
});



