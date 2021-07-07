# Batch Product Uploader
This project is the repo of any batch uploading using a preset object template to any object only, or object supporting stores such as MongoDB.

## Environment readiness
To run this project, you will need: 
- NodeJS. I recommend using nvm to manage multiple node versions on the system, read about it (here)[https://nodejs.org/en/download/package-manager/#nvm]
- Need the input file as discussed earlier, it must be present in the root dir with the name `input.csv` for the script to run
- NodeJS version has to match the one mentioned in (package.json)[package.json]
- Make sure `input.csv` file does not have commas(,), apostrophe ('), hyphen (-) to prevent from any errors in script run
- Make sure you verify the category template id in all categories in `categories.json` before you run the script

## Running the script
- Clone this repo using github
- Install dependencies by running `npm i`
### For Bulk Cataloguing Dependencies
- Once dependencies are installed, use the command `node convert.js`
- Category name has to be from one of the supported categories, and is a mandatory input
- Output files will be created in the `output` dir
### For Consumption based inventory file generation
- Input the dependent files as `sales-data.csv` and `conversion-map.csv` and store in the root dir, formats for the same are available in `resources` dir[resources/"consumption based AR"]
- Use the command `node sales-to-inventory.js`
- Output files will be created in the `output` dir with the filename `packaging-inventory.csv`


## Console Help
Run `node convert.js` to see supported command line parameters. Categories will be updated with every new category bulk upload request.