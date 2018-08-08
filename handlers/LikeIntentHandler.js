
exports.LikeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LikeIntent');
  },
  handle: function(handlerInput){
    var msg = "";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
