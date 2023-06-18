import { state } from '../World'
import '../styles/ui.css'
class Ui {
  uiElement = document.getElementById('ui')

  init() {
    if (this.uiElement instanceof HTMLDivElement) {
      this.uiElement.innerHTML = `
        <div id="ui-content">
          <div id="logo">
            <svg width="20mm" height="13.477mm" version="1.1" viewBox="0 0 70.866 47.753" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(-152.65 -157.43)">
              <path d="m173.24 157.81-5.4872 5.4872 9.0871 9.087h-23.648v7.765h30.954v16.841h-22.033v7.6396h51.931v-7.6396h-22.033v-16.841h30.954v-7.765h-23.686l8.9365-8.9369-5.6296-5.6296-14.566 14.566h-0.20599z" style="fill:#000000;paint-order:stroke fill markers;stroke-linecap:round;stroke-miterlimit:1;stroke-width:1.0934;stroke:#000000"/>
              </g>
            </svg>
          </div>

          <div id="name">
            <h3>Ayoub</h3>
            <h3>Khalfaoui</h3>
            <h3>Hadi</h3>
          </div>

          <div id="controls">
            <button class="camera">camera</button>
            <button class="music">music</button>
          </div>

          <div id="other"> 
            <p>other</p>  
          </div>
        </div>
      `

      const button = this.uiElement.getElementsByClassName('camera')[0]
      if (button)
        button.addEventListener('click', () => {
          state.isOrbitalContorl = !state.isOrbitalContorl
        })
    }
  }
}

export default Ui
