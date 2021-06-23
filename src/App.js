import './App.css';
import React, { useState } from 'react';

function App () {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
	const [paraCount, setParaCount] = useState(0);
  const [bigramCount, setBigramCount] = useState(0);

  function handleReadAloud(e) {
    e.preventDefault();
    if ('speechSynthesis' in window) {
      // Speech Synthesis supported
      let msg = new SpeechSynthesisUtterance('hi');
      let selection = window.getSelection().toString();
      if (selection) {
        msg.text = selection;
      } else {
        msg.text = document.getElementById('input-text').value;
      }
      window.speechSynthesis.speak(msg);
    } else {
      // Speech Synthesis Not Supported
      alert("Sorry, your browser doesn't support text to speech!");
    }
  };

  function handleAnalyze(e) {
    e.preventDefault();
    let text = document.getElementById('input-text').value.trimEnd();
    let words = text.replace(/[.?!,]/g, '').split(' ');
    let sentences = text.split(/[.?!]/g).filter((sentence) => sentence != '');
    let paragraphs = text.split(/\n/).filter((paragraph) => paragraph != '');
    console.log(paragraphs)
    setCharCount(text.length);
    setWordCount(words.length);
    setSentenceCount(sentences.length);
    setParaCount(paragraphs.length);
  };

	return (
		<div className='App'>
			<header className='App-header'>TTP Word Count Challenge</header>
			<div id='input-text-form'>
				<form>
					<label>Input Text Here:</label>
					<textarea
						id='input-text'
						style={{ width: 65 + 'vw', height: 30 + 'vh' }}
					></textarea>
					<button onClick={handleAnalyze}>Analyze</button>
					<button onClick={handleReadAloud}>Read Aloud</button>
					<button>Dictionary</button>
					<button>Thesaurus</button>
				</form>
			</div>
			<div id='stats'>
				<p>Character Count: {charCount}</p>
				<p>Word Count: {wordCount}</p>
				<p>Sentence Count: {sentenceCount}</p>
        <p>Paragraph Count: {paraCount}</p>
				<p>Bigrams: {bigramCount}</p>
				<p>Reading Level: ???</p>
			</div>
		</div>
	);
}

export default App;
