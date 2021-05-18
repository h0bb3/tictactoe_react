
export class Highscores {
  #_scores

  constructor() {
    this._scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
    
  }

  addScore(score, name) {
    this._scores.push({score:score, name:name})
    this._scores.sort((a, b) => {return b.score - a.score})
    localStorage.setItem('scores', JSON.stringify(this._scores));
  }

  get scores() {
    return [...this._scores]
  }
}