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
    let words = text.replace(/[.?!,]/g, '').split(' ').filter((word) => word !== '');
    let sentences = text.split(/[.?!]/g).filter((sentence) => sentence !== '');
    let paragraphs = text.split(/\n/).filter((paragraph) => paragraph !== '');
    setCharCount(text.length);
    setWordCount(words.length);
    setSentenceCount(sentences.length);
    setParaCount(paragraphs.length);

    let bigrams = {};
    let bigramWords = text.split(' ');
    for (let i = 0; i < bigramWords.length - 1; i++) {
      let currWord = bigramWords[i];
      let combined = currWord + ' ' + bigramWords[i + 1];
      if (currWord.search(/[.?!]/)>0) {
        continue;
      }
      if (bigrams[combined]) {
        bigrams[combined]++;
      } else {
        bigrams[combined] = 1;
      }
    }
    setBigramCount(Object.keys(bigrams).length);
  };

	return (
		<div className='App'>
			<header className='App-header'>TTP Word Count Challenge</header>
			<div id='grid'>
				<div id='left'>
					<form id='input-text-form'>
						<label>Input Text Here:</label>
						<textarea id='input-text'></textarea>
						<div id='left-buttons'>
							<button onClick={handleReadAloud}>Read Aloud</button>
							<button>Clear</button>
						</div>
					</form>
				</div>

				<div id='right'>
					<button className='accordion'>Stats</button>
					<div className='panel'>
						<p>Character Count: {charCount}</p>
						<p>Word Count: {wordCount}</p>
						<p>Sentence Count: {sentenceCount}</p>
						<p>Paragraph Count: {paraCount}</p>
						<p>Bigram Count: {bigramCount}</p>
					</div>
					<button className='accordion'>Dictionary</button>
          <div className='panel'>
            <label>Search Word</label>
            <input type='text'></input>
            
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
