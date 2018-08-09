const { NextIntentHandler } = require('./NextIntentHandler.js');

exports.YesIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('Clova.YesIntent');
  },
  handle: NextIntentHandler.handle
  //handle: function(handlerInput){
  //  var msg = "";
  //  return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  //}
}
