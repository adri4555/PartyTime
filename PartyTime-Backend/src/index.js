require('dotenv').config();

//Imports
import socket from "./socket";
import app from "./app";

//Init dataBase
import "./initDatabase";


app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});

socket.listen(process.env.SOCKET_PORT, ()=> {
    console.log(`Server socket on port ${process.env.SOCKET_PORT}`);
});