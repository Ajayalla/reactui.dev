import { ReactNode } from 'react'
import Footer from './Footer'
import Navigation from './Navigation'

type LayoutProps = {
  children?: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex-1">
      <Navigation />
      <main className="mx-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
