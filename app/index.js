const app = require('express')()
const server = require('http').Server(app)
const request = require('request')
const ui = require('./ui')

server.listen(8000)

app.get('/', function(req, res) {
  res.send(ui(history))
})

// Much higher than this, and we exceed the URL length limit for the mapbox map
const MAX_HISTORY = 250

const history = []
function poll() {
  request(`http://api.open-notify.org/iss-now.json`, (err, res, body) => {
    if (err) {
      console.error('request error', err.message)
    }

    const { latitude, longitude } = JSON.parse(body).iss_position
    history.push([latitude, longitude])
    console.log(`Added ${[latitude, longitude]} to history. ${history.length} items total`)

    if (history.length > MAX_HISTORY) {
      history.shift()
    }
  })
}

poll()
setInterval(poll, 3000)
