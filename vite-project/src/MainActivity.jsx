// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from "axios";

const MainActivity = () => {
    let startRecording;
    let stopRecording;
    let startSynthesizing;
    let stopSynthesizing;
    const [transcript, setTranscript] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isSynthesizing, setIsSynthesizing] = useState(false);


    startRecording = async () => {
        // Start recording logic
          try {
              const response = await axios.post('http://localhost:8080/startRecording');
              let text = response.data;
              console.log('Real-time transcription:', text);

              // Concatenate the new text with the current transcript
              setTranscript(prevTranscript =>
                  (prevTranscript ? prevTranscript + "\n" : "") + "User: " + text
              );
          } catch (error) {
              console.error('Failed to start recording', error);
          }

        // Update the state to indicate that recording is active
        setIsRecording(true);
    };

    stopRecording = () => {
        // Stop recording logic
        try {
            axios.post('http://localhost:8080/stopRecording');
        } catch (error) {
            console.error('Failed to stop recording', error);
        }

        // Update the state to indicate that recording is inactive
        setIsRecording(false);
    };

    startSynthesizing = async () => {
        try {
            const response = await axios.post('http://localhost:8080/startSynthesizing');

            let text = response.data.get('chatbotResponse');
            console.log('Real-time transcription of synthesized speech:', text);

            setTranscript(prevTranscript =>
                (prevTranscript ? prevTranscript + "\n" : "") + "Chatbot: " + text
            );

        } catch (error) {
            console.error('Failed to start synthesizing', error);
        }

        setIsSynthesizing(true);
    };

    stopSynthesizing = () => {
        try {
            axios.post('http://localhost:8080/stopSynthesizing');
        } catch (error) {
            console.error('Failed to stop recording', error);
        }

        setIsSynthesizing(false);
    };

    return (
      <div>
          <button onClick={isRecording ? stopRecording : startRecording}
                  style={{backgroundColor: isRecording ? 'red' : 'inherit'}}>
              {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button onClick={isSynthesizing ? stopSynthesizing : startSynthesizing}
                  style={{backgroundColor: isSynthesizing ? 'red' : 'inherit'}}>
              {isSynthesizing ? 'Stop Synthesizing' : 'Start Synthesizing'}
          </button>
          <button onClick={() => setTranscript('')}>Clear Transcript</button>
          <div>
              <h3>Transcript</h3>
              <p>{transcript}</p>
          </div>
      </div>
    );
};

export default MainActivity;
