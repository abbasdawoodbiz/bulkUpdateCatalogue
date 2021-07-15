# Batch Product Uploader
This project is the repo of any batch uploading using a preset object template to any object only, or object supporting stores such as MongoDB.

## Environment readiness
To run this project, you will need: 
- NodeJS. I recommend using nvm to manage multiple node versions on the system, read about it [here](https://nodejs.org/en/download/package-manager/#nvm)

## Running the script
- Clone this repo using github
- Install dependencies by running `npm i`
### For Bulk Cataloguing Dependencies
- Need the input file as discussed earlier, it must be present in the root dir with the name `input.csv` for the script to run
- NodeJS version has to match the one mentioned in (package.json)[package.json]
- Make sure `input.csv` file does not have commas(,), apostrophe ('), hyphen (-) to prevent from any errors in script run
- Make sure you verify the category template id in all categories in `categories.json` before you run the script
- Once dependencies are installed, use the command `node convert.js` after switching to features dir
- Category name has to be from one of the supported categories, and is a mandatory input
- Output files will be created in the `output` dir
### For Consumption based inventory file generation
- Input the dependent files as `sales-data.csv` and `conversion-map.csv` and store in the root dir, formats for the same are available in `resources` [dir](./resources/consumptionbasedAR)
- Use the command `node sales-to-inventory.js` after switching to features dir
- Output files will be created in the `output` dir with the filename `packaging-inventory.csv`

### For taxation and vms insert generation
- Input the dependent files as `prices.csv` and store it in the root dir, format for the same is available in `resources` [dir](./resources/taxationVMS)
- Input file fields are:
    -   name: product name as required on invoice
    -   price: Bizongo selling price without tax
    -   id: Product ID (fag end digits of SKU code)
    -   client_id: Company id as on UMS >> Companies
    -   client_vendor_id: Client vendor detail id can be obtained from one existing entry on vms (relation between the buyer
-   company and smartpaddle entity aka the vendor)
-   centre_id: Centre id as on UMS >> Centres and where the centre product is required
-   cpid: Centre Product ID
-   hsn_code: HSN code
-   hsn_id: HSN master id available for the HSN and tax rate combination in Taxation >> HSN GST details
- Use the command `node convert.js -p -t -v <option>` after switching to features dir
- Values for option v are are G,M,D,K (G for Smartpaddle Haryana and so on and so forth)
- Using G : `node convert.js -p -t -v G` will create pricing for Smartpaddle Haryana
- Output files will be created in the `output` dir with the filenames `taxationinsert.sql` and `vmsinsert.sql`
- The SQL files can be opened on vs-code and the content can be copied and inserted usin dbeaver or console

### For partnerMapping 
- Input the dependent files as `partnermapping.csv` and store it in the root dir, format for the same is available in `resources` [dir](./resources/partnerMapping)
- Use the command `node partnermap.js` after switching to features dir
- Output files will be created in the `output` dir with the filename `partnermap.json`
- The JSON file can be opened on vs-code and the content can be inserted using Mongo Compass by using the insert document feature in the `bizongo_mongo.partnerConfiguration` collection

## Console Help
Run `node convert.js` to see supported command line parameters. Categories will be updated with every new category bulk upload request.
