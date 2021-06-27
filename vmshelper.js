
const chelper = require('./convert.js');
let _ = require('lodash');
let categories = require('./categories');


async function createVms() {
    console.log('initialised create vms function');
    console.log('read the input file');

    let prices = chelper.getJsonFromCsv('prices');
    let sptplBillingAddresses = chelper.returnBizongoBillingAddressIdMaps(chelper.options.vendor);
    console.log('generate the vms sql');

    let str = "";
    _.each(prices, p => {
        str = str + `\n
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
                    '${sptplBillingAddresses}', 
                    NULL, 
                    true, 
                    ${p.price}, 
                    ${p.hsn_id},
                    NULL, 
                    ${p.cpid}, 
                    '${p.name.trim()}', 
                    'INR', 
                    ${parseFloat(p.client_vendor_id)}
                );`
    });

    console.log('create the file vms.sql');
    chelper.writePlainTextFile(str, "vmsinsert", "sql");

}

module.exports = {
    createVms : createVms
};