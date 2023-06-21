import { state } from '../World'
import '../styles/ui.css'
import cameraIcon from '@assets/icons/camera.ICO' 
import musicIcon from '@assets/icons/music.ICO' 


class Ui {
  uiElement = document.getElementById('ui')

  init() {
    if (this.uiElement instanceof HTMLDivElement) {
      this.uiElement.innerHTML = `
        <div id="ui-content">
          <div id="logo">
          </div>

          <div id="name">
            <h3>Ayoub</h3>
            <h3>Khalfaoui</h3>
            <h3>Hadi</h3>
          </div>

          <a id="camera" href="#">
            <img src=${cameraIcon} />
            <span>camera</span>
          </a>

          <a id="music" href="#">
            <img src=${musicIcon} />
            <span>music</span>
          </a>
        </div>
      `

      const cameraButton = document.getElementById('camera')
      if (cameraButton instanceof HTMLAnchorElement) {
        cameraButton.addEventListener('click', () => {
          state.isOrbitalContorl = !state.isOrbitalContorl
          cameraButton.getElementsByTagName('span')[0].style.textDecoration = state.isOrbitalContorl ? 'line-through' : 'none'
          document.body.style.cursor = state.isOrbitalContorl ? 'grab' : 'default'  
        })
      }

      const musicButton = document.getElementById('music')
      if (musicButton instanceof HTMLAnchorElement) {
        let isClicked = false
        
        musicButton.addEventListener('click', () => {
          isClicked = !isClicked
          musicButton.getElementsByTagName('span')[0].style.textDecoration = isClicked ? 'line-through' : 'none'
        })
      }
        
    }
  }
}

export default Ui
