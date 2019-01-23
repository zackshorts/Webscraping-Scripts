const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// The main object that will be jsonified and imported into database
let guitarist_object = [];
let guitarists_names = [];

// Used to request the specific URL for each guitarist
let formatted_names = [];
let finished_names = [];
let finished_images = [];

// This is where we scrape the names and image paths of all guitarists
 getData = async () => {
    await axios('https://www.groundguitar.com/gear-page/')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                // This will select all of the names of the guitarists
                guitarists_names = $('.gear-page-name')

                // This will replace any empty part of the array
                // It will also format it to remove any leading white space
                guitarists_names.map((guitarist) => {
                    formatted_names.push(guitarists_names)
                });


                // This is used to get the specific info for each guitarist.
                // Their info page uses a lower case and dashed pattern in the URL
                formatted_names = finished_names.map((name) => {
                    return (name.toLowerCase().replace(/\s|'/g, '-').replace(/\./g, ''));
                });

                // This will get all of the image urls for the guitarists
                $(".span2 img").map(function (i, image) {
                    finished_images.push(url.resolve('https://equipboard.com/role/guitarists', $(image).attr('data-original')));
                });
            }


            // This for-loop will match up every guitarists with their image path
            for(let i = 0; i < finished_names.length; i++) {
                guitarist_object.push({
                    guitarist_name: finished_names[i],
                    img_path: finished_images[i]
                })
            }

            // Write the object to a json object and output it to the correct folder
            let json = JSON.stringify(guitarist_object);
            fs.writeFile('guitarists/output/guitarists_name_img.json', json, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Guitarist names and images saved!");
            });

            let json1 = JSON.stringify(formatted_names);
            fs.writeFile('guitarists/output/guitarist_name_url.json', json1, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The url file was saved!");
            });
        })
        .catch(error => {
            console.log(error);
        })
};

getData();

