import './App.css';

function App() {
	return (
		<div className='App'>
			<header className="App-header">
        TTP Word Count Challenge
      </header>
			<div id='input-text-form'>
				<form>
					<label>Input Text Here:</label>
					<textarea
						id='input-text'
						style={{ width: 65 + 'vw', height: 50 + 'vh' }}
					></textarea>
					<button>Analyze</button>
          <button>Read Aloud</button>
          <button>Dictionary</button>
          <button>Thesaurus</button>
				</form>
			</div>
			<div id='stats'>
				<p>Character Count: 0</p>
				<p>Word Count: 0</p>
				<p>Sentence Count: 0</p>
				<p>Paragraph Count: 0</p>
				<p>Bigrams: 0</p>
				<p>Reading Level: ???</p>
			</div>
		</div>
	);
}

export default App;
