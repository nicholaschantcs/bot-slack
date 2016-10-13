# Start coding your bot: Recast.AI + Slack

This Starter-Kit will help you start coding a bot connected to Slack with [Recast.AI](https://recast.ai/).

## Requirements

* Create an account on [Recast.AI](https://recast.ai/)
* Create an account on [Slack](https://slack.com/)

## Get your Recast.AI bot token

* Log in to your [Recast.AI](https://recast.ai/) account
* Create your Bot
* Create intents and fill them with some expressions
* Build your conversation flow on bot builder in the 'Build' tab
* In the tab menu, click on the the little screw
* Here is the `request access token` you will need to configure your bot!

## Get your Slack bot Token

* Go to https://YOUR_ORGANISATION.slack.com/services/new/bot (replace it with the name of your team)
* Create a new bot and follow the procedure
* That's it, you can now get the code located in the API Token field!

## Launch the bot

#### Complete the config.js file

* Clone this Repository

```
git clone https://github.com/RecastAI/bot-slack.git
```

* Fill the config.js with your tokens

```javascript
const config =
{
	recast: {
		token: 'RECAST TOKEN',
		language: 'en',
	},
	slack: {
		token: 'SLACK TOKEN',
	},
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

## Go further

Here is the heart of your bot. The following function is called every time your bot receives a message.
'res' is full of precious information:

* use **res.memory('notion')** to access a notion you just got in the input like a email address, a datetime etc...
* use **res.action** to get the current action according to your bot builder flow
* in **action**, you can find a done boolean to know if this action is complete according to the requirements (ex: booking need to signin, signin needs a login)
* use **res.reply()** to get the reply you've set for this action
* use **res.replies** to get an array containing the reply set for the action && the following one if the next action is complete
* use **res.nextActions** to get an array of all the following actions

For more information, please read the [SDK NodeJS documentation](https://github.com/RecastAI/SDK-NodeJS)

```javascript
rtm.on(slackEvent.MESSAGE, (message) => {
  const user = rtm.dataStore.getUserById(message.user)
  const dm = rtm.dataStore.getDMByName(user.name).id

	// CALL TO RECAST.AI: message.user contains a unique ID of your conversation in Slack
  // The conversationToken is what lets Recast.AI identify your conversation.
  // As message.user is what identifies your Slack conversation, you can use it as conversationToken.

  recastClient.textConverse(message.text, { conversationToken: message.user })
  .then((res) => {
    const replies = res.replies
    const action = res.action

    if (!replies.length) {
      rtm.sendMessage('I didn\'t understand... Sorry :(', dm)
      return
    }

    if (action && action.done) {
      // Use external services: use res.memory('notion') if you got a notion from this action
    }

    replies.forEach(reply => rtm.sendMessage(reply, dm))
  })
  .catch(() => {
    rtm.sendMessage("I'm getting tired, let's talk later", dm)
  })
})
```

## Author

Hugo Cherchi - Recast.AI hugo.cherchi@recast.ai

You can follow us on Twitter at @recastai for updates and releases.

## License

Copyright (c) [2016] [Recast.AI](https://recast.ai/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
