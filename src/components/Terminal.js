import '../styles/loading.css'
import loadingData from '../utils/terminalData'
import { loadingManagerPromise } from '../utils/loadingManager'
import { isSmallDeviceOrTouchScreen } from '../utils/isSmallDeviceOrTouchScreen'

class Terminal {
  loadingElement = document.getElementById('loading')
  isError = false

  terminalText = ''

  constructor () {
    this.init()
  }

  async init () {
    await this.addTerminalText(loadingData.text[0], 300)
    await this.addTerminalText(loadingData.text[1], 1000)
    await this.addTerminalText(loadingData.text[2], 400)
    await this.addTerminalText(loadingData.text[3], 300)

    await loadingManagerPromise
      .then(() => {
        if (isSmallDeviceOrTouchScreen()) {
          throw new Error()
        } else {
          this.handlerLoadState(loadingData.success.value)
        }
      })
      .catch(async () => {
        this.isError = true
        this.handlerLoadState(loadingData.error.value)

        await this.clearTerminal(1000)
        await this.addTerminalText(loadingData.error.message, 500)
      })

    if (this.isError === false) {
      await this.addTerminalText(loadingData.text[4], 1000)
      await this.addTerminalText(loadingData.text[5], 300)
      await this.addTerminalText(loadingData.text[6], 400)
      await this.addTerminalText(loadingData.text[7], 300)
      await this.clearTerminal(300)
      await this.removeTerminal(2000)
    }
  }

  handlerLoadState (string) {
    this.terminalText = this.terminalText.replace(loadingData.text[3], string)
    this.appUpdate()
  }

  addTerminalText (string, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.terminalText += string
        this.appUpdate()
        resolve()
      }, time)
    })
  }

  async clearTerminal (time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('clear console')
        this.terminalText = ''
        this.appUpdate()
        resolve()
      }, time)
    })
  }

  async removeTerminal (time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.loadingElement.style.display = 'none'
        resolve()
      }, time)
    })
  }

  async app () {
    return this.terminalText + '<div class="cursor"></div>'
  }

  async appUpdate () {
    this.loadingElement.innerHTML = await this.app()
    window.scrollTo(0, this.loadingElement.scrollHeight)
  }
}

export default Terminal
