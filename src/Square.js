
import './Square.css';
import { useState,useEffect } from 'react'
import { solution } from './App_wordle.js'


function Square({ row, column, attempt, textUpdate}) {
    const [letter, setLetter] = useState(' ');
    const [backgroundCellColor, setBackgroundCellColor] = useState('cuadrado');

    const handleInputLetter=(e) =>
    {
      let letter=e.target.value.trim()[0].toUpperCase();
      setLetter(letter);
      textUpdate({row, column, letter});
      
    }
    
    const renderBackgrounColor= () =>
      {
       
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
export default Square;