#! /usr/bin/env node

let fs = require('fs');
let csvToJson = require('convert-csv-to-json');
let _ = require('lodash');
const yargs = require('yargs');
let categories = require('./categories');

/** Initialise default options */

const options = yargs
    .usage('Usage: -c -u')
    .option('c', { alias: 'category', describe: "skip", type: 'string', demandOption: false })
    .option('u', {alias: 'update-price', describe: "use only if updating wrong vms entries", type: 'string'})
    .argv;



function readFile(filename, format) {
    let path = __dirname + `/input.csv`;
    return fs.readFileSync(path, 'utf-8');
}

function writePlainTextFile(csv, filename, format){
    fs.writeFile(__dirname + `/output/${filename}.${format}`, csv, (err)=>{
        if(err){
            console.error(err);
        } else {
            console.log('done!');
        }
    });
}


function getJsonFromCsv(filename, formatValueByType) {
    let path = `/${filename}.csv`;
    if (formatValueByType) {
        return csvToJson.fieldDelimiter(',').formatValueByType().getJsonFromCsv(__dirname + path)
    } else {
        return csvToJson.fieldDelimiter(',').getJsonFromCsv(__dirname + path)
    }
}

function writeMigrationFile(json, filename, format) {
    fs.writeFile(__dirname + `/output/${filename}.json`, JSON.stringify(json), (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('done!');
        }
    });
}

function createProduct() {
    if(options.category !== 'skip'){

        let products = getJsonFromCsv('input');
        
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

            switch(p.category_id){
                case '1010': s = categories.generateSliderProduct(p.id, p.name, p.category_id, p.material, p.type,p.design, p.mrp); break;
                case '1044': s = categories.generateSunglassesProducts(p.id, p.name, p.category_id, p.design, p.brand, p.color); break;
                case '1048': s= categories.generateDenimsProduct(p.id, p.name, p.category_id, p.color, p.design, p.fabric, p.size); break;
                case '1047': s= categories.generateTopsAndTunicsProduct(p.id, p.name, p.category_id, p.size, p.design, p.color, p.mrp); break;
                case '1052': s= categories.mensTopwear(p.id, p.name, p.category_id, p.material, p.color, p.size, p.design, p.mrp); break;
                case 'beautyProducts': s= categories.generateBeautyProducts(p.id, p.name, p.category_id, p.volume, p.weight, p.design, p.brand, p.type, p.description, p.pack_size); break;
                case '1050': s = categories.generateKidsTopwear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
                case '1051': s = categories.generateKidsBottomwear(p.id, p.name, p.category_id, p.color, p.size, p.design, p.mrp, p.pack_size); break;
            }
            console.log('Converted product for ' + p.name);
            return s;
        });
        
        writeMigrationFile(products, 'products');
    } else if (options['update-price']){
        console.log('just revising prices..');
    }
}

function createCentreProducts() {

    let products = [];
    let updatePrices = [];
    let up = "";
    if (options['update-price'] === 'update'){
        console.log('just revising prices..');
        updatePrices = getJsonFromCsv('prices');
        _.each(updatePrices, p => {
        up = up + `\n
            UPDATE vms.client_vendor_products
            SET exfactory_price = ${p.price}
            WHERE client_vendor_detail_id = ${p.client_vendor_id} AND product_id = ${p.cpid};
        `
    });
    } else if(options.category !== 'skip'){
        products = getJsonFromCsv('input');
    }

    products = _.map(products, p => {

        let cp = {
            "price":parseFloat(p.price),
            "clientVendorDetailId": parseFloat(p.client_vendor_id),
            "hsn_code":parseFloat(p.hsn_code),
            "hsn_id":parseFloat(p.hsn_id),
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
            "item_code": `${p.design.trim()}`,
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
    })

    let prices = "";

    // Change the HSN Master ID according to the category
    _.each(products, p => {
        prices = prices + `\n
            INSERT INTO vms.client_vendor_products 
                (
                    created_at, 
                    updated_at, 
                    billing_address_ids, 
                    deliverable_location_ids, 
                    is_active, 
                    exfactory_price, 
                    hsn_master_id, 
                    lead_time, 
                    product_id, 
                    product_name, 
                    currency, 
                    client_vendor_detail_id
                ) 
            VALUES
                (
                    '${categories.getDateForPostge()}', 
                    '${categories.getDateForPostge()}', 
                    '{7,971}', 
                    NULL, 
                    true, 
                    ${p.price}, 
                    ${p.hsn_id},
                    NULL, 
                    ${p._id["$numberLong"]}, 
                    '${p.name.trim()}', 
                    'INR', 
                    ${p.clientVendorDetailId}
                );
        `
    });

    let str = "";

    // Change the HSN Master ID and the HSN Code for proper tax mapping
    _.each(products, p => {
        str = str + `\n
            INSERT INTO taxation.centre_product_hsn 
                (
                    created_at, 
                    updated_at, 
                    active, 
                    centre_product_id, 
                    hsn_code, 
                    hsn_id, 
                    tenant_id
                ) 
            VALUES
                (
                    '${categories.getDateForPostge()}', 
                    '${categories.getDateForPostge()}', 
                    true, 
                    ${p._id["$numberLong"]}, 
                    '${p.hsn_code}', 
                    ${p.hsn_id}, 
                    1
                );`
    });

    

    writePlainTextFile(str,"taxationinsert", "sql");
    writePlainTextFile(prices,"vmsinsert", "sql");
    if(up && up.length > 0){
        writePlainTextFile(up,"vmsupdate","sql");
    }

    // Remove the price key from the centreProducts array of objects
    products = _.map(products, p => {
        delete p.price;
        delete p.hsn_code;
        delete p.hsn_id;
        delete p.clientVendorDetailId;
        return p;
    });

    // Write the mongo import json file for centre products
    writeMigrationFile(products, 'centreproducts');
}

createProduct();
createCentreProducts();