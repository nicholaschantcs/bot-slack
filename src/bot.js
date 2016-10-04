// MODULES IMPORT
const recast = require('recastai')
const config = require('../config.js')
const http = require('http')
const slack = require('@slack/client')

// RECAST.AI INIT
const recastClient = new recast.Client(config.recast.token, config.recast.language)

// SLACK CLIENT INIT
const SlackClient = slack.RtmClient
const slackEvent = slack.RTM_EVENTS
const rtm = new SlackClient(config.slack.token, { logLevel: 'false' })
rtm.start()

// EVENT : MESSAGE RECEIVED ON SLACK
rtm.on(slackEvent.MESSAGE, (message) => {
  const user = rtm.dataStore.getUserById(message.user)
  const dm = rtm.dataStore.getDMByName(user.name).id
  recastClient.converse(message.text, config.recast.language, message.user)
  .then((res) => {
    const action = res.action()
    const replies = res.replies()

		console.log(`The action of this message is: ${action.slug}`)

		if (replies[0]) {
			console.log('current action has a reply')
			rtm.sendMessage(replies[0], dm)
		}

    if (action.done && replies[1]) {
      console.log('Action is done && next action has a reply')
			rtm.sendMessage(replies[1], dm)
    }
  })
  .catch(() => {
    rtm.sendMessage("I'm getting tired, let's talk later", dm)
  })
})

// SERVER INIT
http.createServer().listen(8080)
