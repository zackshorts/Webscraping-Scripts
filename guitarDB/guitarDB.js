const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');

let guitarist_object = {
    guitarists_names: [],
    img_paths: [],
};

request({
    method: 'GET',
    url: 'https://equipboard.com/role/guitarists'
}, (err, res, body) => {

    if (err) return console.error(err);

    let $ = cheerio.load(body);

    let guitarists_name = $('h2').text();
    let guitarists = guitarists_name.split('\n');

    $(".span2 img").each(function(i, image) {
        guitarist_object.img_paths.push(url.resolve('https://equipboard.com/role/guitarists', $(image).attr('data-original')));
    });
    console.log(guitarist_object.img_paths);

    guitarists.forEach((guitarist) => {
        if(guitarist.replace(/^[ \t]+/g, '') !== '') guitarist_object.guitarists_names.push(guitarist.replace(/^[ \t]+/g, ''));
    });

    let json = JSON.stringify(guitarist_object);
    fs.writeFile('output/guitarists/guitarists_name_output.json', json, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
});



