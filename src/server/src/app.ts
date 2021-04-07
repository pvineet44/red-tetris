import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import routes from "./routes"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(routes)

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