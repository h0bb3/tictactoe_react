import './highscores-component.css'
export function HighscoresComponent(props) {

  return (
    <div className="highscores">
      <h2>Highscores</h2>
      <div className="centering">
      <table>
        <thead><tr><th>Score</th><th>Name</th><th>Date</th></tr></thead>
        <tbody>
        {props.scores.scores.map((score, ix) => {return(<tr className="score-row" key={ix}><td>{score.score}</td><td>{score.name}</td><td>{timeToString(score.time)}</td></tr>)})}
        </tbody>
      </table>
      </div>
    </div>
  )
}

function timeToString(scoreTime) {
  const [, month, date, year, time] = scoreTime.split(" ")
  return `${date} ${month} ${year} - ${time}` // to avoid unused var problem in eslint
}