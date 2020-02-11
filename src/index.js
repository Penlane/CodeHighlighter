const fs = require('fs');

const lexer = process.argv[2];
const startDirectory = process.argv[3];
console.log(`Lexer: ${lexer}`);
console.log(`startDir: ${startDirectory}`);

let massiveString;
console.log(`Command: ${`cat '${startDirectory}\\*'`}`);
fs.readdir(startDirectory, (err, files) => {
    for (const file of files) {
        massiveString+=require('child_process').execSync(`cat '${startDirectory}\\${file}'`).toString('UTF-8');
    }
    // console.log(massiveString);
    fs.writeFile(`${startDirectory}\\summary.cpp`, massiveString, (err) => {
        if(err) {
            console.log(`Error when creating the merged cpp file: ${err}`);
            return;
        } else {
            require('child_process').execSync(`pygmentize -f html -l ${lexer} -o "${startDirectory}\\summary.html" "${startDirectory}\\summary.cpp"`);
            console.log('Done...check directory');
        }
    });
 });