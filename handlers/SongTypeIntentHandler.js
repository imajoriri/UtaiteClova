const { getAudioInfo } = require('./../functions/getAudioInfo');

exports.SongTypeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('SongTypeIntent');
  },
  handle: function(handlerInput){
    // SongTypeSlotsを取得 >> 1: いいねされていない, 2: いいねされている
    // userIdを取得
    // songtypeとuseridを乗せて/api/v1/cek/get_audioにpost
    // 帰ってきた情報 >> song: [obj], singer: [obj]}
    // attributesには帰ってきた情報をそのまま入れる
    // ---attributes---
    // {song: [obj](帰ってきた情報そのまま), singer: [obj](帰ってきた情報そのまま）, songtype: int}
    // song.urlからaudioのURLを取得し、Clovaのmsgを構成する。
    
    // songTypeとuser_idを取得
    const slots = handlerInput.requestEnvelope.getSlot();
    const songType = Number(slots.SongType);
    const userId = handlerInput.requestEnvelope.session.user.userId;
    
    // songtypeとuseridを乗せて/api/v1/cek/get_audioにpost
    const audioInfo = getAudioInfo(songType, userId);

    // attributes保存
    const attributes = {
      audioInfo: audioInfo,
      songType: songType,
    }
    handlerInput.sessionAttributeManager.setSessionAttributes(attributes);

    // audioのurl
    // TODO song.file_urlを見るのではなくて、song.file_nameとドメインなどを組みあわせたものにするか
    const audioURL = audioInfo.song.file_url;

    if(songType === 1){
      var firstMsg = `いいねしたことない曲を流します。`;
      var lastMsg = `次の曲に進みますか？いいねしますか？`;
    }else{
      var firstMsg = `いいねされている曲を流します。`;
      var lastMsg = `次の曲を聴きますか？`;
    }

    return handlerInput.responseBuilder
      .speak(firstMsg)
      .audioPlay(audioURL)
      .speak(lastMsg)
      .reprompt(lastMsg)
      .getResponse();
  }
}
