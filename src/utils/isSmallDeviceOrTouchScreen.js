export function isSmallDeviceOrTouchScreen () {
  const isSmallDevice = /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(navigator.userAgent)
  const isTouchScreen = 'touchstart' in window || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
  return isTouchScreen || isSmallDevice
}
