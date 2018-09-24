
exports.NoIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('Clova.NoIntent');
  },
  handle: function(handlerInput){
    var msg = "ありがとうございました。また新しい曲を追加してお待ちしていますね。";
    return handlerInput.responseBuilder.speak(msg).getResponse();
  }
}
