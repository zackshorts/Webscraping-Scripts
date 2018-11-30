const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// The main object that will be jsonified and imported into database
let amp_object = [];

// Used to request the specific URL for each amp
let finished_images = [];
let amplifiers = [];

// This is where we scrape the names and image paths of all amplifiers
 getData = async () => {
    await axios('https://equipboard.com/c/amplifiers')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                // This will select all of the names of the amplifiers
                let amplifiers_name_array = $('.eb-name');

                for(let i = 0; i < amplifiers_name_array.length; i++) {
                    amplifiers.push(amplifiers_name_array[i].attribs.title)
                }

                // // This will replace any empty part of the array
                // // It will also format it to remove any leading white space
                // amplifiers.map((amp) => {
                //     if (amp.replace(/^[ \t]+/g, '') !== '') return finished_names.push(amp.replace(/^[ \t]+/g, ''));
                // });


                // This will get all of the image urls for the amplifiers
                $(".eb-image img").map(function (i, image) {
                    finished_images.push(url.resolve('https://equipboard.com/c/amplifiers', $(image).attr('data-original')));
                });
            }


            // This for-loop will match up every amplifiers with their image path
            for(let i = 0; i < amplifiers.length; i++) {
                amp_object.push({
                    amp_name: amplifiers[i],
                    img_path: finished_images[i]
                })
            }
        //
            // Write the object to a json object and output it to the correct folder
            let json = JSON.stringify(amp_object);
            fs.writeFile('./output/amplifiers_name_img.json', json, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("amplifiers names and images saved!");
            });


        })
        .catch(error => {
            console.log(error);
        })
};

getData();

