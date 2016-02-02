var http = require('http').createServer();
var io   = require('socket.io')(http);
var port = process.env.PORT || 3000 ;
http.listen(port,function(){
	console.log('server is running')
});

io.on('connection',function(socket){
	console.log('new user connected');
	socket.on('broadcast',function(data){
		if(data.group && data.message){
			socket.broadcast.to(data.group).emit(data.message);
		}else{
			socket.emit('error',{message:'group and message are required'});
		}
	});
	socket.on('join',function(data){
		if(data.group){
			socket.join(data.group);
		}else{
			socket.emit('error',{message:'group is required'});
		}
	})
})