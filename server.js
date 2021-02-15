const app = require('express')();
const http = require('http').createServer(app);
const PORT = 5000;
const io = require('socket.io')(http);

http.listen(PORT, () => {
	console.log(`listening on *:${PORT}`);
});

io.on('connection', (socket) => {
	/* socket object may be used to send specific messages to the new connected client */
	const { id } = socket.client;

	socket.on('chat message', (props) => {
		io.emit('chat message', {
			id: id,
			nickname: props.nickname,
			message: props.message,
		});
	});
});
