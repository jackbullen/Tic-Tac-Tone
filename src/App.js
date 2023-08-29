import './App.css';
import Game from './components/Game';

function App() {

  return (
    <div className="App">
      <h1>Tic Tac Tone</h1>
      <p className="song-name">Hymn To Freedom</p>
      <p className='artist-name'>Oscar Petersen</p>
      <Game />
    </div>
  );
}

export default App;
