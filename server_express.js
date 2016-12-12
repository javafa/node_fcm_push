var express = require('express');
var fcm_push = require('fcm-push');
var body_parser = require('body-parser');

var app = express();
var serverKey = 'AAAA2CTRhuw:APA91bHAhYZPvNfs_-HMIj7CnhJRQD3l2iK1NSPzRqrSS95yBiHF54t5TnHlx8VMW-k8pP9Ao5YlGEXtOFZA5bHfRYnkYO7r77OqNbLwAV_-gNC8JCRIqH9p6YSH1ILDzgYmFAzFTahq0wGvbt3mj2rZoUJOrpMx8g';
var fcm = new fcm_push(serverKey);

app.use(body_parser.urlencoded({
	extended:true
}));

app.post('/send_notification', function(req, res){
	//res.send('body:'+req.body);
	var token      = req.body.noti_token;
	var noti_title = req.body.noti_title;
	var msg        = req.body.noti_msg;

	console.log('token:'+token);
	console.log('noti_title:'+noti_title);
	console.log('msg:'+msg);

	var jsonData = { to : token ,
						notification : {
							title : noti_title,
							body : msg
						}
					};

	fcm.send(jsonData, function(err,response){
		if(err){
			res.send('fail:'+err);
		}else{
			res.send('success:'+response);	
		}
	});
});

app.listen(8080, function(){
	console.log('fcm-push server is running');
});
