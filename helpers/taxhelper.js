
let _ = require('lodash');
let categories = require('./categories');

function createTax(prices) {
    console.log('generate the taxation sql');

    let str = '';
    _.each(prices, p => {
        let cpid = p.cpid || p._id['$numberLong'];

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
                ${cpid}, 
                '${p.hsn_code}', 
                ${p.hsn_id}, 
                1
            );`
    });

    return str;
}

module.exports = {
    createTax : createTax
};