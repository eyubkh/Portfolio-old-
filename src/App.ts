import World from './World'
import Ui from './components/Ui'

import Terminal from './components/Terminal'

class App {
  terminal: Terminal
  ui: Ui
  world: World

  constructor() {
    this.terminal = new Terminal()
    this.ui = new Ui()
    this.world = new World()

    this.init()
  }

  async init() {
    this.ui.init()
    await this.terminal.init()
    await this.world.init()

    if (this.terminal.isError === false) this.terminal.removeTerminal()
  }
}

export default App
