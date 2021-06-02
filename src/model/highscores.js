
export class Highscores {
  #_scores
  #_storageAPI

  constructor(storageAPI) {
    this._storageAPI = storageAPI
    this._scores = this._storageAPI.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : [];
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
    this._storageAPI.setItem('scores', JSON.stringify(this._scores))
  }

  reset() {
    this._scores = []
    this._save()
  }
}