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
    this.size = 0 // decides the side 0 -> 3x3 etc
    this.sizes = [[3, '3x3'], [5, '5x5'], [7, '7x7'], [9, '9x9']]

    this.state = this.getInitialState()
  }
  renderSquare(i, doNada) {
    return <Zquare value={this.state.game.getSquare(i)}
             onClick={()=> doNada ? this.doNada() : this.handleClick(i)}
             key={i}/>
  }

  doNada() {

  }
  
  handleClick(i) {
    if (this.state.game.setSquare(i)) {
      this.setState({game: this.state.game})
    }
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
    return {game: new TicTacToe(this.sizes[this.size][0])}
  }

  reset() {
    this.setState(this.getInitialState())
  }

  setSize(size) {
    for (let i = 0; i < this.sizes.length; i++) {
      if (size === this.sizes[i][1]) {
        this.size = i
      }
    }

    this.setState({game: this.state.game})  // force a render
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
            <select name="game_size" value={this.sizes[this.size][1]} onChange={event => this.setSize(event.target.value)}>
              {this.sizes.map(opt => {return(<option id="{opt[0]}" key={opt[0]}>{opt[1]}</option>)})}
            </select>
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
