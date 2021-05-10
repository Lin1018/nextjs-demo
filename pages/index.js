import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import 'antd/dist/antd.css'

// 自定义组件懒加载
const MHeader = dynamic(import('../components/MHeader'))

import style from '../styles/Home.module.css'

const Home = ({data}) => {
  const product = data.data.product
  const [color, setColor] = useState('blue')
  const changeColor = () => {
    setColor(color == 'blue' ? 'green' : 'blue')
  }
  const [time, setTime] = useState()
  const changeTime = async () => {
    // 模块懒加载
    const moment = await import('moment')
    setTime(moment.default(Date.now()).format())
  }
  
  function goBlog () {
    Router.push({
      pathname: '/blog/nextBlog',
      query: {
        id: 60
      }
    })
  }
  
  Router.events.on('routeChangeStart', (...arg) => {
    let obj = [...arg]
    console.log('route change start: ', obj)
  })

  Router.events.on('routeChangeComplete', (...arg) => {
    console.log('route change complete: ', ...arg)
  })

  Router.events.on('beforeHistoryChange', (...arg) => {
    console.log('before history change', ...arg)
  })

  Router.events.on('hashChangeStart', (...arg) => {
    console.log('hash start', ...arg)
  })
  Router.events.on('hashChangeComplete', (...arg) => {
    console.log('hash complete', ...arg)
  })

  return (
    <div>
      <Head>
        <title>自定义Head</title>
      </Head>
      <h1 className={style.title} onClick={goBlog}>
        home skip
      </h1>
      <MHeader>next blog</MHeader>

      <Link href="#aaa"><a className="s-btn test">hash skip</a></Link>

      <Button type="primary" onClick={changeColor}>changeColor</Button>
      <Button onClick={changeTime}>changeTime{time}</Button>
      <ul>
        {
          product.map((item, index) => {
            return (
              <li key={index}>{item.title}</li>
            )
          })
        }
      </ul>

      <style jsx>
        {`
          .s-btn {
            margin: 0 20px;
            color: ${color};
          }
          button {
            margin: 0 20px;
          }
        `}
      </style>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    let params = {
      pageNumer: 1,
      pageSize: 3
    }
    axios({      
      method: 'GET',
      url: 'http://www.xpxux.com/api/products/get',
      params: params
    })
    .then(res => {
      let data = {...res.data}
      resolve({data})
    })
  })
  return await promise
}

export default Home