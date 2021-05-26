export class AiWorkerWrapper {


  postMessage(data) {
    this.postMessage = data
  }

  addEventListener(msg, callback) {
    this.addEventListener = {msg: msg, callback:callback}
  }
}



//export {onmessage, addEventListener}