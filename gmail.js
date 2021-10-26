const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const ExcelJS = require('exceljs');
const mailComposer = require('nodemailer/lib/mail-composer');

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.readonly', 
    'https://www.googleapis.com/auth/gmail.send'
];

const TOKEN_PATH = 'token.json';

let auth;

fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Gmail API.
    authorize(JSON.parse(content), getAuth);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
    });
}

/**
* Get and store new token after prompting for user authorization, and then
* execute the given callback with the authorized OAuth2 client.
* @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
* @param {getEventsCallback} callback The callback for the authorized client.
*/
function getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Wrapper function to pass auth to actual method that uses the gmail API
 * @param {google.auth.OAuth2} auth the authentication token with which to call the send api 
 */
async function getAuth(auth) {

    let attachmentData = await createXLSX({ some: 'value' }); // Replace JSON with what you are sending


    makeBody('abbas@bizongo.com',
        'abbas.dawood@bizongo.com',
        'test subject',
        'test message',
        [attachmentData], auth)
}

/**
 * Function to actually create the mail body using nodemailer and send via Gmail API
 * @param {String} to Email address of recipient
 * @param {String} from Email address of sender
 * @param {String} body Any message to be added to mail body
 * @param {String} sub Subject of the email
 * @param {Array} attachments Array of base64 encoded data, sent as files
 * @param {google.auth.oAuth2} auth Token to call Gmail API with
 */
function makeBody(to, from, body, sub, attachments, auth) {
    let arr = attachments.map(a => {
        return {
            filename: 'something.txt',
            content: a.split('base64,')[1],
            encoding: 'base64'
        }
    });

    //Mail Body is created.
    let mail = new mailComposer({
        to: to,
        from: from,
        text: body,
        subject: sub,
        textEncoding: "base64",
        attachments: arr
    });


    //Compiles and encodes the mail.
    mail.compile().build((err, msg) => {
        if (err) {
            return console.log('Error compiling email ' + error);
        }

        const encodedMessage = Buffer.from(msg)
            .toString('base64')
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=+$/, '');

        const gmail = google.gmail({ version: 'v1', auth });

        gmail.users.messages.send({
            auth: auth,
            userId: 'me',
            resource: {
                raw: encodedMessage
            }
        }, function (err, res) {
            if (err) console.error('Mail not sent, error: ' + err);
            console.log('Response:\n');
            console.log(res);
        });
    });
}

/**
 * Function to convert json data to excel data buffer
 * @param {Array} json Array of JSON objects to be converted to Excel
 * @returns base64 encoded string
 */
async function createXLSX(json) {
    // Create a workbook
    const workbook = new ExcelJS.Workbook();

    // Create a worksheet
    const worksheet = workbook.addWorksheet('My Sheet');

    // Insert some data
    worksheet.insertRow(1, { id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) });
    worksheet.insertRow(1, { id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) });

    // Return the excel file
    const buffer = await workbook.xlsx.writeBuffer();

    return buffer.toString('base64');
}