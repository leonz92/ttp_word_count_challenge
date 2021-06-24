import './App.css';
import React, { useState } from 'react';
// import getDefinition from './services/word';

function App () {
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
	const [paraCount, setParaCount] = useState(0);
  const [bigramCount, setBigramCount] = useState(0);
  const [searchWord, setSearchWord] = useState('');
  const [definitions, setDefinitions] = useState('');
  const [synonyms, setSynonyms] = useState([])
  const [readability, setReadability] = useState({});

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

  function getDefinition (e) {
    e.preventDefault()
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`,
      {
        method: 'GET'
      })
      .then((res) => res.json())
      .then(response => {
        setDefinitions(response[0].meanings[0].definitions[0].definition);
        if (response[0].meanings[0].definitions[0].synonyms.length > 1) {
					setSynonyms(response[0].meanings[0].definitions[0].synonyms);
        }
      })
      .catch((error) => console.log(error));
  }

  function handleScan (e) {
    e.preventDefault();
    let text = document.getElementById('input-text').value.trimEnd().replaceAll(/\s/g, '%20');
    fetch(
			`https://ipeirotis-readability-metrics.p.rapidapi.com/getReadabilityMetrics?text=${text}`,
			{
				method: 'POST',
				headers: {
					'x-rapidapi-key': 'c2327d20c8msh05aae38bc671015p194bdajsn76c08a1cb8ba',
					'x-rapidapi-host': 'ipeirotis-readability-metrics.p.rapidapi.com',
				},
			}
		)
      .then((response) => response.json())
      .then(res => {
        // console.log(res);
        setReadability(res);
        console.log(readability);
      })
			.catch((err) => {
				console.error(err);
			});
  }

	return (
		<div className='App'>
			<header className='App-header'>TTP Word Count Challenge</header>
			<div className='grid'>
				<div className='left'>
					<form className='input-text-form'>
						<label>Input Text Here:</label>
						<textarea id='input-text'></textarea>
						<div className='left-button-group'>
							<button className='read-aloud-button' onClick={handleReadAloud}>
								Read Aloud
							</button>
							<button className='clear-button'>Clear</button>
						</div>
					</form>
				</div>

				<div className='right'>
					<button className='accordion'>Stats</button>
					<div className='panel'>
						<button className='analyze-button' onClick={handleAnalyze}>Analyze</button>
						<p>Character Count: {charCount}</p>
						<p>Word Count: {wordCount}</p>
						<p>Sentence Count: {sentenceCount}</p>
						<p>Paragraph Count: {paraCount}</p>
						<p>Bigram Count: {bigramCount}</p>
					</div>

					<button className='accordion'>Dictionary</button>
					<div className='panel search-form'>
						<label>Search Word</label>
						<input
							type='text'
							value={searchWord}
							onChange={(e) => setSearchWord(e.target.value)}
						></input>
						<button className='search-button' onClick={getDefinition}>Search</button>
						<p>{definitions ? `Definition: ${definitions}` : ''}</p>
						<p>
							{synonyms.length > 1
								? `Synonyms: ${synonyms[0] + ', ' + synonyms[1]}`
								: ''}
						</p>
					</div>

					<button className='accordion'>Readability</button>
					<div className='panel'>
						<button className='scan-button' onClick={handleScan}>Scan</button>
						<p>
							{readability.FLESCH_READING
								? `Flesch Reading Ease: ${readability.FLESCH_READING}`
								: ''}
						</p>
						<p>
							{readability.FLESCH_KINCAID
								? `Flesch Kincaid Grade Level: ${readability.FLESCH_KINCAID}`
								: ''}
						</p>
						<p>
							{readability.GUNNING_FOG
								? `Gunning Fog Index: ${readability.GUNNING_FOG}`
								: ''}
						</p>
						<p>
							{readability.COLEMAN_LIAU
								? `Coleman-Liau Index: ${readability.COLEMAN_LIAU}`
								: ''}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
