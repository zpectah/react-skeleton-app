const app = require('express')();
const http = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(http);

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
	const { id } = socket.client;

	// socket.on('chat message', (props) => {
	// 	io.emit('chat message', {
	// 		id: id,
	// 		nickname: props.nickname,
	// 		message: props.message,
	// 	});
	// });
	//
	// socket.on('user register', (props) => {
	// 	io.emit('user register', {
	// 		id: id,
	// 		nickname: props.nickname,
	// 	});
	// });

	// console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('register user', (attr) => {
		console.log('register user', attr);
		// socket.join(attr);
		console.log('socket', socket);
	});

	socket.on('room', function (data) {
		console.log('room', data);
		socket.join(data.room);
	});

	socket.on('leave room', (data) => {
		console.log('leave room', data);
		socket.leave(data.room);
	});

	socket.on('coding event', (data) => {
		console.log('coding event', data);
		socket.broadcast.to(data.room).emit('receive code', data);
	});

	//
	//
});
