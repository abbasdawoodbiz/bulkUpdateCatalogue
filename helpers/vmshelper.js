
let _ = require('lodash');
let categories = require('./categories');

function createPrices(prices, sptplBillingAddresses) {
    console.log('initialised create vms function');
    console.log('read the input file');

    let str = "";
    _.each(prices, p => {

        let cpid = p._id? p._id['$numberLong'] : p.cpid;
        let cvid = p.clientVendorDetailId || p.client_vendor_id;

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
                    ${cpid}, 
                    '${p.name.trim()}', 
                    'INR', 
                    ${parseFloat(cvid)}
                );`
    });

    return str;
}

function updatePrices(prices) {
    let up = '';
    _.each(prices, p => {
        up = up + `\n
            UPDATE vms.client_vendor_products
            SET exfactory_price = ${p.price}
            WHERE client_vendor_detail_id = ${p.client_vendor_id} AND product_id = ${p.cpid};
        `
    });
    return up;
}

module.exports = {
    createPrices : createPrices,
    updatePrices: updatePrices
};