const fs = require('fs');

const lexer = process.argv[2];
const startDirectory = process.argv[3];
const fileName = process.argv[4];

console.log(`Lexer: ${lexer}`);
console.log(`startDir: ${startDirectory}`);
console.log(`Desired filename: ${fileName}`);

if(typeof fileName === 'undefined') {
    console.log('Enter correct filename');
    return;
}

if(typeof lexer === 'undefined') {
    console.log('Enter correct lexer');
    return;
}

if(typeof startDirectory === 'undefined') {
    console.log('Enter correct startDirectory');
    return;
}

let massiveString;
console.log(`Command: ${`cat '${startDirectory}\\*'`}`);
fs.readdir(startDirectory, (err, files) => {
    for (const file of files) {
        massiveString+=require('child_process').execSync(`cat '${startDirectory}\\${file}'`).toString('UTF-8');
    }
    // console.log(massiveString);
    fs.writeFile(`${startDirectory}\\${fileName}.cpp`, massiveString, (err) => {
        if(err) {
            console.log(`Error when creating the merged cpp file: ${err}`);
            return;
        } else {
            require('child_process').execSync(`pygmentize -f html -l ${lexer} -o "${startDirectory}\\${fileName}.html" "${startDirectory}\\${fileName}.cpp"`);
            console.log('Done...check directory');
        }
    });
 });