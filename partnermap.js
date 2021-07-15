#! /usr/bin/env node

// Node imports
let fs = require('fs');
const { update } = require('lodash');

// 3rd Party imports
let _ = require('lodash');
const yargs = require('yargs');

// Project file imports
let fileOpsHelper = require('./helpers/fileops');

//Date
function getDate() {
    return new Date().toISOString();
}


function createPartnerMap() {
    let mapping = fileOpsHelper.getJsonFromCsv('partnermapping');
    let partnermap = []
    mapping = _.each(mapping, m => {
    console.log(m);
    let leadTimeBuffer = 0
    let createdAt = getDate()
    let updatedAt = getDate()
    let minimumOrderQuantity = 1
    let isPreferred = "TRUE"
    let active = "TRUE"
    let _class = "com.bizongo.partnerservices.models.mongo.PartnerConfiguration"
    
    let map = {
            "skuCode": `${m.skuCode.trim()}`,
            "leadTimeBuffer": leadTimeBuffer,
            "partnerName": `${m.partnerName}`,
            "region": `${m.region}`,
            "isPreferred": isPreferred,
            "active": active,
            "createdAt": {
                "$date": createdAt
            },
            "updatedAt": {
                "$date": updatedAt
            },
            "minimumOrderQuantity": minimumOrderQuantity,
            "_class": _class,
            "sscLeadTime": [],
            "sellerPrice": parseFloat(m.sellerPrice),
        };
        console.log(`Mapped ${m.skuCode} with partner ${map.partnerName}`);
        return map;
    });
    partnermap.push(mapping)
    console.log(partnermap);
    fileOpsHelper.writeOutputFile(partnermap, 'partnermap', 'json');
};

createPartnerMap()