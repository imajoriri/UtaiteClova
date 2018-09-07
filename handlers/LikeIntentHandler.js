var { postLikeSongToServer } = require('./../functions/postLikeSongToServer.js');
var { postLikeSongToBot } = require('./../functions/postLikeSongToBot.js');
const { soundEffects } = require('./../functions/soundEffects');

exports.LikeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LikeIntent');
  },
  handle: async function(handlerInput){
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

    const userId = handlerInput.requestEnvelope.session.user.userId;

    // serverにいいねされたことを通知
    //await postLikeSongToServer(audioInfo.song, userId);
    postLikeSongToServer(audioInfo.song, userId);

    // botにいいねした歌い手と歌の情報を通知
    await postLikeSongToBot(audioInfo.song, audioInfo.singer, userId);
    //postLikeSongToBot(audioInfo.song, audioInfo.singer, userId);

    // ユーザーに次の曲を聞くかどうかを聞く
    var msg = "いいねしました。歌の詳細はLINEに送りました。次の曲を聞きますか？";
    var reprompt = '次の曲を聞きますか？';
    return handlerInput.responseBuilder
      .audioPlay(soundEffects.liked)
      .speak(msg)
      .reprompt(reprompt)
      .getResponse();
  }
}


