import React, { useState, useRef } from 'react';

const TypingSpeedCalculator = () => {
  const [text, setText] = useState('');
  const [wordsPerMinute, setWordsPerMinute] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [givenSentence, setGivenSentence] = useState('The quick brown fox jumps over the lazy dog.');
  const typingStartTimeRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const calculateWordsPerMinute = () => {
    const typedWords = text.trim().split(/\s+/);
    const givenWords = givenSentence.trim().split(/\s+/);

    const words = typedWords.length;
    const timeTakenInMinutes = getTimeTakenInMinutes();
    const wpm = Math.round(words / timeTakenInMinutes);
    setWordsPerMinute(wpm);

    const accuracyPercentage = calculateAccuracyPercentage(typedWords, givenWords);
    setAccuracy(accuracyPercentage);
  };

  const calculateAccuracyPercentage = (typedWords, givenWords) => {
    let correctWordsCount = 0;
    for (let i = 0; i < typedWords.length; i++) {
      if (typedWords[i] === givenWords[i]) {
        correctWordsCount++;
      }
    }

    const accuracyPercentage = (correctWordsCount / givenWords.length) * 100;
    return Math.round(accuracyPercentage);
  };

  const handleReset = () => {
    setText('');
    setWordsPerMinute(0);
    setAccuracy(0);
  };

  const getTimeTakenInMinutes = () => {
    const endTime = new Date().getTime();
    const startTime = typingStartTimeRef.current;
    const timeDiff = endTime - startTime;
    return timeDiff / (1000 * 60); // Convert milliseconds to minutes
  };

  const handleTypingStart = () => {
    typingStartTimeRef.current = new Date().getTime();
  };

  return (
    <div className="container">
      <h1>Typing Speed Calculator</h1>
      <p>Given Sentence: {givenSentence}</p>
      <textarea
        value={text}
        onChange={handleChange}
        onFocus={handleTypingStart}
        placeholder="Start typing..."
      />
      <button onClick={calculateWordsPerMinute}>Calculate WPM and Accuracy</button>
      <div className="reset-button">
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="result">
        <p>Words per Minute: <span>{wordsPerMinute}</span></p>
        <p>Accuracy: <span>{accuracy}%</span></p>
      </div>
    </div>
  );
};

export default TypingSpeedCalculator;
