const fs = require('fs');
const csv = require('csv-parser');

const dataFile = 'input_countries.csv';
const canadaFile = 'canada.txt';
const usaFile = 'usa.txt';

const filesToDelete = ['canada.txt', 'usa.txt'];

// Create write streams for canada.txt & usa.txt
const canadaStream = fs.createWriteStream(canadaFile);
const usaStream = fs.createWriteStream(usaFile);

// delete files if they exist
filesToDelete.forEach((file) => {
    if (fs.existsSync(file)) {
        fs.unlinkSync(file);
        console.log(`${file} deleted.`);
    } else {
        console.log(`${file} doesn't exist.`);
    }
});

// write header to the output files
canadaStream.write('country,year,population\n');
usaStream.write('country,year,population\n');

// Read file and filter rows
fs.createReadStream(dataFile)
    .pipe(csv())
    .on('data', (row) => {
        const { country } = row;
        if (country === 'Canada') {
            canadaStream.write(`${Object.values(row).join(',')}\n`);
        } else if (country === 'United States') {
            usaStream.write(`${Object.values(row).join(',')}\n`);
        }
    })
    .on('end', () => {
        console.log(`Data processing completed.`);
        canadaStream.end();
        usaStream.end();
    })
    .on('error', (err) => {
        console.error('Error reading the CSV file:', err);
    });


