# Politi Logger Bluesky Bot

A bot that fetches the latest updates from [politiloggen](https://www.politiet.no/politiloggen/) and posts them to the [Politi Logger](https://bsky.app/profile/politilogger.bsky.social) Bluesky account.

> **Note**: This application uses the public APIs from politiet.no. If we receive a request to stop using their API, this repository will be deprecated, and the bot will be taken offline.

## Features

- Fetches and shares real-time updates from politiet.no's log.
- Posts updates to Bluesky under the user `@politilogger.bsky.social`.

## Getting Started

### Prerequisites

- **Do not manually modify JavaScript files** – these are auto-generated from TypeScript files by the compiler.
- **Environment Variables**: Use an App Password for secure authentication.

### Setup

1. Clone the repository.
2. Install required packages with:

```
npm install
```

3. Install TypeScript globally:

```
npm i -g typescript
```

4. Install Node.js typescript globally:

```
npm i -g ts-node
```

5. Copy the example environment file and configure your credentials:

```
cp example.env .env
```

6. Update the `.env` with your Bluesky username and App Password

### Development Workflow

1. To compile TypeScript files, run:

```
npx tsc
```

- For continuous compilation, use:

```
npx tsc -w
```

2. Start the bot:

```
node index.js
```

### Contributing

Im open to ideas and contributions! Feel free to submit pull requests (PRs).

> **Note:** Please commit both TypeScript and generated JavaScript files. Currently, the bot's hosting environment does not support TypeScript compilation, so JavaScript files are required in the repository. (This may change if we switch to a host with TypeScript support.)

**<h3 align="left">Support My work</h3>**

<p align="left"><a href="https://buymeacoffee.com/kindcoder" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-fde047?style=for-the-badge&logo=buy-me-a-coffee&logoColor=white" height="36" style="margin-right: 4px"></a></p>
