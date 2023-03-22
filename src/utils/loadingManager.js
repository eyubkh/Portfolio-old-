import { LoadingManager } from 'three'

export const manager = new LoadingManager()

export const promise = new Promise((resolve, reject) => {
  manager.onLoad = () => {
    resolve()
  }
  manager.onError = (error) => {
    reject(error)
  }
})
