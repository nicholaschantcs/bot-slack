# Slackbot

This repo is a simple architecture to start a slackbot project using Recast.AI.

## Requirements

* Create an account on [Recast.AI](https://recast.ai/signup)
* Create an account on [Slack](https://slack.com/)

## Get your Slack Bot Token

* Log in to Slack and Create a team.
* Go to : https://yourteam.slack.com/services/new/bot (change "yourteam" with the actual name of your team)
* Follow the bot creation process, you will then be able to see your token

## Get your Recast Bot Token

* Log in to your recast account
* Then on your profile, choose your Bot
* In the settings tab, is your precious request Token

## Launch your bot

* Clone this Repository

```
git clone git@github.com:RecastAI/bot-slack.git
```

* Fill the config.js with your Tokens

```
var tokens =
{
  slack: YOUR_SLACK_TOKEN,
  botName: YOU_BOT_NAME,
  recast: YOUR_RECAST_TOKEN
}
```

#### Run

* install the dependencies

```
npm install
```

* run your bot

```
npm start
```
