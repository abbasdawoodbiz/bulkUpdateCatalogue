let fs = require('fs');
let csvToJson = require('convert-csv-to-json');

function getJsonFromCsv(filename, formatValueByType) {
    let path = `/../${filename}.csv`;
    if (formatValueByType) {
        return csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(__dirname + path)
    } else {
        return csvToJson.fieldDelimiter(',').getJsonFromCsv(__dirname + path)
    }
}

function writeOutputFile(fileData, filename, format) {

    let data = format === 'json' ? JSON.stringify(fileData) : fileData;

    fs.writeFile( `./output/${filename}.${format}`, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${filename}.${format} created!`);
        }
    });
}

module.exports = {
    getJsonFromCsv: getJsonFromCsv,
    writeOutputFile: writeOutputFile
}

