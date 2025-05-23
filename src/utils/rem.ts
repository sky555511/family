// 设置基准字体大小
const setRemUnit = () => {
  const docEl = document.documentElement
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  const recalc = () => {
    const clientWidth = docEl.clientWidth || 375
    // 按 375px 设计稿，1rem = 37.5px
    docEl.style.fontSize = `${clientWidth / 10}px`
  }

  window.addEventListener(resizeEvt, recalc, false)
  document.addEventListener('DOMContentLoaded', recalc, false)
}

export default setRemUnit
