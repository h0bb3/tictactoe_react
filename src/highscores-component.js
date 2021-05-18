import './highscores-component.css'
export function HighscoresComponent(props) {
  return (
    <div className="highscores">
      <p>Highscores</p>
      <table>
        <thead><tr><th>Score</th><th>Name</th></tr></thead>
        <tbody>
        {props.scores.scores.map((score, ix) => {return(<tr className="score-row" key={ix}><td>{score.score}</td><td>{score.name}</td></tr>)})}
        </tbody>
      </table>
    </div>
  )
}