const { getAudioInfo } = require('./../functions/getAudioInfo');

exports.NextIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('NextIntent');
  },
  handle: async function(handlerInput, context){
    // attributesからsongtypeを取得
    // userIdを取得
    // songTypeとuserIdを乗せてgetAudioInfoでaudio情報を取得
    // attributesを保存し直す
    // msgを組み立てる

    var attributes = handlerInput.sessionAttributeManager.getSessionAttributes();
    const songType = attributes.songType;
    const userId = handlerInput.requestEnvelope.session.user.userId;

    const alias = context.invokedFunctionArn.split(':').pop();
    const serverIP = process.env["serverIP" + "_" + alias];

    // songtypeとuseridを乗せて/api/v1/cek/get_audioにpost
    const audioInfo = await getAudioInfo(songType, userId, serverIP);

    // 取得した歌がなかった時
    if(audioInfo.song === null){
      return handlerInput.responseBuilder
        .speak("申し訳ございません。ただいま聞くことのできる歌がありません。")
        .getResponse();
    }

    // attributes保存
    const newAttributes = {
      audioInfo: audioInfo,
      songType: songType,
    }
    handlerInput.sessionAttributeManager.setSessionAttributes(newAttributes);

    // TODO songがnullのとき
    //const audioURL = audioInfo.song.file_url;
    const audioURL = audioInfo.song.sound.url;

    if(songType === 1){
      var lastMsg = `次の曲に進みますか？いいねを送りますか？`;
    }else{
      var lastMsg = `次の曲を聴きますか？`;
    }

    return handlerInput.responseBuilder
      .audioPlay(audioURL)
      .speak(lastMsg)
      .reprompt(lastMsg)
      .getResponse();
  }
}

