import Desk from './Desk'
import Ui from './components/Ui'

import Loading from "./components/Loading"

class App {
  constructor () {
    new Loading()
    new Desk()
    new Ui()
  }
}

export default App
