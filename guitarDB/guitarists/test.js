const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const url = require('url');
const axios = require('axios');

// copy paste from guitarist_name_url.json
let formatted_names = [
    'jack-white',
    'dave-grohl',
    'john-mayer',
    'john-frusciante',
    'slash',
    'jimi-hendrix',
    'kurt-cobain',
    'jimmy-page',
    'david-gilmour',
    'alex-turner-arctic-monkeys',
    'josh-homme',
    'matthew-bellamy',
    'billie-joe-armstrong',
    'eric-clapton',
    'kevin-parker',
    'dan-auerbach',
    'ed-sheeran',
    'james-hetfield',
    'stevie-ray-vaughan',
    'jonny-greenwood',
    'tom-morello',
    'the-edge',
    'paul-mccartney',
    'gary-clark-jr',
    'thom-yorke',
    'eddie-van-halen',
    'noel-gallagher',
    'steve-vai',
    'angus-young',
    'george-harrison',
    'kirk-hammett',
    'john-petrucci',
    'mac-demarco',
    'joe-satriani',
    'luke-hemmings',
    'josh-klinghoffer',
    'johnny-marr',
    'keith-richards',
    'zakk-wylde',
    'michael-clifford',
    'john-lennon',
    'jonny-buckland-coldplay',
    'jamie-cook',
    'billy-gibbons',
    'carlos-santana',
    'bb-king',
    'calum-hood',
    'joe-bonamassa',
    'chris-wolstenholme',
    'jeff-beck',
    'nick-valensi-the-strokes',
    'synyster-gates',
    'trent-reznor',
    'tony-iommi',
    'dimebag-darrell',
    'chris-cornell',
    'roger-waters',
    'mike-mccready',
    'jerry-cantrell',
    'thomas-delonge',
    'brian-may',
    'caleb-followill-kings-of-leon',
    'dave-mustaine',
    'chris-martin',
    'mark-knopfler',
    'jim-root',
    'billy-corgan',
    'matthew-healy',
    'tyler-joseph',
    'eric-johnson',
    'joe-perry',
    'chris-shiflett',
    'robert-smith',
    'prince',
    'pete-townshend',
    'paul-gilbert',
    'matthew-followill',
    'adam-jones',
    'rob-chapman',
    'shawn-mendes',
    'robert-trujillo',
    'gary-moore',
    'troy-van-leeuwen',
    'adam-hann',
    'buckethead',
    'david-bowie',
    'st-vincent',
    'albert-hammond-jr',
    'brendon-urie',
    'thurston-moore',
    'mike-einziger-incubus',
    'beck',
    'alex-lifeson',
    'ed-o-brien',
    'neil-young',
    'sting'
];

//This script file will try to fill in the remaining fields
let guitarists_object = {
    data: [
        {
            id: 19,
            name: 'Jack White',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/192/big_jack-white.jpg?v=1541718827'
        },
        {
            id: 20,
            name: 'Dave Grohl',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/989/big_dave-grohl.jpg?v=1541670062'
        },
        {
            id: 21,
            name: 'John Mayer',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/84/big_john-mayer.jpg?v=1541714889'
        },
        {
            id: 22,
            name: 'John Frusciante',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/176/big_john-frusciante.jpeg?v=1541714889'
        },
        {
            id: 23,
            name: 'Slash',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2310/big_slash.jpg?v=1541714889'
        },
        {
            id: 24,
            name: 'Jimi Hendrix',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3382/big_jimi-hendrix.jpg?v=1541723878'
        },
        {
            id: 25,
            name: 'Kurt Cobain',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3978/big_kurt-cobain.jpg?v=1541723878'
        },
        {
            id: 26,
            name: 'Jimmy Page',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2113/big_jimmy-page.jpg?v=1541714889'
        },
        {
            id: 27,
            name: 'David Gilmour',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/4702/big_david-gilmour.jpg?v=1541670062'
        },
        {
            id: 28,
            name: 'Alex Turner',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/121/big_alex-turner.jpg?v=1541670062'
        },
        {
            id: 29,
            name: 'Josh Homme',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/608/big_josh-homme.jpg?v=1541670062'
        },
        {
            id: 30,
            name: 'Matthew Bellamy',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/120/big_matthew-bellamy.jpg?v=1541696557'
        },
        {
            id: 31,
            name: 'Billie Joe Armstrong',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/817/big_billie-joe-armstrong.jpg?v=1541722454'
        },
        {
            id: 32,
            name: 'Eric Clapton',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2260/big_eric-clapton.png?v=1541714889'
        },
        {
            id: 33,
            name: 'Kevin Parker',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/11272/big_kevin-parker.jpg?v=1541714925'
        },
        {
            id: 34,
            name: 'Dan Auerbach',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/984/big_dan-auerbach.jpg?v=1541714889'
        },
        {
            id: 35,
            name: 'Ed Sheeran',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/5788/big_ed-sheeran.jpg?v=1541620282'
        },
        {
            id: 36,
            name: 'James Hetfield',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/6840/big_james-hetfield.jpg?v=1541714889'
        },
        {
            id: 37,
            name: 'Stevie Ray Vaughan',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1760/big_stevie-ray-vaughan.jpg?v=1541545340'
        },
        {
            id: 38,
            name: 'Jonny Greenwood',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/5293/big_jonny-greenwood.jpg?v=1541669565'
        },
        {
            id: 39,
            name: 'Tom Morello',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10172/big_tom-morello.jpg?v=1541669669'
        },
        {
            id: 40,
            name: 'The Edge',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/991/big_the-edge.jpg?v=1541714889'
        },
        {
            id: 41,
            name: 'Paul McCartney',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8608/big_paul-mccartney.jpeg?v=1541723878'
        },
        {
            id: 42,
            name: 'Gary Clark Jr',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/233/big_gary-clark-jr.jpg?v=1541684895'
        },
        {
            id: 43,
            name: 'Thom Yorke',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/5568/big_thom-yorke.jpeg?v=1541714889'
        },
        {
            id: 44,
            name: 'Eddie Van Halen',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3385/big_eddie-van-halen.jpg?v=1541669619'
        },
        {
            id: 45,
            name: 'Noel Gallagher',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1840/big_noel-gallagher.jpg?v=1541714889'
        },
        {
            id: 46,
            name: 'Steve Vai',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1076/big_steve-vai.jpg?v=1541669669'
        },
        {
            id: 47,
            name: 'Angus Young',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/4844/big_angus-young.jpg?v=1541624924'
        },
        {
            id: 48,
            name: 'George Harrison',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/5882/big_george-harrison.jpg?v=1541723878'
        },
        {
            id: 49,
            name: 'Kirk Hammett',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8134/big_kirk-hammett.jpg?v=1541714889'
        },
        {
            id: 50,
            name: 'John Petrucci',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1472/big_john-petrucci.jpg?v=1541684895'
        },
        {
            id: 51,
            name: 'Mac DeMarco',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/27686/big_mac-demarco.jpg?v=1541714925'
        },
        {
            id: 52,
            name: 'Joe Satriani',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1473/big_joe-satriani.jpg?v=1541610084'
        },
        {
            id: 53,
            name: 'Luke Hemmings',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10499/big_luke-hemmings.jpg?v=1541723345'
        },
        {
            id: 54,
            name: 'Josh Klinghoffer',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1369/big_josh-klinghoffer.jpg?v=1541670062'
        },
        {
            id: 55,
            name: 'Johnny Marr',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2018/big_johnny-marr.jpg?v=1541723878'
        },
        {
            id: 56,
            name: 'Keith Richards',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3383/big_keith-richards.jpg?v=1541606995'
        },
        {
            id: 57,
            name: 'Zakk Wylde',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3901/big_zakk-wylde.jpg?v=1541669340'
        },
        {
            id: 58,
            name: 'Michael Clifford',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10500/big_michael-clifford.png?v=1541669669'
        },
        {
            id: 59,
            name: 'John Lennon',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8755/big_john-lennon.jpg?v=1541723878'
        },
        {
            id: 60,
            name: 'Jonny Buckland',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/102/big_jonny-buckland.jpg?v=1541714889'
        },
        {
            id: 61,
            name: 'Jamie Cook',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/262/big_jamie-cook.jpg?v=1541669565'
        },
        {
            id: 62,
            name: 'Billy Gibbons',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1077/big_billy-gibbons.jpg?v=1541600065'
        },
        {
            id: 63,
            name: 'Carlos Santana',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3025/big_carlos-santana.jpg?v=1541714889'
        },
        {
            id: 64,
            name: 'B.B. King',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/782/big_b-b-king.jpg?v=1541600566'
        },
        {
            id: 65,
            name: 'Calum Hood',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10501/big_calum-hood.jpg?v=1541723878'
        },
        {
            id: 66,
            name: 'Joe Bonamassa',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/4843/big_joe-bonamassa.jpg?v=1541620282'
        },
        {
            id: 67,
            name: 'Chris Wolstenholme',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8238/big_chris-wolstenholme.jpg?v=1541723878'
        },
        {
            id: 68,
            name: 'Jeff Beck',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2188/big_jeff-beck.jpg?v=1541714889'
        },
        {
            id: 69,
            name: 'Nick Valensi',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/424/big_nick-valensi.jpg?v=1541714889'
        },
        {
            id: 70,
            name: 'Synyster Gates',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2620/big_synyster-gates.jpg?v=1541580686'
        },
        {
            id: 71,
            name: 'Trent Reznor',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8810/big_trent-reznor.jpg?v=1541714925'
        },
        {
            id: 72,
            name: 'Tony Iommi',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9278/big_tony-iommi.jpg?v=1541620282'
        },
        {
            id: 73,
            name: 'Dimebag Darrell',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/5794/big_dimebag-darrell.jpg?v=1541714889'
        },
        {
            id: 74,
            name: 'Chris Cornell',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/7999/big_chris-cornell.jpg?v=1541714889'
        },
        {
            id: 75,
            name: 'Roger Waters',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3177/big_roger-waters.jpg?v=1541723878'
        },
        {
            id: 76,
            name: 'Mike McCready',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1769/big_mike-mccready.JPG?v=1541669619'
        },
        {
            id: 77,
            name: 'Jerry Cantrell',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3704/big_jerry-cantrell.jpg?v=1541669619'
        },
        {
            id: 78,
            name: 'Thomas DeLonge',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9240/big_thomas-delonge.jpg?v=1541714889'
        },
        {
            id: 79,
            name: 'Brian May',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/7551/big_brian-may.jpg?v=1541714889'
        },
        {
            id: 80,
            name: 'Caleb Followill',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/214/big_caleb-followill.jpg?v=1541684895'
        },
        {
            id: 81,
            name: 'Dave Mustaine',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9061/big_dave-mustaine.jpg?v=1541670062'
        },
        {
            id: 82,
            name: 'Chris Martin',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/4113/big_chris-martin.jpg?v=1541650012'
        },
        {
            id: 83,
            name: 'Mark Knopfler',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/7740/big_mark-knopfler.jpg?v=1541669619'
        },
        {
            id: 84,
            name: 'Jim Root',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10646/big_jim-root.png?v=1541723878'
        },
        {
            id: 85,
            name: 'Billy Corgan',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/12013/big_billy-corgan.jpg?v=1541714889'
        },
        {
            id: 86,
            name: 'Matthew Healy',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10690/big_matthew-healy.jpg?v=1541700008'
        },
        {
            id: 87,
            name: 'Tyler Joseph',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/61165/big_tyler-joseph.jpg?v=1541723878'
        },
        {
            id: 88,
            name: 'Eric Johnson',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/2936/big_eric-johnson.jpg?v=1541714889'
        },
        {
            id: 89,
            name: 'Joe Perry',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1638/big_joe-perry.jpg?v=1541669898'
        },
        {
            id: 90,
            name: 'Chris Shiflett',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8408/big_chris-shiflett.jpg?v=1541723345'
        },
        {
            id: 91,
            name: 'Robert Smith',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/32702/big_robert-smith.jpg?v=1541706176'
        },
        {
            id: 92,
            name: 'Prince',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/14258/big_prince.jpg?v=1541723878'
        },
        {
            id: 93,
            name: 'Pete Townshend',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/3387/big_pete-townshend.jpg?v=1541714889'
        },
        {
            id: 94,
            name: 'Paul Gilbert',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/6690/big_paul-gilbert.jpg?v=1541669669'
        },
        {
            id: 95,
            name: 'Matthew Followill',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/247/big_matthew-followill.jpg?v=1541669619'
        },
        {
            id: 96,
            name: 'Adam Jones',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/14485/big_adam-jones.png?v=1541545382'
        },
        {
            id: 97,
            name: 'Rob Chapman',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/52007/big_rob-chapman.jpg?v=1541670062'
        },
        {
            id: 98,
            name: 'Shawn Mendes',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10587/big_shawn-mendes.jpg?v=1541650012'
        },
        {
            id: 99,
            name: 'Robert Trujillo',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9183/big_robert-trujillo.jpg?v=1541723878'
        },
        {
            id: 100,
            name: 'Gary Moore',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/6079/big_gary-moore.jpg?v=1541714889'
        },
        {
            id: 101,
            name: 'Troy Van Leeuwen',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/7379/big_troy-van-leeuwen.jpg?v=1541669829'
        },
        {
            id: 102,
            name: 'Adam Hann',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10691/big_adam-hann.jpg?v=1541714925'
        },
        {
            id: 103,
            name: 'Buckethead',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/12616/big_buckethead.jpg?v=1541669669'
        },
        {
            id: 104,
            name: 'David Bowie',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/10913/big_david-bowie.jpg?v=1541714889'
        },
        {
            id: 105,
            name: 'St. Vincent',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/11921/big_st-vincent.jpg?v=1541723878'
        },
        {
            id: 106,
            name: 'Albert Hammond Jr',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/6073/big_albert-hammond-jr.jpg?v=1541620282'
        },
        {
            id: 107,
            name: 'Brendon Urie',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/11558/big_brendon-urie.JPG?v=1541723878'
        },
        {
            id: 108,
            name: 'Thurston Moore',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8138/big_thurston-moore.jpg?v=1541669669'
        },
        {
            id: 109,
            name: 'Mike Einziger',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/213/big_mike-einziger.jpg?v=1541697949'
        },
        {
            id: 110,
            name: 'Beck',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/1761/big_beck.jpg?v=1541622194'
        },
        {
            id: 111,
            name: 'Alex Lifeson',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9280/big_alex-lifeson.jpg?v=1541714889'
        },
        {
            id: 112,
            name: 'Ed O\'Brien',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8674/big_ed-o-brien.jpg?v=1541714889'
        },
        {
            id: 113,
            name: 'Neil Young',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/9859/big_neil-young.jpg?v=1541670062'
        },
        {
            id: 114,
            name: 'Sting',
            dob: null,
            country: null,
            description: null,
            img_path: 'https://images.equipboard.com/uploads/user/image/8753/big_sting.jpg?v=1541714889'
        }
    ]
};

let count = 0;
async function getData() {

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
        }
        catch{
            count++;
            console.log(`Problem with -- ${guitarist} --`)
        }
    }

    console.log(guitarists_object);

};

getData();


