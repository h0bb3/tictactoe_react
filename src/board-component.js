import React from 'react'
import { doNegimaxMove } from './tictactoe-ai'
import {TicTacToe} from './tictactoe.js'

class Zquare extends React.Component {
  
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    )
  }
}

export class BoardComponent extends React.Component {
  constructor(props) {
    super(props)
    this.size = 0 // decides the side 0 -> 3x3 etc
    this.sizes = [[3, '3x3'], [5, '5x5'], [7, '7x7'], [9, '9x9']]
    
    this.state = this.getInitialState()
    if (this.props.onGameUpdate !== undefined) {  // we cannot call setState until the component is bound so an unfortunate code duplication
      this.props.onGameUpdate(state.game)
    }

    this.aiPlayerSymbol = this.state.game.getTurnSymbol(1)

  }
  renderSquare(i, doNada) {
    return <Zquare value={this.state.game.getSquareSymbol(i)}
             onClick={()=> doNada ? this.doNada() : this.handleClick(i)}
             key={i}/>
  }

  doNada() {

  }

  constructState(game) {
    return {game: game}
  }

  isPlayerTurn(game, playerSymbol) {
    return game.getTurnSymbol() === playerSymbol
  }
  
  handleClick(i) {
    if (this.state.game.doMove(i)) {
      
      this.setState(this.constructState(this.state.game))

      if (!this.state.game.checkWinner() && this.isPlayerTurn(this.state.game, this.aiPlayerSymbol)) {
        const game = this.state.game
        const thisObject = this
        setTimeout( function () {
          // now we do the "ai" move
          //doRandomMove(game)
          doNegimaxMove(game)
          thisObject.setState(thisObject.constructState(thisObject.state.game))
        }, 2000)
      }
    }
  }
  
  renderRow(start, length, doNada) {
    const range = [...Array(length).keys()]
    return (
       <div className="board-row" key={start}>
         { range.map((i) => this.renderSquare(start + i, doNada))}
       </div>
    )
  }

  setState(state) {
    if (this.props.onGameUpdate !== undefined) {
      this.props.onGameUpdate(state.game)
    }
    super.setState(state)
  }

  getInitialState() {
    return this.constructState(new TicTacToe(this.sizes[this.size][0]))
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

    this.setState(this.constructState(this.state.game))  // force a render, possibly the size should be a state
  }

  render() {
    
    const winner = this.state.game.checkWinner()
    const size = this.state.game.size

    const range = [...Array(size).keys()]
    return (
      <div className="game-board">
      <div>
          { range.map((i) => this.renderRow(i * size, size, winner || this.isPlayerTurn(this.state.game, this.aiPlayerSymbol))) }

          <div className="controls">
            <button onClick={() => this.reset()}>
              Reset game
            </button>
            <select name="game_size" value={this.sizes[this.size][1]} onChange={event => this.setSize(event.target.value)}>
              {this.sizes.map(opt => {return(<option id="{opt[0]}" key={opt[0]}>{opt[1]}</option>)})}
            </select>
          </div>
      </div>
      </div>
    )
  }
}