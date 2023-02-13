import { LoadingManager } from 'three'

export const manager = new LoadingManager()

export function onLoad (callback) {
  manager.onLoad = callback
}

export function onError (callback) {
  manager.onError = callback
}
