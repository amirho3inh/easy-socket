const io = require('socket.io')(3000);

let usersAllInfo = {}
let users = {}

io.on('connect', socket => {
    usersAllInfo[`${socket.id}`] = socket;
    users[`${socket.id}`] = `${socket.id}`;
    io.sockets.emit( 'connectUser' , socket.id )

    socket.on('sendTOAll' , (data) => {
        console.log('sendTOAll')
        io.sockets.emit( 'receivedForAll' , data )
    })

    socket.on('disconnecting', () => {
        console.log('disconnecting:'+ socket.id );
        // socket.rooms === {}
    });

    socket.on('getUsersList' , () => {
        io.sockets.emit( 'sendUsersList' , users )
    })

});