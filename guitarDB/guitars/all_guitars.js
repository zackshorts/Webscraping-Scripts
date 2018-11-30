const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// The main object that will be jsonified and imported into database
let guitar_object = [];

// Used to request the specific URL for each guitar
let formatted_names = [];
let finished_names = [];
let finished_images = [];
let guitars = [];

// This is where we scrape the names and image paths of all guitars
 getData = async () => {
    await axios('https://equipboard.com/c/guitars')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                // This will select all of the names of the guitars
                let guitars_name_array = $('.eb-name');

                for(let i = 0; i < guitars_name_array.length; i++) {
                    guitars.push(guitars_name_array[i].attribs.title)
                }

                // // This will replace any empty part of the array
                // // It will also format it to remove any leading white space
                // guitars.map((guitar) => {
                //     if (guitar.replace(/^[ \t]+/g, '') !== '') return finished_names.push(guitar.replace(/^[ \t]+/g, ''));
                // });


                // This will get all of the image urls for the guitars
                $(".eb-image img").map(function (i, image) {
                    finished_images.push(url.resolve('https://equipboard.com/c/guitars', $(image).attr('data-original')));
                });
            }


            // This for-loop will match up every guitar with their image path
            for(let i = 0; i < guitars.length; i++) {
                guitar_object.push({
                    guitar_name: guitars[i],
                    img_path: finished_images[i]
                })
            }
        //
            // Write the object to a json object and output it to the correct folder
            let json = JSON.stringify(guitar_object);
            fs.writeFile('./output/guitars_name_img.json', json, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("guitar names and images saved!");
            });


        })
        .catch(error => {
            console.log(error);
        })
};

getData();

