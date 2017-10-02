require('dotenv').config()
const VoiceResponse = require('twilio').twiml.VoiceResponse;

function messageSMS(minutes){ 
  const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);

  client.messages.create({

      body: `Thank you for ordering from The Eating Place.  Your order will be ready for pickup in ${minutes} minutes.`,
      to: `+16474568825`,  // Text this number
      from: '+14373715931' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));  
}

function messageCall(submission){
  const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console
  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);
  
  client.calls.create({
      url: `https://the-eating-place.herokuapp.com/order/${submission.id}/voice`,
      to: "+19055415002",
      from: "+14373715931"
  }, function(err, call) {
      process.stdout.write(call.sid);
  });
}
module.exports = {
  messageSMS: messageSMS,
  messageCall: messageCall,
  messageContent: messageContent
}

function messageContent (results) {
  let body = `This is a call from the online ordering system.  A new order has been placed for `
  for (let item in results) {
     body += `quantity ${results[item].quantity} of ${results[item].name}, `
  }
  const twiml = new VoiceResponse()
  const gather = twiml.gather({
    numDigits: 2,
    action:`/order/${req.params.id}`,
    finishOnKey: '#',
    voice: 'alice'
  })
  gather.say(body, {voice: 'alice'})
  gather.say('Please enter how many minutes till this order will be ready',{voice: 'alice'})
  say('Thank you, the customer will be notified')
  twiml.hangup()
  res.type('text/xml');
  res.send(twiml.toString());
}

function say(text) {
  twiml.say({ voice: 'alice'}, text);
}