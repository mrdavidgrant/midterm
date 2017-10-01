require('dotenv').config()

function messageSMS(person){ 
  const accountSid = process.env.TWILIO_SID; // Your Account SID from www.twilio.com/console
  const authToken = process.env.TWILIO_AUTH_TOKEN;   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);

  client.messages.create({

      body: `Your name is: ${person.firstName} ${person.lastName} with email ${person.email}`,
      to: `+1${person.phone}`,  // Text this number
      from: '+14373715931' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));  
}

function messageCall(person){
  const accountSid = 'ACef0ec881dd1e44aebea6f229a45bc45b'; // Your Account SID from www.twilio.com/console
  const authToken = 'b6fb5011aa8a061f90e157c8d6c32467';   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);
  client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: "+16474568825",
      from: "+14373715931"
  }, function(err, call) {
      process.stdout.write(call.sid);
  });
}
module.exports = {
  messageSMS: messageSMS,
  messageCall: messageCall
}