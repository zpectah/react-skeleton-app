const app = require('express')();
const http = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(http);

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
	const { id } = socket.client;

	// https://socket.io/docs/v3/emit-cheatsheet/index.html
	// console.log('a user connected');

	socket.on('disconnect', () => socket.disconnect());

	socket.on('register user', (attr) =>
		io.emit('user register', { ...attr, id: id }),
	);

	socket.on('enter room', (data) => socket.join(data.room));

	socket.on('leave room', (data) => {
		socket.leave(data.room);
		if (data.nickname) io.emit('user left', data.nickname);
	});

	socket.on('chat message', (props) => io.emit('chat message', props));
});
