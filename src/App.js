import Desk from './Desk'
import Terminal from './components/Terminal'
import Ui from './components/Ui'

class App {
  constructor () {
    this.terminal = new Terminal()
    this.terminal.removeTerminal()

    this.desk = new Desk()
    this.ui = new Ui()
  }
}

export default App
