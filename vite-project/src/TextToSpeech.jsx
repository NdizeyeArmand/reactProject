// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const TextToSpeech = () => {
  const [synthesizedSpeech, setSynthesizedSpeech] = useState('');
  const [text, setText] = useState('');

  const synthesizeSpeech = () => {
    // Send text to the Java backend for speech synthesis
    fetch('/api/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then(response => response.json())
      .then(data => {
        // Update synthesizedSpeech state with the received synthesized speech
        setSynthesizedSpeech(data.synthesizedSpeech);
      })
      .catch(error => {
        // Handle error
      });
  };

  return (
    <div>
      <h2>Text to Speech</h2>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <button onClick={synthesizeSpeech}>Synthesize Speech</button>
      <div>{synthesizedSpeech}</div>
    </div>
  );
};

export default TextToSpeech;
