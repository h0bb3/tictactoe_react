import React from 'react'
import './game-component.css'
import {HighscoresComponent} from '../highscores/highscores-component'
import {NameFormComponent} from '../nameform/nameform-component'
import {BoardComponent} from '../board/board-component'
import {Highscores} from '../../highscores'
import { TicTacToe } from '../../tictactoe'
import { doNegimaxMove } from '../../tictactoe-ai'


function Status(props) {
  return (
    <div>{props.status}</div>
  )
}

function ButtonComponent(props) {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

export class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Game Not Started",
      scores: new Highscores(),
      game: new TicTacToe(3)
    }
  }

  onBoardClick(squareIx) {
    if (this.state.game.doMove(squareIx)) {
      this.onGameUpdate(this.state.game)
          
      if (!this.state.game.checkWinner() && this.isAITurn()) {
        const game = this.state.game
        const thisObject = this
        setTimeout( function () {
          // now we do the "ai" move
          //doRandomMove(game)
          doNegimaxMove(game)
          thisObject.onGameUpdate(thisObject.state.game)
        }, 2000)
      }
    }
  }

  onGameUpdate(tttGame) {
    const winner = tttGame.checkWinner()
    let newScore = this.state.newScore
    if (winner) {
      newScore = tttGame.turn
    }

    this.setState({game: tttGame, scores: this.state.scores, newScore: newScore})
  }

  onNameSubmitted(name) {
    this.state.scores.addScore(this.state.newScore, name)
    this.setState({game: this.state.game, scores: this.state.scores, newScore: undefined})
  }
  
  isAITurn() {
    const game = this.state.game
    return game.getTurnSymbol() === game.getTurnSymbol(1)
  }

  resetGame() {
    this.setState({game: new TicTacToe(this.state.game.size), scores: this.state.scores, newScore: undefined})
  }

  resetHighscores() {
    this.state.scores.reset()
    this.setState({game: this.state.game, scores: this.state.scores, newScore: undefined})
  }

  render() {
    const game = this.state.game
    let status = `Turn: ${game.turn + 1} Next Player: ${game.getTurnSymbol()}`

    const winner = game.checkWinner()
    if (winner) {
      status = `Winner is: ${winner} at Turn: ${game.turn}`
    }

    const onClick = game.checkWinner() || this.isAITurn() || this.state.newScore ? undefined : (squareIx) => {this.onBoardClick(squareIx)}

    return (
      <div className="game">
        <div className="game-info">
          <Status status={status}/>  
        </div>
        <BoardComponent onClick={onClick} size={game.size} getSquareSymbol={(squareIx) => {return game.getSquareSymbol(squareIx)}}/>
        <div className="controls">
        <ButtonComponent text="Reset Game" onClick={() => {this.resetGame()}}/>
        </div>
        
        {this.state.newScore ? <NameFormComponent onNameSubmitted={(name) => {this.onNameSubmitted(name)}}/>:''}
        <HighscoresComponent scores={this.state.scores} />
        <div className="controls">
        <ButtonComponent text="Reset Highscores" onClick={() => {this.resetHighscores()}}/>
        </div>
      </div>
    )
  }
}
