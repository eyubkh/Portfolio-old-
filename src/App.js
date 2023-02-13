import Desk from './Desk'
import Terminal from './components/Terminal'
import { onLoad, onError } from './utils/loadingManager'

class App {
  constructor () {
    this.terminal = new Terminal()
    this.desk = new Desk()
  }

  init () {
    onLoad(this.onLoad.bind(this))
    onError(this.onError.bind(this))
  }

  onLoad () {
    this.terminal.isLoadDone = true
    this.terminal.update()
  }

  onError () {
    this.terminal.isLoadError = true
    this.terminal.update()
  }
}

export default App
