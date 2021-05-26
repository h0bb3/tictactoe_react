import AiWorker from './tictactoe-ai.worker'

export class AiWorkerWrapper {
  constructor() {
    this.worker = new AiWorker()
  }

  postMessage(data) {
    this.worker.postMessage(data)
  }

  addEventListener(msg, callback) {
    this.worker.addEventListener(msg, callback)
  }
}