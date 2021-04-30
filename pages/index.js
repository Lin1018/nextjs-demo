import Router from 'next/router'
import MHeader from '../components/MHeader'

export default function Home() {
  function goBlog () {
    Router.push('/blog/nextBlog?id=60')
  }

  return (
    <div>
      <h1 onClick={goBlog}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <MHeader>next blog</MHeader>
    </div>
  )
}
