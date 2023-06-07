const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))


//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})


mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://Vincent:Physics1994RF@cluster0.9g5v63g.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(5000, ()=> {
        console.log(`Node API app is running on port 5000`)
    });
}).catch((error) => {
    console.log(error)
})