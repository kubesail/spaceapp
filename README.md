# Space App

A sample deployable app for demonstrating the power of kubernetes. Live tracks and records the past few minutes of the space station's location data, and renders it to a map.

## Development

`yarn start`

## Deployment

`npx deploy-to-kube`

```
port: 8000
protocol: http
entrypoint: app/index.js
```
