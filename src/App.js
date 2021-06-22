import './App.css';

function App () {
  function readAloud(e) {
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
      msg.volume = 1;
      console.log(msg);
      window.speechSynthesis.speak(msg);
    } else {
      // Speech Synthesis Not Supported
      alert("Sorry, your browser doesn't support text to speech!");
    }
  }

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
						style={{ width: 65 + 'vw', height: 30 + 'vh' }}
					></textarea>
					<button>Analyze</button>
          <button onClick={readAloud}>Read Aloud</button>
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
