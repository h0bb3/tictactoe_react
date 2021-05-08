import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

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
    const size = 3
    this.state = {
      turn: 0,
      squares: Array(size * size).fill(null)
    }
  }
  renderSquare(i) {
    return <Zquare value={this.state.squares[i]}
             onClick={()=>this.handleClick(i)}
             key={i}/>
  }

  getTurnSymbol(turn) {
    return turn % 2 === 0 ? 'X' : 'O'
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    const turn = this.state.turn
    if (squares[i] === null) {
      squares[i] = this.getTurnSymbol(turn)
      this.setState({squares: squares, turn: turn + 1})
    } else {
      squares[i] = null
      this.setState({squares: squares, turn: turn})
    }
  }
  
  renderRow(start, length) {
    const range = [...Array(length).keys()]
    return (
       <div className="board-row" key={start}>
         { range.map((i) => this.renderSquare(start + i))}
       </div>
    )
  }

  render() {
    const turn = this.state.turn
    const status = 'Next player: ' + this.getTurnSymbol(turn)
    const size = Math.floor(Math.sqrt(this.state.squares.length))
    const range = [...Array(size).keys()]
    return (
      <div>
        <div className="status">{status}</div>
          { range.map((i) => this.renderRow(i * size, size)) }
      </div>
    );
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
