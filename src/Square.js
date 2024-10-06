
import './Square.css';
import { useState } from 'react'

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
export default Square;