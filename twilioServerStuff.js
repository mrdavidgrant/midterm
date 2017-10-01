

function messageSMS(order, knex){ 
  const accountSid = 'ACef0ec881dd1e44aebea6f229a45bc45b'; // Your Account SID from www.twilio.com/console
  const authToken = 'b6fb5011aa8a061f90e157c8d6c32467';   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);
  let orderString = '';
  for (let item of order.items){
    orderString += `${item.quantity} x ${item.name} \n`;
  }
  knex('users')
  .returning('id')
  .where('email',`${order.user.email}`)
  .then((currentUserID) => {
    knex('orders')
    .returning('time_ready')
    .where('user_id', `${currentUserID[0].id}`)
    .then((currentOrderTimeReady) => {
      client.messages.create({
          //need to select current email from users and then reference the order associated with that user
          //and then the time_ready associated with that order

          body: `Your name is: ${order.user.first_name} ${order.user.last_name} with email ${order.user.email} and phone +1${order.user.phone}\nYour order is ${orderString} Totaling $${order.total}
          and your order will be ready at ${currentOrderTimeReady[0].time_ready}`,
          to: `+1${order.user.phone}`,  // Text this number
          from: '+14373715931' // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
    }) 
  })
    
}

function messageCall(person, knex){
  const accountSid = 'ACef0ec881dd1e44aebea6f229a45bc45b'; // Your Account SID from www.twilio.com/console
  const authToken = 'b6fb5011aa8a061f90e157c8d6c32467';   // Your Auth Token from www.twilio.com/console

  const twilio      = require('twilio');
  const client      = new twilio(accountSid, authToken);
  client.calls.create({
      url: "https://demo.twilio.com/docs/voice.xml",
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