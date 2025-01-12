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

app.get('/notedocui/getentities', async (req, res) => {
    const noteDoc = new NoteDocument()
    const entitiesJson = await noteDoc.getEntities()
    res.type('application/json')
    res.send(entitiesJson)
})

app.get('/notedocui/getdomains', async (req, res) => {
    const noteDoc = new NoteDocument()
    const domainsJson = await noteDoc.getDomains()
    res.type('application/json')
    res.send(domainsJson)
})

app.get('/notedocui/outline/summary', async (req, res) => {
    const entityName = req.query.name
    const entityType = req.query.type
    const entityAspect = req.query.aspect

    const noteDoc = new NoteDocument()
    const summaryOutline = await noteDoc.getOutlineSummary(entityName, entityType, entityAspect)
    res.type('text/html')
    res.send(summaryOutline)
})

app.get('/notedocui/report/status', async (req, res) => {
    const days = req.query.days
    const beginDate = req.query.begin
    const endDate = req.query.end
    const entity = req.query.entity
    const domain = req.query.domain

    const noteDoc = new NoteDocument()
    const statusReport = await noteDoc.getReport("status", days, beginDate, endDate, entity, domain)
    res.type('text/html')
    res.send(statusReport)
})

app.get('/notedocui/report/keyinfo', async (req, res) => {
    const days = req.query.days
    const beginDate = req.query.begin
    const endDate = req.query.end
    const entity = req.query.entity
    const ancestryDomain = req.query.child

    const noteDoc = new NoteDocument()
    const statusReport = await noteDoc.getReport("keyinfo", days, beginDate, endDate, entity)
    res.type('text/html')
    res.send(statusReport)
})

app.get('/notedocui/statusreport', async (req, res) => {
    const days = req.query.days
    const beginDate = req.query.begin
    const endDate = req.query.end
    const entity = req.query.entity
    const entityChildren = req.query.child
    const work = req.query.work

    const noteDoc = new NoteDocument()
    const statusReport = await noteDoc.getStatusReport(days, beginDate, endDate, entity, entityChildren, work)
    res.type('text/html')
    res.send(statusReport)
})

app.post('/notedocui/search', async (req, res) => {
    const entityPattern = req.body.entity_pattern
    const entityName = req.body.name
    const entityAspect = req.body.aspect
    const entityType = req.body.type
    const searchTerm = req.body.search_term

    const noteDoc = new NoteDocument()
    const statusReport = await noteDoc.getSearchReport(entityPattern, entityName, entityAspect, entityType, searchTerm)
    res.type('text/html')
    res.send(statusReport)
})

app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; ` +
    `press Ctrl-C to terminate.`))
  