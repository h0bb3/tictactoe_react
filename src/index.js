import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {HighscoresComponent} from './highscores-component'
import {NameFormComponent} from './nameform-component'
import {Highscores} from './highscores'
import {BoardComponent} from './board-component'


function Status(props) {
  return (
    <div>{props.status}</div>
  )
}

class Game extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: "Game Not Started",
      scores: new Highscores()
    }
  }

  onGameUpdate(tttGame) {
    let state = `Turn: ${tttGame.turn + 1} Next Player: ${tttGame.getTurnSymbol()}`

    const winner = tttGame.checkWinner()
    let scores = this.state.scores
    let newScore = this.state.newScore
    if (winner) {
      state = `Winner is: ${winner} at Turn: ${tttGame.turn}`
      //scores.addScore(tttGame.turn)
      newScore = tttGame.turn
    }

    this.setState({status: state, scores: scores, newScore: newScore})
  }

  onNameSubmitted(name) {
    console.log('A name was submitted: ' + name);
    this.state.scores.addScore(this.state.newScore, name)
    this.setState({status: this.state.status, scores: this.state.scores, newScore: undefined})
  }
  

  render() {

    return (
      <div className="game">
        <div className="game-info">
          <Status status={this.state.status}/>  
        </div>
        {this.state.newScore ?
        <NameFormComponent onNameSubmitted={(name) => {this.onNameSubmitted(name)}}/>
        :
        <BoardComponent onGameUpdate = {(tttGame) => {this.onGameUpdate(tttGame)}}/>
        }
        <HighscoresComponent scores = {this.state.scores} />
      </div>
    )
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
