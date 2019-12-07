import { useState } from 'react'
import io from 'socket.io-client'
const socket = io('http://localhost:4000')

export const useLink = () => {
  const [tempo, setTempo] = useState<number | undefined>(undefined)
  const [numPeers, setNumPeers] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  socket.on('tempo', (_tempo:number) => {
    console.log('tempo changed', _tempo);
    setTempo(_tempo)
  });

  socket.on('numPeers', (_numPeers: number) => {
    console.log('numPeers changed', _numPeers);
    setNumPeers(_numPeers)
  })

  socket.on('isPlaying', (_isPlaying: boolean) => {
    console.log('playState changed', _isPlaying);
    setIsPlaying(_isPlaying)
  })

  return {
    tempo,
    numPeers,
    isPlaying
  }
}
