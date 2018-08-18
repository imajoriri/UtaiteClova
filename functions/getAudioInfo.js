
exports.getAudioInfo = (songType, userId) => {
  return {
    song: {
      name: "あのね",
      name_pronunciation: "あのね",
      file_name: "0001.mp3",
      //file_url: "https://s3-ap-northeast-1.amazonaws.com/utaite-sounds/0001/0001.mp3",
      file_url: "https://s3-ap-northeast-1.amazonaws.com/utaite-sounds/0001/anone.mp3",
    },
    singer: {
      name: "SekiA!",
      name_pronunciation: "せきあ",
      image_url: "https://pbs.twimg.com/profile_images/1006004358889144320/efzENtwp_400x400.jpg",
      folder_name: "0001",
      gender: "2",
      twitter_url: "https://twitter.com/LiSA_SEKiA",
      twitter_name: "LiSA_SEKiA",
      youtube_url: "",
    }
  }
}
