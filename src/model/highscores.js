
export class Highscores {
  #_scores
  #_storageAPI

  constructor(storageAPI) {
    this._storageAPI = storageAPI
    this._scores = this._storageAPI.getItem('scores') !== undefined ? JSON.parse(this._storageAPI.getItem('scores')) : [];
  }

  addScore(score, name) {
    if (name === undefined || name.length <= 0) {
      return false
    }
    if (!Number.isInteger(score) || score < 0) {
      return false
    }
    this._scores.push({score:score, name:name, time:Date()})
    this._scores.sort((a, b) => {return b.score - a.score})
    this._save()

    return true
  }

  get scores() {
    return Array.from(this._scores)
  }

  _save() {
    this._storageAPI.setItem('scores', JSON.stringify(this._scores))
  }

  reset() {
    this._scores = []
    this._save()
  }
}
