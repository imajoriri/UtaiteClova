exports.AgainIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('AgainIntent');
  },
  handle: async function(handlerInput, context){

    var attributes = handlerInput.sessionAttributeManager.getSessionAttributes();

    // attributesからaudioInfoを取得
    var audioInfo = attributes.audioInfo;
    const audioURL = audioInfo.song.sound.url;

    const userId = handlerInput.requestEnvelope.session.user.userId;

    // ユーザーに次の曲を聞くかどうかを聞く
    return handlerInput.responseBuilder
      .speak("もう一度流しますね。")
      .audioPlay(audioURL)
      .speak("次の曲にいきますか？それともこの歌にいいねを送りますか？")
      .reprompt("いいねしますか？いいねする場合は、いいねと言ってください。")
      .getResponse();
  }
}


