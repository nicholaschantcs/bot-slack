# Start coding your bot with Slack

This Starter Kit will help you start coding a bot connected to Slack.

## Requirements

* Create an account on Recast.AI
* Create an account on Slack
* Set up your Recast.AI account

## Get your Recast Bot Token

* Log in to your Recast.AI account
* Create your Bot
* Create intents and fill them with some expressions
* Build your tree on BotBuilder in the 'Build' tab
* In the tab menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Get your Slack bot Token

* Go to https://YOUR_ORGANISATION.slack.com/services/new/bot (replace it with the name of your team)
* Create a new bot and follow the procedure
* That's it, you can now get the code located in the API Token field!

## Launch the Bot

#### Complete the config.js

* Clone this Repository

```
git clone A CHANGER
```

* Fill the config.js with your Tokens

```
const config =
{
	recast: {
		token: 'RECAST TOKEN',
		language: 'en',
	},
	slack: {
		token: 'SLACK TOKEN',
	}
	port: 8080,
}
```

#### Run

* install the dependencies

```
npm install
```

* run your bot

```
npm run start
```
