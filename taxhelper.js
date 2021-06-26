
function createTax() {
    console.log('initialised create tax function');
    console.log('read the input file');

    let prices = getJsonFromCsv('prices');

    console.log('generate the taxation sql');

    let str = "";
    _.each(prices, p => {
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
                ${p.cpid}, 
                '${p.hsn_code}', 
                ${p.hsn_id}, 
                1
            );`
    });

    console.log('create the file taxation.sql');
    writePlainTextFile(str, "taxationinsert", "sql");
    
}

module.exports = {
    createTax : createTax
};