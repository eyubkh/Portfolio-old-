import { LoadingManager } from 'three'
import Loading from '../components/Loading'

const loading = new Loading()

export const manager = new LoadingManager()

manager.onStart = async function () {
  loading.init()
}

manager.onLoad = function () {
  loading.isLoadDone = true
  loading.update()
}

manager.onError = function () {
  loading.isLoadError = true
  loading.update()
}
