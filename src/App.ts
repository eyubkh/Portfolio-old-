import Desk from './Desk'
// import Terminal from './components/Terminal'
// import Ui from './components/Ui'

import Loading from "./components/Loading"

class App {
  constructor () {
    // new Terminal()
    new Loading()
    new Desk()
    // new Ui()
  }
}

export default App
