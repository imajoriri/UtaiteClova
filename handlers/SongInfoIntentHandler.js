exports.SongInfoIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('SongInfoIntent');
  },
  handle: async function(handlerInput, context){

    var attributes = handlerInput.sessionAttributeManager.getSessionAttributes();

    // attributesからaudioInfoを取得
    var audioInfo = attributes.audioInfo;
    const audioNamePronunciation = audioInfo.song.name_pronunciation;

    // ユーザーに次の曲を聞くかどうかを聞く
    return handlerInput.responseBuilder
      .speak(`ただいまの曲名は${audioNamePronunciation}です。より詳細を知りたい場合は、この曲に、いいね、を送りましょう。いいねを送る場合は、いいね、と言ってください。`)
      .reprompt("いいねしますか？いいねする場合は、いいねと言ってください。")
      .getResponse();
  }
}


