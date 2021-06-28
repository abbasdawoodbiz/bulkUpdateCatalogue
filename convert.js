#! /usr/bin/env node

// Node imports
let fs = require('fs');

// 3rd Party imports
let _ = require('lodash');
const yargs = require('yargs');

// Project file imports
let categories = require('./helpers/categories');
let fileOpsHelper = require('./helpers/fileops');
let taxHelper = require('./helpers/taxhelper');
let vmsHelper = require('./helpers/vmshelper');

// Global variables
let sptplBillingAddresses = '';

/** Initialise default options */
const options = yargs
    .usage('Usage: -c -u')
    .option('c', { alias: 'category', describe: "skip", type: 'string', demandOption: false })
    .option('u', { alias: 'update-price', describe: "use only if updating wrong vms entries", type: 'string' })
    .option('v', { alias: 'vendor', describe: "use on of G,M,D,K", type: 'string', demandOption: true })
    .option('p', { alias: 'create-price', describe: "create entries for each centre product in vms", type: 'boolean' })
    .option('t', { alias: 'create-tax', describe: "create entries for each centre product in taxation", type: 'boolean' })
    .argv;

function returnBizongoBillingAddressIdMaps(vendorId) {
    let addressMaps = '{}';

    switch (vendorId) {
        case 'G': addressMaps = '{7,971}'; break;
        case 'D': addressMaps = '{11546,12920,5617,13908}'; break;
        case 'M': addressMaps = '{4123,4491,5609,6527,9198}'; break;
        case 'K': addressMaps = '{7876,9254,7680,7874,7875,13544}'; break;
        default: console.error('Cannot proceed, vendor ID is mandatory'); break;
    }

    return addressMaps;
}

async function createProduct() {
    let products = fileOpsHelper.getJsonFromCsv('input');

    console.log(`Starting import of ${products.length} products`);
    
    products = _.map(products, p => {

        var s;

        /**
         * Leggings	1041
            sliders and slipons	1010
            sunglasses	1044
            Tops, tunics and kurtis	1047
            Trousers and Denims	1048
            Men's topwear	1052
            Belts	1053
            kurta, blouse and pants	1060
            unisex toys	1063
            Kids topwear	1050
            Kids bottomwear	1051
            Men's bottomwear	1065
         */

        switch (p.category_id) {
            case '1010': s = categories.generateSliderProduct(p.id, p.name, p.category_id, p.material, p.type, p.design, p.mrp); break;
            case '1041': s = categories.generateLeggingsProduct(p.id, p.name, p.category_id, p.color, p.size, p.design, p.material, p.mrp, p.pack_size); break;
            case '1044': s = categories.generateSunglassesProducts(p.id, p.name, p.category_id, p.design, p.brand, p.color); break;
            case '1047': s = categories.generateTopsAndTunicsProduct(p.id, p.name, p.category_id, p.size, p.design, p.color, p.mrp); break;
            case '1048': s = categories.generateDenimsProduct(p.id, p.name, p.category_id, p.color, p.design, p.fabric, p.size, p.mrp, p.pack_size); break;
            case '1050': s = categories.generateKidsTopwear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            case '1051': s = categories.generateKidsBottomwear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            case '1052': s = categories.mensTopwear(p.id, p.name, p.category_id, p.material, p.color, p.size, p.design, p.brand, p.style, p.mrp); break;
            case 'beautyProducts': s = categories.generateBeautyProducts(p.id, p.name, p.category_id, p.volume, p.weight, p.design, p.brand, p.type, p.description, p.pack_size); break;
            case '1065': s = categories.generateMensBottomWear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            case '1095': s = categories.generateNightWear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            case '1094': s = categories.generateGenericProduct(p.id, p.name, p.category_id, p.model_number, p.type, p.pack_size); break;
            case '1096': s = categories.generateLadiesNightWear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            case '1097': s = categories.generateGenericProduct(p.id, p.name, p.category_id, p.model_number, p.type, p.pack_size); break;
            case '1098': s = categories.generateGenericProduct(p.id, p.name, p.category_id, p.model_number, p.type, p.pack_size); break;
            case '1063': s = categories.generateunisextoys(p.id, p.name, p.category_id, p.age, p.mrp, p.design, p.pack_size); break;
        }
        console.log('Converted product for ' + p.name);
        return s;
    });

    fileOpsHelper.writeOutputFile(products, 'products', 'json');
}


async function createCentreProducts() {
    let products = fileOpsHelper.getJsonFromCsv('input');

    products = _.map(products, p => {
        console.log(p);
        let item_code = p.model_number ? p.model_number.trim() : p.design.trim();

        let cp = {
            "price": parseFloat(p.price),
            "clientVendorDetailId": parseFloat(p.client_vendor_id),
            "hsn_code": parseFloat(p.hsn_code),
            "hsn_id": parseFloat(p.hsn_id),
            "_id": {
                "$numberLong": `${p.cpid}`
            },
            "name": `${p.name.trim()}`,
            "product_id": {
                "$numberLong": `${p.id}`
            },
            "centre_id": {
                "$numberLong": `${p.centre_id}`
            },
            "client_id": {
                "$numberLong": `${p.client_id}`
            },
            "tenant_id": {
                "$numberLong": "1"
            },
            "display_units": [{
                "units": [],
                "type": "UOM"
            }, {
                "units": [],
                "type": "SPECIFICATION"
            }],
            "category_id": {
                "$numberLong": `${p.category_id}`
            },
            "item_code": `${item_code}`,
            "images": [],
            "active": true,
            "status": "approved",
            "created_at": {
                "$date": categories.getDate()
            },
            "updated_at": {
                "$date": categories.getDate()
            },
            "created_by": {
                "name": "Abbas Dawood",
                "id": 34155,
                "email": "abbas.dawood@bizongo.com"
            },
            "updated_by": {
                "name": "Abbas Dawood",
                "id": 34155,
                "email": "abbas.dawood@bizongo.com"
            }
        };

        console.log(`Converted centre product for ${p.name} with id ${cp._id["$numberLong"]}`);
        return cp;
    });

    fileOpsHelper.writeOutputFile(
        taxHelper.createTax(products)
        , 'taxationinsert', 'sql');

    fileOpsHelper.writeOutputFile(
        vmsHelper.createPrices(products, sptplBillingAddresses)
        , 'vmsinsert', 'sql');

    // Remove the price key from the centreProducts array of objects
    products = _.map(products, p => {
        delete p.price;
        delete p.hsn_code;
        delete p.hsn_id;
        delete p.clientVendorDetailId;
        return p;
    });

    // Write the mongo import json file for centre products
    fileOpsHelper.writeOutputFile(products, 'centreproducts', 'json');
}

function init() {
    console.log('initialised init function');
    if (options.vendor) {
        sptplBillingAddresses = returnBizongoBillingAddressIdMaps(options.vendor);
        // console.log(module);

        if (options['update-price'] === 'update') {
            fileOpsHelper.writeOutputFile(
                vmsHelper.updatePrices(
                    fileOpsHelper.getJsonFromCsv('prices')
                ), 'vmsupdate', 'sql'
            );
        }
            
        if (options['create-price']) {
            console.log('initialised vmsoptions');
            fileOpsHelper.writeOutputFile(
                vmsHelper.createPrices(
                    fileOpsHelper.getJsonFromCsv('prices'), 
                    sptplBillingAddresses
                ),'vmsinsert','sql');
        }

        if (options['create-tax']) {
            console.log('initialised taxoptions');
            fileOpsHelper.writeOutputFile(
                taxHelper.createTax(
                    fileOpsHelper.getJsonFromCsv('prices')
                ),'taxationinsert','sql');
        }

        if (!options['create-tax'] && !options['create-price'] && !options['update-price']) {
            createProduct();
            createCentreProducts();
        }

    } else {
        console.error('Stopping further process.. vendor is mandatory, use of the options');
    }
}

init();

