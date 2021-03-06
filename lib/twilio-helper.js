require('dotenv').config()
const VoiceResponse = require('twilio').twiml.VoiceResponse;

function messageSMS(minutes){ 
  const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);

  client.messages.create({

      body: `Thank you for ordering from The Eating Place.  Your order will be ready for pickup in ${minutes} minutes.`,
      to: `+1`,  // Text this number
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
      to: "+1",
      from: "+14373715931"
  }, function(err, call) {
      process.stdout.write(call.sid);
  });
}
module.exports = {
  messageSMS: messageSMS,
  messageCall: messageCall
}
