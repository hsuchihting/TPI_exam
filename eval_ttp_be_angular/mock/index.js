const path = require('path')
const jsonServer = require('json-server')

const server = jsonServer.create()
// const parameterRouter = jsonServer.router(path.join(__dirname, 'parameterDB.json'))
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})


server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
      if(req.body.content) {
        req.body.content.id = Date.now()
        req.body = req.body.content
      }
  }
  // Continue to JSON Server router
  next()
})

server.use('*', function(req, res, next) {
  setTimeout(next, 300)
})


server.use(router)

server.listen(3000, () => {
  console.log(`JSON Server is running on http://localhost:3000`)
})
