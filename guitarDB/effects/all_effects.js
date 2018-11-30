const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// The main object that will be jsonified and imported into database
let effect_object = [];

// Used to request the specific URL for each effect
let finished_images = [];
let effects = [];

// This is where we scrape the names and image paths of all effects
 getData = async () => {
    await axios('https://equipboard.com/c/effects')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                // This will select all of the names of the effects
                let effects_name_array = $('.eb-name');

                for(let i = 0; i < effects_name_array.length; i++) {
                    effects.push(effects_name_array[i].attribs.title)
                }

                // // This will replace any empty part of the array
                // // It will also format it to remove any leading white space
                // effects.map((effect) => {
                //     if (effect.replace(/^[ \t]+/g, '') !== '') return finished_names.push(effect.replace(/^[ \t]+/g, ''));
                // });


                // This will get all of the image urls for the effects
                $(".eb-image img").map(function (i, image) {
                    finished_images.push(url.resolve('https://equipboard.com/c/effects', $(image).attr('data-original')));
                });
            }


            // This for-loop will match up every effect with their image path
            for(let i = 0; i < effects.length; i++) {
                effect_object.push({
                    effect_name: effects[i],
                    img_path: finished_images[i]
                })
            }
        //
            // Write the object to a json object and output it to the correct folder
            let json = JSON.stringify(effect_object);
            fs.writeFile('./output/effects_name_img.json', json, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("effect names and images saved!");
            });


        })
        .catch(error => {
            console.log(error);
        })
};

getData();

