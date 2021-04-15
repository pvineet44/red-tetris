import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"

const app: Express = express()

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
      origin: '*',
    }
  });

const PORT: string | number = process.env.PORT || 5000

app.use(cors())
// app.use(routes)
if(process.env.NODE_ENV=="production"){
        app.use(express.static('../client/build'))
        const path = require('path')
        app.get("*",(req,res)=>{
            res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
        })
    }
    
        // console.log(`Server running on http://localhost:${PORT}`)

const uri = 'mongodb+srv://admin:admin@cluster0.s5t7m.mongodb.net/red-tetris'
const options = { useNewUrlParser: true, useUnifiedTopology: true }



mongoose.set("useFindAndModify", false)

mongoose
.connect(uri, options)
.then(() => 
    http.listen(PORT, () => 
    {
        console.log(`Server running on http://localhost:${PORT}`, __dirname)
        io.on('connection', (socket: any) => { /* socket object may be used to send specific messages to the new connected client */
            console.log('new client connected aaa', socket.id);
            // socket.emit('connection', null);
            socket.on('stage', (stage: any) => {
                // console.log("------------------------------------------------------------------------STAGE is ", stage)
                socket.broadcast.emit('OpponentStage', stage);

            })
        })
    }
    )
).catch((error) => {
    throw error
})