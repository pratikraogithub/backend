const dotenv = require('dotenv')

const express = require(`express`)
const app = express()
const mongoose = require('mongoose')

dotenv.config({ path: './config.env' })

// const DB = "mongodb+srv://patrics:patrics123@cluster0.m7li0po.mongodb.net/rowdy?retryWrites=true&w=majority"
const DB = process.env.DATABASE


mongoose.connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false
}).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('no connection', err))

const middleware = (req, res, next) => {
    console.log(`this is middleware`)
    next()

}



app.get('/', (req, res) => {
    res.send('hellow here i am...')
})

app.get('/about', middleware, (req, res) => {
    console.log(`this is my about`)

    res.send('hellow here is about page')

})

app.get('/contact', (req, res) => {
    res.send('hellow here is contact')
})

app.get('/signin', (req, res) => {
    res.send('hellow here is login ')
})

app.get('/signup', (req, res) => {
    res.send('hellow here is registration ')
})



app.listen(3000, () => {
    console.log("server is listening...");
})
