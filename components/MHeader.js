import Link from 'next/link'

const MHeader =  ({ children }) => {
  return (
    <Link href="/blog/nextBlog">
      <button>{ children }</button>
    </Link>
  )
}

export default MHeader