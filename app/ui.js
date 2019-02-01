const MAPBOX_PUBLIC_TOKEN =
  'pk.eyJ1IjoicGFzdHVkYW4iLCJhIjoiY2pybDR2eWNyMDR0cTN5dDJocTJ0bWltbCJ9.YFUKFpu2vkax0Yi-gcmDyw'

module.exports = function(history) {
  history = history.map(point => [parseFloat(point[1]), parseFloat(point[0])])

  const geoJSON = encodeURIComponent(
    JSON.stringify({
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: history
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: history[history.length - 1]
          }
        }
      ]
    })
  )

  console.log(history)

  return `
    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="refresh" content="3">
            <meta charset="UTF-8">
            <title>Space Station Tracker</title>
        </head>

        <body>
            <h1>Space Station Tracker</h1>
            <img src="https://api.mapbox.com/styles/v1/mapbox/light-v9/static/geojson(${geoJSON})/1,1,1,0,0/1000x500?access_token=${MAPBOX_PUBLIC_TOKEN}">
        </body>

    </html>
  `
}
