import Link from 'next/link'
import { withRouter } from 'next/router'

const nextBlog = ({router}) => {
  console.log(router)
  return (
    <div>
      <h3>Next blog {router.query.id}</h3>
      <Link href="/"><button>返回首页</button></Link>
    </div>
  )
}

export default withRouter(nextBlog)