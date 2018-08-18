
exports.LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: function(handlerInput){
    var msg = "いいねしたことがない曲なら、１。いいねしたことある曲なら、２。と答えてください。";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}
