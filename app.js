const express = require('express')
const router = express.Router();
const app = express()

const NoteDocument = require('./notedoc');

const port = process.env.PORT || 5042

//app.use('/static', express.static('public'))
app.use(express.static('public'))
// https://medium.com/@mmajdanski/express-body-parser-and-why-may-not-need-it-335803cd048c
app.use(express.json())
// app.use(urlencoded())


app.get('/notedocui/ping', (req, res) => {
    res.type('text/plain')
    res.send('pong')
})

//app.get('/notedocui/outline/summary', (req, res) => {
app.get('/notedocui/outline/summary', async (req, res) => {
    const entityName = req.query.name
    const entityType = req.query.type
    const entityAspect = req.query.aspect

    const noteDoc = new NoteDocument()
    const summary = await noteDoc.getOutlineSummary(entityName, entityType, entityAspect)
    res.type('text/html')
    res.send(summary)
})


app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
  