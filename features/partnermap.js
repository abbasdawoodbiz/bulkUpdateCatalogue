#! /usr/bin/env node

// Node imports
let fs = require('fs');

// 3rd Party imports
let _ = require('lodash');
const yargs = require('yargs');

// Project file imports
let fileOpsHelper = require('../helpers/fileops');

//Date

function getDate() {
    return new Date().toISOString();
}


function createPartnerMap() {
    let mapping = fileOpsHelper.getJsonFromCsv('partnermapping');
    let partnerMap = []

    _.each(mapping, (m, i) => {
        console.log(m);

        let pMap = {}
        pMap.skuCode = m.skuCode.trim()
        pMap.leadTimeBuffer = 0
        pMap.partnerName = m.partnerName
        pMap.region = m.region
        pMap.isPreferred = true
        pMap.active = true
        pMap.createdAt = {
            "$date": getDate()
        }
        pMap.updatedAt = {
            "$date": getDate()
        }
        pMap.minimumOrderQuantity = 1
        pMap._class = "com.bizongo.partnerservices.models.mongo.PartnerConfiguration"
        pMap.sellerPrice = parseFloat(m.sellerPrice)

        console.log(`Mapped ${m.skuCode} with partner ${m.partnerName}`);
        partnerMap.push(pMap)

        if (i + 1 == mapping.length)
            fileOpsHelper.writeOutputFile(partnerMap, 'partnermap', 'json');
        else
            console.log('in progress');
    });

};

createPartnerMap()