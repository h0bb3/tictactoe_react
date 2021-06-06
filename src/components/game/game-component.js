import React from 'react'
import './game-component.css'
import {AiWorkerWrapper} from './tictactoe-ai-worker-wrapper'
import {HighscoresComponent} from '../highscores/highscores-component'
import {NameFormComponent} from '../nameform/nameform-component'
import {BoardComponent} from '../board/board-component'
import {Highscores} from '../../model/highscores'
import { TicTacToe } from '../../model/tictactoe'


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
      scores: new Highscores(props.localStorage !== undefined ? props.localStorage : localStorage),
      game: new TicTacToe(3)
    }

    this._aiWaitTime = 2000

    this.aiWorker = new AiWorkerWrapper()
    this.aiWorker.addEventListener('message', (event) => {this.onBoardClick(event.data.ix)});
  }

  get aiWaitTime() {
    return this._aiWaitTime
  }

  onBoardClick(squareIx) {
    const oldTurn = this.state.game.turn
    if (this.state.game.doMove(squareIx)) {
      
      this.onGameUpdate(this.state.game)
      
      // the ai may send 1 click (to remove a symbol) then we should not start the ai again
      // so we need to check that the turn has gone from human to ai
      if (!this.state.game.checkWinner() && this.isAITurn() && oldTurn !== this.state.game.turn) {
        const game = this.state.game
      
        // this simulates some thinking time that makes the experience better
        setTimeout( () => {
          this.aiWorker.postMessage({gameSquares: game.squares, turn: game.turn})
        }, this.aiWaitTime)
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

  onNameSubmitted(name, score) {
    if (this.state.scores.addScore(score, name)) {
      this.setState({game: this.state.game, scores: this.state.scores, newScore: undefined})
    }
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

    const onClicks = []
    const validMoves = game.getValidMoves();
    for (let i = 0; i < game.size * game.size; i++) {
      let validMove = false
      if (!game.checkWinner() && !this.isAITurn()) {
        for (let vmIx = 0; vmIx < validMoves.length; vmIx++) {
          if ((validMoves[vmIx] !== undefined && validMoves[vmIx].from === i) || (validMoves[vmIx].from === undefined && validMoves[vmIx].to === i)) {
            validMove = true
            break
          }
        }
      }
      
      onClicks.push(validMove ? (squareIx) => {this.onBoardClick(squareIx)} : undefined)
    }

    return (
      <div className="game">
        <div className="game-info">
          <Status status={status}/>  
        </div>
        <BoardComponent onClicks={onClicks} size={game.size} getSquareSymbol={(squareIx) => {return game.getSquareSymbol(squareIx)}}/>
        <div className="controls">
        <ButtonComponent text="Reset Game" onClick={() => {this.resetGame()}}/>
        </div>
        
        {this.state.newScore ? <NameFormComponent onNameSubmitted={(name) => {this.onNameSubmitted(name, this.state.newScore)}}/>:''}
        <HighscoresComponent scores={this.state.scores} />
        <div className="controls">
        <ButtonComponent text="Reset Highscores" onClick={() => {this.resetHighscores()}}/>
        </div>
      </div>
    )
  }
}
