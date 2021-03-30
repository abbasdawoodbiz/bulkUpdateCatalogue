# Batch Product Uploader
--
This project is the repo of any batch uploading using a preset object template to any object only, or object supporting stores such as MongoDB.

## Environment readiness
To run this project, you will need: 
- NodeJS. I recommend using nvm to manage multiple node versions on the system, read about it (here)[https://nodejs.org/en/download/package-manager/#nvm]
- Need the input file as discussed earlier, it must be present in the root dir with the name `input.csv` for the script to run
- NodeJS version has to match the one mentioned in (package.json)[package.json]
- Make sure `input.csv` file does not have commas(,), apostrophe ('), hyphen (-) to prevent from any errors in script run
- Make sure you verify the category template id in all categories in `categories.json` before you run the script

## Running the script
- Use the command `node convert.js -c <category name>`
- Category name has to be from one of the supported categories, and is a mandatory input
- Output files will be created in the `output` dir

## Console Help
Run `node convert.js` to see supported command line parameters and categories for which the script is designed. Categories will be updated with every new category bulk upload request.