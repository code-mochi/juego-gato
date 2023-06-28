import { useState } from 'react'
import confetti from "canvas-confetti"

import './App.css'

const TURNS = {
  X: 'x',
  O: 'o'

}

const Square = ({children, updateBoard, isSelected,index}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}` 

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    
    <div onClick={handleClick} className={className}>{children} </div>
  )
}

const WINNER_COMBOS = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) //null esque no hay ganador, false esque no hay un empate
  const checkWinner = (boardToCheck) => {
    for(const combo of WINNER_COMBOS){
      const [a,b,c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square)=> square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambiar turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }

  }
  return ( 
  <main className="board">
    <h1> JUEGO DEL GATO</h1>
    <button onClick={resetGame}>RESET DEL JUEGO</button>
    <section className="game">
      {
      board.map((square, index) => {
        return (
          <Square
            key={index}
            index = {index}
            updateBoard={updateBoard}>
            {square}
            </Square>
        )
      })
    }
    </section>
    <section className="turn">
      <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
      <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <section>
      {
        winner !== null && (
        <section className='winner'>
          <div className='text'>
          <h2> 
            {
            winner === false
            ? 'Empate'
            : 'Gano:'
           }

          </h2> 
          <header className='win'>
          {winner && <Square>{winner}</Square>}
          </header>
          <footer>
            <button onClick={resetGame}> Empezar de nuevo</button>
          </footer>
          </div>   
        </section>
      )
      }
    </section>
  </main>
  )
      }

export default App