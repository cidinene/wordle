import './App.css';
import { useState } from 'react'
import Square from './Square';

const replaceAt=function(cadena, index, char) {
  var a = cadena.split("");
  a[index] = char;
  return a.join("");
}
const solution ='avion';


function App() {

  const [currentAttempt, setCurrentAttempt] = useState(1);

  const guesses = ["     ", "     ","     " , "     ", "     "];
  const handleSquareChange=( parameters) =>
    {
     
      guesses[parameters.row-1]= replaceAt(guesses[parameters.row-1], parameters.column-1,parameters.letter);
      let isAttempComplete=true;
      for(let i=0;i<5;i++)
      {
        if(guesses[parameters.row-1].charAt(i)==" ")
          {
            isAttempComplete=false;
            break;
          }
      }
      if (isAttempComplete) 
        {
          setCurrentAttempt(currentAttempt+1);
        } 
    }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          WORDLE
        </p>
      </header>
     
        <div className='board'>
          <div id="row"  className='row' > 
            <Square row="1" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
          </div>
          <div id="row" className='row'  > 
            <Square row="2" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="2" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="2" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="2" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="2" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
          </div>
          <div id="row" className='row'  > 
            <Square row="3" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="3" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="3" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="3" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="3" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
          </div>
          <div id="row" className='row'  > 
            <Square row="4" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="4" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="4" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="4" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="4" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
          </div>
          <div id="row" className='row'  > 
            <Square row="5" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="5" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="5" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="5" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="5" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
          </div>
          </div>
     

    </div>
  );
}

export default App;
