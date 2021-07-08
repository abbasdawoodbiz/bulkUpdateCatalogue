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

/**
 * Function to write a file to the File system  
 * @param {Stream} data File stream to be written to files
 * @param {String} filename Desired file name, output into the output dir
 * @param {String} format Either one of json, csv or sql
 */
function writeFile(data, filename, format){
    fs.writeFile( `./output/${filename}.${format}`, data, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${filename}.${format} created!`);
        }
    });
}

/**
 * Function to preprocess incoming file stream data, and take appropriate conversion before writing to FS   
 * @param {Object} fileData Incoming data to be written to FS
 * @param {String} filename Desired file name
 * @param {String} format Either one of json, csv or sql
 */
function writeOutputFile(fileData, filename, format) {
    if(format === 'json'){
        writeFile(JSON.stringify(fileData),filename, format)
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
        writeFile(fileData, filename, format)
    }
}

module.exports = {
    getJsonFromCsv: getJsonFromCsv,
    writeOutputFile: writeOutputFile
}

