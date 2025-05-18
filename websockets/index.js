const express = require('express') ; 
const path = require('path') ; 
const app = express() ;

const PORT = 9000 ; 

const {Server} = require("socket.io") ;

const http = require('http') ; 

const server = http.createServer(app) ;

const io = new Server(server) ; 


app.use(express.static(path.resolve("./public"))) ;


io.on('connection' , (socket)=>{
    console.log('A new user has created with socket_id : ' , socket.id )
    socket.on("user-message" , (msg)=>{
        io.emit("message" , msg) ; 
    })
})

app.get('/', (req, res) => {
    return res.sendFile("/public/index.html") ; 
 });


server.listen(PORT , ()=>{
    console.log(`visit http://localhost:${PORT}`)
})