const express = require('express')
const router = express.Router();
const app = express()


const port = process.env.PORT || 5042

//app.use('/static', express.static('public'))
app.use(express.static('public'))
// https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.json())
// app.use(urlencoded())


app.get('/notedocsvc/ping', (req, res) => {
    res.type('text/plain')
    res.send('pong')
})


app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
  