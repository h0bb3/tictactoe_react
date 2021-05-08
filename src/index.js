import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {TicTacToe} from './tictactoe.js'

class Zquare extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      value: null
    }
  }
  
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.size = 3 // decides the side size of of the game board, should be an odd number
    this.state = this.getInitialState()
  }
  renderSquare(i, winner) {
    return <Zquare value={this.state.game.getSquare(i)}
             onClick={()=> winner ? this.doNada() : this.handleClick(i)}
             key={i}/>
  }

  doNada() {

  }
  
  handleClick(i) {
    this.state.game.setSquare(i)
    this.setState({game: this.state.game})
  }
  
  renderRow(start, length, winner) {
    const range = [...Array(length).keys()]
    return (
       <div className="board-row" key={start}>
         { range.map((i) => this.renderSquare(start + i, winner))}
       </div>
    )
  }

  getInitialState() {
    return {game: new TicTacToe()}
  }

  reset() {
    this.setState(this.getInitialState())
  }

  render() {
    let status = `Turn: ${this.state.game.turn + 1} Next Player: ${this.state.game.getTurnSymbol()}`
    const winner = this.state.game.checkWinner()
    const size = this.state.game.size
    if (winner) {
      status = `Winner is: ${winner} at Turn: ${this.state.game.turn}`
    }
    const range = [...Array(size).keys()]
    return (
      <div>
        <div className="status">{status}</div>
          { range.map((i) => this.renderRow(i * size, size, winner)) }

          <div className="controls">
            <button onClick={() => this.reset()}>
              Reset game
            </button>
          </div>
      </div>
    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
