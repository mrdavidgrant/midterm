const accountSid = 'ACef0ec881dd1e44aebea6f229a45bc45b'; // Your Account SID from www.twilio.com/console
const authToken = 'b6fb5011aa8a061f90e157c8d6c32467';   // Your Auth Token from www.twilio.com/console

const twilio      = require('twilio');
const client      = new twilio(accountSid, authToken);

function messageSMS(){ 
  client.messages.create({
      body: '',
      to: '+16474568825',  // Text this number
      from: '+14373715931' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));  
}

function messageCall(){
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