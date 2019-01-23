const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// The main object that will be jsonified and imported into database
let giggles = [];

// This is where we scrape the names and image paths of all guitarists
getCsGiggles = async () => {
    await axios('https://pickupline.net/academic-pick-lines/computer-programming-pick-up-lines/')
        .then((response) => {
            if (response.status === 200) {
                const html = response.data;
                const $ = cheerio.load(html);

                $('tr').each(function(index, value){
                    let v = $('.column-1', this).text();
                    giggles.push(v);
                });

                console.log(giggles);
            }

            // Write the object to a json object and output it to the correct folder
            let json = JSON.stringify(giggles);
            fs.writeFile('/Users/zacharyshorts/Documents/School/ComputerScience/Web Scraping/webscraping/giggles/output/giggles.json', json, 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log("Giggles saved!");
            });

        })
        .catch(error => {
            console.log(error);
        })
};

getCsGiggles();

