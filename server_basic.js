var http = require('http');
var url = require('url');
var request = require('request');

// 서버를 생성한다
var server = http.createServer(function(req,res){

	var req_path = url.parse(req.url).pathname;
	console.log('req url:'+req_path);

	if(req_path == '/send_notification'){
		
		var serverUrl = 'https://fcm.googleapis.com/fcm/send';

		var serverKey = 'AAAA2CTRhuw:APA91bHAhYZPvNfs_-HMIj7CnhJRQD3l2iK1NSPzRqrSS95yBiHF54t5TnHlx8VMW-k8pP9Ao5YlGEXtOFZA5bHfRYnkYO7r77OqNbLwAV_-gNC8JCRIqH9p6YSH1ILDzgYmFAzFTahq0wGvbt3mj2rZoUJOrpMx8g';
		var toDevice = 'c2oSGgnYIs8:APA91bHAUbWZU5H5Tk9aFYHKJyimxcMuCQH5rjukx_58qoI4rYT-sXuU__QiCthRwBcKV5LIG4JHLnCbMM4wSO4cqAZaCk5CMJ-WATVWdlWn6GgOsNPuTRpokn7DMfaN6on3_fV2ykWb'; // 대상 핸드폰의 token
		var noti_title = '노티 제목';
		var msg = '노티 내용입니다.';

		var jsonData = { to : toDevice ,
							notification : {
								title : noti_title,
								body : msg
							}
						};

		request({
				url : serverUrl,
				method : 'POST',
				headers : {
					'Authorization':'key='+serverKey,
					'Content-Type':'application/json'
				},
				body:JSON.stringify(jsonData)
			},function(error, response, body){
				if(error){
					console.log(error);
					console.log("statusCode:"+response.statusCode);
					console.log("statusText:"+response.statusText);
				}else{
					console.log(body);
				}
			}
		);
		//FCM 노티 호출
	}

	res.end("DONE. "+req_path);
});

// 서버의 리스너를 등록한다
server.listen(8080, function(){
	console.log('Server is running...!');
});