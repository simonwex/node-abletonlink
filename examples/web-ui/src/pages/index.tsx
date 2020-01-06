import { useLink } from '../hooks'

function WebUI() {
  const { tempo, numPeers, isPlaying } = useLink()
  return (
    <div>
      <h1>Node Ableton Link Demo</h1>
      <div>
        Ableton is {isPlaying ? 'playing': 'not playing'}
      </div>
      <div>
        tempo: {tempo}
      </div>
      <div>
        numPeers: {numPeers}
      </div>
    </div>
  )
}

export default WebUI