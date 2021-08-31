import Server from "http";
import Socket from "socket.io";
import connections from "./connections";

const server = Server.createServer();
const io = Socket(server, {
    cors: {
      allowedHeaders: ["Authorization"]
    }
});
let id = 0;
// io.engine.generateId = (req) => {
//     const { authorization } = req.headers;
//     id++;
//     return id; // must be unique across all Socket.IO servers
// }
const party = io.of("/party")
party.on("connection", connections(io))


export default server;