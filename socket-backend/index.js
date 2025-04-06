const express = require('express')
const bodyParser = require('body-parser')
const {Server} = require('socket.io')

const io = new Server({
    cors: true,
});
const app = express()

app.use(bodyParser.json())

const emailToSocketMapping = new Map()
const socketToEmailMapping = new Map()

io.on('connection', (socket)=>{
    console.log('New Connection')
    
    socket.on('join-room', (data)=>{
        const {roomId, emailId} = data
        console.log("User", emailId, "Joined Room", roomId)
        emailToSocketMapping.set(emailId, socket.id)
        socketToEmailMapping.set(socket.id, emailId)
        socket.join(roomId)
        socket.emit('joined-room', {roomId})
        socket.broadcast.to(roomId).emit('user-joined', {emailId})
    })
    
    socket.on('call-user', (data)=>{
        const {emailId, offer} = data
        const fromEmail = socketToEmailMapping.get(socket.id)
        const socketId = emailToSocketMapping.get(emailId)
        socket.to(socketId).emit('incomming-call', {from: fromEmail, offer })
    })
    
    socket.on('call-accepted', (data)=>{
        const {emailId, ans} = data
        const socketId = emailToSocketMapping.get(emailId)
        socket.to(socketId).emit('call-accepted', {ans})
    })
    
    // Add the ICE candidate handler
    socket.on('ice-candidate', (data)=>{
        const {to, candidate} = data
        const fromEmail = socketToEmailMapping.get(socket.id)
        const socketId = emailToSocketMapping.get(to)
        
        if (socketId) {
            console.log(`Forwarding ICE candidate from ${fromEmail} to ${to}`)
            socket.to(socketId).emit('ice-candidate', {
                from: fromEmail,
                candidate
            })
        } else {
            console.log(`Could not find socket for user ${to}`)
        }
    })
    
    // Handle disconnection
    socket.on('disconnect', () => {
        const emailId = socketToEmailMapping.get(socket.id)
        if (emailId) {
            console.log(`User ${emailId} disconnected`)
            socketToEmailMapping.delete(socket.id)
            emailToSocketMapping.delete(emailId)
            
            // You could also notify other users in the room that this user has left
            // If you track which room each user is in, you could do:
            // socket.broadcast.to(userRoomMap.get(emailId)).emit('user-left', {emailId})
        }
    })
})

app.listen(8000, ()=> console.log("Http server running at PORT 8000"))
io.listen(8001)