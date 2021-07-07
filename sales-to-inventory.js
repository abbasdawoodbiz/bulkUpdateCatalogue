#! /usr/bin/env node

// Node imports
let fs = require('fs');

// 3rd Party imports
let _ = require('lodash');
const yargs = require('yargs');

// Project file imports
let fileOpsHelper = require('./helpers/fileops');

let packagingConsumption = [];
let conversionMap = [];

/**
 * Read the input file i.e. the sales data, should be in csv format stored in root dir.
 * @returns json of the csv read
 */
function readInputFile(){
    return fileOpsHelper.getJsonFromCsv('sales-data');
}

/**
 * Function to write the inventory file
 * @param {Object} data File data to be written to csv file
 */
function writeInventoryFile(data){
    fileOpsHelper.writeOutputFile(data,'packaging-inventory','csv');
}

/**
 * Function to read the conversion file, according to reference file format shared in resources dir 
 * @returns  the entire conversion data, grouped by mode and product, as a json array
 */
function readConversionFile(){
    conversionMap = _.groupBy(fileOpsHelper.getJsonFromCsv('conversion-map'), (r) => {
        return `${r.product.trim()}|${r.mode.trim()}`
    });

    return conversionMap;
}

/**
 * Function to figure out which packaging SKUs per product and in what ratio
 * @param {Object} s Sale Data Object with keys such as product sold, quantity, mode and location
 * @returns JSON array of packaging SKUs if conversion data has the records or null
 */
function getPackagingUnitsFromSalesData(s){
    if(conversionMap && conversionMap[`${s.product.trim()}|${s.mode.trim()}`]){
        return conversionMap[`${s.product.trim()}|${s.mode.trim()}`]
    } else {
        return null;
    }
}

/**
 * Main function doing all of the reading, and converting sales data to packaging skus
 */
function convertIntoPackaging(){
    packagingConsumption = [];
    let salesData = readInputFile();

    _.each(salesData, (s,i) => {
        let packagingUnits = getPackagingUnitsFromSalesData(s);
        if(!_.isNull(packagingUnits)){
            _.each(packagingUnits, p => {
                p.date = new Date().toISOString();
                p.quantity = s.quantity * p.ratio
                p.location = s.location
                packagingConsumption.push(p);
            });

        } else {
            console.log(`No conversion rules found for product ${s.product}, mode ${s.mode}`);
        }

        if(i+1 === salesData.length) {
            console.log(packagingConsumption);
            writeInventoryFile(packagingConsumption);    
        } else {

        }
    });
}

/**
 * Entry function definition
 */
function init(){
    // fileOpsHelper.writeOutputFile(convertIntoPackaging(),'converted-inventory','csv');
    readConversionFile();
    convertIntoPackaging();
}   

init();