import { ReactNode } from 'react'
import Footer from './Footer'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex-1">
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
