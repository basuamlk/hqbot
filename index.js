const unirest = require('unirest');
const settings = require('./settings.json');
const WebSocket = require('ws');
const api = 'https://api-quiz.hype.space/shows/now?type=hq&userId=1526525';
unirest.get(api)
	.header("Authorization","Bearer "+settings.hqbot_key)
	.header("Accept", "application/json")
  .header('X-HQ-Client','Android/1.10.2')
  .header('X-HQ-Country','US')
  .header('X-HQ-Lang','en')
  .header('X-HQ-Stk','MQ==')
  .header('Accept-Encoding', 'gzip')
  .header('User-Agent','okhttp/3.8.0')
  .end(function (result) {
    var get = result.body;
    console.log(get);
    reconnect();

    function reconnect(){
  if(get.broadcast != null){
    var ws = new WebSocket(get.broadcast.socketUrl, protocol);
  
  var protocol = {
    headers: {
        "Authorization" : "Bearer " + settings.hqbot_key,
        "x-hq-client": "Android/1.10.2",
        "x-hq-country": "US",
        "x-hq-lang": "en",
        "x-hq-stk": "MQ==",
        "accept-encoding": "gzip",
        "user-agent": "okhttp/3.8.0"
    }
  };
  
  

  // ws.onopen = function(){
    
  // };

  ws.onmessage = function(msg){
    var response = msg.data;
    //console.log("\n----------------------------\n");
    console.log(response);
  };

    ws.onclose = function (){
    
    console.log("\nSocket has closed. Attempt to reconnect in 1 second.");
    setTimeout(function(){
      reconnect();
    }, 1000);
  }
}else{
  console.log("\n**HQ is currently not streaming!**");
}


}
});