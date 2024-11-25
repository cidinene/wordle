In this React interface development course assignment, you will build the Wordle game interface from the ground up.

Objective : we're going to create a WORDLE game (only the interface), where the player is given 5 attempts to guess a 5-letter word. After each guess, the letters that are in the word but in the wrong position are revealed (yellow), and those that are in the correct position are shown (green). 

# prerequisites 

Install Node.

```
node -v

```

# Launching the solution 

Download the project 
```

git clone https://github.com/cidinene/wordle.git

```

Inside the project folder , launch npm install
```
npm install .
```

This will download all available node modules

Now you can launch the app with npm start

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Do your self step by step

## Painting the Board

1 - We create a Square component where the user will introduce a letter.So that , we create a new Square.js file that  returns a div whose css class Name is cuadrado . Remarks the property to introduce the css clas at the input element (className)is different from html (class). This is because the return text shoulb be JSX complient.
```
import './Square.css';

function Square() {
    return (
      <input className="cuadrado"></input>

    );
}
export default Square;
```

We create the Square.css file with following styles : 
```
.cuadrado
{
    color:#ffff;
    width: 40px;
    height: 50px;
    background-color: #666;
    display: inline-block;
    border:1px solid white;
    text-align: center;
    font-size: 2.5em;
    margin: 4px;
}
.cuadrado:focus
{
     border:1px solid yellow;
     background-color: #ffffff;
}
```
2 - Let's change the main component, App.js to have a board area with 5 rows and 5 Square components per row (each row inside a div row). Replace the code with this:
```
import './App.css';
import Square from './Square';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          WORDLE
        </p>
      </header>
      <p>
        <div className='board'>
          <div id="row"  className='row' > 
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
          </div>
          <div id="row" className='row'  > 
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
          </div>
          <div id="row" className='row'  > 
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
          </div>
          <div id="row" className='row'  > 
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
          </div>
          <div id="row" className='row'  > 
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
            <Square></Square>
          </div>
          </div>
      </p>

    </div>
  );
}

export default App;
```

We're going to modify a couple of styles in the main class so that the header doesn't take up the whole screen and the app's background is black
```
.App {
  text-align: center;
  background-color: black;
}

.App-logo {
  height: 40vmin;
  pointer-events: none;
}

.App-header {
  background-color: #282c34;
  display: flex;
borramos la altura
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
.App-link {
  color: #61dafb;
}
.row
{
text-align: center;
display: flex;
justify-content: center;
}

```

### Component Properties

In Wordle, only the cells in the row corresponding to the current attempt are active. If the current attempt is the first one, only this row will be active. When the 5 digits of the row are filled, the system checks if the letter of the cell matches the letter of the target word. If the character and position match, the cell is colored green. If the character is included in the solution but in a different position, it is colored yellow.

For the square to know how to color itself, it needs to know the row it is in.

1 - To achieve this, we will include two properties for each square: row and column, which will be passed as parameters to the component.

Example of code for the cells in the first row

```
          <div id="row"  className='row' > 
            <Square row="1" column="1"></Square>
            <Square row="1" column="2"></Square>
            <Square row="1" column="3"></Square>
            <Square row="1" column="4"></Square>
            <Square row="1" column="5"></Square>
            </div>
```
In turn, the square component will be modified to receive the properties

```

function Square({row, column})
```

2- In addition, we need to indicate which attempt we are currently on, to only enable those squares that are in the row corresponding to the attempt. To do this, we will create a variable in the main class that will be accessible to the children. Since the state of the square will depend on this variable, we will define it as a state.

```

const [currentAttempt, setCurrentAttempt] = useState(1);
…
<Square row="1" column="1" attempt={currentAttempt}></Square>

```
And now change the Square component to receive the props and check if our row is active ( when the row is the shame as the attempt )
```
function Square({row, column, attempt}) {
    const [letter, setLetter] = useState(' ')
    return (
<input className="cuadrado" disabled={row != attempt ? "true" : ""} type="text" value={letter} onChange={(e)=> setLetter(e.target.value)}></input>
    );
}
```

3- Now we are going to save in the Board every letter introduced by the user and a variable solution. So that , we create an array initialzed with white spaces:

```
const solution ='CLASE';

function App() {

  const [currentAttempt, setCurrentAttempt] = useState(1);

  const guesses = ["     ", "     ","     " , "     ", "     "];
```

4- The function that will save the characters in the string corresponding to the number of the active attempt at this moment will be called handleSquareChange. Additionally, in this function, if the introduced character completes the 5 letters of the attempt, it will be checked if it matches the solution and, if not, we will move on to the next attempt as long as we have not exceeded the 5 attempts.


```
const handleSquareChange=(parameters) =>
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
          if(guesses[parameters.row-1] == solution)
          {
            setMessageWinner("CONGRATULATIONS");
            setCurrentAttempt(10); 
          }
          else 
          {
            if (currentAttempt<5) 
              {
                setCurrentAttempt(currentAttempt+1);
              } 
              else
              {
                setMessageWinner("Game Over");
                setCurrentAttempt(10); 
              }
          }
 }
```

5 - This function should be called in every change event of a square, so we should pass the function to every square

```
<div className='board'>
          <div id="row"  className='row' > 
            <Square row="1" column="1" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="2" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="3" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="4" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
            <Square row="1" column="5" attempt={currentAttempt} textUpdate={(e) =>handleSquareChange(e)}></Square>
 </div>
```
We will modify the Square Hook to receive this parameter, and call it when the user enters the value.

```
function Square({row, column, attempt, textUpdate}) {
    const [letter, setLetter] = useState(' ');

    const handleInputLetter=(e) =>
    {
      let letter=e.target.value.trim()[0].toUpperCase();
      setLetter(letter);
      textUpdate({row, column, letter});
    } 
    return (
      <input className="cuadrado" disabled={row != attempt ? true : false} type="text" value={letter} onChange={handleInputLetter}></input>

    );
}
```
=== Coloring the letters ===


Now it's time to give the clues about the correct letters in each attempt.

For this, we need to be clear that we only paint the squares with letters from a previous attempt to the current one.

If the letter matches and is also in the correct position, we will paint it green, otherwise, in yellow.

To do this, we will add two new styles to our css.
```
.cuadradoverde
{
    color:#ffff;
    width: 55px;
    height: 55px;
    background-color: #29ca3f;
    display: inline-block;
    border:1px solid white;
    text-align: center;
    font-size: 2.5em;
    margin: 4px;

}

.cuadradoamarillo
{
    color:#ffff;
    width: 55px;
    height: 55px;
    background-color: rgb(209, 209, 90);
    display: inline-block;
    border:1px solid white;
    text-align: center;
    font-size: 2.5em;
    margin: 4px;

}
```

The process should only be applied when an attempt has been completed, that is, when the state of the "attempts" variable is updated.

Once the number of attempts is updated, we want to force the squares to be repainted taking into account the applied logic. To do this, we will use the useEffect() Hook associated with the state whose change we want to be notified.

```
function Square({ row, column, attempt, textUpdate}) {
    const [letter, setLetter] = useState(' ');
    const [backgroundCellColor, setBackgroundCellColor] = useState('cuadrado');

    const handleInputLetter=(e) =>
    {
      let letter=e.target.value.trim()[0].toUpperCase();
      setLetter(letter);
      textUpdate({row, column, letter});
      
    }
    
      useEffect(() => {
        // Update the document title using the browser API
        if (row < attempt && solution.charAt(column-1)==letter)
          {  setBackgroundCellColor('cuadradoverde');}
          else {
          if(row<attempt && solution.indexOf(letter)>=0)
          {
            setBackgroundCellColor('cuadradoamarillo');
          }
        }
           
       }, [attempt]);

    return (
      <input className={backgroundCellColor} disabled={row != attempt ? true : false} type="text" value={letter} onChange={handleInputLetter} ></input>
      
    );
}
```

We have our first game version, now we should improve it with messages and effects. Well done.






