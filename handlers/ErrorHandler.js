var rp = require('request-promise');

exports.ErrorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: async function(handlerInput){
    const url = "https://notify-api.line.me/api/notify";
    const notifyKey = process.env["notifyKey"];
    var options = {
      method: 'POST',
      uri: url,
      form: {
        message: "ボイスシンガーでエラーが発生しました。\n" + JSON.stringify(handlerInput)
      },
      headers: {
        "Authorization": "Bearer " + notifyKey
      }
    };
    await rp(options);
    var msg = "申し訳ございません。ボイスシンガーがうまく動きませんでした。また時間を開けてから試してください";
    return handlerInput.responseBuilder.speak(msg).getResponse();
  }
}
