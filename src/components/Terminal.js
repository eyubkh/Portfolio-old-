import '../styles/loading.css'
import loadingData from '../utils/terminalData'
import { promise } from '../utils/loadingManager'

class Terminal {
  loadingElement = document.getElementById('loading')

  terminalText = ''
  cursor = '<div class="cursor"></div>'

  isFirstPhaseDone = false

  constructor () {
    this.init()
  }

  addTerminalText (string, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.terminalText += string
        this.update()
        resolve()
      }, time)
    })
  }

  async init () {
    await this.addTerminalText(loadingData.text[0], 300)
    await this.addTerminalText(loadingData.text[1], 1000)
    await this.addTerminalText(loadingData.text[2], 400)
    await this.addTerminalText(loadingData.text[3], 300)

    await promise
      .then(() => {
        this.handlerLoadState(loadingData.loadState.done)
      })
      .catch(() => {
        this.handlerLoadState(loadingData.loadState.error)
      })

    await this.addTerminalText(loadingData.text[4], 1000)
    await this.addTerminalText(loadingData.text[5], 300)
    await this.addTerminalText(loadingData.text[6], 400)
    await this.addTerminalText(loadingData.text[7], 300)
    await this.clearTerminal(300)
    await this.removeTerminal(2000)
  }

  handlerLoadState (string) {
    this.terminalText = this.terminalText.replace(loadingData.loadState.value, string)
    this.update()
  }

  async clearTerminal (time) {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('clear console')
        this.terminalText = ''
        this.update()
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
    return this.terminalText + this.cursor
  }

  async update () {
    this.loadingElement.innerHTML = await this.app()
    window.scrollTo(0, this.loadingElement.scrollHeight)
  }
}

export default Terminal
