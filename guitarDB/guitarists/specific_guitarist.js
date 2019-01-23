const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// copy paste from guitarist_name_url.json
let formatted_names = ["jack-white", "dave-grohl", "john-mayer", "john-frusciante", "slash", "jimi-hendrix", "kurt-cobain", "jimmy-page", "david-gilmour", "alex-turner-arctic-monkeys", "josh-homme", "matthew-bellamy", "billie-joe-armstrong", "eric-clapton", "kevin-parker", "dan-auerbach", "ed-sheeran", "james-hetfield", "stevie-ray-vaughan", "jonny-greenwood", "tom-morello", "the-edge", "paul-mccartney", "thom-yorke", "gary-clark-jr", "eddie-van-halen", "noel-gallagher", "steve-vai", "george-harrison", "angus-young", "kirk-hammett", "john-petrucci", "mac-demarco", "joe-satriani", "luke-hemmings", "johnny-marr", "keith-richards", "josh-klinghoffer", "zakk-wylde", "john-lennon", "michael-clifford", "jonny-buckland-coldplay", "carlos-santana", "jamie-cook", "billy-gibbons", "bb-king", "joe-bonamassa", "chris-wolstenholme", "calum-hood", "jeff-beck", "synyster-gates", "nick-valensi-the-strokes", "trent-reznor", "tony-iommi", "dimebag-darrell", "chris-cornell", "roger-waters", "jerry-cantrell", "brian-may", "mike-mccready", "thomas-delonge", "dave-mustaine", "caleb-followill-kings-of-leon", "jim-root", "chris-martin", "mark-knopfler", "matthew-healy", "billy-corgan", "eric-johnson", "joe-perry", "robert-smith", "chris-shiflett", "prince", "pete-townshend", "paul-gilbert", "adam-jones", "rob-chapman", "shawn-mendes", "matthew-followill", "troy-van-leeuwen", "robert-trujillo", "gary-moore", "adam-hann", "buckethead", "david-bowie", "brendon-urie", "st-vincent", "albert-hammond-jr", "thurston-moore", "mike-einziger-incubus", "beck", "ed-o-brien", "alex-lifeson", "neil-young", "lemmy-kilmister", "kevin-shields"]

//This script file will try to fill in the remaining fields
let guitarists_object = {
    data: [{
        "guitarist_name": "Jack White",
        "img_path": "https://images.equipboard.com/uploads/user/image/192/big_jack-white.jpg?v=1543421359"
    }, {
        "guitarist_name": "Dave Grohl",
        "img_path": "https://images.equipboard.com/uploads/user/image/989/big_dave-grohl.jpg?v=1543404973"
    }, {
        "guitarist_name": "John Mayer",
        "img_path": "https://images.equipboard.com/uploads/user/image/84/big_john-mayer.jpg?v=1543447453"
    }, {
        "guitarist_name": "John Frusciante",
        "img_path": "https://images.equipboard.com/uploads/user/image/176/big_john-frusciante.jpeg?v=1543369749"
    }, {
        "guitarist_name": "Slash",
        "img_path": "https://images.equipboard.com/uploads/user/image/2310/big_slash.jpg?v=1543378106"
    }, {
        "guitarist_name": "Jimi Hendrix",
        "img_path": "https://images.equipboard.com/uploads/user/image/3382/big_jimi-hendrix.jpg?v=1543378355"
    }, {
        "guitarist_name": "Kurt Cobain",
        "img_path": "https://images.equipboard.com/uploads/user/image/3978/big_kurt-cobain.jpg?v=1543338394"
    }, {
        "guitarist_name": "Jimmy Page",
        "img_path": "https://images.equipboard.com/uploads/user/image/2113/big_jimmy-page.jpg?v=1543369749"
    }, {
        "guitarist_name": "David Gilmour",
        "img_path": "https://images.equipboard.com/uploads/user/image/4702/big_david-gilmour.jpg?v=1543447453"
    }, {
        "guitarist_name": "Alex Turner",
        "img_path": "https://images.equipboard.com/uploads/user/image/121/big_alex-turner.jpg?v=1543350981"
    }, {
        "guitarist_name": "Josh Homme",
        "img_path": "https://images.equipboard.com/uploads/user/image/608/big_josh-homme.jpg?v=1543356723"
    }, {
        "guitarist_name": "Matthew Bellamy",
        "img_path": "https://images.equipboard.com/uploads/user/image/120/big_matthew-bellamy.jpg?v=1543408743"
    }, {
        "guitarist_name": "Billie Joe Armstrong",
        "img_path": "https://images.equipboard.com/uploads/user/image/817/big_billie-joe-armstrong.jpg?v=1543441427"
    }, {
        "guitarist_name": "Eric Clapton",
        "img_path": "https://images.equipboard.com/uploads/user/image/2260/big_eric-clapton.png?v=1543368779"
    }, {
        "guitarist_name": "Kevin Parker",
        "img_path": "https://images.equipboard.com/uploads/user/image/11272/big_kevin-parker.jpg?v=1543365454"
    }, {
        "guitarist_name": "Dan Auerbach",
        "img_path": "https://images.equipboard.com/uploads/user/image/984/big_dan-auerbach.jpg?v=1543360073"
    }, {
        "guitarist_name": "Ed Sheeran",
        "img_path": "https://images.equipboard.com/uploads/user/image/5788/big_ed-sheeran.jpg?v=1543368797"
    }, {
        "guitarist_name": "James Hetfield",
        "img_path": "https://images.equipboard.com/uploads/user/image/6840/big_james-hetfield.jpg?v=1543467053"
    }, {
        "guitarist_name": "Stevie Ray Vaughan",
        "img_path": "https://images.equipboard.com/uploads/user/image/1760/big_stevie-ray-vaughan.jpg?v=1543399038"
    }, {
        "guitarist_name": "Jonny Greenwood",
        "img_path": "https://images.equipboard.com/uploads/user/image/5293/big_jonny-greenwood.jpg?v=1543369629"
    }, {
        "guitarist_name": "Tom Morello",
        "img_path": "https://images.equipboard.com/uploads/user/image/10172/big_tom-morello.jpg?v=1543342428"
    }, {
        "guitarist_name": "The Edge",
        "img_path": "https://images.equipboard.com/uploads/user/image/991/big_the-edge.jpg?v=1543414049"
    }, {
        "guitarist_name": "Paul McCartney",
        "img_path": "https://images.equipboard.com/uploads/user/image/8608/big_paul-mccartney.jpeg?v=1543360073"
    }, {
        "guitarist_name": "Thom Yorke",
        "img_path": "https://images.equipboard.com/uploads/user/image/5568/big_thom-yorke.jpeg?v=1543369629"
    }, {
        "guitarist_name": "Gary Clark Jr",
        "img_path": "https://images.equipboard.com/uploads/user/image/233/big_gary-clark-jr.jpg?v=1543338837"
    }, {
        "guitarist_name": "Eddie Van Halen",
        "img_path": "https://images.equipboard.com/uploads/user/image/3385/big_eddie-van-halen.jpg?v=1543337403"
    }, {
        "guitarist_name": "Noel Gallagher",
        "img_path": "https://images.equipboard.com/uploads/user/image/1840/big_noel-gallagher.jpg?v=1543378038"
    }, {
        "guitarist_name": "Steve Vai",
        "img_path": "https://images.equipboard.com/uploads/user/image/1076/big_steve-vai.jpg?v=1543342428"
    }, {
        "guitarist_name": "George Harrison",
        "img_path": "https://images.equipboard.com/uploads/user/image/5882/big_george-harrison.jpg?v=1543397849"
    }, {
        "guitarist_name": "Angus Young",
        "img_path": "https://images.equipboard.com/uploads/user/image/4844/big_angus-young.jpg?v=1543394807"
    }, {
        "guitarist_name": "Kirk Hammett",
        "img_path": "https://images.equipboard.com/uploads/user/image/8134/big_kirk-hammett.jpg?v=1543360073"
    }, {
        "guitarist_name": "John Petrucci",
        "img_path": "https://images.equipboard.com/uploads/user/image/1472/big_john-petrucci.jpg?v=1543425194"
    }, {
        "guitarist_name": "Mac DeMarco",
        "img_path": "https://images.equipboard.com/uploads/user/image/27686/big_mac-demarco.jpg?v=1543441427"
    }, {
        "guitarist_name": "Joe Satriani",
        "img_path": "https://images.equipboard.com/uploads/user/image/1473/big_joe-satriani.jpg?v=1543338394"
    }, {
        "guitarist_name": "Luke Hemmings",
        "img_path": "https://images.equipboard.com/uploads/user/image/10499/big_luke-hemmings.jpg?v=1543356723"
    }, {
        "guitarist_name": "Johnny Marr",
        "img_path": "https://images.equipboard.com/uploads/user/image/2018/big_johnny-marr.jpg?v=1543441427"
    }, {
        "guitarist_name": "Keith Richards",
        "img_path": "https://images.equipboard.com/uploads/user/image/3383/big_keith-richards.jpg?v=1543369108"
    }, {
        "guitarist_name": "Josh Klinghoffer",
        "img_path": "https://images.equipboard.com/uploads/user/image/1369/big_josh-klinghoffer.jpg?v=1543430876"
    }, {
        "guitarist_name": "Zakk Wylde",
        "img_path": "https://images.equipboard.com/uploads/user/image/3901/big_zakk-wylde.jpg?v=1543356723"
    }, {
        "guitarist_name": "John Lennon",
        "img_path": "https://images.equipboard.com/uploads/user/image/8755/big_john-lennon.jpg?v=1543361486"
    }, {
        "guitarist_name": "Michael Clifford",
        "img_path": "https://images.equipboard.com/uploads/user/image/10500/big_michael-clifford.png?v=1543342428"
    }, {
        "guitarist_name": "Jonny Buckland",
        "img_path": "https://images.equipboard.com/uploads/user/image/102/big_jonny-buckland.jpg?v=1543360073"
    }, {
        "guitarist_name": "Carlos Santana",
        "img_path": "https://images.equipboard.com/uploads/user/image/3025/big_carlos-santana.jpg?v=1543360073"
    }, {
        "guitarist_name": "Jamie Cook",
        "img_path": "https://images.equipboard.com/uploads/user/image/262/big_jamie-cook.jpg?v=1543350981"
    }, {
        "guitarist_name": "Billy Gibbons",
        "img_path": "https://images.equipboard.com/uploads/user/image/1077/big_billy-gibbons.jpg?v=1543321784"
    }, {
        "guitarist_name": "B.B. King",
        "img_path": "https://images.equipboard.com/uploads/user/image/782/big_b-b-king.jpg?v=1543356723"
    }, {
        "guitarist_name": "Joe Bonamassa",
        "img_path": "https://images.equipboard.com/uploads/user/image/4843/big_joe-bonamassa.jpg?v=1543368846"
    }, {
        "guitarist_name": "Chris Wolstenholme",
        "img_path": "https://images.equipboard.com/uploads/user/image/8238/big_chris-wolstenholme.jpg?v=1543337348"
    }, {
        "guitarist_name": "Calum Hood",
        "img_path": "https://images.equipboard.com/uploads/user/image/10501/big_calum-hood.jpg?v=1543321807"
    }, {
        "guitarist_name": "Jeff Beck",
        "img_path": "https://images.equipboard.com/uploads/user/image/2188/big_jeff-beck.jpg?v=1543360073"
    }, {
        "guitarist_name": "Synyster Gates",
        "img_path": "https://images.equipboard.com/uploads/user/image/2620/big_synyster-gates.jpg?v=1543350981"
    }, {
        "guitarist_name": "Nick Valensi",
        "img_path": "https://images.equipboard.com/uploads/user/image/424/big_nick-valensi.jpg?v=1543360073"
    }, {
        "guitarist_name": "Trent Reznor",
        "img_path": "https://images.equipboard.com/uploads/user/image/8810/big_trent-reznor.jpg?v=1543404690"
    }, {
        "guitarist_name": "Tony Iommi",
        "img_path": "https://images.equipboard.com/uploads/user/image/9278/big_tony-iommi.jpg?v=1543350981"
    }, {
        "guitarist_name": "Dimebag Darrell",
        "img_path": "https://images.equipboard.com/uploads/user/image/5794/big_dimebag-darrell.jpg?v=1543360073"
    }, {
        "guitarist_name": "Chris Cornell",
        "img_path": "https://images.equipboard.com/uploads/user/image/7999/big_chris-cornell.jpg?v=1543360073"
    }, {
        "guitarist_name": "Roger Waters",
        "img_path": "https://images.equipboard.com/uploads/user/image/3177/big_roger-waters.jpg?v=1543003548"
    }, {
        "guitarist_name": "Jerry Cantrell",
        "img_path": "https://images.equipboard.com/uploads/user/image/3704/big_jerry-cantrell.jpg?v=1543324135"
    }, {
        "guitarist_name": "Brian May",
        "img_path": "https://images.equipboard.com/uploads/user/image/7551/big_brian-may.jpg?v=1543360073"
    }, {
        "guitarist_name": "Mike McCready",
        "img_path": "https://images.equipboard.com/uploads/user/image/1769/big_mike-mccready.JPG?v=1543447453"
    }, {
        "guitarist_name": "Thomas DeLonge",
        "img_path": "https://images.equipboard.com/uploads/user/image/9240/big_thomas-delonge.jpg?v=1543368757"
    }, {
        "guitarist_name": "Dave Mustaine",
        "img_path": "https://images.equipboard.com/uploads/user/image/9061/big_dave-mustaine.jpg?v=1543322296"
    }, {
        "guitarist_name": "Caleb Followill",
        "img_path": "https://images.equipboard.com/uploads/user/image/214/big_caleb-followill.jpg?v=1543324135"
    }, {
        "guitarist_name": "Jim Root",
        "img_path": "https://images.equipboard.com/uploads/user/image/10646/big_jim-root.png?v=1543368545"
    }, {
        "guitarist_name": "Chris Martin",
        "img_path": "https://images.equipboard.com/uploads/user/image/4113/big_chris-martin.jpg?v=1543385418"
    }, {
        "guitarist_name": "Mark Knopfler",
        "img_path": "https://images.equipboard.com/uploads/user/image/7740/big_mark-knopfler.jpg?v=1543323385"
    }, {
        "guitarist_name": "Matthew Healy",
        "img_path": "https://images.equipboard.com/uploads/user/image/10690/big_matthew-healy.jpg?v=1543385418"
    }, {
        "guitarist_name": "Billy Corgan",
        "img_path": "https://images.equipboard.com/uploads/user/image/12013/big_billy-corgan.jpg?v=1543360073"
    }, {
        "guitarist_name": "Eric Johnson",
        "img_path": "https://images.equipboard.com/uploads/user/image/2936/big_eric-johnson.jpg?v=1543360073"
    }, {
        "guitarist_name": "Joe Perry",
        "img_path": "https://images.equipboard.com/uploads/user/image/1638/big_joe-perry.jpg?v=1543350836"
    }, {
        "guitarist_name": "Robert Smith",
        "img_path": "https://images.equipboard.com/uploads/user/image/32702/big_robert-smith.jpg?v=1543398231"
    }, {
        "guitarist_name": "Chris Shiflett",
        "img_path": "https://images.equipboard.com/uploads/user/image/8408/big_chris-shiflett.jpg?v=1543441427"
    }, {
        "guitarist_name": "Prince",
        "img_path": "https://images.equipboard.com/uploads/user/image/14258/big_prince.jpg?v=1543323385"
    }, {
        "guitarist_name": "Pete Townshend",
        "img_path": "https://images.equipboard.com/uploads/user/image/3387/big_pete-townshend.jpg?v=1543369749"
    }, {
        "guitarist_name": "Paul Gilbert",
        "img_path": "https://images.equipboard.com/uploads/user/image/6690/big_paul-gilbert.jpg?v=1543342428"
    }, {
        "guitarist_name": "Adam Jones",
        "img_path": "https://images.equipboard.com/uploads/user/image/14485/big_adam-jones.png?v=1543264679"
    }, {
        "guitarist_name": "Rob Chapman",
        "img_path": "https://images.equipboard.com/uploads/user/image/52007/big_rob-chapman.jpg?v=1543422466"
    }, {
        "guitarist_name": "Shawn Mendes",
        "img_path": "https://images.equipboard.com/uploads/user/image/10587/big_shawn-mendes.jpg?v=1543385418"
    }, {
        "guitarist_name": "Matthew Followill",
        "img_path": "https://images.equipboard.com/uploads/user/image/247/big_matthew-followill.jpg?v=1543350836"
    }, {
        "guitarist_name": "Troy Van Leeuwen",
        "img_path": "https://images.equipboard.com/uploads/user/image/7379/big_troy-van-leeuwen.jpg?v=1543338837"
    }, {
        "guitarist_name": "Robert Trujillo",
        "img_path": "https://images.equipboard.com/uploads/user/image/9183/big_robert-trujillo.jpg?v=1543350836"
    }, {
        "guitarist_name": "Gary Moore",
        "img_path": "https://images.equipboard.com/uploads/user/image/6079/big_gary-moore.jpg?v=1543360073"
    }, {
        "guitarist_name": "Adam Hann",
        "img_path": "https://images.equipboard.com/uploads/user/image/10691/big_adam-hann.jpg?v=1543352345"
    }, {
        "guitarist_name": "Buckethead",
        "img_path": "https://images.equipboard.com/uploads/user/image/12616/big_buckethead.jpg?v=1543352345"
    }, {
        "guitarist_name": "David Bowie",
        "img_path": "https://images.equipboard.com/uploads/user/image/10913/big_david-bowie.jpg?v=1543360073"
    }, {
        "guitarist_name": "Brendon Urie",
        "img_path": "https://images.equipboard.com/uploads/user/image/11558/big_brendon-urie.JPG?v=1543417056"
    }, {
        "guitarist_name": "St. Vincent",
        "img_path": "https://images.equipboard.com/uploads/user/image/11921/big_st-vincent.jpg?v=1543441427"
    }, {
        "guitarist_name": "Albert Hammond Jr",
        "img_path": "https://images.equipboard.com/uploads/user/image/6073/big_albert-hammond-jr.jpg?v=1543323252"
    }, {
        "guitarist_name": "Thurston Moore",
        "img_path": "https://images.equipboard.com/uploads/user/image/8138/big_thurston-moore.jpg?v=1543441427"
    }, {
        "guitarist_name": "Mike Einziger",
        "img_path": "https://images.equipboard.com/uploads/user/image/213/big_mike-einziger.jpg?v=1543338394"
    }, {
        "guitarist_name": "Beck",
        "img_path": "https://images.equipboard.com/uploads/user/image/1761/big_beck.jpg?v=1543324393"
    }, {
        "guitarist_name": "Ed O'Brien",
        "img_path": "https://images.equipboard.com/uploads/user/image/8674/big_ed-o-brien.jpg?v=1543360073"
    }, {
        "guitarist_name": "Alex Lifeson",
        "img_path": "https://images.equipboard.com/uploads/user/image/9280/big_alex-lifeson.jpg?v=1543360073"
    }, {
        "guitarist_name": "Neil Young",
        "img_path": "https://images.equipboard.com/uploads/user/image/9859/big_neil-young.jpg?v=1543418515"
    }, {
        "guitarist_name": "Lemmy Kilmister",
        "img_path": "https://images.equipboard.com/uploads/user/image/32561/big_lemmy-kilmister.jpg?v=1543358620"
    }, {
        "guitarist_name": "Kevin Shields",
        "img_path": "https://images.equipboard.com/uploads/user/image/13834/big_kevin-shields.jpg?v=1543394729"
    }]
};

let guitars = [];
let finished_images = [];

let count = 0;
async function addDescription() {

    for (let guitarist of formatted_names) {
        try{
            let data = await axios(`https://equipboard.com/pros/${guitarist}`);
            if (data.status === 200) {
                const html = data.data;

                const $ = cheerio.load(html);


                // This will select all of the names of the guitarists
                let guitarist_description = $('.eb-collection-header__desc').text();
                if (guitarist_description === '') {
                    guitarist_description = null;
                }
                let formatted_description = guitarist_description.replace(/^[\s]+/g, '');

                if (formatted_description !== '' && formatted_description !== null) guitarists_object.data[count].description = formatted_description;
                else guitarists_object.data[count].description = 'No description found...';
                count++;
            }

            let guitarData = await axios(`https://equipboard.com/pros/${guitarist}/#guitars`);
            if (guitarData.status === 200) {
                const html = guitarData.data;
                const $ = cheerio.load(html);

                // This will select all of the names of the guitars
                let guitars_name_array = $('.eb-sections').children();

                for (let i = 0; i < guitars_name_array.length; i++) {
                    guitars.push(guitars_name_array[i].attribs.title)
                }


                console.log(guitars);
                // // This will replace any empty part of the array
                // // It will also format it to remove any leading white space
                // guitars.map((guitar) => {
                //     if (guitar.replace(/^[ \t]+/g, '') !== '') return finished_names.push(guitar.replace(/^[ \t]+/g, ''));
                // });


                // This will get all of the image urls for the guitars
                $(".eb-img-lazy").map(function (i, image) {
                    finished_images.push(url.resolve(`https://equipboard.com/pros/${guitarist}/#guitars`, $(image).attr('data-original')));
                });
            }
        }
        catch{
            count++;
            console.log(`Problem with -- ${guitarist} --`)
        }
    }

    console.log(guitarists_object);

    let json = JSON.stringify(guitarists_object);
    fs.writeFile('/Users/zacharyshorts/Documents/School/ComputerScience/Web Scraping/webscraping/guitarDB/guitarists/output/guitarists_name_img.json', json, 'utf8', function(err) {
        if (err) {
            return console.log(err);
        }
        console.log("Guitarist names and images and description were saved!");
    });

}

addDescription();
