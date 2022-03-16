
let _ = require('lodash');
let categories = require('./categories');

function createPayments(paymentData) {
    console.log('initialised create payments function');
    console.log('read the input file');

    let str = "";
    _.each(paymentData, p => {

        let cpid = p._id? p._id['$numberLong'] : p.cpid;
        let cvid = p.clientVendorDetailId || p.client_vendor_id;

        str = str + `\n
            INSERT INTO finance.payments 
                (
                    created_at, 
                    account_id, 
                    amount, 
                    bank_details, 
                    created_by, 
                    entity_reference_number, 
                    entity_reference_type, 
                    payment_date, 
                    reference_number, 
                    remarks, 
                    settled_date,
                    status,
                    type,
                    updated_at,
                    updated_by,
                    voucher_reference_number,
                    tally_sync,
                    tally_sync_error,
                    tally_sync_retry_count
                ) 
            VALUES
                (
                    '${categories.getDateForPostge()}', 
                    ${p.account_id}, 
                    ${p.amount}, 
                    '{"bank_name": "RAZORPAY SOFTWARE PRIVATE LTD - Collection Account"}', 
                    'backendDataUpload', 
                    NULL,
                    NULL, 
                    '${categories.getDateForPostge(p.payment_date)}', 
                    '${p.reference_number}', 
                    'Being paid Rs. ${p.amount} to ${p.account_name} against null', 
                    NULL,
                    'CREATED', 
                    'RAZOR_PAY', 
                    '${categories.getDateForPostge()}', 
                    'backendDataUpload',
                    NULL,
                    NULL,
                    NULL,
                    NULL
                );`
    });

    return str;
}

module.exports = {
    createPayments : createPayments
};