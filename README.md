# Politi Logger Bluesky bot

**NB! This application is using politiet.no api's, and if they contact me and disallow the usage of their api, this repo will be removed/depricated and the bot will become offline**

This is an easy integration with [https://www.politiet.no/politiloggen/](https://www.politiet.no/politiloggen/), the bot fetches the latest messages and sends it to the Blyesky user called [politilogger](https://bsky.app/profile/politilogger.bsky.social)

## Development

### Setup

1. Install required packages with: `npm install`
2. Install Typescript: `npm i -g typescript`
3. Install Node.js: `npm i -g ts-node`
4. Make a copy of the example `.env` file by running: `cp example.env .env`. Set your username and password in .env. Use an App Password.

### Working

1. To generate/update the javascript files run: `npx tsc` if you want the files to auto update on save run: `npx tsc -w`
2. Start the bot with `node index.js`

### Contributing

Im open for ideas and contributions, PR's are welcome.

Remember to push the generated javascript files to the repo (This is because the hosting of the bot does not support Typescript compiling... I will probably change host later)
