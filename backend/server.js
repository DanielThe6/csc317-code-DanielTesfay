const app = require("./app");
const server = require("http").createServer(app);


const port = process.env.PORT || 6005;
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let socketApi = {};
socketApi.io = io;
io.on("connection", (socket) => {
  // console.log("what is socket", socket);
});

server.listen(6005, () => {
  console.log(`server is listennig on ${6005} port`);
});

module.exports.socketApi = socketApi;
