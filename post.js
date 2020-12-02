const https = require('https');

const toQueryString = (obj) => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")
}

function sendSlackMessage({ text, token, channel, blocks }) {
    return new Promise((resolve,reject) => {
        const queryString = toQueryString({
          token,
          channel,
          blocks: JSON.stringify(blocks),
          text
        })

        const req = https.request({
            method: 'GET',
            hostname: "slack.com",
            path: "/api/chat.postMessage?" + queryString,
            headers: {
              'Content-Type': '	application/x-www-form-urlencoded',
            }
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let body = Buffer.concat(chunks);
                resolve(JSON.parse(body.toString("UTF-8")))
                console.log("Successfully resolved")
            })
        })
        req.on('error', reject);
        if(queryString) {
            req.write(queryString);
        }
        req.end();
    })
}

module.exports = {sendSlackMessage}