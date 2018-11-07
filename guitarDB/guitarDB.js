const cheerio = require('cheerio');
const request = require('request');

request({
    method: 'GET',
    url: 'https://equipboard.com/role/guitarists'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let guitarists_name = $('div h2').text();
    let guitarists = guitarists_name.split('\n');

    guitarists.forEach((guitarist) => {
        console.log(guitarist);
    });
});