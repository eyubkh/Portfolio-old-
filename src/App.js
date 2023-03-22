import Desk from './Desk'
import Terminal from './components/Terminal'

class App {
  constructor () {
    this.terminal = new Terminal()
    this.desk = new Desk()
  }
}

export default App
