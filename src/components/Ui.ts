import '../styles/ui.css'
import { globalState } from '../utils/globalState'
class Ui {
  mainElement = document.getElementById('ui')
  
  constructor () {
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
