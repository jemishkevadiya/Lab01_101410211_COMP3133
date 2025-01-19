const fs = require('fs');
const csv = require('csv-parser');

const dataFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

const filesToDelete = ['canada.txt', 'usa.txt'];

// delete files if they exist
filesToDelete.forEach((file) => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`${file} deleted.`);
    } else {
        console.log(`${file} doesn't exist.`);
    }
});

