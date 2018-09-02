const { getAudioInfo } = require('./../functions/getAudioInfo');

exports.LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: async function(handlerInput){
    //var msg = "いいねしたことがない曲なら、１。いいねしたことある曲なら、２。と答えてください。";
    //return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();


    // songTypeとuser_idを取得
    const songType = 1;
    const userId = handlerInput.requestEnvelope.session.user.userId;

    // songtypeとuseridを乗せて/api/v1/cek/get_audioにpost
    const audioInfo = await getAudioInfo(songType, userId);

    // 取得した歌がなかった時
    if(audioInfo.song === null){
      return handlerInput.responseBuilder
        .speak("申し訳ございません。ただいま聞くことのできる歌がありません。")
        .getResponse();
    }

    // attributes保存
    const attributes = {
      audioInfo: audioInfo,
      songType: songType,
    }
    handlerInput.sessionAttributeManager.setSessionAttributes(attributes);

    const audioURL = audioInfo.song.sound.url;

    if(audioInfo.isFirst === true){
      var firstMsg = `今からランダムで20秒ほどの曲を流します。その曲がいいと思ったら曲の終了後にいいねと言ってください。いいねされた曲とシンガーさんをボイシンガーのLINE公式アカウントにて紹介します。`;
    }else{
      var firstMsg = `曲を流します。`;
    }
    var lastMsg = `次の曲に進みますか？いいねしますか？`;

    return handlerInput.responseBuilder
      .speak(firstMsg)
      .audioPlay(audioURL)
      .speak(lastMsg)
      .reprompt(lastMsg)
      .getResponse();

  }
}
