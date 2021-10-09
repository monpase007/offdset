import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([
    [0, 0],
    [100, 100],
    [200, 200],
    [300, 300],
    [200, 400],
    [100, 500],
  ])
  const [yMin, yMax] = minMax(data)
  const padding = 40
  const countLine = 5
  const size = { width: 600, height: 400 }
  const dpiSize = { width: size.width * 2, height: size.height * 2 }
  const viewHeight = dpiSize.height - (padding * 2)
  const step = viewHeight / countLine
  const textStep = (yMax-yMin)/countLine
  const delta = (yMax-yMin)
  const Ky = viewHeight/delta

  const canvas = useRef();


  console.log(yMin,yMax)

  useEffect(() => {
    const canv = document.querySelector('#canvas')
    console.log(canv)
    console.log(canvas)

    if (data.length) {
      const ctx = canvas?.current?.getContext('2d')
      canvas.current.style.width = `${size?.width}px`
      canvas.current.style.height = `${size?.height}px`
      canvas.current.width = dpiSize?.width
      canvas.current.height = dpiSize?.height


      ///////////////////////////////////////////

      ctx.beginPath()
      for (let i = 0; i <= countLine; i++) {
        const y = step * i
        const text = yMax - textStep * i
        ctx.strokeStyle = '#bbb'
        ctx.font = 'normal 30px sans-serif'
        ctx.fillStyle = '#000'
        ctx.fillText(text, 10, y + padding - 10)
        ctx.moveTo(0, y + padding)
        ctx.lineTo(dpiSize.width, y + padding)
      }

      ctx.stroke()
      ctx.closePath()

      ///////////////////////////////////////////

      ctx.beginPath()
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#ff0000'

      data?.forEach(([x, y]) => {
        ctx.lineTo(x, dpiSize.height - (y * Ky + padding))
      })
      ctx.stroke()
      ctx.closePath()
    }

  }, [data])

  function minMax(data) {
    let min
    let max
    data?.forEach(([, y]) => {
      if (typeof min !== 'number') min = y
      if (typeof max !== 'number') max = y
      if (min > y) min = y
      if (max < y) max = y
    })
    return [min, max]
  }

  return (
    <div className="App">
      <div className="container">
        <div className="card">
          <canvas id='canvas' ref={canvas} className={'canvas'}>

          </canvas>
        </div>
      </div>
    </div>
  );
}

export default App;
