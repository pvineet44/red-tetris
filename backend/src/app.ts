import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"

const app: Express = express()
const path = require('path')

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(express.static(path.join(__dirname, '../../build')))
app.use('/api',routes)
app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../build'))
    })
    
// console.log(`Server running on http://localhost:${PORT}`)

const uri: string = 'mongodb+srv://admin:admin@cluster0.s5t7m.mongodb.net/red-tetris'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
.connect(uri, options)
.then(() => 
    app.listen(PORT, () => 
        console.log(`Server running on http://localhost:${PORT}`)
    )
).catch((error) => {
    throw error
})