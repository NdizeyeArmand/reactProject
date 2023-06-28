import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SpeechToText from './SpeechToText';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div>
      <h1>ChatGPT Voice Assistant</h1>
      <SpeechToText />
    </div>
    </>
  )
}

export default App
