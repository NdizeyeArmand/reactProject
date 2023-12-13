// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const SpeechToText = () => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
    const [recordedSpeechData, setRecordedSpeechData] = useState(null);

  const startRecording = () => {
    // Start recording logic

    // Update the state to indicate that recording is active
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Stop recording logic

      /* Set recordedSpeechData with the captured speech data
      const capturedSpeechData = ...  Capture and store the recorded speech data
      setRecordedSpeechData(capturedSpeechData);*/

    // Send recorded speech to the Java backend
    fetch('/api/speech-to-text', {
      method: 'POST',
      body: recordedSpeechData,
    })
      .then(response => response.json())
      .then(data => {
        // Update transcript state with the received transcript
        setTranscript(data.transcript);
      })
      .catch(error => {
        // Handle error
      })
      .finally(() => {
        // Update the state to indicate that recording has stopped
        setIsRecording(false);
      });
  };

  return (
    <div>
      <h2>Speech to Text</h2>
      <button onClick={isRecording ? stopRecording : startRecording} style={{ backgroundColor: isRecording ? 'red' : 'inherit' }}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <button onClick={() => setTranscript('')}>Clear Transcript</button>
      <div>
        <h3>Transcript</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
