import { LoadingManager } from 'three'

export const loadingManager = new LoadingManager()

export const loadingManagerPromise = new Promise((resolve, reject) => {
  loadingManager.onLoad = () => {
    const loadingElement = document.getElementById('loading')
    if(loadingElement) loadingElement.style.display  = 'none'

    resolve(true)
  }
  loadingManager.onError = (error) => {
    reject(error)
  }
})
