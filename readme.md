# Hacky Slacky Message Builder

A very prototypish application to enable me to send some half-automated slack messages using blocks.

Don't use it in production

## Usage Web UI

The web ui gives you some more info on how to the started and should probably be the first thing you want to open.

```sh
node web.js
```

open [http://localhost:1337](http://localhost:1337).

## Usage CLI

Once you're familiar with how to build blocks you probably want to automate it. There's a little cli for that.

```sh
# Set an environmental variable SLACK_TOKEN with your token first.
#   See the webapp on how to retrieve one.
node app.js $CHANNEL $TEMPLATE_FILE $FILE_WITH_DATA_FOR_TEMPLATE
```

### Templates

Templates allow you to have... well... templates.

It's `.js` files put in the `templates` folder that export a `template` function. There are two example templates folder if that was unclear.

During runtime, the application will use the data from `$FILE_WITH_DATA_FOR_TEMPLATE` (a json file that you can put anywhere) as argument to fill the template. From there you can create workflows, ie

```sh
node gitlab-status/app.js build-status.json &&
node hacky-slacky-message-builder/app.js api-playground build-report build-status.json
```
