// MODULES IMPORT
var tokens = require('./config.js')
var recast = require('recastai')
const rtmClient = require('@slack/client').RtmClient
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS
const RTM_EVENTS = require('@slack/client').RTM_EVENTS

// SLACK CLIENT INIT
var token = process.env.SLACK_API_TOKEN || tokens.slack
var rtm = new rtmClient(token, { logLevel: 'false' })
rtm.start()

var myRawID
var myId

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, () => {
  const mySelf = rtm.dataStore.getUserByName(tokens.botName)
  myId = `<@${mySelf.id}>`
  myRawId = mySelf.id
})

// RECAST.AI INIT
var recastClient = new recast.Client(tokens.recast)

// CHECK IF USER ARE TALKING TO ME
function isForMe (message) {
  if (message.message && message.message.user === myRawId
      || message.user === myRawId) {
    return false
  }
  return ((message.type === 'message' && message.text && message.text.indexOf(myId) !== -1 || message.channel.charAt(0) === 'D')
          && message.username !== 'slackbot')
}

// EVENT : MESSAGE RECEIVED ON SLACK
rtm.on(RTM_EVENTS.MESSAGE, function (message) {

  if (!isForMe(message)) { return; }

  recastClient.textRequest(message.text, function(res, err) {
    if (err) { rtm.sendMessage("I'm getting tired, let's talk later", message.channel) }
    else {
      var intent = res.intent()
      if (intent) {
        rtm.sendMessage('Hi everyone', message.channel)
      } else {
        rtm.sendMessage('Hmmm - don\'t understand', message.channel)
      }
    }
  })

})
