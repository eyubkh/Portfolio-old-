import { LoadingManager } from 'three'

export const loadingManager = new LoadingManager()

export const loadingManagerPromise = new Promise((resolve, reject) => {
  loadingManager.onLoad = () => {
    resolve()
  }
  loadingManager.onError = (error) => {
    reject(error)
  }
})
