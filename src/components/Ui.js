import '../styles/ui.css'
import { globalState } from '../utils/globalState'
class Ui {
  constructor () {
    this.mainElement = document.getElementById('ui')
    this.init()
  }

  init () {
    const button = document.createElement('button')
    button.innerHTML = 'hello'
    button.addEventListener('click', () => {
      console.log(globalState)
      globalState.isOrbitalContorl = !globalState.isOrbitalContorl
    })
    this.mainElement.appendChild(button)
  }
}

export default Ui
