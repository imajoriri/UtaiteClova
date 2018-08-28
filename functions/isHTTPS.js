exports.isHTTPS = (url) => {
  if(url.indexOf('https') != -1){
    return url;
  }else{
    return "https://hogehoge"
  }
}
