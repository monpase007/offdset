
function minMax(data, type) {
  let min
  let max
  data?.forEach((el) => {
    const value = type === 'y' ? el[1] : el[0];
    if (typeof min !== 'number') min = value
    if (typeof max !== 'number') max = value
    if (min > value) min = value
    if (max < value) max = value
  })
  return [min, max == `Infinity` ? 1000000 : max]
}

export function buildLine(canvas, ctx, data, color, data2, color2) {
  const [yMin, yMax] = minMax(data, 'y')
  const [xMin, xMax] = minMax(data, 'x')
  const padding = 40
  const countLine = 5
  const size = { width: 800, height: 350 }
  const dpiSize = { width: size.width * 2, height: size.height * 2 }
  const viewHeight = dpiSize.height - (padding * 2)
  const step = viewHeight / countLine
  const textStep = (yMax - yMin) / countLine
  const deltaY = (yMax - yMin)
  const deltaX = (xMax - xMin)
  const Ky = viewHeight / deltaY
  const Kx = dpiSize.width / deltaX
  canvas.current.style.width = `${size?.width}px`
  canvas.current.style.height = `${size?.height}px`
  canvas.current.width = dpiSize?.width
  canvas.current.height = dpiSize?.height

  ctx.beginPath()
  for (let i = 0; i <= countLine; i++) {
    const y = step * i
    const text = Math.round(yMax - textStep * i)
    ctx.strokeStyle = '#8b90f7'
    ctx.font = 'normal 30px sans-serif'
    ctx.fillStyle = '#75001b'
    ctx.fillText(text, 10, y + padding - 10)
    ctx.moveTo(0, y + padding)
    ctx.lineTo(dpiSize.width, y + padding)
  }
  ctx.stroke()
  ctx.closePath()

  ctx.beginPath()
  ctx.lineWidth = 5;
  ctx.strokeStyle = color

  data?.forEach(([x, y]) => {
    ctx.lineTo(x * Kx, dpiSize.height - (y * Ky + padding))
  })
  ctx.stroke()

  ctx.beginPath()
  ctx.lineWidth = 5;
  ctx.strokeStyle = color2

  if (data2) {
    data2?.forEach(([x, y]) => {
      ctx.lineTo(x * Kx, dpiSize.height - (y * Ky + padding))
    })
  }
  ctx.stroke()
  ctx.closePath()
}
export const getName = (value) => {
  switch (value) {
    case `time`: return 'Время'
    case `gamma`: return 'Гамма'
    case `delta`: return 'Дельта'
    case `sX`: return 'Начальное значение Х'
    case `sY`: return 'Начальное значение У'
    case `alpha`: return 'Хищники'
    case `beta`: return 'Жертвы'
  }
}