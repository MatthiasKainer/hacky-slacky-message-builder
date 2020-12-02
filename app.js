const fs = require("fs")
const { sendSlackMessage } = require("./post");

const [channel, templateFile, dataFile] = process.argv.slice(2);

if(!channel || !templateFile || !dataFile) {
    console.log("Usage: node app.js <Channel> <Template-File> <Data-File>")
    process.exit(1)
}

if (fs.existsSync(`${__dirname}/.env.json`)) {
    const env = require("./.env.json")
    Object.entries(env).map(([key, value]) => {
        process.env[key] = value
    })
}

const {SLACK_TOKEN} = process.env

if (!SLACK_TOKEN) {
    console.log("Error: A SLACK_TOKEN has to exist as environmental variable to send the message")
    process.exit(1)
}

const {template} = require(`${__dirname}/templates/${templateFile}`)
fs.readFile(dataFile, { encoding: "utf-8" }, (err, data) => {
    if (err) {
        console.error("The data file couldn't be loaded", dataFile, err)
        process.exit(1)
    }
    sendSlackMessage({
        channel,
        token: SLACK_TOKEN,
        ...template(JSON.parse(data))
    })
})


