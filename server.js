const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
	const { id } = socket.client;
	console.log(`User connected: ${id}`);
	socket.on('chat message', (msg) => {
		io.emit('chat message', {
			id: id,
			nickname: msg.nickname,
			message: msg.message,
		});
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listen on *: ${PORT}`));
