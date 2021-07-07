let fs = require('fs');
let csvToJson = require('convert-csv-to-json');
const jsoncsv = require('json-csv')

function getJsonFromCsv(filename, formatValueByType) {
    let path = `/../${filename}.csv`;
    if (formatValueByType) {
        return csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(__dirname + path)
    } else {
        return csvToJson.fieldDelimiter(',').getJsonFromCsv(__dirname + path)
    }
}

function writeFile(data, filename, format){
    fs.writeFile( `./output/${filename}.${format}`, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${filename}.${format} created!`);
        }
    });
}

function writeOutputFile(fileData, filename, format) {
    if(format === 'json'){
        writeFile(filename, JSON.stringify(fileData), format)
    } else if (format === 'csv'){
        jsoncsv.buffered(fileData, {
            fields:[
                {
                    name:'packaging_product',
                    label:'Packaging Product',
                    quoted: true
                },
                {
                    name:'location',
                    label:'Location',
                    quoted: true
                },
                {
                    name:'quantity',
                    label:'Quantity',
                    quoted: false
                }
            ]
        }, (err, csv) => {
            if(err) console.error(err);
            writeFile(csv, filename, format);
        })
    } else {
        writeFile(filename, fileData, format)
    }
}

module.exports = {
    getJsonFromCsv: getJsonFromCsv,
    writeOutputFile: writeOutputFile
}

