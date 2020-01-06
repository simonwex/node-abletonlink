import next from 'next'
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import abletonlink from 'abletonlink'

const app = express()
const server = new http.Server(app)
const io = socketIo(server)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

async function main() {
  await nextApp.prepare()
  const PORT = 4000

  console.log(`server started on port ${PORT}`)
  server.listen(PORT)
  app.get('*', (req, res) => {
    handle(req,res)
  })
  io.on('connection', (socket) => {
    console.log('new connection')
    const link = new abletonlink(160.0, 3.0, false);
    link.enable()

    link.on('tempo', (tempo) => {
      console.log('tempo change', tempo)
      socket.emit('tempo', tempo);
    })
    link.on('numPeers', (numPeers) => {
      console.log('numPeers change', numPeers)
      socket.emit('numPeers', numPeers)
    })
    link.on('playState', (isPlaying: boolean) => {
      console.log('playState change', isPlaying)
      socket.emit('isPlaying', isPlaying)
    })
  })
}

main()