
exports.LikeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LikeIntent');
  },
  handle: function(handlerInput){
    // TODO songTypeが1以外の時（いいねされたやつのとき）でももう一度いいねをしてbotに通知を送る
    
    // attributesからaudioInfoを取得
    // serverにいいねされたことを通知
    // --serverへのrequest json---
    // {song: [obj], singer: [obj]}
    // botにいいねした、歌と歌い手さんの情報を通知
    // ユーザーに次に行くかどうかを聞く

    var attributes = handlerInput.sessionAttributeManager.getSessionAttributes();

    // attributesからaudioInfoを取得
    var audioInfo = attributes.audioInfo;
    
    // serverにいいねされたことを通知
    postLikeSongToServer(audioInfo.song, audioInfo.singer);

    // botにいいねした歌い手と歌の情報を通知
    postLikeSongToBot(audioInfo.song, audioInfo.singer);

    // ユーザーに次の曲を聞くかどうかを聞く
    var msg = "いいねしました。歌の詳細はLINEに送りました。次の曲を聞きますか？";
    var reprompt = '次の曲を聞きますか？';
    return handlerInput.responseBuilder
      .speak(msg)
      .reprompt(reprompt)
      .getResponse();
  }
}

function postLikeSongToServer(song, singer){
  console.log('post for server');
  return this;
}

function postLikeSongToBot(song, singer){
  console.log('post for bot');
  return this;
}
