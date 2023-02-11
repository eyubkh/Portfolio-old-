import { LoadingManager } from 'three'
import Loading from '../components/Loading'

const loading = new Loading()

export const manager = new LoadingManager()

manager.onStart = async function (url, itemsLoaded, itemsTotal) {
  loading.init()
}

manager.onLoad = function () {
  loading.done = true
  loading.update()
}

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  loading.objects.push(`C:\\>rem SET OBJECT ${itemsLoaded} OF ${itemsTotal}`)
}

manager.onError = function (url) {
  console.log('There was an error loading ' + url)
}
