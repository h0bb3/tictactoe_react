
export class Highscores {
  #_scores

  constructor() {
    this._scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
  }

  addScore(score, name) {
    this._scores.push({score:score, name:name, time:Date()})
    this._scores.sort((a, b) => {return b.score - a.score})
    this._save()
  }

  get scores() {
    return [...this._scores]
  }

  _save() {
    localStorage.setItem('scores', JSON.stringify(this._scores))
  }

  reset() {
    this._scores = []
    this._save()
  }
}