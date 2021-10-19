import React, { useEffect, useRef, useState } from 'react';
import './root.css';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
import * as option from './options'
import { LodkaValterraFunc } from './math'
import { buildLine,getName } from './canvas'

function Root() {

  const [data, setData] = useState({})
  const [options, setOptions] = useState(option.options)
  const multiplication = option.multiplication

 

  useEffect(() => {
    setData(() => {
      const payload = {
        dx: [],
        time: [],
        time2: [],
      }
      let x = options.sX;
      let y = options.sY;
      for (let i = 0; i < options.time; i++) {
        payload.dx.push([x, y]);
        payload.time2.push([i, x]);
        payload.time.push([i, y]);
        const [dx, dy] = LodkaValterraFunc(x, y, options);
        x += dx;
        y += dy;
      }
      return payload
    })
  }, [options])

  let canvas = {}
  canvas['1'] = useRef();
  canvas['2'] = useRef();

  useEffect(() => {
    const ctx = canvas['1']?.current?.getContext('2d')
    const ctx2 = canvas['2']?.current?.getContext('2d')
    buildLine(canvas['1'], ctx, data.time, '#75001b', data.time2, '#ff7300')
    buildLine(canvas['2'], ctx2, data.dx, '#000675')
  }, [data])

  

  return (
    <>
      <div className="App">
        <div className="appSignature title">
        Выполнил Поздеев Виктор: Модель Лодки-Вольтерры. 
        </div>
        <div className={`sliderBox`}>
          {Object.keys(options).map((param) => {
            if(param ==='sX' || param ==='sY') return
            return(
            <div className="btns_item">
              <div  className="btns_item-text" style={{ minWidth: '60px' }}>
                {param ==='beta' && <div className="circle beta"></div>}
                {param ==='alpha' && <div className="circle alpha"></div>}
                {getName(param)} : {options[param]}
                </div>
              <Slider
                value={options[param] * multiplication[param]}
                onChange={(data) => { setOptions(prev => ({ ...prev, [param]: data / multiplication[param] })) }}
                min={param === 'time' ? 10 : 0}
                max={param === 'time' ? 200 : 20}
              />
            </div>
          )})}
        </div>
        <div className="graphics">
        {Object.keys(canvas).map((el, index) => (
          <div className="container">
            <div className="card">
              <canvas id='canvas' ref={canvas[`${index + 1}`]} className={'canvas'} />
            </div>
          </div>
        ))}
        </div>
        
      </div>
    </>

  );
}

export default Root;
