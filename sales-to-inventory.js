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

function readInputFile(){
    return fileOpsHelper.getJsonFromCsv('sales-data');
}

function writeInventoryFile(data){
    fileOpsHelper.writeOutputFile(data,'packaging-inventory','csv');
}

function readConversionFile(){
    conversionMap = _.groupBy(fileOpsHelper.getJsonFromCsv('conversion-map'), (r) => {
        return `${r.product.trim()}|${r.mode.trim()}`
    });

    return conversionMap;
}

function getPackagingUnitsFromSalesData(s){
    if(conversionMap && conversionMap[`${s.product.trim()}|${s.mode.trim()}`]){
        return conversionMap[`${s.product.trim()}|${s.mode.trim()}`]
    } else {
        return null;
    }
}

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

function init(){
    // fileOpsHelper.writeOutputFile(convertIntoPackaging(),'converted-inventory','csv');
    readConversionFile();
    convertIntoPackaging();
}   

init();