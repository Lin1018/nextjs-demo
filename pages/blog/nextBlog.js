import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import axios from 'axios'

class NextBlog extends React.Component {
  constructor(props) {
    super()
    this.state = {
      router: props.router,
      data: props.data.data
    }
  }
  static async getInitialProps () {
    const promise = new Promise((resolve, reject) => {
      axios
        .get('http://www.xpxux.com/api/products/get?pageNumber=1&pageSize=10')
        .then(res => {
          let data = {...res.data}
          resolve({data})
        })
    })
    return await promise
  }

  render () {
    return (
      <div>
        <h3>Next blog {this.state.router.query.id}</h3>
        <ul>
          {
            this.state.data.product.map((item, index) => {
              return (
                <li key={index}>{item.title}</li>
              )
            })
          }
        </ul>
        <Link href="/"><button>返回首页</button></Link>
      </div>
    )
  }
}

export default withRouter(NextBlog)