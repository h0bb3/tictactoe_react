import React from 'react'
import './board-component.css'

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
  renderSquare(i, doNada) {
    return <Zquare value={this.props.getSquareSymbol(i)}
             onClick={()=> doNada ? this.doNada() : this.handleClick(i)}
             key={i}/>
  }

  doNada() {

  }
  
  handleClick(i) {
    this.props.onClick(i)
  }
  
  renderRow(start, length, doNada) {
    const range = [...Array(length).keys()]
    return (
       <div className="board-row" key={start}>
         { range.map((i) => this.renderSquare(start + i, doNada))}
       </div>
    )
  }

  render() {
    
    const doNada = !this.props.onClick
    const size = this.props.size

    const range = [...Array(size).keys()]
    return (
      <div className="game-board">
      <div>
          { range.map((i) => this.renderRow(i * size, size, doNada)) }
      </div>
      </div>
    )
  }
}