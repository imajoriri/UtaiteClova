
exports.ErrorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: function(handlerInput){
    var msg = "申し訳ございません。ボイスシンガーがうまく動きませんでした。また時間を開けてから試してください";
    return handlerInput.responseBuilder.speak(msg).getResponse();
  }
}
