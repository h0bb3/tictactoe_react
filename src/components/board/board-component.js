import React, { useState } from 'react'
import './board-component.css'

const Zquare = props => {

  const [ fade, setFade ] = useState(false);

  const mouseOverStyle = fade && props.onClick !== undefined ? {backgroundColor:'#ddd', opacity: 1, transition: 'all .2s ease-in-out',} : {opacity: 1, transition: 'all .2s ease-in-out',}

  return (
    <button style={mouseOverStyle} className="square"
      onClick={props.onClick !== undefined ? () => props.onClick(props.squareIx) : undefined}
      onMouseEnter =  {() => setFade(true)}
      onMouseLeave =  {() => setFade(false)}
    >
      {props.value}
    </button>
  )
}

export class BoardComponent extends React.Component {
  renderSquare(i) {
    return <Zquare value={this.props.getSquareSymbol(i)}
             onClick={this.props.onClicks[i]}
             key={i}
             squareIx={i}/>
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
    
    const size = this.props.size

    const range = [...Array(size).keys()]
    return (
      <div className="game-board">
      <div>
          { range.map((i) => this.renderRow(i * size, size)) }
      </div>
      </div>
    )
  }
}