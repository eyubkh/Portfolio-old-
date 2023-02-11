import '../styles/loading.css'

class Loading {
  constructor () {
    this.main = ''
    this.objects = []
    this.phase = false
    this.done = false
    this.loadingElement = document.getElementById('loading')
  }

  async init () {
    this.firstPhase()
  }

  addText (string) {
    return new Promise((resolve) => {
      const min = 500
      const max = 1000
      const speed = Math.random() * (max - min) + min
      setTimeout(() => {
        this.main = this.main.concat('  ', string)
        this.update()
        resolve()
      }, speed)
    })
  }

  async firstPhase () {
    await this.addText('<p>Hold the CTRL key down to boot from a floppy...</p>')
    await this.addText(
          `<div id="blue-block">
            <p>COPYRIGHT 1993,1994 MICRO HOUSE INTERNATIONL</p>
            <ul>
              <li>Maximum Overdrive(tm) (0,1)</li>
              <li>528 Million byte Drive Support (1)</li>
              <li>Custom DRive Type (1)</li>
            </ul>
          </div>`)
    await this.addText('<p>Starting MS-DOS</p>')
    await this.addText('<p>MIMEM is testing extended memory... </p>')
      .then(() => {
        this.phase = true
        this.update()
      })
  }

  async secondPhase () {
    this.main = this.main.replace('<p>MIMEM is testing extended memory... </p>', '<p>MIMEM is testing extended memory... done.</p>')
    this.update()

    await this.addText(
      `
      <div>
        <p>Microsoft Power Manager Version 1.00     CPQ</p>
        <p>Copyright Micorsoft Corporation 1986, 1992</p>
        <p>Copyright Compag Computer Corporation 1992</p>
      </div>
      `
    )
    await this.addText(
      `
      <div>
        <p>CD-ROM Device Drive Verision 4.12</p>
        <p>Copyright (C) Creative Techology Ltd, and</p>
        <p>Copyright (C) Matsuhita-Kotobuki Electroics Industires, Ltd.</p>
        <p>1990, 1991, 1992, 1993. All right reserved.</p>
        <p>Drive Name = AKH001</p>
        <p>Supporting the following units:</p>
          <p> unit: 0 id: 0 MATSUHITA CD-ROM CR-563-x 0.75</p>
        <p>1 CD-ROM drive(s) connected.</p>
        <p>CD-ROM device driver installed</p>
      </div>
      `
    )
    await new Promise((resolve) => {
      this.objects.forEach(async (obj) => {
        await this.addText(`<p>${obj}</p>`)
      })
      resolve()
    })
      .then(() => {
        setTimeout(() => {
          this.loadingElement.style.display = 'none'
        }, 2000)
      })
  }

  async _app () {
    if (this.done && this.phase) {
      this.done = false
      await this.secondPhase()
    }
    return this.main
  }

  async update () {
    this.loadingElement.innerHTML = await this._app()
    window.scrollTo(0, this.loadingElement.scrollHeight)
  }
}

export default Loading
